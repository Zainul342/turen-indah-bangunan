# 🧠 Context Strategy - Turen Indah Bangunan

> **Phase 3.6:** Context Management  
> **Purpose:** Efficient AI token usage during development  
> **Approach:** Focus per Fitur (MVP < 6 weeks)

---

## 1. Why Context Strategy?

As codebase grows, loading all files into AI context is:

- **Expensive:** Token limits exceeded
- **Noisy:** AI hallucinates when context is cluttered
- **Slow:** Response time increases

**Solution:** Load only relevant files per coding task.

---

## 2. Context Profiles

Each profile defines which files to load when working on a specific feature.

### Profile: Authentication

```
📁 Files to Load:
├── src/types/user.ts
├── src/stores/auth-store.ts
├── src/hooks/use-auth.ts
├── src/lib/firebase/auth.ts
├── src/app/(auth)/login/page.tsx
├── src/app/(auth)/register/page.tsx
└── src/app/api/auth/route.ts

📄 Context Docs:
├── docs/security.md (Auth section)
└── docs/database.md (Users collection)
```

---

### Profile: Product Catalog

```
📁 Files to Load:
├── src/types/product.ts
├── src/hooks/use-products.ts
├── src/components/product/product-card.tsx
├── src/components/product/product-grid.tsx
├── src/components/product/product-filter.tsx
├── src/app/(shop)/products/page.tsx
└── src/app/api/products/route.ts

📄 Context Docs:
├── docs/database.md (Products collection)
└── docs/design-system.md (Product Card spec)
```

---

### Profile: Cart & Checkout

```
📁 Files to Load:
├── src/types/order.ts
├── src/stores/cart-store.ts
├── src/stores/checkout-store.ts
├── src/hooks/use-cart.ts
├── src/components/cart/*.tsx
├── src/components/checkout/*.tsx
├── src/app/(shop)/cart/page.tsx
├── src/app/(shop)/checkout/page.tsx
├── src/app/api/orders/route.ts
└── src/lib/api/midtrans.ts

📄 Context Docs:
├── docs/flows/user-flow.md (Checkout section)
├── docs/api.md (Payment & Shipping)
└── docs/database.md (Orders collection)
```

---

### Profile: Admin Dashboard

```
📁 Files to Load:
├── src/app/admin/layout.tsx
├── src/app/admin/page.tsx
├── src/app/admin/products/*.tsx
├── src/app/admin/orders/*.tsx
├── src/components/admin/*.tsx
└── src/app/api/admin/route.ts

📄 Context Docs:
├── docs/flows/admin-flow.md
└── docs/security.md (RBAC section)
```

---

### Profile: Shipping Integration

```
📁 Files to Load:
├── src/lib/api/rajaongkir.ts
├── src/hooks/use-shipping.ts
├── src/components/checkout/shipping-options.tsx
├── src/app/api/shipping/*.ts
└── src/types/shipment.ts

📄 Context Docs:
└── docs/api.md (RajaOngkir section)
```

---

## 3. Memory Management Rules

### When to Reset Context

1. **Switching Profiles:** Clear previous context before loading new profile
2. **After Major Feature Complete:** Reset and re-ground with fresh context
3. **When AI Seems Confused:** If responses are inaccurate, reset

### Context Loading Command

```
# Example prompt to AI:
"Load Profile: Cart & Checkout. 
Files: cart-store.ts, checkout-store.ts, use-cart.ts
Task: Implement quantity update in cart"
```

---

## 4. Memory Types (Future Enhancement)

| Type | Description | Example |
|------|-------------|---------|
| **Declarative** | Facts about project | "TIB uses Firestore, not SQL" |
| **Procedural** | How to do things | "To add a product, use ProductForm component" |
| **Operational** | Current task state | "Currently implementing Step 2: Shipping Selection" |

---

## 5. Context File Templates

### Feature Context Summary Template

```markdown
## Feature: [Feature Name]
**Status:** [In Progress / Complete]
**Dependencies:** [List of related features]

### Key Files
- `path/to/file.ts` - Description

### Business Logic
- Rule 1
- Rule 2

### Edge Cases
- Case 1: How it's handled
```

---

*Last updated: 6 Januari 2026*
