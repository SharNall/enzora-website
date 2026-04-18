# Order Management System API Documentation

## Overview

This is a complete order management system with inventory tracking and admin notifications built on Next.js, Firebase Firestore, and Firebase Cloud Messaging.

## Architecture

### Services
- **Order Service** (`lib/firebase/orders.ts`) - Order creation with transactions, status management
- **Product Service** (`lib/firebase/products.ts`) - Product catalog and inventory management
- **Notification Service** (`lib/notifications.ts`) - Admin notifications and alerts
- **Validation Service** (`lib/validation.ts`) - Input validation and error handling

### Database Structure

#### Products Collection
```typescript
{
  id: string,
  name: string,
  description: string,
  price: number,
  stock: number,
  sku: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Orders Collection
```typescript
{
  id: string,
  customerName: string,
  phone: string,
  address: string,
  productId: string,
  quantity: number,
  status: "pending" | "confirmed" | "rejected" | "delivered",
  totalPrice: number,
  notes: string,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

#### Stock Alerts Collection
```typescript
{
  productId: string,
  productName: string,
  currentStock: number,
  threshold: number,
  createdAt: Timestamp,
  acknowledged: boolean
}
```

#### Notifications Collection
```typescript
{
  type: "order_created" | "order_status_changed" | "low_stock_alert",
  title: string,
  message: string,
  data: Record<string, any>,
  read: boolean,
  createdAt: Timestamp
}
```

## API Endpoints

### 1. Create Order
**POST** `/api/orders/create`

Creates a new order with automatic inventory transaction and admin notification.

**Request:**
```json
{
  "customerName": "John Doe",
  "phone": "+1 (555) 123-4567",
  "address": "123 Main St, New York, NY 10001",
  "productId": "prod_12345",
  "quantity": 2,
  "notes": "Please deliver by 5 PM"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "orderId": "order_abc123",
  "message": "Order created successfully",
  "data": {
    "orderId": "order_abc123",
    "productName": "Product Name",
    "quantity": 2,
    "totalPrice": 99.98,
    "status": "pending"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "customerName",
      "message": "Customer name must be at least 2 characters"
    }
  ]
}
```

**Error Response (409 - Insufficient Stock):**
```json
{
  "success": false,
  "error": "Insufficient stock. Available: 1, Requested: 5",
  "code": "INSUFFICIENT_STOCK"
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "phone": "+1-555-123-4567",
    "address": "123 Main St, New York, NY 10001",
    "productId": "prod_12345",
    "quantity": 2
  }'
```

---

### 2. Get All Orders
**GET** `/api/orders`

Retrieves all orders with optional filtering by status.

**Query Parameters:**
- `status` (optional): Filter by status - `pending`, `confirmed`, `rejected`, or `delivered`

**Response (200):**
```json
{
  "success": true,
  "orders": [
    {
      "id": "order_abc123",
      "customerName": "John Doe",
      "phone": "+1-555-123-4567",
      "address": "123 Main St, New York, NY 10001",
      "productId": "prod_12345",
      "quantity": 2,
      "status": "pending",
      "totalPrice": 99.98,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

**cURL Examples:**
```bash
# Get all orders
curl http://localhost:3000/api/orders

# Get pending orders only
curl "http://localhost:3000/api/orders?status=pending"

# Get delivered orders
curl "http://localhost:3000/api/orders?status=delivered"
```

---

### 3. Update Order Status
**PATCH** `/api/orders/:id`

Updates the status of an existing order and triggers a notification.

**Request:**
```json
{
  "status": "confirmed"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Order status updated from pending to confirmed",
  "data": {
    "orderId": "order_abc123",
    "previousStatus": "pending",
    "newStatus": "confirmed"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Order not found"
}
```

**cURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/orders/order_abc123 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

---

### 4. Get All Products
**GET** `/api/products`

Retrieves all products with optional low-stock filtering.

**Query Parameters:**
- `lowStock` (optional): Set to `true` to get only products below threshold (5 units)

**Response (200):**
```json
{
  "success": true,
  "products": [
    {
      "id": "prod_12345",
      "name": "Wound Monitoring Device",
      "description": "Smart sensor for infection detection",
      "price": 49.99,
      "stock": 15,
      "sku": "WMD-001",
      "createdAt": "2024-01-10T08:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "count": 1
}
```

**cURL Examples:**
```bash
# Get all products
curl http://localhost:3000/api/products

# Get low stock products only
curl "http://localhost:3000/api/products?lowStock=true"
```

---

### 5. Update Product Stock
**PATCH** `/api/products/:id`

Updates product stock level. Automatically triggers low-stock alert if stock falls below threshold.

**Request:**
```json
{
  "stock": 20
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product updated successfully",
  "product": {
    "id": "prod_12345",
    "name": "Wound Monitoring Device",
    "price": 49.99,
    "stock": 20,
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

**cURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/products/prod_12345 \
  -H "Content-Type: application/json" \
  -d '{"stock": 20}'
```

---

## Key Features

### 1. Transactional Order Creation
- Atomically decrements stock and creates order
- Prevents race conditions with Firestore transactions
- Returns error if insufficient stock
- Automatically creates low-stock alert if stock < 5

### 2. Input Validation
- Validates customer name (2-100 characters)
- Validates phone format (10-15 characters)
- Validates address (5-500 characters)
- Validates product ID and quantity
- Validates order status transitions

### 3. Admin Notifications
- Sends notification when new order is created
- Sends notification when order status changes
- Sends low-stock alerts when inventory drops below threshold
- All notifications stored in Firestore for audit trail

### 4. Order Status Management
Supported statuses:
- `pending` - Initial state
- `confirmed` - Order approved
- `rejected` - Order cancelled
- `delivered` - Order completed

### 5. Inventory Tracking
- Automatic stock decrement on order creation
- Automatic stock restoration when order deleted
- Low-stock alerts (threshold: 5 units)
- Stock history through order records

## Error Handling

### Validation Errors (400)
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {"field": "quantity", "message": "Quantity must be greater than 0"}
  ]
}
```

### Insufficient Stock (409)
```json
{
  "success": false,
  "error": "Insufficient stock. Available: 2, Requested: 5",
  "code": "INSUFFICIENT_STOCK"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Product not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Failed to create order",
  "message": "Database connection error"
}
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install firebase
```

### 2. Environment Variables
Add to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Indexes
Create these collections in Firestore:
- `products` - with indexes on `stock`, `name`
- `orders` - with indexes on `status`, `createdAt`
- `stockAlerts` - with indexes on `acknowledged`, `createdAt`
- `notifications` - with indexes on `type`, `read`, `createdAt`

### 4. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - readable by all, writable by admin
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
    
    // Orders - readable and writable by all (implement auth in production)
    match /orders/{document=**} {
      allow read, write: if true;
    }
    
    // Stock Alerts - admin only
    match /stockAlerts/{document=**} {
      allow read, write: if request.auth.uid != null;
    }
    
    // Notifications - admin only
    match /notifications/{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

## Testing Examples

### Complete Order Flow
```bash
# 1. Create a product (via Firestore console or API)
# Product ID: prod_demo, Price: $50, Stock: 10

# 2. Create an order
curl -X POST http://localhost:3000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "phone": "+1-555-987-6543",
    "address": "456 Oak Ave, Los Angeles, CA 90001",
    "productId": "prod_demo",
    "quantity": 3
  }'
# Response: {"orderId": "order_xyz789", ...}

# 3. Get all orders
curl http://localhost:3000/api/orders

# 4. Update order to confirmed
curl -X PATCH http://localhost:3000/api/orders/order_xyz789 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'

# 5. Check if stock was decremented
curl http://localhost:3000/api/products

# 6. Check for low stock alerts
curl "http://localhost:3000/api/products?lowStock=true"
```

## Production Considerations

1. **Authentication**: Implement admin authentication for sensitive endpoints
2. **Rate Limiting**: Add rate limiting to prevent abuse
3. **Logging**: Implement comprehensive logging for audit trails
4. **Backup**: Set up Firestore backups
5. **FCM**: Integrate Firebase Cloud Messaging for push notifications
6. **Monitoring**: Set up monitoring and alerting for errors
7. **Payment Integration**: Add payment processing if needed
8. **Email Notifications**: Send confirmation emails to customers

## Future Enhancements

- [ ] Payment processing integration
- [ ] Email notifications for customers
- [ ] SMS alerts
- [ ] Order tracking dashboard
- [ ] Inventory forecasting
- [ ] Bulk order API
- [ ] Order cancellation workflow
- [ ] Return/refund management
