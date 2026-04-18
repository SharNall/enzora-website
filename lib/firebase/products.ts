import { db } from "@/lib/firebase/client";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const PRODUCTS_COLLECTION = "products";

/**
 * Create a new product
 */
export async function createProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

/**
 * Get all products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products: Product[] = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      } as Product);
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Get a single product by ID
 */
export async function getProductById(productId: string): Promise<Product | null> {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return null;
    }

    return {
      id: productSnap.id,
      ...productSnap.data(),
    } as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Get product by SKU
 */
export async function getProductBySku(sku: string): Promise<Product | null> {
  try {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where("sku", "==", sku)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Product;
  } catch (error) {
    console.error("Error fetching product by SKU:", error);
    throw error;
  }
}

/**
 * Update product details
 */
export async function updateProduct(
  productId: string,
  updates: Partial<Omit<Product, "id" | "createdAt">>
): Promise<void> {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * Update product stock
 */
export async function updateProductStock(
  productId: string,
  newStock: number
): Promise<void> {
  try {
    if (newStock < 0) {
      throw new Error("Stock cannot be negative");
    }

    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(productRef, {
      stock: newStock,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    throw error;
  }
}

/**
 * Get low stock products
 */
export async function getLowStockProducts(threshold: number = 5): Promise<Product[]> {
  try {
    const products = await getAllProducts();
    return products.filter((product) => product.stock < threshold);
  } catch (error) {
    console.error("Error fetching low stock products:", error);
    throw error;
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
