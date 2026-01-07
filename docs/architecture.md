# 🏗️ Architecture Document

> **Project:** Turen Indah Bangunan - E-Commerce Platform  
> **Version:** 1.0  
> **Date:** 6 Januari 2026  
> **Status:** Draft

---

## 1. System Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│   │   Browser    │    │   Mobile     │    │   Admin      │              │
│   │   (Next.js)  │    │   (PWA)      │    │   Dashboard  │              │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘              │
│          │                   │                   │                       │
└──────────┼───────────────────┼───────────────────┼───────────────────────┘
           │                   │                   │
           └───────────────────┴───────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           APPLICATION LAYER                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐   │
│   │                    Next.js 15 (App Router)                       │   │
│   │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │   │
│   │  │ Server      │ │ API Routes  │ │ Server      │ │ Static     │ │   │
│   │  │ Components  │ │ (/api/*)    │ │ Actions     │ │ Assets     │ │   │
│   │  └─────────────┘ └─────────────┘ └─────────────┘ └────────────┘ │   │
│   └──────────────────────────┬──────────────────────────────────────┘   │
│                              │                                           │
└──────────────────────────────┼───────────────────────────────────────────┘
                               │
           ┌───────────────────┼───────────────────┐
           │                   │                   │
           ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│   Firebase       │ │   Third-Party    │ │   External       │
│   Services       │ │   Services       │ │   APIs           │
├──────────────────┤ ├──────────────────┤ ├──────────────────┤
│ • Firestore      │ │ • Midtrans/Xendit│ │ • RajaOngkir     │
│ • Auth           │ │ • Sanity CMS     │ │ • Deliveree      │
│ • Storage        │ │ • Vercel         │ │ • Google Maps    │
│ • Functions      │ │                  │ │ • WhatsApp API   │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### 1.2 Key Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Mobile-First** | Responsive design prioritizing kontraktor di lapangan |
| **Server-First Rendering** | Next.js 15 Server Components untuk performa |
| **Real-time Data** | Firestore listeners untuk stok dan order status |
| **API-First** | RESTful API routes untuk integrasi third-party |
| **Progressive Enhancement** | PWA support untuk offline capability |

---

## 2. Tech Stack Details

### 2.1 Frontend Stack

```
FRONTEND ARCHITECTURE
│
├── Framework: Next.js 15 (App Router)
│   ├── Server Components (default)
│   ├── Client Components (interaktif)
│   └── Server Actions (mutations)
│
├── Styling: Tailwind CSS 3.4
│   ├── Utility-first approach
│   ├── Custom design tokens
│   └── Dark mode support
│
├── State Management
│   ├── Zustand (client state)
│   ├── React Query (server state)
│   └── URL state (search params)
│
└── UI Components
    ├── Shadcn/ui (base components)
    ├── Lucide Icons
    └── Custom components
```

### 2.2 Backend Stack

```
BACKEND ARCHITECTURE
│
├── Database: Firebase Firestore
│   ├── NoSQL document-based
│   ├── Real-time subscriptions
│   └── Offline persistence
│
├── Authentication: Firebase Auth
│   ├── Email/Password
│   ├── Google OAuth
│   └── Phone OTP (optional)
│
├── Storage: Firebase Storage
│   ├── Product images
│   ├── User uploads
│   └── CDN delivery
│
└── Serverless Functions: Firebase Functions
    ├── Payment webhooks
    ├── Order processing
    └── Scheduled tasks
```

### 2.3 Third-Party Integrations

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| **Midtrans/Xendit** | Payment processing | REST API + Webhooks |
| **RajaOngkir** | Shipping estimation | REST API |
| **Deliveree** | Heavy goods logistics | REST API |
| **Sanity** | CMS untuk konten | SDK + GROQ queries |
| **Google Maps** | Store locations | Maps Embed API |
| **WhatsApp** | Customer communication | Deep links |

---

## 3. Project Structure

```
turen-indah-bangunan/
│
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router
│   │   ├── 📁 (auth)/             # Auth group routes
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   │
│   │   ├── 📁 (main)/             # Main app routes
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── products/          # Product catalog
│   │   │   ├── product/[slug]/    # Product detail
│   │   │   ├── cart/              # Shopping cart
│   │   │   ├── checkout/          # Checkout flow
│   │   │   ├── orders/            # Order history
│   │   │   ├── profile/           # User profile
│   │   │   └── stores/            # Store locations
│   │   │
│   │   ├── 📁 admin/              # Admin dashboard
│   │   │   ├── dashboard/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   └── settings/
│   │   │
│   │   ├── 📁 api/                # API routes
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── payment/
│   │   │   └── shipping/
│   │   │
│   │   ├── layout.tsx             # Root layout
│   │   ├── loading.tsx            # Global loading
│   │   ├── error.tsx              # Error boundary
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── 📁 components/             # Reusable components
│   │   ├── 📁 ui/                 # Base UI (shadcn)
│   │   ├── 📁 layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── sidebar.tsx
│   │   ├── 📁 product/            # Product components
│   │   ├── 📁 cart/               # Cart components
│   │   └── 📁 shared/             # Shared components
│   │
│   ├── 📁 lib/                    # Utilities & configs
│   │   ├── firebase.ts            # Firebase config
│   │   ├── utils.ts               # Helper functions
│   │   └── constants.ts           # App constants
│   │
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-cart.ts
│   │   └── use-products.ts
│   │
│   ├── 📁 stores/                 # Zustand stores
│   │   ├── cart-store.ts
│   │   ├── auth-store.ts
│   │   └── ui-store.ts
│   │
│   ├── 📁 types/                  # TypeScript types
│   │   ├── product.ts
│   │   ├── order.ts
│   │   └── user.ts
│   │
│   └── 📁 schemas/                # Zod validation schemas
│       ├── product-schema.ts
│       ├── order-schema.ts
│       └── user-schema.ts
│
├── 📁 public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── 📁 docs/                       # Documentation
│   ├── discovery.md
│   ├── prd.md
│   ├── architecture.md
│   └── ...
│
├── 📄 next.config.js
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
├── 📄 package.json
└── 📄 .env.local
```

---

## 4. Data Flow

### 4.1 Product Browsing Flow

```
User browses products
        │
        ▼
┌───────────────────┐
│  Next.js Server   │
│  Component        │
└─────────┬─────────┘
          │ fetch products
          ▼
┌───────────────────┐
│  Firestore        │
│  /products        │
└─────────┬─────────┘
          │ return data
          ▼
┌───────────────────┐
│  Server renders   │
│  ProductList      │
└─────────┬─────────┘
          │ HTML + hydration
          ▼
     User sees products
```

### 4.2 Checkout Flow

```
User clicks checkout
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                     CHECKOUT FLOW (3 Steps)                  │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│  STEP 1       │     │  STEP 2       │     │  STEP 3       │
│  Address      │────▶│  Shipping     │────▶│  Payment      │
│               │     │               │     │               │
│ - Select/Add  │     │ - RajaOngkir  │     │ - Midtrans    │
│   address     │     │   API call    │     │   Snap        │
│ - Validate    │     │ - Select      │     │ - Process     │
└───────────────┘     │   courier     │     │   payment     │
                      └───────────────┘     └───────┬───────┘
                                                    │
                                                    ▼
                                            ┌───────────────┐
                                            │  Order        │
                                            │  Created      │
                                            │  in Firestore │
                                            └───────────────┘
```

### 4.3 Real-time Stock Update

```
Admin updates stock
        │
        ▼
┌───────────────────┐
│  Admin Dashboard  │
│  (Client Action)  │
└─────────┬─────────┘
          │ updateDoc()
          ▼
┌───────────────────┐
│  Firestore        │
│  /products/{id}   │
│  stock: newValue  │
└─────────┬─────────┘
          │ onSnapshot listener
          ▼
┌───────────────────┐
│  All connected    │
│  clients update   │
│  UI instantly     │
└───────────────────┘
```

---

## 5. Security Architecture

### 5.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────┘

User login request
        │
        ▼
┌───────────────────┐
│  Firebase Auth    │
│  signInWith...    │
└─────────┬─────────┘
          │ returns JWT token
          ▼
┌───────────────────┐
│  Store token in   │
│  httpOnly cookie  │
└─────────┬─────────┘
          │ all subsequent requests
          ▼
┌───────────────────┐
│  Next.js          │
│  Middleware       │
│  validates token  │
└─────────┬─────────┘
          │ if valid
          ▼
┌───────────────────┐
│  Access granted   │
│  to protected     │
│  routes           │
└───────────────────┘
```

### 5.2 Firestore Security Rules

```javascript
// Simplified security rules structure
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Products - public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Orders - owner or admin only
    match /orders/{orderId} {
      allow read: if isOwner(resource.data.userId) || isAdmin();
      allow create: if isAuthenticated();
      allow update: if isAdmin();
    }
    
    // Users - owner only
    match /users/{userId} {
      allow read, write: if isOwner(userId);
    }
    
    // Helper functions
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

## 6. Performance Optimization

### 6.1 Caching Strategy

| Layer | Strategy | TTL |
|-------|----------|-----|
| **CDN** | Vercel Edge Cache | Static: 1 year, API: varies |
| **Browser** | Service Worker | Static assets |
| **React Query** | staleTime/cacheTime | 5 min / 30 min |
| **Firestore** | Offline persistence | Until sync |

### 6.2 Image Optimization

```
Image Pipeline
│
├── Upload: Firebase Storage
│   └── Automatic CDN delivery
│
├── Optimization: Next.js Image
│   ├── Automatic WebP conversion
│   ├── Responsive srcset
│   └── Lazy loading
│
└── Display: <Image> component
    ├── placeholder="blur"
    ├── priority for above-fold
    └── sizes attribute
```

### 6.3 Code Splitting

| Technique | Implementation |
|-----------|----------------|
| **Route-based** | Next.js automatic per route |
| **Component-based** | `dynamic()` for heavy components |
| **Library-based** | Lazy load third-party (payment modal) |

---

## 7. Deployment Architecture

### 7.1 Environment Strategy

| Environment | Purpose | URL |
|-------------|---------|-----|
| **Development** | Local development | localhost:3000 |
| **Preview** | PR previews | pr-*.vercel.app |
| **Staging** | Pre-production testing | staging.domain.com |
| **Production** | Live site | <www.domain.com> |

### 7.2 CI/CD Pipeline

```
Developer pushes code
        │
        ▼
┌───────────────────┐
│  GitHub Actions   │
│  - Lint           │
│  - Type check     │
│  - Unit tests     │
└─────────┬─────────┘
          │ if pass
          ▼
┌───────────────────┐
│  Vercel           │
│  - Build          │
│  - Deploy         │
│  - Preview URL    │
└─────────┬─────────┘
          │ if main branch
          ▼
┌───────────────────┐
│  Production       │
│  Deployment       │
└───────────────────┘
```

---

## 8. Monitoring & Logging

### 8.1 Tools

| Tool | Purpose |
|------|---------|
| **Vercel Analytics** | Web vitals, traffic |
| **Firebase Analytics** | User behavior |
| **Sentry** | Error tracking |
| **Firestore Logs** | Database operations |

### 8.2 Key Metrics to Monitor

| Category | Metric | Target |
|----------|--------|--------|
| **Performance** | LCP | < 2.5s |
| **Performance** | FID | < 100ms |
| **Performance** | CLS | < 0.1 |
| **Availability** | Uptime | > 99.5% |
| **Business** | Cart abandonment | < 60% |

---

## 9. Reference Documents

- [Discovery Document](./discovery.md)
- [PRD](./prd.md)
- [Database Schema](./database.md) *(upcoming)*
- [API Documentation](./api.md) *(upcoming)*

---

*Document last updated: 6 Januari 2026*
