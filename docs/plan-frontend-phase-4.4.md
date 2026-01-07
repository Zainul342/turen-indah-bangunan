# 📅 Phase 4.4 Frontend Development Plan

**Goal:** Build the user-facing interface for "Turen Indah Bangunan" implementing the design system from `docs/frontend.md` and requirements from `docs/prd.md`.

**Strategy:** Mobile-First, Component-Driven (Shadcn UI), and Data-connected (Firebase).

---

## 📦 1. Layout & Shell (Priority: High)

*Building the persistent navigation and structure.*

* **Components:**
  * `DesktopHeader`: Logo, Search (Wide), Desktop Nav, User Actions.
  * `MobileHeader`: Compact Logo, Search Icon/Bar, Notification.
  * `BottomNav`: Fixed bottom bar (Home, Catalog, Cart, Account).
  * `Footer`: SEO links, Store info, Socials.
* **Tech Details:**
  * Use `Next.js Layout` (`layout.tsx`).
  * Responsive visibility (`hidden md:block`).
  * Cart badge functionality (Zustand store connection).

## 🏠 2. Landing Page (Home)

*First impression and sales driver.*

* **Sections:**
  * **Hero Banner:** Carousel/Slider (Promo Toko).
  * **Quick Categories:** Grid of icons (Semen, Cat, Keramik, dll).
  * **Featured Products:** Horizontal scroll list (Mobile) / Grid (Desktop).
  * **Value Proposition:** "Pengiriman Cepat", "Stok Ready", etc.
* **Data:**
  * Fetch featured products from Firestore (or mock initially with crawled data).

## 🛍️ 3. Product Catalog

*Browsing and searching.*

* **Features:**
  * **Filters:** Mobile BottomSheet filter, Desktop Sidebar.
  * **Sort:** Price (Low/High), Newest, Popular.
  * **Product Card:** Optimized with `next/image`, price formatting (IDR), "Add to Cart" button.
  * **Pagination/Infinite Scroll:** React Query `useInfiniteQuery`.
* **Search:**
  * Full-text search implementation (Client-side filtering first or Firestore simple search).

## 📄 4. Product Detail Page (PDP)

*Conversion point.*

* **UI Elements:**
  * **Image Gallery:** Swipeable slider (Mobile) + Thumbnails (Desktop).
  * **Price & Stock:** Clear pricing, "Stok Terbatas" warning.
  * **Variant Selector:** Use Shadcn `ToggleGroup` or `Select` (if applicable).
  * **Sticky Action Bar:** "Beli Sekarang", "Chat WA", "Keranjang" fixed at bottom (Mobile).
* **Logic:**
  * Dynamic metadata (SEO Title/Description).
  * Related products section.

## 🛒 5. Cart & Checkout Flow

*The money maker.*

* **Cart Page:**
  * List items, quantity adjuster, delete action.
  * Price summary calculator.
* **Checkout (3 Steps):**
    1. **Shipping:** Address selection + RajaOngkir cost estimation.
    2. **Payment:** Summary + Midtrans Snap integration.
    3. **Finish:** Success page + Order Tracking ID.

## 👤 6. User Profile (Customer)

*Retention.*

* **Pages:**
  * **Dashboard:** Recent orders, status summary.
  * **Order History:** List of past transactions + Detail view.
  * **Settings:** Manage addresses, profile edit.

---

## 🛠️ Execution Order

1. **Layouts** (Header, Footer, Bottom Nav) ✅ *Ready to Start*
2. **Landing Page**
3. **Product Catalog**
4. **Product Detail**
5. **Cart & Checkout**
6. **User Profile**
