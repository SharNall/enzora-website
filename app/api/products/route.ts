import { NextRequest, NextResponse } from "next/server";
import {
  getAllProducts,
  getProductById,
  updateProductStock,
  getLowStockProducts,
} from "@/lib/firebase/products";

/**
 * GET /api/products
 * 
 * Fetches all products with optional filtering
 * 
 * Query parameters:
 * - lowStock?: true (returns only products below threshold)
 * 
 * Response:
 * {
 *   success: true,
 *   products: Product[],
 *   count: number
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lowStock = searchParams.get("lowStock") === "true";

    let products;
    if (lowStock) {
      products = await getLowStockProducts(5);
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json(
      {
        success: true,
        products,
        count: products.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching products:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Example cURL requests:
 * 
 * Get all products:
 * curl http://localhost:3000/api/products
 * 
 * Get low stock products only:
 * curl "http://localhost:3000/api/products?lowStock=true"
 */
