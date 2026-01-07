# 📅 Phase 4.4 Frontend Development Plan

**Goal:** Build the user-facing interface for "Turen Indah Bangunan" implementing the design system from `docs/frontend.md` and requirements from `docs/prd.md`.

**Strategy:** Mobile-First, Component-Driven (Shadcn UI), Data-connected (Firebase), and **Outdoor-Ready (High Contrast)**.

---

## 📦 1. Layout & Shell (Priority: High)

*Building the persistent navigation and structure.*

* **Components:**
  * `DesktopHeader`: Logo, Search (Wide), Desktop Nav, User Actions.
  * **Style:** Solid Background (White/Slate-50) for high readability. No Glassmorphism.
  * `MobileHeader`: Compact Logo, Search Icon/Bar, Notification.
  * `BottomNav`: Fixed bottom bar (Home, Catalog, Cart, Account).
    * **Must Have:** Reactive Cart Badge.
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
  * **Pagination:** **Load More Button** (Traditional). Avoid Infinite Scroll to keep Footer accessible.
* **Search:**
  * **Server-side:** Firestore Basic Query (`>=` 'Term' AND `<=` 'Term\uf8ff'). Efficient and cost-effective for MVP.

## 📄 4. Product Detail Page (PDP)

*Conversion point.*

* **UI Elements:**
  * **Image Gallery:** Swipeable slider (Mobile) + Thumbnails (Desktop).
  * **Price & Stock:** Clear pricing, "Stok Terbatas" warning.
  * **Variant Selector:** Use Shadcn `ToggleGroup` or `Select` (if applicable).
  * **Quantity Logic:** **Typeable Input** with Quick Presets (+10, +50, Sak, Dus).
  * **Sticky Action Bar:** "Beli Sekarang", "Chat WA", "Keranjang" fixed at bottom (Mobile).
* **Logic:**
  * Dynamic metadata (SEO Title/Description).
  * Related products section.

## 🛒 5. Cart & Checkout Flow

*The money maker.*

* **Cart Page:**
  * List items, Typeable quantity adjuster, delete action.
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
6. **User Profile
