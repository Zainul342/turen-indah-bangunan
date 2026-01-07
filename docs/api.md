# 🔌 API Documentation

> **Project:** Turen Indah Bangunan - E-Commerce Platform  
> **Version:** 1.0  
> **Date:** 6 Januari 2026  
> **Base URL:** `https://api.turenindahbangunan.com` (production)

---

## 1. Overview

### 1.1 API Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      API ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────┘

Client Request
     │
     ▼
┌──────────────────┐
│  Next.js API     │
│  Routes          │
│  /api/*          │
└────────┬─────────┘
         │
    ┌────┴────┬──────────────┬──────────────┐
    │         │              │              │
    ▼         ▼              ▼              ▼
┌───────┐ ┌───────┐    ┌──────────┐  ┌──────────┐
│Firebase│ │Midtrans│   │RajaOngkir│  │WhatsApp  │
│Firestore│ │Snap   │   │V2 API    │  │Deep Link │
└───────┘ └───────┘    └──────────┘  └──────────┘
```

### 1.2 Authentication

| Type | Method | Usage |
|------|--------|-------|
| **User Auth** | Firebase Auth JWT | Protected user endpoints |
| **Admin Auth** | Firebase Auth JWT + Role check | Admin endpoints |
| **Midtrans** | Basic Auth (Server Key) | Payment endpoints |
| **RajaOngkir** | API Key Header | Shipping endpoints |

---

## 2. Internal API Routes (Next.js)

### 2.1 Authentication Routes

#### `POST /api/auth/register`

Register new user account.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "displayName": "John Doe",
  "phone": "081234567890"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "uid": "abc123",
    "email": "user@example.com",
    "displayName": "John Doe"
  }
}
```

---

#### `POST /api/auth/login`

Login with email/password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "uid": "abc123",
    "email": "user@example.com",
    "token": "eyJhbGciOiJSUzI1NiIs..."
  }
}
```

---

### 2.2 Product Routes

#### `GET /api/products`

Get paginated product list.

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | number | 1 | Page number |
| `limit` | number | 20 | Items per page |
| `category` | string | - | Filter by category slug |
| `search` | string | - | Search query |
| `sort` | string | "newest" | Sort: newest, price_asc, price_desc |

**Response (200):**

```json
{
  "success": true,
  "data": {
    "products": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

#### `GET /api/products/[slug]`

Get single product detail.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "prod_123",
    "slug": "semen-gresik-40kg",
    "name": "Semen Gresik 40Kg",
    "price": 65000,
    "stock": 150,
    "stockStatus": "in_stock",
    "images": [...],
    "specifications": [...],
    "category": {...}
  }
}
```

---

### 2.3 Cart Routes

#### `GET /api/cart`

Get current user's cart.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": "prod_123",
        "productName": "Semen Gresik 40Kg",
        "price": 65000,
        "quantity": 10,
        "subtotal": 650000
      }
    ],
    "itemCount": 10,
    "subtotal": 650000
  }
}
```

---

#### `POST /api/cart/add`

Add item to cart.

**Request:**

```json
{
  "productId": "prod_123",
  "quantity": 5
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Item added to cart"
}
```

---

#### `PUT /api/cart/update`

Update cart item quantity.

**Request:**

```json
{
  "productId": "prod_123",
  "quantity": 10
}
```

---

#### `DELETE /api/cart/remove`

Remove item from cart.

**Request:**

```json
{
  "productId": "prod_123"
}
```

---

### 2.4 Order Routes

#### `POST /api/orders`

Create new order.

**Request:**

```json
{
  "shippingAddressId": "addr_123",
  "shippingMethod": "jne_reg",
  "shippingCost": 50000,
  "paymentMethod": "bank_transfer",
  "customerNotes": "Tolong kirim pagi"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "orderId": "order_123",
    "orderNumber": "TIB-20260106-001",
    "total": 700000,
    "paymentToken": "snap_token_here"
  }
}
```

---

#### `GET /api/orders`

Get user's order history.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order_123",
        "orderNumber": "TIB-20260106-001",
        "status": "processing",
        "total": 700000,
        "createdAt": "2026-01-06T10:00:00Z"
      }
    ]
  }
}
```

---

#### `GET /api/orders/[orderId]`

Get single order detail.

---

## 3. Third-Party API Integrations

### 3.1 Midtrans Snap API (Payment)

> **Source:** Midtrans Documentation 2025

#### Endpoints

| Environment | Base URL |
|-------------|----------|
| **Sandbox** | `https://app.sandbox.midtrans.com/snap/v1` |
| **Production** | `https://app.midtrans.com/snap/v1` |

#### Authentication

```
Authorization: Basic Base64(ServerKey + ":")
Content-Type: application/json
```

#### Create Transaction Token

**Endpoint:** `POST /transactions`

**Request:**

```json
{
  "transaction_details": {
    "order_id": "TIB-20260106-001",
    "gross_amount": 700000
  },
  "item_details": [
    {
      "id": "prod_123",
      "name": "Semen Gresik 40Kg",
      "price": 65000,
      "quantity": 10
    },
    {
      "id": "shipping",
      "name": "JNE Regular",
      "price": 50000,
      "quantity": 1
    }
  ],
  "customer_details": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "081234567890"
  },
  "callbacks": {
    "finish": "https://turenindahbangunan.com/orders/success"
  }
}
```

**Response:**

```json
{
  "token": "66e4fa55-fdac-4ef9-91b5-733b97d1b862",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v2/..."
}
```

#### Frontend Integration

```html
<!-- Include Snap.js -->
<script 
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key="YOUR_CLIENT_KEY">
</script>

<script>
snap.pay('transaction_token', {
  onSuccess: function(result) {
    // Payment success
  },
  onPending: function(result) {
    // Payment pending
  },
  onError: function(result) {
    // Payment failed
  },
  onClose: function() {
    // User closed popup
  }
});
</script>
```

#### Webhook Notification

**Endpoint:** `POST /api/payment/webhook`

**Payload from Midtrans:**

```json
{
  "transaction_status": "settlement",
  "order_id": "TIB-20260106-001",
  "payment_type": "bank_transfer",
  "gross_amount": "700000.00",
  "signature_key": "..."
}
```

**Transaction Status Values:**

- `pending` - Waiting for payment
- `settlement` - Payment successful
- `expire` - Payment expired
- `cancel` - Payment cancelled
- `deny` - Payment denied

---

### 3.2 RajaOngkir API V2 (Shipping)

> **Source:** RajaOngkir/Komerce Documentation 2025

#### Endpoints

| Environment | Base URL |
|-------------|----------|
| **V2 API** | `https://rajaongkir.komerce.id/api/v1` |

#### Authentication

```
key: YOUR_API_KEY
Content-Type: application/json
```

#### Search Destination

**Endpoint:** `GET /destination/domestic-destination`

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | City/district name |
| `limit` | number | Results limit |

**Response:**

```json
{
  "status": true,
  "data": [
    {
      "id": "12345",
      "label": "Malang, Jawa Timur",
      "province": "Jawa Timur",
      "city": "Malang",
      "district": "Lowokwaru",
      "subdistrict": "Mojolangu",
      "postal_code": "65142"
    }
  ]
}
```

#### Calculate Shipping Cost

**Endpoint:** `POST /calculate/domestic-cost`

**Request:**

```json
{
  "origin": "12345",
  "destination": "67890",
  "weight": 40000,
  "courier": "jne:jnt:sicepat"
}
```

**Response:**

```json
{
  "status": true,
  "data": [
    {
      "courier": "JNE",
      "services": [
        {
          "service": "REG",
          "description": "Reguler",
          "cost": 50000,
          "etd": "2-3 hari"
        },
        {
          "service": "YES",
          "description": "Yakin Esok Sampai",
          "cost": 85000,
          "etd": "1 hari"
        }
      ]
    }
  ]
}
```

#### Track Waybill

**Endpoint:** `GET /track/waybill`

**Query Parameters:**

| Param | Type | Description |
|-------|------|-------------|
| `awb` | string | Tracking number |
| `courier` | string | Courier code (jne, jnt, etc.) |

**Response:**

```json
{
  "status": true,
  "data": {
    "summary": {
      "awb": "1234567890",
      "courier": "JNE",
      "status": "DELIVERED",
      "receiver": "JOHN DOE"
    },
    "history": [
      {
        "date": "2026-01-08 14:30",
        "description": "DELIVERED TO [JOHN DOE]",
        "location": "MALANG"
      }
    ]
  }
}
```

#### Supported Couriers

| Code | Courier Name |
|------|-------------|
| `jne` | JNE Express |
| `jnt` | J&T Express |
| `sicepat` | SiCepat |
| `anteraja` | AnterAja |
| `ninja` | Ninja Xpress |
| `pos` | POS Indonesia |

---

### 3.3 WhatsApp Integration

WhatsApp menggunakan deep links, bukan REST API.

#### Chat Link Format

```
https://wa.me/{phone}?text={encoded_message}
```

#### Implementation

```typescript
// Helper function
function getWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

// Usage
const link = getWhatsAppLink(
  '6281252462983',
  'Halo Turen Indah Bangunan, saya ingin bertanya tentang produk Semen Gresik 40Kg'
);
```

#### Pre-defined Messages

| Context | Message Template |
|---------|-----------------|
| General inquiry | "Halo Turen Indah Bangunan, saya ingin bertanya tentang produk Anda" |
| Product inquiry | "Halo, saya tertarik dengan {productName}. Apakah stok tersedia?" |
| Order inquiry | "Halo, saya ingin menanyakan status pesanan {orderNumber}" |

---

## 4. Error Handling

### 4.1 Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

### 4.2 Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing/invalid auth token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource conflict (duplicate) |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 5. Rate Limiting

| Endpoint Type | Limit |
|--------------|-------|
| Public (products, categories) | 100 req/min |
| Authenticated (cart, orders) | 60 req/min |
| Payment webhooks | Unlimited |
| RajaOngkir (Starter) | 100 req/day |

---

## 6. Environment Variables

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_ADMIN_PRIVATE_KEY=

# Midtrans
MIDTRANS_SERVER_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=
MIDTRANS_IS_PRODUCTION=false

# RajaOngkir
RAJAONGKIR_API_KEY=

# App
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=6281252462983
```

---

## 7. Reference Documents

- [Midtrans Snap Documentation](https://docs.midtrans.com/en/snap/integration-guide)
- [RajaOngkir API V2](https://rajaongkir.com/dokumentasi)
- [Firebase REST API](https://firebase.google.com/docs/reference/rest)

---

*Document last updated: 6 Januari 2026*
