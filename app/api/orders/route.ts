import { NextRequest, NextResponse } from "next/server";
import { getAllOrders, OrderStatus } from "@/lib/firebase/orders";

/**
 * GET /api/orders
 * 
 * Fetches all orders with optional filtering
 * 
 * Query parameters:
 * - status?: "pending" | "confirmed" | "rejected" | "delivered"
 * 
 * Response:
 * {
 *   success: true,
 *   orders: Order[],
 *   count: number
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") as OrderStatus | null;

    const filters = status ? { status } : undefined;
    const orders = await getAllOrders(filters);

    return NextResponse.json(
      {
        success: true,
        orders,
        count: orders.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch orders",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Example cURL requests:
 * 
 * Get all orders:
 * curl http://localhost:3000/api/orders
 * 
 * Get pending orders only:
 * curl "http://localhost:3000/api/orders?status=pending"
 * 
 * Get delivered orders:
 * curl "http://localhost:3000/api/orders?status=delivered"
 */
