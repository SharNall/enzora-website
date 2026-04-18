import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, getOrderById } from "@/lib/firebase/orders";
import { notifyOrderStatusChange } from "@/lib/notifications";
import { validateStatus } from "@/lib/validation";

/**
 * PATCH /api/orders/:id
 * 
 * Updates the status of an order
 * 
 * Request body:
 * {
 *   status: "pending" | "confirmed" | "rejected" | "delivered"
 * }
 * 
 * Response on success:
 * {
 *   success: true,
 *   message: string,
 *   order: Order
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const body = await request.json();
    const { status: newStatus } = body;

    // Validate status
    const statusError = validateStatus(newStatus);
    if (statusError) {
      return NextResponse.json(
        {
          success: false,
          error: statusError,
        },
        { status: 400 }
      );
    }

    // Get current order
    const order = await getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    const oldStatus = order.status;

    // Update order status
    await updateOrderStatus(orderId, newStatus);

    // Send notification
    try {
      await notifyOrderStatusChange(
        orderId,
        oldStatus,
        newStatus,
        order.customerName
      );
    } catch (notificationError) {
      console.error("Failed to send notification:", notificationError);
      // Don't fail the request if notification fails
    }

    return NextResponse.json(
      {
        success: true,
        message: `Order status updated from ${oldStatus} to ${newStatus}`,
        data: {
          orderId,
          previousStatus: oldStatus,
          newStatus,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating order:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update order",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Example cURL request:
 * 
 * curl -X PATCH http://localhost:3000/api/orders/order-id-here \
 *   -H "Content-Type: application/json" \
 *   -d '{"status": "confirmed"}'
 */
