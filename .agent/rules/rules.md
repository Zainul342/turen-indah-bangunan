---
trigger: always_on
---

# 📋 Project Rules: Turen Indah Bangunan

> **Last Updated:** 6 Januari 2026  
> **Version:** 1.0

---

## 📋 GENERAL WORKFLOW

- **Plan First**: Jangan tulis code sebelum struktur disetujui. Buat 2-3 breakdown steps jika task kompleks.
- **Source of Truth**:
  - Requirements: `docs/prd.md`
  - Architecture: `docs/architecture.md`
  - Database: `docs/database.md`
  - API: `docs/api.md`
  - UI/UX: `docs/frontend.md`
  - Security: `docs/security.md`
- **Step-by-Step**: Ikuti alur dokumentasi, jangan skip.
- **Verification**: Verifikasi setiap fitur setelah dibuat. "Plan → Small Tasks → Verify".
- **Context Awareness**: Selalu referensikan dokumentasi sebelum mengubah logic.

---

## ❌ JANGAN (Don'ts)

| Rule | Alasan |
|------|--------|
| Jangan gunakan `type: any` | Gunakan tipe eksplisit atau `unknown` |
| Jangan hardcode secrets | Gunakan `.env.local` untuk API keys |
| Jangan hapus file sembarangan | Minta konfirmasi dulu |
| Jangan over-engineer | Keep it simple (KISS), gunakan shadcn/ui |
| Jangan abaikan linter | Pastikan tidak ada warning/error |
| Jangan commit ke main langsung | Branch → PR → Merge |
| Jangan percaya harga dari client | Validasi harga di backend dari DB |
| Jangan simpan password plain | Firebase Auth handles hashing |

---

## ✅ LAKUKAN (Do's)

| Rule | Detail |
|------|--------|
| Responsive Design | Mobile-first approach untuk kontraktor lapangan |
| Type Safety | 100% TypeScript, Zod untuk validation |
| Component Reusability | Gunakan `components/ui` dari shadcn |
| Self-Verification | Jalankan lint dan type-check sebelum submit |
| Error Handling | Try-catch untuk semua API calls |
| Human-in-the-Loop | Minta review untuk keputusan arsitektur |
| Use MCP when needed | Context7 untuk docs terbaru, Firecrawl untuk research |

---

## 📦 TECH STACK

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | App Router, Server Components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Styling utility-first |
| Shadcn/ui | Latest | Component library |
| Zustand | 5.x | Client state |
| React Query | 5.x | Server state & caching |
| Lucide React | - | Icons |

### Backend & Database

| Technology | Purpose |
|------------|---------|
| Firebase Firestore | NoSQL database |
| Firebase Auth | Authentication (Hybrid model) |
| Firebase Storage | Image/file storage |

### Third-Party Services

| Service | Purpose |
|---------|---------|
| Midtrans/Xendit | Payment gateway |
| RajaOngkir V2 | Shipping estimation |
| WhatsApp | Customer communication (deep links) |
| Vercel | Hosting & deployment |

---

## 🎨 CODE STYLE

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Variables/Functions | camelCase | `getProductById` |
| Components | PascalCase | `ProductCard` |
| Files | kebab-case | `product-card.tsx` |
| CSS Classes | kebab-case | `product-header` |
| Constants | UPPER_SNAKE | `MAX_CART_ITEMS` |
| Types/Interfaces | PascalCase | `Product`, `Order` |

### File Structure

```
src/
├── app/           # Next.js App Router
├── components/    # Reusable components
│   ├── ui/        # Shadcn base components
│   └── [feature]/ # Feature-specific
├── lib/           # Utilities & configs
├── hooks/         # Custom React hooks
├── stores/        # Zustand stores
├── types/         # TypeScript types
└── schemas/       # Zod validation schemas
```

### Import Order

```typescript
// 1. React/Next
import { useState } from 'react';
import Link from 'next/link';

// 2. Third-party libs
import { z } from 'zod';

// 3. Internal components
import { Button } from '@/components/ui/button';

// 4. Hooks, utils, types
import { useAuth } from '@/hooks/use-auth';
import type { Product } from '@/types/product';
```

---

## 🔐 AUTH MODEL (Hybrid)

| User Type | Login Required? | Access |
|-----------|-----------------|--------|
| Guest | ❌ | Browse, cart, checkout |
| Customer | ✅ Opsional | + Order history, saved address |
| Admin | ✅ Wajib | Full CRUD access |

---

## 🎨 DESIGN TOKENS

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#D32F2F` | Buttons, CTAs, prices |
| Background | `#FFFFFF` | Main background |
| Foreground | `#0F172A` | Text |
| Muted | `#64748B` | Secondary text |
| Border | `#E2E8F0` | Borders |
| Success | `#10B981` | Stock ready |
| Warning | `#F59E0B` | Low stock |
| Destructive | `#EF4444` | Out of stock, errors |

---

## 🔗 REFERENCES

- **Requirements**: Refer to `docs/prd.md` for user stories and MVP scope
- **Database Schema**: Refer to `docs/database.md` for Firestore collections
- **API Endpoints**: Refer to `docs/api.md` for routes and integrations
- **UI Guidelines**: Refer to `docs/frontend.md` for design tokens
- **Security Rules**: Refer to `docs/security.md` for auth and permissions

---

## ⚙️ ENVIRONMENT VARIABLES

```env
# Firebase (NEXT_PUBLIC_ = client-side accessible)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
FIREBASE_ADMIN_PRIVATE_KEY=

# Payment
MIDTRANS_SERVER_KEY=
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=

# Shipping
RAJAONGKIR_API_KEY=

# App
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=6281252462983
```

---

*Refer to `/best-practice-coding-with-ai` workflow for AI coding guidelines.*
