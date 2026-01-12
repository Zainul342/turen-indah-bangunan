# Prompt Validasi Frontend untuk Grok 3 / Claude Opus

**Tujuan:** Mendapatkan validasi mendalam, kritik pedas, dan saran optimasi untuk fase Frontend Development Turen Indah Bangunan.

---

**Copy & Paste prompt berikut ke Grok:**

```markdown
Act as a Senior Principal Frontend Engineer & UX Architect specializing in Next.js 15, TypeScript, and Conversion Rate Optimization (CRO).

I am building "Turen Indah Bangunan", a modern building material e-commerce site.
**Tech Stack:** 
- Next.js 15 (App Router, Server Components)
- TypeScript (Strict Mode)
- Tailwind CSS (Premium "Nixtio Vibe" Design System)
- Shadcn UI
- Firebase (Auth, Firestore)
- Zustand (Client State)
- Midtrans (Payment)
- RajaOngkir (Shipping)

We have just completed **Phase 4.4: Frontend Development**. 
All core flows are implemented: Landing, Product Catalog, Cart, Checkout (3-steps), User Profile, and Order History.

I need you to perform a **"Critical Code & UX Validation"**. I will provide the code for key components/pages. 
Please review them based on these 5 pillars:

1.  **Architecture & Performance:**
    - Are we leveraging React Server Components (RSC) vs Client Components correctly?
    - Is the Suspense boundary usage optimal for loading states?
    - Are there potential re-render risks in the Zustand store implementations?

2.  **Validation & Type Safety:**
    - Are the Zod schemas distinct enough for Form vs API validation?
    - Is the TypeScript strictness sufficient? (Any potential `any` or `as` bypasses?)

3.  **UX & "Premium Feel" (Nixtio Vibe):**
    - Suggest micro-interactions that verify the "Premium" feel (e.g., toast feedback, transitions).
    - Are error states (form errors, network failures) handled gracefully?
    - Accessibility check (ARIA labels, keyboard nav) for Shadcn components.

4.  **Security & Logic:**
    - specific review on the Checkout Flow constraints (e.g., address validation before payment).
    - specific review on the Route Protection (Middleware + Client AuthGuard).

5.  **Edge Case Coverage:**
    - What happens if Firebase token expires during checkout?
    - What happens if stock changes while user is on the payment screen?

---
**INSTRUCTIONS FOR YOU (GROK):**
Don't hold back. If you see a "smell", call it out.
Rank your feedback by **Priority (Critical/High/Medium)** and provide **Code Snippets** for fixes.

I will paste the code for my **[Checkout Flow / Product Detail Page / Middleware]** next. Are you ready?
```

---

### Cara Pakai

1. Paste prompt di atas ke Grok.
2. Setelah Grok menjawab "Ready", paste code yang ingin divalidasi.
    * *Contoh:* Paste isi file `checkout-store.ts`, `checkout-page.tsx`, dan `api/transaction/route.ts` secara bersamaan untuk validasi full flow.

### File Kunci untuk Divalidasi (Prioritas)

1. `src/store/checkout-store.ts` (State logic is complex usually)
2. `src/app/(public)/checkout/page.tsx` (Integration point)
3. `src/middleware.ts` (Security gate)
4. `src/app/api/shipping/cost/route.ts` (Business logic heavy)
