# 📋 Task Tracker: Turen Indah Bangunan

> **Project:** E-Commerce Bahan Bangunan Modern  
> **Started:** 6 Januari 2026  
> **Current Phase:** Phase 4 - Development (MVP) (🔄 In Progress)  
> **Next Phase:** Phase 5 - Verification & Testing

---

## 🎯 Project Phases (7-Phase Workflow)

| Phase | Status | Progress |
|-------|--------|----------|
| **Phase 0: Setup Environment** | ⏳ Pending | 0% |
| **Phase 1: Discovery & Validation** | ✅ **Completed** | 100% |
| **Phase 2: Documentation (PRD)** | ✅ **Completed** | 100% |
| **Phase 3: Rancangan (Design & Architecture)** | ✅ **Completed** | 100% |
| **Phase 4: Development** | 🔄 **In Progress** | 60% |
| **Phase 5: Verification & Testing** | ⏳ Pending | 0% |
| **Phase 6: Deployment** | ⏳ Pending | 0% |
| **Phase 7: Iteration Loop** | ⏳ Pending | 0% |

---

## ✅ Completed Tasks

### Phase 1: Discovery & Validation (✅ 100%)

- [x] Brainstorming ide proyek
- [x] Kritik teknis, bisnis, dan user experience
- [x] Identifikasi problem statement
- [x] Definisi target user personas
- [x] Identifikasi fitur wajib (must-have)
- [x] Analisis kompetitor (SWOT)
- [x] Validasi market size & potensi
- [x] Metodologi riset pengguna
- [x] Validasi tech stack
- [x] Dokumentasi `discovery.md`

### Phase 2: Documentation (PRD) (✅ 100%)

#### 2.1 Core Documentation

- [x] Buat `prd.md` - Product Requirements Document
- [x] Buat `architecture.md` - System Architecture
- [x] Buat `database.md` - Firestore Schema
- [x] Buat `api.md` - API Routes & Endpoints
- [x] Buat `frontend.md` - UI/UX Guidelines
- [x] Buat `security.md` - Security Policies

#### 2.2 Setup Rules

- [x] Buat `rules.md` - Project Rules & Standards
- [x] Update tech stack specific rules
- [x] Definisikan code style preferences
- [x] Link references (prd.md, database.md, architecture.md)

---

## ⏳ Upcoming Tasks

### Phase 0: Setup Environment (⏳ Belum Dikerjakan)

> **⚠️ CRITICAL:** Phase ini WAJIB dilakukan sebelum coding untuk ensure consistency dan avoid tech debt!

#### 0.1 IDE & Model AI Setup

- [ ] Choose IDE (Antigravity / Cursor / Windsurf)
- [ ] Select AI Model (Gemini 3 Flash + Claude Sonnet untuk gratis, atau upgrade ke Opus/Pro)
- [ ] Configure IDE settings sesuai project (rules, formatter)

#### 0.2 MCP (Model Context Protocol) Setup

- [ ] Setup **Context7** (untuk fetch docs up-to-date)
- [ ] Setup **Firecrawl** (untuk crawl reference sites)
- [ ] Setup **Chrome DevTools** (untuk browser automation testing)
- [ ] (Optional) Setup **Firebase MCP** jika tersedia
- [ ] Test MCP servers jalan dengan baik

#### 0.3 Rules File Integration

- [x] `rules.md` sudah dibuat ✅
- [ ] Load rules di setiap coding session (`.cursor/rules` atau prompt)
- [ ] Iterate rules berdasarkan AI output quality

#### 0.4 Git & Workflow Setup

- [ ] Init Git repository (jika belum)
- [ ] Setup `.gitignore` (exclude `.env.local`, `node_modules`, etc.)
- [ ] Setup branch strategy (main, dev, feature/*)
- [ ] (Optional) Setup Husky untuk pre-commit hooks

---

### Phase 3: Rancangan (Design & Architecture) (✅ Completed)

> **Tujuan:** Design sistem end-to-end sebelum implementasi — mencegah rework besar!

#### 3.1 User Flow & Journey Map (✅ Completed)

- [x] Map user journey: Landing → Browse → Cart → Checkout → Payment → Order Tracking
- [x] Map admin flow: Login → Dashboard → Manage Products → Manage Orders
- [x] Document edge cases (out of stock, payment failed, address tidak valid)
- [x] Create flow diagrams (Mermaid) di `docs/flows/`
  - [x] `user-flow.md` - User flow dengan edge cases
  - [x] `admin-flow.md` - Admin panel workflow
  - [x] `user-journey-map.md` - Detailed persona journeys (Budi, Rina, Pak Hendra)

#### 3.2 Database Design (Detail) (✅ Completed)

- [x] Schema sudah ada di `database.md` ✅
- [x] Create Entity-Relationship Diagram (ERD) → `docs/diagrams/erd.md`
- [x] Validate normalization (portability-first approach)
- [x] Define Firestore security rules skeleton
- [x] Plan data migration strategy (Supabase fallback documented)

#### 3.3 Architecture Design (✅ Completed)

- [x] High-level architecture sudah ada di `architecture.md` ✅
- [x] Detail component structure (folder tree) → `docs/architecture-detail.md`
- [x] Define state management strategy (Zustand stores, React Query cache)
- [x] API route planning (Next.js Route Handlers)
- [x] Third-party integration points (Midtrans, RajaOngkir)

#### 3.4 UI/UX Design (Wireframes & Mockups) (✅ Completed)

- [x] **Low-Fi Wireframes** (Markdown ASCII) → `docs/wireframes.md`
  - [x] Landing Page (Hero, Categories, Featured Products, Footer)
  - [x] Product Catalog (Grid, Filters, Search, Pagination)
  - [x] Product Detail (Gallery, Specs, Stock badge, Add to Cart)
  - [x] Cart Page (List items, Quantity, Summary)
  - [x] Checkout Flow (3-step: Address, Shipping, Payment)
  - [x] Order History (List orders, Status tracking)
  - [x] Admin Dashboard (Stats, Product mgmt, Order mgmt)
  - [x] Store Locations (List + Google Maps)

- [x] **High-Fi Mockups** (AI Generated) → `docs/mockups/`
  - [x] Landing Page → `landing-page.png`
  - [x] Checkout Flow → `checkout-flow.png`

- [x] **Mobile Responsive Design**
  - [x] Mobile wireframe untuk key pages (Covered in Low-Fi)
  - [x] Tablet breakpoint considerations

#### 3.5 Design System & Tokens (✅ Completed)

- [x] Colors defined di `frontend.md` ✅
- [x] Typography scale (font sizes, weights, line-heights)
- [x] Spacing scale (4px, 8px, 16px, 24px, etc.)
- [x] Component variants (Button sizes, Card styles)
- [x] Document di `docs/design-system.md`

#### 3.6 Context Strategy (✅ Completed)

- [x] Decide context management approach:
  - [x] Focus per Fitur (untuk MVP < 4 minggu)
  - [ ] Skill Layer Method (jika unlimited token + large codebase)
- [x] Create context files → `docs/context-strategy.md`
- [x] Define 5 context profiles (Auth, Catalog, Checkout, Admin, Shipping)

---

### Phase 4: Development (MVP) (🔄 In Progress)

> **Approach:** Backend Hardening & Logic Correction (Prioritas Utama)

#### 4.1 Security & Architecture Repairs (🔥 CRITICAL)

- [ ] **Fix Auth Session Security**
  - [ ] Audit `src/app/api/auth/session/route.ts` (Verify minting process)
  - [ ] Implement `adminAuth.verifySessionCookie` in `src/app/api/cart/route.ts` & middleware
  - [ ] Remove raw UID usage from cookies
- [ ] **Fix Shipping API Logic & Safety**
  - [ ] Remove `any` types in `shipping/cost/route.ts` -> Create strict interfaces
  - [ ] Implement proper Error Handling (Return meta error codes, don't swallow errors)
  - [ ] Remove `courier` hardcoding (Use dynamic config/env)
  - [ ] Resolve Logic Overlap (Clarify Fleet vs Expedition priority)
- [ ] **Cart Sync Logic Verification**
  - [ ] Verify/Implement proper conflict resolution for Cart Merge

#### 4.2 Project Setup (✅ Completed)

- [x] Initialize Next.js 15 project (Manual setup)
- [x] Setup Tailwind CSS + Config (TIB Red #D32F2F)
- [x] Install Shadcn/ui dependencies
- [x] Setup TypeScript strict mode
- [x] Configure ESLint + Prettier

#### 4.2 Firebase Configuration (✅ Completed)

- [x] Create Firebase project
- [x] Setup Firestore database
- [x] Setup Firebase Auth
- [x] Setup Firebase Storage
- [x] Configure environment variables (`.env.local`)
- [x] Initialize Firebase Admin SDK
- [x] Create client config (`src/lib/firebase/config.ts`)
- [x] Create admin config (`src/lib/firebase/admin.ts`)
- [x] Create Firestore security rules (`firestore.rules`)
- [x] Create Storage security rules (`storage.rules`)

#### 4.3 Backend Development

- [x] Authentication flow (Email/Password, Google OAuth)
- [x] Route protection (Middleware & AuthGuard)
- [x] Product API routes (`/api/products/*`)
- [x] Cart management (sessionStorage + Firestore)
- [x] Order creation & management
- [x] Payment webhook (Midtrans callback)
- [x] Shipping estimation (RajaOngkir + Custom Armada)
- [/] **Hardening:** Secure Auth Session (Firebase Session Cookie)
- [/] **Hardening:** Strict Shipping Types & Safety

#### 4.4 Frontend Development

- [x] Component library setup (Shadcn UI components)
- [ ] Layout components (Header, Footer, Sidebar)
- [ ] Landing Page
- [ ] Product Catalog (with filters, search, sort)
- [ ] Product Detail Page
- [ ] Cart Page
- [ ] Checkout Flow (3 steps)
- [ ] Order History
- [ ] User Profile & Settings

#### 4.5 Admin Dashboard

- [ ] Admin authentication & authorization
- [ ] Product CRUD (Create, Read, Update, Delete)
- [ ] Order management (status updates, tracking)
- [ ] Dashboard analytics (sales, orders, users)
- [ ] Inventory management

#### 4.6 Third-Party Integrations

- [ ] Midtrans/Xendit payment gateway
- [ ] RajaOngkir shipping estimation
- [ ] WhatsApp integration (sticky button + pre-filled message)
- [ ] Google Maps (Store locations)

---

### Phase 5: Verification & Testing (⚠️ CRITICAL NEW!)

> **⚠️ WARNING:** ArXiv 2025 paper menemukan **970+ vulnerabilities** di vibe-coded apps tanpa verification!

#### 5.1 Self-Verification Checklist

- [ ] All TypeScript compiles without errors (`npm run build`)
- [ ] ESLint clean (no warnings/errors)
- [ ] No console errors in browser
- [ ] Mobile responsive check (Chrome DevTools)

#### 5.2 Auto Testing with MCP

- [ ] Setup Chrome DevTools MCP untuk automated browser testing
- [ ] Test critical user flows:
  - [ ] Landing → Product → Cart → Checkout
  - [ ] Payment simulation
  - [ ] Order tracking
- [ ] Performance audit (Lighthouse score > 80 mobile)

#### 5.3 Unit & Integration Tests

- [ ] Setup Jest/Vitest
- [ ] Write unit tests untuk utils & helpers
- [ ] Write integration tests untuk API routes
- [ ] Test coverage > 60% untuk critical paths

#### 5.4 E2E Tests

- [ ] Setup Playwright
- [ ] E2E test: Guest checkout flow
- [ ] E2E test: Authenticated user order
- [ ] E2E test: Admin product management

#### 5.5 Security Audit (WAJIB!)

- [ ] Run `npm audit` → fix vulnerabilities
- [ ] Check for hardcoded secrets (use `git-secrets` or Gitleaks)
- [ ] Validate input sanitization (all forms)
- [ ] Review Firestore security rules
- [ ] Test authentication & authorization
- [ ] SQL injection checks (jika ada raw queries)

#### 5.6 Human/AI Code Review

- [ ] AI code review: "Review for security vulnerabilities"
- [ ] AI code review: "Check for performance issues"
- [ ] Human review: Architecture decisions
- [ ] Human review: Business logic validation

#### 5.7 Fix Loop

- [ ] Identify failing tests → AI suggest fixes → Apply → Re-test
- [ ] Iterate until all tests pass
- [ ] Final human review sebelum merge ke main

---

### Phase 6: Deployment (⏳ Pending)

#### 6.1 Pre-Deployment Checklist

- [ ] Environment variables configured di hosting
- [ ] Database seeded dengan initial data
- [ ] HTTPS/SSL enabled (default di Vercel)
- [ ] Domain connected (custom domain)

#### 6.2 Deployment Execution

- [ ] Deploy to Vercel (atau VPS dengan Coolify/Dokploy)
- [ ] Verify production build success
- [ ] Test production URL

#### 6.3 CI/CD Setup (Optional for MVP)

- [ ] Setup GitHub Actions untuk automated tests
- [ ] Auto-deploy on push to main
- [ ] Slack/Discord notifications

#### 6.4 Monitoring (Optional for MVP)

- [ ] Setup Sentry untuk error tracking
- [ ] Setup Google Analytics atau Plausible
- [ ] Configure Vercel Analytics

---

### Phase 7: Iteration Loop (⏳ Post-Launch)

> **Tujuan:** Continuous improvement berdasarkan user feedback real

#### 7.1 Launch MVP

- [ ] Soft launch ke early adopters
- [ ] Collect initial feedback (surveys, interviews)

#### 7.2 Measure Metrics

- [ ] Track KPIs (dari `prd.md`):
  - [ ] Monthly Active Users
  - [ ] Conversion Rate
  - [ ] Cart Abandonment Rate
  - [ ] Average Order Value

#### 7.3 Analyze with AI

- [ ] Summarize user feedback dengan AI
- [ ] Identify pain points & feature requests
- [ ] Prioritize next iteration features

#### 7.4 Plan Next Iteration

- [ ] Create new user stories untuk v2
- [ ] Update PRD dengan findings
- [ ] **BACK TO PHASE 1** untuk next cycle

---

## 📝 Notes

### Key Decisions Made

1. **Tech Stack:** Next.js 15 + TypeScript + Firebase + Tailwind CSS
2. **State Management:** Zustand (untuk performa optimal)
3. **CMS:** Sanity (untuk manajemen konten)
4. **Approach:** Mobile-first, MVP-focused

### Important Links

- Discovery Doc: `docs/discovery.md`
- PRD: `docs/prd.md` (upcoming)
- Architecture: `docs/architecture.md` (upcoming)

---

*Last updated: 7 Januari 2026*
