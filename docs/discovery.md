# 📋 Discovery Document: E-Commerce Bahan Bangunan Modern

> **Project:** Turen Indah Bangunan - Modern E-Commerce Platform  
> **Phase:** 1 - Discovery & Validation  
> **Date:** 6 Januari 2026  
> **Status:** ✅ Completed

---

## 1. Problem Statement

### 1.1 Latar Belakang

Industri bahan bangunan di Indonesia sedang berada di **titik balik transformasi digital**. Metode tradisional yang mengandalkan proses manual mulai ditinggalkan, dengan lebih dari **80% kontraktor dan pembangun** sudah terbuka untuk membeli material secara online.

### 1.2 Masalah Utama

| Masalah | Dampak | Urgensi |
|---------|--------|---------|
| **Data Inventaris Tidak Akurat** | Ketidaksinkronan stok fisik vs website menyebabkan *overselling* dan merusak reputasi | 🔴 Tinggi |
| **Inefisiensi Operasional** | Proses pemesanan, penagihan, dan approval masih manual, rawan kesalahan | 🔴 Tinggi |
| **Kurangnya Transparansi Logistik** | Pembeli kesulitan melacak status pengiriman barang berat secara real-time | 🟠 Sedang |
| **Interface yang Kuno** | Platform existing terasa seperti "mengisi formulir", bukan alat bantu belanja intuitif | 🟠 Sedang |
| **Pesanan Kompleks** | Spesifikasi teknis produk bangunan sulit ditangkap alur checkout standar | 🟡 Menengah |

### 1.3 Tujuan Proyek

1. **Membangun platform e-commerce terintegrasi** yang menghilangkan *friction* dalam proses pembelian
2. **Mempercepat transaksi** dengan automasi dan sinkronisasi real-time
3. **Memberikan visibilitas stok akurat** untuk penghematan waktu pelanggan
4. **Meningkatkan margin** melalui efisiensi operasional digital

---

## 2. Target User

### 2.1 Primary Personas

#### 👷 Persona A: Kontraktor Profesional

| Atribut | Detail |
|---------|--------|
| **Demografi** | Usia 30-50 tahun, pria, pendidikan SMK/S1 Teknik Sipil |
| **Perilaku** | Mengakses dari *jobsite* via smartphone, butuh keputusan cepat |
| **Kebutuhan** | Penghematan waktu, penjadwalan material, harga khusus akun |
| **Pain Points** | Stok tidak akurat, proses approval manual, tracking pengiriman sulit |
| **Goals** | Efisiensi pengadaan material, mengurangi waktu non-produktif |

#### 🏠 Persona B: Pemilik Rumah (DIY/Renovator)

| Atribut | Detail |
|---------|--------|
| **Demografi** | Usia 25-45 tahun, Gen Z/Milenial, urban |
| **Perilaku** | Riset produk intensif, membaca ulasan, bandingkan harga |
| **Kebutuhan** | Informasi produk lengkap, estimasi ongkir, pembayaran digital |
| **Pain Points** | Kurang pengetahuan teknis, takut salah beli, harga tidak transparan |
| **Goals** | Renovasi sukses dengan budget terkontrol |

#### 🏢 Persona C: Pemilik Toko Bangunan (B2B)

| Atribut | Detail |
|---------|--------|
| **Demografi** | Usia 35-55 tahun, pemilik bisnis kecil-menengah |
| **Perilaku** | Order dalam jumlah besar, butuh kredit/terms, repeat orders |
| **Kebutuhan** | Harga grosir, sistem kredit, integrasi POS |
| **Pain Points** | Proses penagihan manual, stok supplier tidak real-time |
| **Goals** | Margin lebih baik, efisiensi operasional toko |

### 2.2 Market Validation

| Metrik | Data | Sumber |
|--------|------|--------|
| Pasar Konstruksi Indonesia 2025 | **USD 125,4 Miliar** | Mordor Intelligence |
| Proyeksi Pasar 2034 | **USD 226,1 Miliar** (CAGR 6,77%) | Industry Reports |
| Transaksi Digital 2030 | **~50% dari total** transaksi bahan bangunan | Industry Trend |
| Margin Digital vs Tradisional | **+100 basis poin** lebih tinggi | Distributor Data |

---

## 3. Proposed Solution

### 3.1 Solusi Utama: Platform E-Commerce Terintegrasi

Platform berbasis **Next.js 15** dengan ekosistem terintegrasi penuh untuk performa maksimal.

### 3.2 Fitur Wajib (Must-Have Features)

#### 🛒 Core E-Commerce

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Visibilitas Inventaris Real-Time** | Sinkronisasi stok otomatis antar platform via API | P0 |
| **Mobile-First Interface** | Desain optimized untuk akses dari *jobsite* | P0 |
| **Katalog Produk Lengkap** | Dengan filter kategori, spesifikasi teknis, dan foto | P0 |
| **Search & Discovery** | Pencarian cerdas dengan suggestions | P0 |
| **Checkout Streamlined** | Proses checkout < 3 langkah | P0 |

#### 💳 Pembayaran & Logistik

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Multi-Payment Gateway** | E-wallet, VA, transfer bank, COD | P0 |
| **Integrasi API Logistik** | RajaOngkir/Deliveree untuk estimasi ongkir otomatis | P0 |
| **Live Tracking** | Pelacakan status pengiriman real-time | P1 |
| **Penjadwalan Pengiriman** | Pilih tanggal/waktu pengiriman | P1 |

#### 👤 User Management

| Fitur | Deskripsi | Prioritas |
|-------|-----------|-----------|
| **Akun Pelanggan** | Registrasi, login, profil | P0 |
| **Harga Khusus Akun** | Pricing B2B berdasarkan relationship | P1 |
| **Order History** | Riwayat pesanan dan reorder | P1 |
| **Wishlist** | Simpan produk untuk nanti | P2 |

### 3.3 Fitur Diferensiasi (Nice-to-Have)

| Fitur | Deskripsi | Timeline |
|-------|-----------|----------|
| **AI Personalization** | Rekomendasi produk berbasis perilaku (↑80% loyalitas) | Phase 2 |
| **Augmented Reality (AR)** | Simulasi produk di ruangan (keramik, cat) | Phase 3 |
| **Live Commerce** | Siaran langsung promosi produk (↑10x konversi) | Phase 3 |
| **Integrasi BIM** | Building Information Modeling untuk proyek besar | Phase 4 |

### 3.4 Manfaat Bisnis

```
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS IMPACT                       │
├─────────────────────────────────────────────────────────┤
│  📈 Margin Kotor: +100 basis poin vs tradisional        │
│  ⏱️  Waktu Proses: -30% untuk penerimaan barang         │
│  📊 Akurasi Data: +95% sinkronisasi inventaris          │
│  🌍 Jangkauan: Ekspansi pasar ke luar daerah            │
│  😊 Kepuasan: CSI target 84%+                           │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Key Risks & Mitigasi

### 4.1 Technical Risks

| Risk | Probability | Impact | Mitigasi |
|------|-------------|--------|----------|
| **Kompleksitas Sinkronisasi Data** | Tinggi | Tinggi | PoC terlebih dahulu, API design robust, fallback manual |
| **Performa dengan Traffic Tinggi** | Sedang | Tinggi | Load testing, CDN, caching strategy |
| **Integrasi Payment Gateway** | Sedang | Tinggi | Sandbox testing, fallback payment methods |
| **Mobile Performance** | Sedang | Sedang | PWA, lazy loading, image optimization |

### 4.2 Business Risks

| Risk | Probability | Impact | Mitigasi |
|------|-------------|--------|----------|
| **Keamanan Data & UU PDP** | Tinggi | Tinggi | Enkripsi, audit keamanan, compliance check |
| **Biaya Operasional Awal** | Tinggi | Sedang | MVP approach, prioritize ROI features |
| **Fluktuasi Harga Material** | Sedang | Sedang | Dynamic pricing, margin buffer |
| **Adopsi User Rendah** | Sedang | Tinggi | Onboarding program, customer support, insentif |

### 4.3 Market Risks

| Risk | Probability | Impact | Mitigasi |
|------|-------------|--------|----------|
| **Persaingan dari Marketplace Besar** | Tinggi | Sedang | Diferensiasi layanan, fokus niche |
| **Resistensi Digitalisasi** | Sedang | Sedang | Edukasi, hybrid approach (online + offline) |
| **Supplier Tidak Kooperatif** | Rendah | Tinggi | Multiple supplier, gradual onboarding |

---

## 5. Riset Kompetitor

### 5.1 Kompetitor Utama

| Kompetitor | Tipe | Kekuatan | Kelemahan |
|------------|------|----------|-----------|
| **Tukang.com** | Platform Jasa | UI intuitif, verifikasi ketat | Fokus jasa, bukan material |
| **Sejasa** | Marketplace | Brand awareness tinggi | Generalis, tidak spesialis |
| **Wook** | B2B E-commerce | Keragaman produk, support branding | Fokus reseller, bukan end-user |
| **Tokopedia/Shopee** | General Marketplace | Traffic besar, trust tinggi | Tidak fokus bahan bangunan, logistik standar |

### 5.2 Competitive Advantage

```
┌─────────────────────────────────────────────────────────┐
│              UNIQUE SELLING PROPOSITION                  │
├─────────────────────────────────────────────────────────┤
│  ✅ Fokus Spesialis: 100% bahan bangunan                │
│  ✅ Stok Real-Time: Sinkronisasi gudang otomatis        │
│  ✅ Logistik Khusus: Handling barang berat              │
│  ✅ B2B Ready: Harga khusus, kredit, terms              │
│  ✅ Mobile-First: Didesain untuk kontraktor lapangan    │
│  ✅ Local Expertise: Pemahaman pasar lokal Indonesia    │
└─────────────────────────────────────────────────────────┘
```

---

## 6. Tech Stack Validation

### 6.1 Recommended Tech Stack

| Layer | Technology | Justifikasi |
|-------|------------|-------------|
| **Framework** | Next.js 15 (App Router) | Performa rendering cepat, SEO friendly, ecosystem mature |
| **Language** | TypeScript | Type safety, developer experience, maintainability |
| **State Management** | Zustand | Efisien (18ms render), lebih ringan dari Redux |
| **Styling** | Tailwind CSS | Rapid development, responsive built-in |
| **Database** | Firebase Firestore | Real-time sync, scalable, managed service |
| **Auth** | Firebase Auth | Secure, multiple providers, easy integration |
| **CMS** | Sanity | Real-time preview, non-tech friendly |
| **Payment** | Midtrans/Xendit | Local payment methods, reliable |
| **Logistic API** | RajaOngkir + Deliveree | Comprehensive coverage, barang berat support |

### 6.2 Tech Stack Validation Criteria

| Kriteria | Status | Evidence |
|----------|--------|----------|
| **Keamanan** | ✅ Validated | Next.js built-in security, Firebase Auth, HTTPS |
| **Skalabilitas** | ✅ Validated | Serverless architecture, auto-scaling |
| **Performa** | ✅ Validated | Zustand 18ms render, Next.js SSR/SSG |
| **Integrasi** | ✅ Validated | REST API support, MCP compatible |
| **Developer Experience** | ✅ Validated | TypeScript, hot reload, extensive docs |
| **Cost Efficiency** | ✅ Validated | Firebase free tier, pay-as-you-go |

### 6.3 Studi Kasus Relevan

| Company | Stack | Hasil |
|---------|-------|-------|
| **PT Swadaya Graha Gresik** | Laravel 11 + Tailwind + MySQL | -30% waktu proses, +95% akurasi |
| **PT Bumi Pembangunan Pertiwi** | B2B Platform (Agile) | CSI 84,42% |
| **PT Semen Indonesia** | AI-powered supply chain | +1,16% order fulfillment |

---

## 7. User Problem Identification

### 7.1 Metode Riset yang Digunakan

| Metode | Deskripsi | Deliverable |
|--------|-----------|-------------|
| **Survei & Wawancara** | Kuesioner skala Likert + wawancara mendalam | User insights |
| **Big Data Analytics** | Analisis transaksi dan perilaku | Behavioral patterns |
| **Social Listening** | Monitoring review dan diskusi online | Sentiment analysis |
| **Design Thinking** | Pendekatan human-centric | Validated solutions |

### 7.2 Prioritas Masalah (berdasarkan Impact x Frequency)

| Rank | Masalah | Impact | Frequency | Prioritas |
|------|---------|--------|-----------|-----------|
| 1 | Stok tidak akurat | Tinggi | Tinggi | P0 |
| 2 | Proses checkout rumit | Tinggi | Tinggi | P0 |
| 3 | Tracking pengiriman tidak ada | Sedang | Tinggi | P1 |
| 4 | Harga tidak transparan | Sedang | Sedang | P1 |
| 5 | Informasi produk kurang | Sedang | Sedang | P2 |

---

## 8. Next Steps (Phase 2: Documentation)

### 8.1 Dokumen yang Perlu Dibuat

- [ ] `prd.md` - Product Requirements Document lengkap
- [ ] `architecture.md` - System architecture & tech stack detail
- [ ] `database.md` - Schema design (Firestore collections)
- [ ] `api.md` - API routes & endpoints
- [ ] `frontend.md` - UI/UX guidelines & component library
- [ ] `security.md` - Security policies & compliance

### 8.2 Timeline Estimasi

| Fase | Durasi | Output |
|------|--------|--------|
| Phase 2: Documentation | 1 minggu | PRD, Architecture docs |
| Phase 3: Design | 1 minggu | Wireframes, UI mockups |
| Phase 4: Development (MVP) | 4-6 minggu | Working MVP |
| Phase 5: Testing & QA | 1-2 minggu | Tested product |
| Phase 6: Launch | 1 minggu | Live platform |

---

## 📚 References

### Research Sources

- Mordor Intelligence - Indonesia Construction Market
- Industry Reports - E-commerce Bahan Bangunan
- Studi Kasus PT Bumi Pembangunan Pertiwi
- Studi Kasus PT Swadaya Graha Gresik
- Google Trends Analysis
- Reddit/X Community Discussions

### Tech Documentation

- Next.js 15 Documentation
- Firebase Documentation
- Zustand GitHub Repository
- Tailwind CSS Documentation

---

> **Analogi:** Membangun platform e-commerce bahan bangunan yang modern ibarat membangun **Gedung Pintar di atas Fondasi Beton yang Kokoh**. Fondasi tersebut adalah sinkronisasi stok yang akurat dan teknologi Next.js yang cepat, sementara "sistem pintar" di dalamnya (AI dan AR) berfungsi sebagai lift otomatis yang memastikan setiap penghuni (pengguna) sampai ke tujuannya tanpa harus menaiki tangga manual yang melelahkan.

---

*Document created: 6 Januari 2026*  
*Last updated: 6 Januari 2026*  
*Version: 1.0*
