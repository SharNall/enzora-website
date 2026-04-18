import { NextRequest, NextResponse } from "next/server";
import { createOrderWithTransaction, Order } from "@/lib/firebase/orders";
import { getProductById } from "@/lib/firebase/products";
import { notifyNewOrder } from "@/lib/notifications";
import { validateOrderData } from "@/lib/validation";

/**
 * POST /api/orders/create
 * 
 * Creates a new order with inventory transaction
 * 
 * Request body:
 * {
 *   customerName: string (required)
 *   phone: string (required)
 *   address: string (required)
 *   productId: string (required)
 *   quantity: number (required)
 *   notes?: string (optional)
 * }
 * 
 * Response on success:
 * {
 *   success: true,
 *   orderId: string,
 *   order: Order
 * }
 * 
 * Response on error:
 * {
 *   success: false,
 *   error: string,
 *   details?: ValidationError[]
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationErrors = validateOrderData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    const { customerName, phone, address, productId, quantity, notes } = body;

    // Get product to verify it exists
    const product = await getProductById(productId);
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    // Create order with transaction (handles stock checking and decrement)
    const orderData: Omit<Order, "id" | "status" | "createdAt"> = {
      customerName,
      phone,
      address,
      productId,
      quantity,
      notes,
    };

    const result = await createOrderWithTransaction(
      orderData,
      productId,
      quantity
    );

    // Send notification to admin
    try {
      await notifyNewOrder(
        {
          id: result.orderId,
          ...orderData,
          status: "pending",
          createdAt: new Date(),
        } as any,
        product
      );
    } catch (notificationError) {
      console.error("Failed to send notification:", notificationError);
      // Don't fail the order creation if notification fails
    }

    return NextResponse.json(
      {
        success: true,
        orderId: result.orderId,
        message: "Order created successfully",
        data: {
          orderId: result.orderId,
          productName: product.name,
          quantity,
          totalPrice: product.price * quantity,
          status: "pending",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Check for specific error messages
    if (errorMessage.includes("Insufficient stock")) {
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          code: "INSUFFICIENT_STOCK",
        },
        { status: 409 }
      );
    }

    if (errorMessage.includes("not found")) {
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          code: "NOT_FOUND",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create order",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Example cURL request:
 * 
 * curl -X POST http://localhost:3000/api/orders/create \
 *   -H "Content-Type: application/json" \
 *   -d '{
 *     "customerName": "John Doe",
 *     "phone": "+1234567890",
 *     "address": "123 Main St, New York, NY 10001",
 *     "productId": "product-id-here",
 *     "quantity": 2,
 *     "notes": "Please deliver before 5 PM"
 *   }'
 */
