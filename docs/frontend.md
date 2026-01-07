# 🎨 Frontend Guidelines (UI/UX)

> **Project:** Turen Indah Bangunan - E-Commerce Platform  
> **Style Ref:** Modern Dribbble Style (Clean, Rounded, Subtle Shadows)  
> **Brand Color:** TIB Red (Proposed: `#D32F2F`)  
> **Date:** 6 Januari 2026

---

## 1. Design Philosophy

### 1.1 Core Principles

1. **Trust & Professionalism**
    * Tampilan bersih (clean look) untuk membangun kepercayaan.
    * Hindari clutter, fokus pada produk dan informasi penting.
    * Konsistensi visual di seluruh platform.

2. **Mobile-First for Contractors**
    * Desain dioptimalkan untuk akses via HP di lapangan proyek.
    * Tombol besar (touch-friendly), font terbaca jelas.
    * Navigasi mudah dengan satu tangan (Bottom Navigation).

3. **Modern Aesthetic ("Dribbble Style")**
    * **Rounded Corners:** `rounded-xl` atau `rounded-2xl` untuk container/cards.
    * **Subtle Shadows:** Shadow yang eklusif, bukan flat total, tapi tidak harsh.
    * **Whitespace:** Ruang kosong yang cukup agar tidak sumpek.
    * **High Contrast:** Warna solid dan teks kontras tinggi untuk keterbacaan di outdoor (sinar matahari langsung).
    * **Solid Surfaces:** Hindari glassmorphism/blur effect yang berat. Gunakan background putih bersih atau abu-abu solid (`bg-white` / `bg-slate-50`).

---

## 2. Design Tokens

### 2.1 Color Palette

Mengambil inspirasi logo (Merah) dan style modern.

**Primary (Brand)**

* `primary`: `#D32F2F` (Merah TIB) - *Action buttons, Price, Active states*
* `primary-foreground`: `#FFFFFF`

**Secondary**

* `secondary`: `#EFF2F5` (Light Gray/Blueish) - *Background accents*
* `secondary-foreground`: `#1E293B`

**Neutral (Slate)**

* `background`: `#FFFFFF`
* `foreground`: `#0F172A` (Slate 900)
* `muted`: `#F1F5F9` (Slate 100)
* `muted-foreground`: `#64748B` (Slate 500) - *Secondary text*
* `border`: `#E2E8F0` (Slate 200)

**Semantic**

* `success`: `#10B981` (Emerald) - *Stock Ready, Success*
* `warning`: `#F59E0B` (Amber) - *Low Stock, Pending*
* `destructive`: `#EF4444` (Red) - *Habis, Error, Delete*

### 2.2 Typography

Font family modern, mudah dibaca.

* **Font Family:** `Inter` atau `Geist Sans` (Google Fonts).
* **Scale:**
  * `h1`: 32px / Bold (Page Titles)
  * `h2`: 24px / Semibold (Section Headers)
  * `h3`: 20px / Semibold (Card Titles)
  * `body`: 16px / Regular (Content)
  * `small`: 14px / Medium (Meta data, captions)
  * `tiny`: 12px / Regular (Labels)

### 2.3 Spacing & Radius

* **Radius:**
  * `rounded-lg` (0.5rem) - *Inputs, Buttons*
  * `rounded-xl` (0.75rem) - *Cards*
  * `rounded-2xl` (1rem) - *Modals, Sheets*
* **Spacing:**
  * System 4px grid (Tailwind defaults: `p-4`, `m-2`, etc.)
  * Section spacing: `py-8` (mobile), `py-16` (desktop)

---

## 3. Component Library (Shadcn/ui + Custom)

### 3.1 Buttons (`components/ui/button.tsx`)

* **Variant Default (Primary):** Solid Red, White Text, `rounded-full` or `rounded-lg`.
  * Wait, Dribbble style often uses `rounded-full` for CTAs. Let's stick to `rounded-lg` for consistency with construction vibe (sturdy).
* **Variant Outline:** White bg, Border Red, Red Text.
* **Variant Ghost:** No bg, Slate Text, Hover Gray.

### 3.2 Product Card (`components/product/product-card.tsx`)

* **Structure:**
    1. **Image:** Aspect Ratio 1:1, `rounded-t-xl`, `bg-gray-100` placeholder.
    2. **Badge:** "Stok Habis" / "Promo" di pojok kiri atas.
    3. **Content:**
        * Category (Small, Muted)
        * Title (Line clamp 2, Semibold)
        * Price (Bold, Primary Color)
        * Original Price (Strikethrough, Small, Muted) if discount.
    4. **Footer:** "Tambah" button (Icon cart) atau "Quick View".
* **Style:** White bg, `border border-slate-100`, `shadow-sm hover:shadow-md`, `transition-all`.

### 3.3 Navigation

* **Mobile Bottom Nav (`components/layout/bottom-nav.tsx`):**
  * Fixed bottom.
  * Items: Home, Katalog, Cart, Transaksi, Akun.
  * Active state: Icon filled + Primary color.
* **Desktop Navbar (`components/layout/desktop-nav.tsx`):**
  * Sticky top.
  * Logo kiri, Search bar tengah (lebar), Utility icons kanan (Cart, Notif, Profile).
  * Mega menu untuk Kategori.

### 3.4 Forms (`components/ui/form.tsx`)

* **Input:** `border-slate-200`, `focus:ring-primary`, `rounded-lg`.
* **Label:** `text-sm font-medium text-slate-700`.
* **Error:** `text-xs text-destructive`.

---

## 4. Layout Patterns

### 4.1 Homepage

* **Hero Section:** Carousel Banner (rounded corners), aspect ratio 21:9 (desktop) / 4:3 (mobile).
* **Quick Categories:** Grid icon/logos kategori (Semen, Cat, Keramik).
* **Featured Products:** Horizontal scroll (mobile) / Grid (desktop).
* **USP Section:** 3-4 kolom benefit (Pengiriman Cepat, Stok Real-time, dll).

### 4.2 Product Detail Page (PDP)

* **Image Gallery:** Main image slider + thumbnail list.
* **Info Section:**
  * Harga (Besar)
  * Stock Indicator (Bar meter: Hijau = Banyak, Kuning = Sedikit, Merah = Habis).
  * Quantity Selector (- 1 +).
  * Action Buttons (Beli Langsung / Masuk Keranjang) - **Sticky on Mobile**.
* **Tabs:** Deskripsi, Spesifikasi (Table), Review.

### 4.3 Checkout Flow

* **Clean & Focused:** Hapus header/footer standard, ganti dengan "Back" dan "Secure Checkout".
* **Steps:** Tracker (Pengiriman > Pembayaran > Selesai).
* **Summary:** Sticky sidebar (desktop) atau Bottom sheet summary (mobile).

---

## 5. Assets & Icons

* **Icons:** Lucide React (`lucide-react`).
  * Style: Stroke 1.5px or 2px, Rounded caps.
* **Images:**
  * Product images: WebP optimized.
  * Placeholders: Dedicated vector/pattern (jangan gray box kosong saja).

---

## 6. Accessibility (A11y)

* **Contrast:** Pastikan text merah di atas putih memenuhi ratio WCAG AA.
* **Focus States:** Visible ring untuk keyboard navigation.
* **Alt Text:** Wajib untuk semua gambar produk.
* **Touch Targets:** Minimal 44x44px untuk elemen interaktif di mobile.

---

## 7. Reference Documents

* [Discovery Document](./discovery.md)
* [PRD](./prd.md)
* [Crawl Data Website Asli](../crawl)
* [Style References](../style)
