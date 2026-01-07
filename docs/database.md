# 🗄️ Database Schema (Firestore)

> **Project:** Turen Indah Bangunan - E-Commerce Platform  
> **Database:** Firebase Firestore (NoSQL)  
> **Date:** 6 Januari 2026

---

## 1. Overview

### 1.1 Database Type

Firebase Firestore adalah NoSQL document database dengan karakteristik:

- **Document-based**: Data disimpan sebagai dokumen dalam collections
- **Real-time**: Mendukung listeners untuk update otomatis
- **Scalable**: Auto-scaling tanpa konfigurasi manual
- **Offline**: Persistence untuk mobile/PWA

### 1.2 Collections Overview

```
firestore/
├── users/              # User accounts & profiles
├── products/           # Product catalog
├── categories/         # Product categories
├── orders/             # Customer orders
├── carts/              # Shopping carts
├── reviews/            # Product reviews
├── stores/             # Store locations
└── settings/           # App configurations
```

---

## 2. Collection Schemas

### 2.1 Users Collection

**Path:** `/users/{userId}`

```typescript
interface User {
  // Identity
  id: string;                    // Firebase Auth UID
  email: string;
  phone?: string;
  displayName: string;
  photoURL?: string;
  
  // Role
  role: 'customer' | 'admin' | 'b2b';
  
  // Profile
  addresses: Address[];
  defaultAddressIndex: number;
  
  // B2B specific
  companyName?: string;
  npwp?: string;
  creditLimit?: number;
  creditUsed?: number;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt: Timestamp;
}

interface Address {
  id: string;
  label: string;              // "Rumah", "Kantor", etc.
  recipientName: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  fullAddress: string;
  isDefault: boolean;
}
```

**Indexes:**

- `email` (unique)
- `phone` (unique, sparse)
- `role` + `createdAt`

---

### 2.2 Products Collection

**Path:** `/products/{productId}`

```typescript
interface Product {
  // Identity
  id: string;
  slug: string;                 // URL-friendly name
  sku: string;                  // Stock Keeping Unit
  
  // Basic Info
  name: string;
  description: string;
  shortDescription?: string;
  
  // Categorization
  categoryId: string;
  categoryPath: string[];       // ["bahan-bangunan", "semen"]
  tags: string[];
  brand?: string;
  
  // Pricing
  price: number;
  compareAtPrice?: number;      // Original price for discounts
  discountPercent?: number;
  
  // B2B Pricing (tiered)
  priceTiers?: PriceTier[];
  
  // Inventory
  stock: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  lowStockThreshold: number;
  trackInventory: boolean;
  
  // Media
  images: ProductImage[];
  thumbnail: string;
  
  // Specifications
  specifications: Specification[];
  weight: number;               // in grams
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  unit: string;                 // "pcs", "kg", "m³", etc.
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  // Status
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Stats (denormalized for performance)
  reviewCount: number;
  averageRating: number;
  totalSold: number;
}

interface PriceTier {
  minQty: number;
  price: number;
}

interface ProductImage {
  url: string;
  alt: string;
  order: number;
}

interface Specification {
  name: string;
  value: string;
}
```

**Indexes:**

- `slug` (unique)
- `sku` (unique)
- `categoryId` + `status`
- `status` + `createdAt`
- `featured` + `status`
- `tags` (array-contains)

---

### 2.3 Categories Collection

**Path:** `/categories/{categoryId}`

```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  
  // Hierarchy
  parentId?: string;
  level: number;                // 0 = root, 1 = child, etc.
  path: string[];               // ["root-id", "parent-id"]
  
  // Display
  image?: string;
  icon?: string;
  order: number;
  
  // Status
  isActive: boolean;
  
  // Stats
  productCount: number;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Categories dari Website Asli:**

1. Aneka Semen
2. Bata Ringan
3. Builder Hardwares
4. Keramik
5. Kran
6. Plumbing & Sanitary
7. Flash

---

### 2.4 Orders Collection

**Path:** `/orders/{orderId}`

```typescript
interface Order {
  // Identity
  id: string;
  orderNumber: string;          // TIB-20260106-001
  
  // Customer
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  
  // Items
  items: OrderItem[];
  itemCount: number;
  
  // Pricing
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  
  // Shipping
  shippingAddress: Address;
  shippingMethod: string;
  shippingProvider?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  
  // Payment
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentId?: string;           // From Midtrans/Xendit
  paidAt?: Timestamp;
  
  // Order Status
  status: OrderStatus;
  statusHistory: StatusHistory[];
  
  // Notes
  customerNotes?: string;
  adminNotes?: string;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

type OrderStatus = 
  | 'pending_payment'
  | 'processing'
  | 'confirmed'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded';

interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface StatusHistory {
  status: OrderStatus;
  note?: string;
  timestamp: Timestamp;
  updatedBy: string;
}
```

**Indexes:**

- `userId` + `createdAt`
- `orderNumber` (unique)
- `status` + `createdAt`
- `paymentStatus` + `createdAt`

---

### 2.5 Carts Collection

**Path:** `/carts/{userId}`

```typescript
interface Cart {
  userId: string;
  items: CartItem[];
  
  // Calculated (updated on change)
  itemCount: number;
  subtotal: number;
  
  // Metadata
  updatedAt: Timestamp;
}

interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  addedAt: Timestamp;
}
```

**Note:** Cart menggunakan userId sebagai document ID untuk easy access.

---

### 2.6 Reviews Collection

**Path:** `/reviews/{reviewId}`

```typescript
interface Review {
  id: string;
  
  // References
  productId: string;
  userId: string;
  orderId?: string;             // Optional order reference
  
  // Review Content
  rating: number;               // 1-5
  title?: string;
  content: string;
  images?: string[];
  
  // User Info (denormalized)
  userName: string;
  userAvatar?: string;
  
  // Status
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Indexes:**

- `productId` + `createdAt`
- `productId` + `rating`
- `userId` + `createdAt`
- `isApproved` + `createdAt`

---

### 2.7 Stores Collection

**Path:** `/stores/{storeId}`

```typescript
interface Store {
  id: string;
  code: string;                 // "TIB-TUREN", "JR-1"
  name: string;
  brand: 'TIB' | 'JAYA_RAYA';
  
  // Location
  address: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  
  // Maps
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  
  // Contact
  phone: string;
  whatsapp: string;
  
  // Hours
  operatingHours: {
    weekday: string;            // "08:00 - 17:00"
    weekend: string;
  };
  
  // Status
  isActive: boolean;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Stores dari Website Asli:**

- 20+ TIB locations (Turen, Bululawang, Sawojajar, etc.)
- 5 Jaya Raya locations

---

### 2.8 Settings Collection

**Path:** `/settings/{settingId}`

```typescript
// App Settings
interface AppSettings {
  id: 'app';
  siteName: string;
  logo: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
}

// Shipping Settings
interface ShippingSettings {
  id: 'shipping';
  providers: ShippingProvider[];
  freeShippingThreshold?: number;
}

// Payment Settings
interface PaymentSettings {
  id: 'payment';
  methods: PaymentMethod[];
  midtransConfig?: {
    isProduction: boolean;
    clientKey: string;
  };
}
```

---

## 3. Data Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                    DATA RELATIONSHIPS                        │
└─────────────────────────────────────────────────────────────┘

users ─────────┬──────────────────────────────────────────────
               │ 1:N
               ▼
          ┌─────────┐        ┌─────────┐
          │  orders │◄───────│  carts  │
          └────┬────┘        └─────────┘
               │ contains
               ▼
          ┌─────────┐
          │products │◄───────┐
          └────┬────┘        │ belongs to
               │             │
               ▼             │
          ┌──────────┐  ┌─────────┐
          │categories│  │ reviews │
          └──────────┘  └─────────┘
```

---

## 4. Denormalization Strategy

Untuk optimasi read performance, beberapa data di-denormalize:

| Source | Denormalized To | Fields |
|--------|-----------------|--------|
| Product | Order.items | name, image, price |
| Product | Cart.items | name, image, price |
| User | Review | userName, userAvatar |
| Product | Category | productCount |

**Trade-off:**

- ✅ Faster reads (no joins needed)
- ⚠️ Need to update multiple places on change

---

## 5. Security Rules Summary

```
Collection     | Read          | Create        | Update        | Delete
---------------|---------------|---------------|---------------|--------
users          | owner         | auth          | owner         | ❌
products       | public        | admin         | admin         | admin
categories     | public        | admin         | admin         | admin
orders         | owner/admin   | auth          | admin         | ❌
carts          | owner         | owner         | owner         | owner
reviews        | public        | auth+verified | owner         | admin
stores         | public        | admin         | admin         | admin
settings       | public        | admin         | admin         | ❌
```

---

## 6. Indexes Required

Firebase Firestore memerlukan composite indexes untuk query kompleks:

```
// products
(categoryId, status, createdAt)
(status, featured, createdAt)
(tags, status)

// orders
(userId, createdAt DESC)
(status, createdAt DESC)

// reviews
(productId, isApproved, createdAt DESC)
(productId, rating DESC)
```

---

## 7. Reference Documents

- [Discovery Document](./discovery.md)
- [PRD](./prd.md)
- [Architecture](./architecture.md)

---

*Document last updated: 6 Januari 2026*
