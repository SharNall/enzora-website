import { NextRequest, NextResponse } from "next/server";
import { updateProductStock, getProductById } from "@/lib/firebase/products";
import { notifyLowStock } from "@/lib/notifications";

/**
 * PATCH /api/products/:id
 * 
 * Updates product details (mainly stock)
 * 
 * Request body:
 * {
 *   stock?: number,
 *   price?: number,
 *   name?: string,
 *   description?: string
 * }
 * 
 * Response:
 * {
 *   success: true,
 *   message: string,
 *   product: Product
 * }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;
    const body = await request.json();
    const { stock: newStock } = body;

    // Get current product
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

    // Validate stock if provided
    if (newStock !== undefined) {
      if (!Number.isInteger(newStock) || newStock < 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Stock must be a non-negative integer",
          },
          { status: 400 }
        );
      }

      // Update stock
      await updateProductStock(productId, newStock);

      // Check for low stock and send notification
      if (newStock < 5 && newStock > 0) {
        try {
          await notifyLowStock(product, newStock, 5);
        } catch (notificationError) {
          console.error("Failed to send low stock notification:", notificationError);
        }
      }
    }

    const updatedProduct = await getProductById(productId);

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update product",
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}

/**
 * Example cURL request:
 * 
 * Update product stock:
 * curl -X PATCH http://localhost:3000/api/products/product-id-here \
 *   -H "Content-Type: application/json" \
 *   -d '{"stock": 25}'
 */
