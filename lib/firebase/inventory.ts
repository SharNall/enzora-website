import { db } from "@/lib/firebase/client";
import { collection, addDoc, query, getDocs, updateDoc, deleteDoc, doc, Timestamp, getDoc } from "firebase/firestore";

export interface InventoryItem {
  id?: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  cost: number;
  category: string;
  description?: string;
  lastRestocked?: Timestamp | Date;
  createdAt: Timestamp | Date;
}

export interface Transaction {
  id?: string;
  type: "sale" | "purchase" | "adjustment";
  amount: number;
  description: string;
  category: string;
  date: Timestamp | Date;
  reference?: string;
}

const INVENTORY_COLLECTION = "inventory";
const TRANSACTIONS_COLLECTION = "transactions";

// Inventory Management
export const addInventoryItem = async (item: Omit<InventoryItem, "id" | "createdAt">) => {
  try {
    const docRef = await addDoc(collection(db, INVENTORY_COLLECTION), {
      ...item,
      createdAt: Timestamp.now(),
      lastRestocked: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding inventory item:", error);
    return { success: false, error: String(error) };
  }
};

export const getAllInventoryItems = async (): Promise<InventoryItem[]> => {
  try {
    const q = query(collection(db, INVENTORY_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as InventoryItem));
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return [];
  }
};

export const updateInventoryItem = async (itemId: string, updates: Partial<InventoryItem>) => {
  try {
    const itemRef = doc(db, INVENTORY_COLLECTION, itemId);
    await updateDoc(itemRef, {
      ...updates,
      lastRestocked: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating inventory:", error);
    return { success: false, error: String(error) };
  }
};

export const deleteInventoryItem = async (itemId: string) => {
  try {
    await deleteDoc(doc(db, INVENTORY_COLLECTION, itemId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting inventory:", error);
    return { success: false, error: String(error) };
  }
};

// Transaction Management
export const addTransaction = async (transaction: Omit<Transaction, "id">) => {
  try {
    const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), {
      ...transaction,
      date: transaction.date || Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { success: false, error: String(error) };
  }
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  try {
    const q = query(collection(db, TRANSACTIONS_COLLECTION));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    } as Transaction));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
};

export const deleteTransaction = async (transactionId: string) => {
  try {
    await deleteDoc(doc(db, TRANSACTIONS_COLLECTION, transactionId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return { success: false, error: String(error) };
  }
};

// Statistics
export const getInventoryStats = async () => {
  try {
    const items = await getAllInventoryItems();
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const totalCost = items.reduce((sum, item) => sum + item.quantity * item.cost, 0);
    const lowStockItems = items.filter((item) => item.quantity < 10);

    return {
      totalItems,
      totalValue,
      totalCost,
      profit: totalValue - totalCost,
      lowStockCount: lowStockItems.length,
      itemCount: items.length,
    };
  } catch (error) {
    console.error("Error calculating stats:", error);
    return {
      totalItems: 0,
      totalValue: 0,
      totalCost: 0,
      profit: 0,
      lowStockCount: 0,
      itemCount: 0,
    };
  }
};

export const getFinancialStats = async () => {
  try {
    const transactions = await getAllTransactions();
    const sales = transactions.filter((t) => t.type === "sale").reduce((sum, t) => sum + t.amount, 0);
    const purchases = transactions.filter((t) => t.type === "purchase").reduce((sum, t) => sum + t.amount, 0);
    const adjustments = transactions.filter((t) => t.type === "adjustment").reduce((sum, t) => sum + t.amount, 0);

    return {
      totalSales: sales,
      totalPurchases: purchases,
      totalAdjustments: adjustments,
      netProfit: sales - purchases + adjustments,
    };
  } catch (error) {
    console.error("Error calculating financial stats:", error);
    return {
      totalSales: 0,
      totalPurchases: 0,
      totalAdjustments: 0,
      netProfit: 0,
    };
  }
};
