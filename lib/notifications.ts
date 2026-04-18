import { db } from "@/lib/firebase/client";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Order } from "@/lib/firebase/orders";
import { Product } from "@/lib/firebase/products";

export interface Notification {
  id?: string;
  type: "order_created" | "order_status_changed" | "low_stock_alert";
  title: string;
  message: string;
  data: Record<string, any>;
  read: boolean;
  createdAt: Timestamp;
}

const NOTIFICATIONS_COLLECTION = "notifications";

/**
 * Send notification to admin when order is created
 */
export async function notifyNewOrder(
  order: Order,
  product: Product
): Promise<string> {
  try {
    const notification: Omit<Notification, "id"> = {
      type: "order_created",
      title: "New Order Received",
      message: `Order for ${order.quantity}x ${product.name} from ${order.customerName}`,
      data: {
        orderId: order.id,
        customerName: order.customerName,
        phone: order.phone,
        productName: product.name,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
      },
      read: false,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), notification);
    
    // In production, you would also send FCM push notification here
    // await sendFcmNotification(notification);

    return docRef.id;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

/**
 * Send notification when order status changes
 */
export async function notifyOrderStatusChange(
  orderId: string,
  oldStatus: string,
  newStatus: string,
  customerName: string
): Promise<string> {
  try {
    const notification: Omit<Notification, "id"> = {
      type: "order_status_changed",
      title: `Order Status Updated: ${newStatus}`,
      message: `Order #${orderId} status changed from ${oldStatus} to ${newStatus}`,
      data: {
        orderId,
        customerName,
        oldStatus,
        newStatus,
      },
      read: false,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), notification);
    return docRef.id;
  } catch (error) {
    console.error("Error creating status change notification:", error);
    throw error;
  }
}

/**
 * Send low stock alert
 */
export async function notifyLowStock(
  product: Product,
  currentStock: number,
  threshold: number
): Promise<string> {
  try {
    const notification: Omit<Notification, "id"> = {
      type: "low_stock_alert",
      title: `Low Stock Alert: ${product.name}`,
      message: `${product.name} stock level is ${currentStock}, below threshold of ${threshold}`,
      data: {
        productId: product.id,
        productName: product.name,
        currentStock,
        threshold,
      },
      read: false,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, NOTIFICATIONS_COLLECTION), notification);
    return docRef.id;
  } catch (error) {
    console.error("Error creating low stock notification:", error);
    throw error;
  }
}

/**
 * Example: Send FCM push notification
 * You need to set up Firebase Cloud Messaging credentials
 */
export async function sendFcmNotification(notification: Omit<Notification, "id" | "createdAt">): Promise<void> {
  // This is a placeholder - implement with your FCM backend
  // In production, you would:
  // 1. Get admin's FCM token from Firestore
  // 2. Use Firebase Admin SDK to send the message
  // 3. Handle multiple admin tokens

  console.log("FCM Notification would be sent:", notification);

  // Example implementation (requires Firebase Admin SDK):
  /*
  const admin = require('firebase-admin');
  const registrationTokens = await getAdminFcmTokens();

  for (const token of registrationTokens) {
    await admin.messaging().send({
      notification: {
        title: notification.title,
        body: notification.message,
      },
      data: notification.data,
      token: token,
    });
  }
  */
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  try {
    const notificationRef = require("firebase/firestore").doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await require("firebase/firestore").updateDoc(notificationRef, {
      read: true,
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}
