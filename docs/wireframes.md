# 📱 Low-Fi Wireframes - Turen Indah Bangunan

> **Phase 3.4:** UI/UX Design  
> **Type:** Low-Fidelity (Structural)  
> **Approach:** Mobile-First (User) & Desktop (Admin)  
> **Reference:** `user-flow.md`, `admin-flow.md`, `design-system.md`

---

## 1. User Interface (Mobile App View)

Priority: **Kontraktor di Lapangan** (Mobile PWA)

### 1.1 Homepage (Mobile)

```
+-----------------------------------+
|  [Logo TIB]          [Search Icon]|  <-- Sticky Bar
+-----------------------------------+
|                                   |
|       [ CAROUSEL BANNER ]         |  <-- Aspect Ratio 4:3
|     "Promo Semen Gresik 5%"       |
|          [●] ● ●                  |
+-----------------------------------+
|  Kategori Pilihan                 |
|  +-------+  +-------+  +-------+  |
|  | [Icon]|  | [Icon]|  | [Icon]|  |
|  | Semen |  |  Cat  |  | Pipa  |  |
|  +-------+  +-------+  +-------+  |
|  [Lihat Semua Kategori ->]        |
+-----------------------------------+
|  Featured Products                |
|  +-------------+  +-------------+ |
|  | [IMG]       |  | [IMG]       | |
|  | Semen 50kg  |  | Cat Tembok  | |
|  | Rp 55.000   |  | Rp 120.000  | |
|  | [Add+]      |  | [Add+]      | |
|  +-------------+  +-------------+ |
+-----------------------------------+
|  [Home] [Katalog] [Toko] [Akun]   |  <-- Bottom Nav (Fixed)
+-----------------------------------+
```

### 1.2 Product Detail Page (PDP)

```
+-----------------------------------+
|  [< Back]    Detail    [Share]    |
+-----------------------------------+
|                                   |
|          [ PRODUCT IMAGE ]        |  <-- Slider
|                                   |
+-----------------------------------+
|  Semen Gresik 50kg PCC            |  <-- H1
|  Rp 55.000 / sak                  |  <-- Primary Color
|  [Badge: Stok Banyak]             |  <-- Success Color
+-----------------------------------+
|  Pilih Varian:                    |
|  [40kg]  [50kg (Selected)]        |
+-----------------------------------+
|  Deskripsi:                       |
|  Semen berkualitas tinggi untuk   |
|  bangunan kokoh... [Read more]    |
+-----------------------------------+
|  Spesifikasi:                     |
|  +-------------+----------------+ |
|  | Berat       | 50 kg          | |
|  | Tipe        | PCC            | |
|  +-------------+----------------+ |
+-----------------------------------+
|  [ - ]  10  [ + ]    [Add to Cart]|  <-- Sticky Bottom Action
+-----------------------------------+
```

### 1.3 Cart & Checkout

```
+-----------------------------------+
|  [<]  Keranjang (3 Item)          |
+-----------------------------------+
|  [x] Pilih Semua                  |
+-----------------------------------+
|  +-----------------------------+  |
|  | [Img] Semen Gresik 50kg     |  |
|  | Rp 55.000 x 10              |  |
|  | [Trash]    [ - ] 10 [ + ]   |  |
|  +-----------------------------+  |
|                                   |
|  +-----------------------------+  |
|  | [Img] Cat Dulux 5kg         |  |
|  | Rp 120.000 x 2              |  |
|  | [Trash]    [ - ] 2  [ + ]   |  |
|  +-----------------------------+  |
+-----------------------------------+
|  Total: Rp 790.000                |
|  [       Checkout (3)          ]  |  <-- Sticky Bottom
+-----------------------------------+

            ⬇ (Click Checkout)

+-----------------------------------+
|  [<]  Checkout                    |
+-----------------------------------+
|  1. Alamat Pengiriman             |
|  [ Proyek Pakis         (Edit) ]  |
|  Jl. Raya Pakis No. 12...         |
+-----------------------------------+
|  2. Ekspedisi                     |
|  (o) Driver TIB (Rp 50.000)       |
|  ( ) Ambil Sendiri (Rp 0)         |
+-----------------------------------+
|  3. Pembayaran                    |
|  (o) Transfer BCA (Virtual Acc)   |
|  ( ) COD (Cash on Delivery)       |
+-----------------------------------+
|  Ringkasan:                       |
|  Subtotal:      Rp 790.000        |
|  Ongkir:        Rp  50.000        |
|  Total Bayar:   Rp 840.000        |
+-----------------------------------+
|  [     Bayar Sekarang          ]  |
+-----------------------------------+
```

---

## 2. Admin Interface (Desktop View)

Priority: **Admin Toko & Gudang** (Web Desktop)

### 2.1 Admin Layout

```
+------+-------------------------------------------------------+
| LOGO | [Search Order...]            [Notif] [Profile: Admin] |
+------+-------------------------------------------------------+
|      |                                                       |
| DASH |  Dashboard Overview                                   |
|      |  +-----------+  +-----------+  +-----------+          |
| PROD |  | Total     |  | Pending   |  | Low Stock |          |
|      |  | Sales     |  | Orders    |  | Alert     |          |
| ORDR |  | Rp 150jt  |  | 5         |  | 3 Items   |          |
|      |  +-----------+  +-----------+  +-----------+          |
| CUST |                                                       |
|      |  Recent Orders                                        |
| SETT |  +-------------------------------------------------+  |
|      |  | ID    | Customer   | Total    | Status   | Act  |  |
| OUT  |  | #1001 | Budi       | Rp 5jt   | [Paid]   | [>]  |  |
|      |  | #1002 | Rina       | Rp 200k  | [Pend]   | [>]  |  |
|      |  +-------------------------------------------------+  |
|      |                                                       |
+------+-------------------------------------------------------+
```

### 2.2 Manage Products (List & Edit)

```
+------+-------------------------------------------------------+
|      |  Products > List                                      |
| MENU |  [Search Product...]  [Filter Cat v]  [+ Add Product] |
|      |                                                       |
|      |  +-------------------------------------------------+  |
|      |  | Image | Name         | Stock | Price    | Act   |  |
|      |  | [img] | Semen Gresik | 150   | 55.000   | [Edt] |  |
|      |  | [img] | Cat Dulux    | 0     | 120.000  | [Edt] |  | <-- Red row (No stock)
|      |  +-------------------------------------------------+  |
+------+-------------------------------------------------------+

            ⬇ (Click Edit)

+------+-------------------------------------------------------+
|      |  Products > Edit: Semen Gresik                        |
|      |                                                       |
|      |  Basic Info                     Pricing & Stock       |
|      |  [Name Input]                   [Price Input]         |
|      |  [Category Select]              [Stock Input]         |
|      |  [Description Textarea]         [Unit Select]         |
|      |                                                       |
|      |  Images                         Attributes (JSON)     |
|      |  [+] [img1] [img2]              Type: [PCC]           |
|      |                                 Weight: [50kg]        |
|      |                                                       |
|      |  [Cancel]   [Delete (Red)]      [Save Changes (Blue)] |
+------+-------------------------------------------------------+
```

---

## 3. Component Mapping (Atomic Design)

Referencing `design-system.md`:

| Wireframe Element | Design System Component | Tailwind Class Ref |
|-------------------|-------------------------|--------------------|
| Sticky Bar (Mobile)| `components/layout/header.tsx` | `sticky top-0 z-50` |
| Bottom Nav | `components/layout/mobile-nav.tsx` | `fixed bottom-0 border-t` |
| Product Card | `components/product/product-card.tsx` | `rounded-xl border shadow-sm` |
| Button Primary | `Button (variant: default)` | `bg-primary text-primary-fg` |
| Button Input | `Input` | `rounded-lg border-input` |
| Badge Stock | `Badge` | `bg-success/warning/destructive` |

---

## 4. Responsive Considerations

1. **Grid Layout (Products)**
    * Mobile: `grid-cols-2 gap-2` (Compact)
    * Tablet: `grid-cols-3 gap-4`
    * Desktop: `grid-cols-4 gap-6`

2. **Navigation**
    * Mobile: Bottom Navigation (Thumb-friendly)
    * Desktop: Top Header + Mega Menu

3. **Checkout**
    * Mobile: Steps Accordion (Vertical)
    * Desktop: 2-Column (Left: Form, Right: Summary Sticky)

---

*Last updated: 6 Januari 2026*
