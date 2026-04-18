/**
 * Input validation utilities for API routes
 */

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate customer name
 */
export function validateCustomerName(name: string): string | null {
  if (!name || typeof name !== "string") {
    return "Customer name is required";
  }

  if (name.trim().length < 2) {
    return "Customer name must be at least 2 characters";
  }

  if (name.length > 100) {
    return "Customer name must not exceed 100 characters";
  }

  return null;
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): string | null {
  if (!phone || typeof phone !== "string") {
    return "Phone number is required";
  }

  // Basic phone validation (10-15 digits, can include +, -, spaces)
  const phoneRegex = /^[\d+\-\s()]{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return "Invalid phone number format";
  }

  return null;
}

/**
 * Validate address
 */
export function validateAddress(address: string): string | null {
  if (!address || typeof address !== "string") {
    return "Address is required";
  }

  if (address.trim().length < 5) {
    return "Address must be at least 5 characters";
  }

  if (address.length > 500) {
    return "Address must not exceed 500 characters";
  }

  return null;
}

/**
 * Validate product ID
 */
export function validateProductId(productId: string): string | null {
  if (!productId || typeof productId !== "string") {
    return "Product ID is required";
  }

  if (productId.trim().length === 0) {
    return "Product ID cannot be empty";
  }

  return null;
}

/**
 * Validate quantity
 */
export function validateQuantity(quantity: any): string | null {
  if (quantity === null || quantity === undefined) {
    return "Quantity is required";
  }

  const qty = Number(quantity);

  if (!Number.isInteger(qty)) {
    return "Quantity must be a whole number";
  }

  if (qty <= 0) {
    return "Quantity must be greater than 0";
  }

  if (qty > 1000) {
    return "Quantity cannot exceed 1000";
  }

  return null;
}

/**
 * Validate order data
 */
export function validateOrderData(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  const nameError = validateCustomerName(data.customerName);
  if (nameError) errors.push({ field: "customerName", message: nameError });

  const phoneError = validatePhone(data.phone);
  if (phoneError) errors.push({ field: "phone", message: phoneError });

  const addressError = validateAddress(data.address);
  if (addressError) errors.push({ field: "address", message: addressError });

  const productIdError = validateProductId(data.productId);
  if (productIdError) errors.push({ field: "productId", message: productIdError });

  const quantityError = validateQuantity(data.quantity);
  if (quantityError) errors.push({ field: "quantity", message: quantityError });

  return errors;
}

/**
 * Validate product data
 */
export function validateProductData(data: any): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Product name must be at least 2 characters" });
  }

  if (data.price === null || data.price === undefined) {
    errors.push({ field: "price", message: "Price is required" });
  } else if (typeof data.price !== "number" || data.price < 0) {
    errors.push({ field: "price", message: "Price must be a non-negative number" });
  }

  if (data.stock === null || data.stock === undefined) {
    errors.push({ field: "stock", message: "Stock is required" });
  } else if (!Number.isInteger(data.stock) || data.stock < 0) {
    errors.push({ field: "stock", message: "Stock must be a non-negative integer" });
  }

  return errors;
}

/**
 * Validate status update
 */
export function validateStatus(status: string): string | null {
  const validStatuses = ["pending", "confirmed", "rejected", "delivered"];

  if (!validStatuses.includes(status)) {
    return `Invalid status. Must be one of: ${validStatuses.join(", ")}`;
  }

  return null;
}
