import { db } from "@/lib/firebase/client";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  runTransaction,
  getDoc,
} from "firebase/firestore";

export type OrderStatus = "pending" | "confirmed" | "rejected" | "delivered";

export interface Order {
  id?: string;
  customerName: string;
  phone: string;
  address: string;
  productId: string;
  quantity: number;
  status: OrderStatus;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  totalPrice?: number;
  notes?: string;
}

// Legacy interface for backward compatibility
export interface OrderData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  status: "pending" | "confirmed" | "rejected";
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}

const ORDERS_COLLECTION = "orders";

/**
 * Create a new order with inventory transaction
 * This safely decrements stock and creates the order atomically
 */
export async function createOrderWithTransaction(
  orderData: Omit<Order, "id" | "status" | "createdAt">,
  productId: string,
  quantity: number
): Promise<{ orderId: string; success: boolean }> {
  try {
    const result = await runTransaction(db, async (transaction) => {
      // Reference the product
      const productRef = doc(db, "products", productId);
      const productSnap = await transaction.get(productRef);

      if (!productSnap.exists()) {
        throw new Error("Product not found");
      }

      const productData = productSnap.data();
      const currentStock = productData.stock || 0;

      // Check if stock is available
      if (currentStock < quantity) {
        throw new Error(
          `Insufficient stock. Available: ${currentStock}, Requested: ${quantity}`
        );
      }

      // Create new order document
      const orderRef = doc(collection(db, ORDERS_COLLECTION));
      const newOrder: Order = {
        ...orderData,
        status: "pending" as OrderStatus,
        createdAt: Timestamp.now(),
        totalPrice: productData.price * quantity,
        productId,
        quantity,
      };

      // Update stock
      const newStock = currentStock - quantity;
      transaction.set(orderRef, newOrder);
      transaction.update(productRef, { stock: newStock });

      // Check for low stock alert
      if (newStock < 5) {
        const alertRef = doc(collection(db, "stockAlerts"));
        transaction.set(alertRef, {
          productId,
          productName: productData.name,
          currentStock: newStock,
          threshold: 5,
          createdAt: Timestamp.now(),
          acknowledged: false,
        });
      }

      return {
        orderId: orderRef.id,
        success: true,
      };
    });

    return result;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

/**
 * Get all orders with optional filtering
 */
export async function getAllOrders(filters?: {
  status?: OrderStatus;
  customerName?: string;
}): Promise<Order[]> {
  try {
    let q = query(collection(db, ORDERS_COLLECTION));

    if (filters?.status) {
      q = query(collection(db, ORDERS_COLLECTION), where("status", "==", filters.status));
    }

    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];

    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
      } as Order);
    });

    // Sort by creation date (newest first)
    return orders.sort(
      (a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis()
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

/**
 * Get a single order by ID
 */
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return null;
    }

    return {
      id: orderSnap.id,
      ...orderSnap.data(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus
): Promise<void> {
  try {
    const validStatuses: OrderStatus[] = [
      "pending",
      "confirmed",
      "rejected",
      "delivered",
    ];

    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

/**
 * Delete an order (only pending orders)
 */
export async function deleteOrder(orderId: string): Promise<void> {
  try {
    const order = await getOrderById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (order.status !== "pending") {
      throw new Error("Can only delete pending orders");
    }

    // Restore stock when deleting
    await runTransaction(db, async (transaction) => {
      const productRef = doc(db, "products", order.productId);
      const productSnap = await transaction.get(productRef);

      if (productSnap.exists()) {
        const currentStock = productSnap.data().stock || 0;
        transaction.update(productRef, {
          stock: currentStock + order.quantity,
        });
      }

      transaction.delete(doc(db, ORDERS_COLLECTION, orderId));
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

/**
 * Get low stock alerts
 */
export async function getLowStockAlerts(): Promise<any[]> {
  try {
    const q = query(
      collection(db, "stockAlerts"),
      where("acknowledged", "==", false)
    );
    const querySnapshot = await getDocs(q);
    const alerts: any[] = [];

    querySnapshot.forEach((doc) => {
      alerts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return alerts;
  } catch (error) {
    console.error("Error fetching stock alerts:", error);
    throw error;
  }
}

/**
 * Acknowledge a stock alert
 */
export async function acknowledgeStockAlert(alertId: string): Promise<void> {
  try {
    const alertRef = doc(db, "stockAlerts", alertId);
    await updateDoc(alertRef, {
      acknowledged: true,
    });
  } catch (error) {
    console.error("Error acknowledging alert:", error);
    throw error;
  }
}

// Legacy functions for backward compatibility
export const submitOrder = async (orderData: Omit<OrderData, "id" | "status" | "createdAt" | "updatedAt">) => {
  try {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      status: "pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error submitting order:", error);
    return { success: false, error: String(error) };
  }
};

export const getOrdersByStatus = async (status: "pending" | "confirmed" | "rejected"): Promise<OrderData[]> => {
  try {
    const q = query(collection(db, ORDERS_COLLECTION), where("status", "==", status));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as OrderData));
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return [];
  }
};
