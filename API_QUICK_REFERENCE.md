# API Quick Reference

## 🚀 Endpoints at a Glance

### Orders

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/orders/create` | Create new order with stock transaction |
| GET | `/api/orders` | Get all orders (supports `?status=pending`) |
| PATCH | `/api/orders/:id` | Update order status |

### Products

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | List all products (supports `?lowStock=true`) |
| PATCH | `/api/products/:id` | Update product stock |

---

## 📋 Request/Response Examples

### POST /api/orders/create
**Request:**
```json
{
  "customerName": "John Doe",
  "phone": "+1-555-123-4567",
  "address": "123 Main St, New York, NY 10001",
  "productId": "prod_12345",
  "quantity": 2,
  "notes": "Optional notes"
}
```

**Success (201):**
```json
{
  "success": true,
  "orderId": "order_abc123",
  "message": "Order created successfully",
  "data": {
    "productName": "Product Name",
    "quantity": 2,
    "totalPrice": 99.98,
    "status": "pending"
  }
}
```

**Error - Validation (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {"field": "quantity", "message": "Quantity must be greater than 0"}
  ]
}
```

**Error - Insufficient Stock (409):**
```json
{
  "success": false,
  "error": "Insufficient stock. Available: 2, Requested: 5",
  "code": "INSUFFICIENT_STOCK"
}
```

---

### GET /api/orders?status=pending
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
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

### PATCH /api/orders/:id
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

---

### GET /api/products
**Query Parameters:**
- `lowStock=true` - Get only products below threshold (< 5 units)

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
      "sku": "WMD-001"
    }
  ],
  "count": 1
}
```

---

### PATCH /api/products/:id
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
    "stock": 20
  }
}
```

---

## ✅ Valid Order Statuses
- `pending` - Initial state
- `confirmed` - Order approved
- `rejected` - Order cancelled
- `delivered` - Order completed

---

## 🔍 Input Validation Rules

| Field | Rules |
|-------|-------|
| customerName | 2-100 characters |
| phone | 10-15 characters, digits + `-/() +` |
| address | 5-500 characters |
| productId | Required, non-empty |
| quantity | Integer, 1-1000 |
| status | One of: pending, confirmed, rejected, delivered |

---

## 🛠️ cURL Examples

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Jane Smith",
    "phone": "+1-555-987-6543",
    "address": "456 Oak Ave, Los Angeles, CA 90001",
    "productId": "prod_demo",
    "quantity": 3
  }'
```

### Get Pending Orders
```bash
curl "http://localhost:3000/api/orders?status=pending"
```

### Update Order to Confirmed
```bash
curl -X PATCH http://localhost:3000/api/orders/order_abc123 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Get Low Stock Products
```bash
curl "http://localhost:3000/api/products?lowStock=true"
```

### Update Product Stock
```bash
curl -X PATCH http://localhost:3000/api/products/prod_demo \
  -H "Content-Type: application/json" \
  -d '{"stock": 50}'
```

---

## 📊 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success (GET, PATCH) |
| 201 | Created (POST) |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 409 | Conflict (insufficient stock) |
| 500 | Server Error |

---

## 🔐 Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

## 📚 Full Documentation

See `ORDER_MANAGEMENT_API.md` for complete documentation including:
- Architecture overview
- Database schema
- Setup instructions
- Production considerations
- Testing examples

---

## 🚀 Get Started

1. **Ensure Firebase is configured** (check `.env.local`)
2. **Create a test product** in Firestore:
   ```
   Collection: products
   Document: prod_test
   Data: {name: "Test", price: 50, stock: 10}
   ```
3. **Create an order** using the POST endpoint
4. **Check Firestore** to see the order and updated stock

---

**API Server**: http://localhost:3000
**Status**: ✅ Running
