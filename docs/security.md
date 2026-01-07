# 🔒 Security Policy

> **Project:** Turen Indah Bangunan - E-Commerce Platform  
> **Auth Model:** Hybrid (Guest Checkout + Optional Login)  
> **Date:** 6 Januari 2026

---

## 1. Authentication Model

### 1.1 Hybrid Approach

| User Type | Login Required? | Access Level |
|-----------|-----------------|--------------|
| **Guest** | ❌ Tidak | Lihat produk, add to cart, checkout |
| **Customer** | ✅ Opsional | + Order history, saved address, wishlist |
| **Admin** | ✅ Wajib | Full access (CRUD produk, orders, users) |

### 1.2 Guest Flow

```
Guest → Browse → Add to Cart → Checkout
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │ Isi: Nama, Email,     │
                        │ Phone, Alamat         │
                        └───────────┬───────────┘
                                    │
                                    ▼
                              Payment → Done
                                    │
                                    ▼
                        ┌───────────────────────┐
                        │ "Buat akun untuk      │
                        │ tracking pesanan?"    │
                        │ [Ya] [Nanti]          │
                        └───────────────────────┘
```

### 1.3 Registered User Flow

```
Login → Browse → Add to Cart → Checkout
                                   │
                                   ▼
                       ┌───────────────────────┐
                       │ Pilih alamat tersimpan│
                       │ atau tambah baru      │
                       └───────────┬───────────┘
                                   │
                                   ▼
                             Payment → Done
                                   │
                                   ▼
                       Order tersimpan di /orders
```

---

## 2. Role-Based Access Control (RBAC)

### 2.1 Role Definitions

| Role | Description |
|------|-------------|
| `guest` | Tidak login, anonymous session |
| `customer` | User terdaftar (email verified) |
| `admin` | Staff TIB dengan akses penuh |

### 2.2 Permission Matrix

| Resource | Guest | Customer | Admin |
|----------|-------|----------|-------|
| **Products** | Read | Read | Full |
| **Categories** | Read | Read | Full |
| **Stores** | Read | Read | Full |
| **Cart** | Own (local) | Own (synced) | - |
| **Orders** | Create | Own | Full |
| **Users** | - | Own | Full |
| **Reviews** | Read | Create/Own | Full |
| **Settings** | - | - | Full |

---

## 3. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // ========== PUBLIC DATA ==========
    
    // Products - public read
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Categories - public read
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Stores - public read
    match /stores/{storeId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Reviews - public read, auth create
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update, delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // ========== PROTECTED DATA ==========
    
    // Users - owner only
    match /users/{userId} {
      allow read, update: if isOwner(userId);
      allow create: if isAuthenticated() && request.auth.uid == userId;
      allow delete: if isAdmin();
    }
    
    // Carts - owner only (synced cart for logged in users)
    match /carts/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // Orders - complex rules
    match /orders/{orderId} {
      // Guest order: validate with email + orderId combo (via API only)
      // Customer: can read own orders
      allow read: if isOwner(resource.data.userId) || isAdmin();
      
      // Create: anyone can create (guest checkout)
      allow create: if true;
      
      // Update: admin only (status changes)
      allow update: if isAdmin();
      
      // Delete: never
      allow delete: if false;
    }
    
    // Settings - admin only
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // ========== HELPER FUNCTIONS ==========
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

---

## 4. API Security

### 4.1 Authentication Headers

| Endpoint Type | Auth Required | Header |
|---------------|---------------|--------|
| Public (products, stores) | ❌ | - |
| Guest Checkout | ❌ | - |
| User-specific (cart, orders) | ✅ | `Authorization: Bearer <token>` |
| Admin | ✅ | `Authorization: Bearer <token>` + role check |

### 4.2 Input Validation

Semua input user harus divalidasi dengan **Zod Schema**:

```typescript
// Example: Order creation
const createOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive().max(100),
  })).min(1),
  shippingAddress: addressSchema,
  customerEmail: z.string().email(),
  customerPhone: z.string().regex(/^08\d{9,11}$/),
});
```

### 4.3 Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `POST /api/orders` | 5 | per minute per IP |
| `POST /api/auth/*` | 10 | per minute per IP |
| `GET /api/products` | 100 | per minute per IP |

---

## 5. Payment Security

### 5.1 Midtrans Webhook Validation

```typescript
// Validate webhook signature
function validateMidtransSignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  serverKey: string,
  signatureKey: string
): boolean {
  const hash = crypto
    .createHash('sha512')
    .update(`${orderId}${statusCode}${grossAmount}${serverKey}`)
    .digest('hex');
  
  return hash === signatureKey;
}
```

### 5.2 Price Validation

**PENTING:** Jangan percaya harga dari client!

```typescript
// Backend: Recalculate total from DB
async function calculateOrderTotal(items: CartItem[]) {
  let total = 0;
  
  for (const item of items) {
    const product = await getProduct(item.productId);
    if (!product) throw new Error('Product not found');
    
    // Use price from database, NOT from client
    total += product.price * item.quantity;
  }
  
  return total;
}
```

---

## 6. Data Privacy

### 6.1 Data yang Disimpan

| Data | Tujuan | Retensi |
|------|--------|---------|
| Email | Notifikasi order | Sampai delete akun |
| Phone | Konfirmasi order (WA) | Sampai delete akun |
| Alamat | Pengiriman | Sampai delete akun |
| Order History | Tracking | 5 tahun (legal) |

### 6.2 Data yang TIDAK Disimpan

- ❌ Password plain text (Firebase Auth handles hashing)
- ❌ Full credit card number (Payment gateway handles)
- ❌ IP Address (hanya untuk rate limiting, tidak disimpan)

---

## 7. Environment Variables Security

```env
# NEVER commit these to Git!
# Always use .env.local (gitignored)

# Firebase Admin (Server-side only)
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Midtrans Server Key (Server-side only)  
MIDTRANS_SERVER_KEY="SB-Mid-server-xxx"

# RajaOngkir (Server-side only)
RAJAONGKIR_API_KEY="xxx"
```

**.gitignore:**

```
.env
.env.local
.env.*.local
```

---

## 8. Security Checklist (Pre-Launch)

- [ ] Firestore rules deployed & tested
- [ ] Environment variables set in Vercel
- [ ] HTTPS enforced (Vercel default)
- [ ] Midtrans production keys configured
- [ ] Rate limiting enabled
- [ ] Input validation on all forms
- [ ] Admin account secured (strong password)
- [ ] Backup strategy configured

---

## 9. Reference Documents

- [Architecture](./architecture.md)
- [Database Schema](./database.md)
- [API Documentation](./api.md)

---

*Document last updated: 6 Januari 2026*
