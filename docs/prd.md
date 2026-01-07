# 📦 Product Requirements Document (PRD)

> **Project:** Turen Indah Bangunan - E-Commerce Platform  
> **Version:** 1.0  
> **Date:** 6 Januari 2026  
> **Author:** Development Team  
> **Status:** Draft

---

## 1. Overview

### 1.1 Ringkasan Produk

**Turen Indah Bangunan** adalah platform e-commerce modern yang dikhususkan untuk industri bahan bangunan di Indonesia. Platform ini menghubungkan supplier/toko bangunan dengan pembeli (kontraktor, pemilik rumah, dan B2B buyer) melalui pengalaman belanja digital yang terintegrasi.

### 1.2 Visi Produk

> *"Menjadi platform e-commerce bahan bangunan #1 di Indonesia yang menyediakan pengalaman belanja seamless dengan visibilitas stok real-time, logistik terintegrasi, dan harga transparan."*

### 1.3 Problem Statement

Industri bahan bangunan Indonesia masih bergantung pada proses manual yang menyebabkan:

- **Stok tidak akurat** → Overselling, kekecewaan pelanggan
- **Proses lambat** → Pemesanan, penagihan, approval manual
- **Kurang transparansi** → Harga bervariasi, tracking pengiriman tidak ada
- **Interface usang** → Pengalaman belanja buruk, konversi rendah

### 1.4 Solusi

Platform e-commerce dengan fitur:

- ✅ Sinkronisasi inventaris real-time
- ✅ Interface mobile-first untuk kontraktor lapangan
- ✅ Integrasi logistik untuk barang berat
- ✅ Sistem harga khusus untuk B2B

### 1.5 Analisis Website Asli (turenindahbangunan.com)

Berdasarkan analisis crawl data website asli, berikut adalah breakdown fitur dan kelemahan yang ditemukan:

#### Tech Stack Website Asli

| Komponen | Teknologi | Status |
|----------|-----------|--------|
| CMS | WordPress + WooCommerce | ⚠️ Monolithic, lambat |
| Theme | Tbay Theme + Revolution Slider | ⚠️ Berat, banyak plugin |
| Chat | WhatsApp Sticky Button | ⚠️ Tidak terintegrasi |

#### Fitur yang Sudah Ada

| Fitur | Status | Catatan |
|-------|--------|---------|
| Katalog Produk (7 kategori) | ✅ Pertahankan | Semen, Bata Ringan, Keramik, Kran, Plumbing, Builder Hardware, Flash |
| Product Card (gambar, harga, wishlist, quick view) | ✅ Pertahankan | Sudah lengkap |
| Multi-Lokasi (20+ TIB + 5 Jaya Raya) | ✅ Pertahankan | Google Maps integration |
| Customer Reviews | ✅ Pertahankan | Rating bintang, testimoni |
| WhatsApp Integration | ✅ Pertahankan | Sticky button + link per produk |
| Footer Product Catalog | ✅ Pertahankan | SEO friendly |
| Newsletter Subscription | ⚠️ Improve | Fungsionalitas tidak jelas |
| Promo Page | ⚠️ Improve | Konten kurang jelas |
| Blog | ⚠️ Improve | Konten terbatas |

#### Kelemahan yang Ditemukan

| Masalah | Impact | Solusi di Platform Baru |
|---------|--------|-------------------------|
| 🔴 No Account System | User tidak bisa track order | Firebase Auth + Profile page |
| 🔴 No Checkout Flow | Konversi rendah | 3-step checkout flow |
| 🔴 No Shipping Integration | User harus tanya via WA | RajaOngkir API |
| 🔴 No Real-time Stock | Pain point utama (discovery) | Badge stok di product card |
| 🟠 Heavy Page Load | Slow performance | Next.js SSR + optimization |
| 🟠 No Search Prominent | User sulit cari produk | Search bar sticky dengan autocomplete |
| 🟠 Broken Links | Bad UX | Proper routing |
| 🟡 No Product Specs | Sulit untuk kontraktor | Spesifikasi teknis lengkap |

### 1.6 Improvement Priorities

Mapping perbaikan berdasarkan discovery document dan analisis website asli:

| Priority | Improvement | Discovery Reference |
|----------|-------------|---------------------|
| **P0** | Visibilitas Stok Real-time | "Data stok yang tidak sinkron" |
| **P0** | Search Prominent dengan Autocomplete | "Pencarian cerdas dengan suggestions" |
| **P0** | Account System (Register/Login) | "Akun pelanggan dengan order history" |
| **P0** | Checkout Flow (3 langkah) | "Proses checkout < 3 langkah" |
| **P0** | Payment Gateway Integration | "E-wallet, VA, transfer bank" |
| **P1** | Shipping Estimation | "Estimasi harga otomatis" |
| **P1** | Live Tracking | "Pelacakan status pengiriman" |
| **P1** | Mobile-First Redesign | "Mobile-First Interface untuk kontraktor" |
| **P1** | Product Specs Detail | "Informasi detail aplikasi produk" |
| **P2** | B2B Pricing | "Harga spesifik berdasarkan hubungan bisnis" |
| **P2** | AI Recommendations | "Rekomendasi produk berbasis behavior" |

---

## 2. User Personas

### 2.1 Persona Utama

#### 👷 Persona A: Budi - Kontraktor Profesional

| Atribut | Detail |
|---------|--------|
| **Profil** | Pria, 42 tahun, Kontraktor independen dengan 5 pekerja |
| **Lokasi** | Surabaya, menangani proyek di Jawa Timur |
| **Pengalaman Digital** | Menengah (WhatsApp, Tokopedia) |
| **Frekuensi Beli** | 3-5x per minggu |
| **Order Value** | Rp 5-50 juta per order |

**Goals:**

- Hemat waktu pengadaan material
- Stok tersedia saat dibutuhkan
- Pengiriman tepat waktu ke lokasi proyek

**Frustrations:**

- Harus telepon/WA untuk cek stok
- Sering kehabisan material di tengah proyek
- Tidak tahu status pengiriman

**Quote:**
> *"Saya butuh material yang ready stok dan bisa diantar sesuai jadwal proyek. Kalau harus bolak-balik toko, waktu saya habis di jalan."*

---

#### 🏠 Persona B: Rina - Pemilik Rumah (Renovator)

| Atribut | Detail |
|---------|--------|
| **Profil** | Wanita, 35 tahun, Ibu rumah tangga dengan pekerjaan freelance |
| **Lokasi** | Jakarta Selatan |
| **Pengalaman Digital** | Tinggi (Shopee, Tokopedia, Instagram) |
| **Frekuensi Beli** | 1-2x per bulan (saat renovasi) |
| **Order Value** | Rp 500rb - 5 juta per order |

**Goals:**

- Renovasi rumah sesuai budget
- Memahami produk yang tepat untuk kebutuhan
- Harga transparan tanpa markup tukang

**Frustrations:**

- Tidak paham spesifikasi teknis material
- Takut salah beli, tidak bisa retur
- Harga di toko dan online berbeda-beda

**Quote:**
> *"Saya mau renovasi kamar mandi, tapi bingung keramik ukuran berapa yang pas. Kalau ada yang bisa bantu estimasi dan rekomendasi, sangat membantu."*

---

#### 🏢 Persona C: Pak Hendra - Pemilik Toko Bangunan

| Atribut | Detail |
|---------|--------|
| **Profil** | Pria, 55 tahun, Pemilik toko bangunan sejak 20 tahun |
| **Lokasi** | Semarang, melayani Jawa Tengah |
| **Pengalaman Digital** | Rendah-Menengah (WhatsApp, Excel) |
| **Frekuensi Beli** | Harian (restock) |
| **Order Value** | Rp 20-200 juta per order |

**Goals:**

- Akses harga grosir dari supplier
- Sistem kredit/terms pembayaran
- Restock mudah dan cepat

**Frustrations:**

- Proses order masih via telepon/fax
- Approval kredit lama
- Data stok tidak akurat, sering kehabisan barang laku

**Quote:**
> *"Kalau ada sistem yang bisa langsung order, lihat stok supplier, dan terms kredit jelas, saya pasti pakai. Sekarang masih manual semua."*

---

## 3. User Stories

### 3.1 Epic: Browsing & Discovery

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-001 | Sebagai **pembeli**, saya ingin **mencari produk berdasarkan kategori** agar **mudah menemukan material yang dibutuhkan** | P0 | - Kategori terstruktur (Semen, Besi, Keramik, dll)<br>- Filter subcategory tersedia<br>- Hasil ditampilkan dengan gambar & harga |
| US-002 | Sebagai **pembeli**, saya ingin **melihat detail produk lengkap** agar **bisa memastikan spesifikasi sesuai kebutuhan** | P0 | - Foto produk (min 3)<br>- Spesifikasi teknis<br>- Stok real-time<br>- Harga per unit |
| US-003 | Sebagai **pembeli**, saya ingin **mencari produk dengan kata kunci** agar **cepat menemukan item spesifik** | P0 | - Search bar prominent<br>- Autocomplete suggestions<br>- Hasil relevan dalam < 1 detik |
| US-004 | Sebagai **kontraktor**, saya ingin **melihat produk serupa/alternatif** agar **bisa bandingkan sebelum beli** | P1 | - Section "Produk Serupa"<br>- Perbandingan harga visible |

### 3.2 Epic: Cart & Checkout

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-010 | Sebagai **pembeli**, saya ingin **menambah produk ke keranjang** agar **bisa beli beberapa item sekaligus** | P0 | - Tombol "Tambah ke Keranjang"<br>- Quantity selector<br>- Notifikasi sukses |
| US-011 | Sebagai **pembeli**, saya ingin **melihat ringkasan keranjang** agar **bisa review sebelum checkout** | P0 | - List item + qty + harga<br>- Subtotal per item<br>- Total keseluruhan<br>- Bisa edit/hapus item |
| US-012 | Sebagai **pembeli**, saya ingin **checkout dengan mudah** agar **transaksi cepat selesai** | P0 | - Maksimal 3 langkah checkout<br>- Form alamat tersimpan<br>- Pilihan pengiriman<br>- Pilihan pembayaran |
| US-013 | Sebagai **pembeli**, saya ingin **menyimpan alamat pengiriman** agar **tidak perlu input ulang** | P1 | - Multiple alamat tersimpan<br>- Set default address<br>- Edit/hapus alamat |

### 3.3 Epic: Payment

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-020 | Sebagai **pembeli**, saya ingin **bayar dengan berbagai metode** agar **fleksibel sesuai preferensi** | P0 | - Transfer Bank (VA)<br>- E-Wallet (GoPay, OVO, DANA)<br>- COD (conditional) |
| US-021 | Sebagai **pembeli**, saya ingin **melihat konfirmasi pembayaran** agar **yakin transaksi berhasil** | P0 | - Halaman sukses<br>- Email konfirmasi<br>- WhatsApp notifikasi |
| US-022 | Sebagai **pemilik toko (B2B)**, saya ingin **akses kredit/terms** agar **bisa bayar setelah barang jual** | P1 | - Terms 7/14/30 hari<br>- Limit kredit per akun<br>- Invoice otomatis |

### 3.4 Epic: Delivery & Tracking

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-030 | Sebagai **pembeli**, saya ingin **estimasi ongkir otomatis** agar **tahu total biaya sebelum bayar** | P0 | - Integrasi RajaOngkir/Deliveree<br>- Estimasi berdasarkan berat & lokasi<br>- Multiple opsi kurir |
| US-031 | Sebagai **pembeli**, saya ingin **tracking pengiriman real-time** agar **tahu kapan barang sampai** | P1 | - Status tracking (diproses, dikirim, sampai)<br>- Link ke tracking kurir<br>- Push notification |
| US-032 | Sebagai **kontraktor**, saya ingin **jadwalkan pengiriman** agar **sesuai jadwal proyek** | P1 | - Pilih tanggal pengiriman<br>- Slot waktu (pagi/siang/sore)<br>- Konfirmasi jadwal |

### 3.5 Epic: User Account

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-040 | Sebagai **pengunjung**, saya ingin **daftar akun dengan mudah** agar **bisa mulai belanja** | P0 | - Registrasi email/phone<br>- Social login (Google)<br>- Verifikasi OTP |
| US-041 | Sebagai **pembeli**, saya ingin **login dengan aman** agar **data saya terlindungi** | P0 | - Login email/phone + password<br>- Forgot password flow<br>- Session management |
| US-042 | Sebagai **pembeli**, saya ingin **melihat riwayat pesanan** agar **bisa track dan reorder** | P1 | - List order dengan status<br>- Detail per order<br>- Tombol "Beli Lagi" |
| US-043 | Sebagai **pembeli**, saya ingin **menyimpan wishlist** agar **bisa beli nanti** | P2 | - Tombol "Simpan"<br>- List wishlist di profil<br>- Move to cart |

### 3.6 Epic: Admin/Seller

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-050 | Sebagai **admin**, saya ingin **kelola produk** agar **katalog selalu update** | P0 | - CRUD produk<br>- Upload gambar<br>- Set harga & stok |
| US-051 | Sebagai **admin**, saya ingin **kelola pesanan** agar **fulfillment lancar** | P0 | - List pesanan baru<br>- Update status order<br>- Print invoice/label |
| US-052 | Sebagai **admin**, saya ingin **lihat laporan penjualan** agar **monitor performa bisnis** | P1 | - Dashboard summary<br>- Grafik penjualan<br>- Export data |

### 3.7 Epic: Multi-Store & Communication (dari Website Asli)

| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|---------------------|
| US-060 | Sebagai **pembeli**, saya ingin **melihat daftar lokasi toko** agar **bisa pilih toko terdekat** | P0 | - List 20+ lokasi TIB + Jaya Raya<br>- Google Maps link per toko<br>- Alamat lengkap |
| US-061 | Sebagai **pembeli**, saya ingin **menghubungi via WhatsApp** agar **bisa tanya produk langsung** | P0 | - Sticky WhatsApp button<br>- Pre-filled message<br>- Link WA per produk |
| US-062 | Sebagai **pembeli**, saya ingin **melihat review pelanggan** agar **yakin dengan kualitas toko** | P1 | - Testimoni dengan rating bintang<br>- Nama dan tanggal review<br>- Filter by rating |

---

## 4. Tech Stack

### 4.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework dengan App Router |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Styling utility-first |
| Zustand | 5.x | State management |
| React Query | 5.x | Server state & caching |

### 4.2 Backend & Database

| Technology | Version | Purpose |
|------------|---------|---------|
| Firebase Firestore | - | NoSQL database |
| Firebase Auth | - | Authentication |
| Firebase Storage | - | Image/file storage |
| Firebase Functions | - | Serverless backend (if needed) |

### 4.3 Third-Party Services

| Service | Purpose |
|---------|---------|
| Midtrans / Xendit | Payment gateway |
| RajaOngkir | Shipping cost estimation |
| Deliveree | Heavy goods logistics |
| Sanity | Content management |
| Vercel | Hosting & deployment |

### 4.4 Development Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Husky | Git hooks |
| Jest / Vitest | Unit testing |
| Playwright | E2E testing |

---

## 5. Fitur Utama (MVP Scope)

### 5.1 Phase 1 - MVP (Week 1-6)

| Fitur | Deskripsi | Priority |
|-------|-----------|----------|
| **Landing Page** | Homepage dengan hero, kategori, featured products | P0 |
| **Product Catalog** | Listing produk dengan filter & search | P0 |
| **Product Detail** | Halaman detail dengan gambar, spec, stok | P0 |
| **Cart** | Keranjang belanja dengan edit quantity | P0 |
| **Checkout** | Flow checkout 3 langkah | P0 |
| **User Auth** | Register, Login, Profile | P0 |
| **Payment Integration** | Midtrans/Xendit basic | P0 |
| **Order Management** | Riwayat order, status tracking | P0 |
| **Admin Dashboard** | CRUD produk, kelola order | P0 |
| **Store Locations** | Daftar 20+ lokasi TIB + Jaya Raya dengan Google Maps | P0 |
| **WhatsApp Integration** | Sticky button + pre-filled message | P0 |
| **Customer Reviews** | Testimoni pelanggan dengan rating bintang | P1 |

### 5.2 Phase 2 - Enhancement (Week 7-10)

| Fitur | Deskripsi | Priority |
|-------|-----------|----------|
| **Shipping Integration** | RajaOngkir + estimasi ongkir | P1 |
| **Live Tracking** | Status pengiriman real-time | P1 |
| **Wishlist** | Simpan produk favorit | P1 |
| **Reviews & Ratings** | User review produk | P1 |
| **Email Notifications** | Order confirmation, shipping update | P1 |

### 5.3 Phase 3 - Advanced (Week 11+)

| Fitur | Deskripsi | Priority |
|-------|-----------|----------|
| **B2B Pricing** | Harga khusus per akun | P2 |
| **Credit Terms** | Sistem kredit untuk B2B | P2 |
| **AI Recommendations** | Produk rekomendasi berbasis behavior | P2 |
| **AR Product View** | Augmented Reality untuk keramik/cat | P3 |
| **Live Commerce** | Streaming penjualan langsung | P3 |

---

## 6. Non-Functional Requirements

### 6.1 Performance

| Metric | Target |
|--------|--------|
| Page Load Time | < 3 detik (3G) |
| Time to Interactive | < 5 detik |
| Lighthouse Score | > 80 (mobile) |
| API Response Time | < 500ms |

### 6.2 Scalability

| Metric | Target |
|--------|--------|
| Concurrent Users | 1,000+ |
| Products | 10,000+ |
| Orders/day | 500+ |

### 6.3 Security

| Requirement | Implementation |
|-------------|----------------|
| Authentication | Firebase Auth (secure sessions) |
| Data Encryption | HTTPS, Firestore security rules |
| Payment Security | PCI-DSS compliant gateway |
| Input Validation | Zod schema validation |
| XSS/CSRF Protection | Next.js built-in |

### 6.4 Availability

| Metric | Target |
|--------|--------|
| Uptime | 99.5% |
| Recovery Time | < 1 jam |
| Backup Frequency | Daily |

---

## 7. Success Metrics (KPIs)

### 7.1 Business Metrics

| Metric | Target (Month 3) | Target (Month 6) |
|--------|------------------|------------------|
| Monthly Active Users | 1,000 | 5,000 |
| Conversion Rate | 2% | 3.5% |
| Average Order Value | Rp 2 juta | Rp 3 juta |
| Customer Acquisition Cost | Rp 50,000 | Rp 35,000 |
| Customer Retention Rate | 30% | 45% |

### 7.2 Product Metrics

| Metric | Target |
|--------|--------|
| Cart Abandonment Rate | < 60% |
| Checkout Completion Rate | > 70% |
| Customer Satisfaction (CSAT) | > 4.0/5.0 |
| Net Promoter Score (NPS) | > 30 |

---

## 8. Assumptions & Constraints

### 8.1 Assumptions

1. User memiliki akses internet yang cukup (min 3G)
2. Supplier/partner bersedia mengintegrasikan data stok
3. Payment gateway mendukung metode populer Indonesia
4. Tim development 1-2 orang (indie/small team)

### 8.2 Constraints

1. **Budget**: Terbatas, prioritas fitur MVP
2. **Timeline**: MVP dalam 6 minggu
3. **Tech Debt**: Acceptable untuk MVP, refactor di Phase 2
4. **Team Size**: Solo/duo developer

### 8.3 Dependencies

1. Firebase pricing tier
2. Payment gateway approval
3. Logistics API access (RajaOngkir, Deliveree)
4. Domain & hosting (Vercel)

---

## 9. Timeline

```
Week 1-2: Setup & Foundation
├── Project setup (Next.js, Firebase, Tailwind)
├── Authentication flow
├── Database schema
└── Basic component library

Week 3-4: Core Features
├── Product catalog & detail
├── Cart functionality
├── Checkout flow
└── Payment integration

Week 5-6: Polish & Launch
├── Order management
├── Admin dashboard
├── Testing & QA
└── Deployment

Week 7-10: Enhancement
├── Shipping integration
├── Live tracking
├── Performance optimization
└── User feedback iteration
```

---

## 10. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Integrasi payment gagal | Medium | High | Backup gateway, sandbox testing extensive |
| Performa lambat di mobile | Medium | High | Lighthouse audit, lazy loading, image optimization |
| Stok tidak sinkron | High | High | Webhook, polling fallback, manual override |
| Adopsi user rendah | Medium | High | Onboarding UX, promo launch, customer support |

---

## 11. Appendix

### 11.1 Reference Documents

- [Discovery Document](./discovery.md)
- [Architecture Document](./architecture.md) *(upcoming)*
- [Database Schema](./database.md) *(upcoming)*
- [API Documentation](./api.md) *(upcoming)*

### 11.2 Glossary

| Term | Definition |
|------|------------|
| **B2B** | Business-to-Business (toko ke toko) |
| **B2C** | Business-to-Consumer (toko ke end-user) |
| **MVP** | Minimum Viable Product |
| **SKU** | Stock Keeping Unit |
| **VA** | Virtual Account |
| **COD** | Cash on Delivery |

---

*Document last updated: 6 Januari 2026*
