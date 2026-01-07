# 🎨 Design System & Tokens - Turen Indah Bangunan

> **Phase 3.5:** Design System  
> **Version:** 1.0  
> **Tech Stack:** Tailwind CSS v3.4+, Shadcn/ui  
> **Base Reference:** `docs/frontend.md`

---

## 1. Introduction

This document serves as the **single source of truth** for all design decisions, tokens, and component specifications. It translates the visual guidelines into technical specifications ready for implementation using Tailwind CSS and React components.

**Philosophy:**

* **Trustworthy:** Clean, professional, sturdy construction vibe.
* **Mobile-First:** Optimized for use on construction sites.
* **Accessible:** High contrast, large touch targets, clear hierarchy.

---

## 2. Design Tokens

### 2.1 Colors

**Brand Colors**

```javascript
// tailwind.config.ts logic
colors: {
  brand: {
    DEFAULT: '#D32F2F', // Primary Red (TIB Red)
    50: '#FDF2F2',
    100: '#FDE8E8',
    200: '#FBD5D5',
    300: '#F8B4B4',
    400: '#F98080',
    500: '#F05252',
    600: '#D32F2F', // Base
    700: '#C81E1E',
    800: '#9B1C1C',
    900: '#771D1D',
  },
  slate: { ... } // Default Tailwind Slate for neutrals
}
```

**Semantic Mapping (Shadcn/ui)**

| Token | Light Mode (Hex) | Dark Mode (Hex) | Usage |
| :--- | :--- | :--- | :--- |
| `background` | `#FFFFFF` | `#0F172A` | Page background |
| `foreground` | `#0F172A` | `#F8FAFC` | Default text |
| `primary` | `#D32F2F` | `#EF4444` | Main actions, buttons |
| `primary-foreground` | `#FFFFFF` | `#FFFFFF` | Text on primary |
| `secondary` | `#F1F5F9` | `#1E293B` | Secondary buttons, subtle bg |
| `secondary-foreground` | `#0F172A` | `#F8FAFC` | Text on secondary |
| `muted` | `#F8FAFC` | `#0F172A` | Disabled states, subtle backgrounds |
| `muted-foreground` | `#64748B` | `#94A3B8` | Subtitles, metadata |
| `accent` | `#F1F5F9` | `#1E293B` | Hover states, interactive list items |
| `accent-foreground` | `#0F172A` | `#F8FAFC` | Text on accent |
| `destructive` | `#EF4444` | `#7F1D1D` | Error states, delete actions |
| `border` | `#E2E8F0` | `#1E293B` | Borders, dividers |
| `input` | `#E2E8F0` | `#1E293B` | Input borders |
| `ring` | `#D32F2F` | `#EF4444` | Focus rings |

**Status Colors**

* **Success:** `#10B981` (Emerald 500) - Start Ready, Completed
* **Warning:** `#F59E0B` (Amber 500) - Low Stock, Pending
* **Error:** `#EF4444` (Red 500) - Out of Stock, Failed

---

### 2.2 Typography

**Font Family**

* **Primary:** `Inter`, sans-serif (Google Fonts)
* **Fallback:** `ui-sans-serif, system-ui, sans-serif`

**Type Scale**

| Name | Class | Size / Line Height | Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | `text-3xl` | 30px / 36px | Bold (700) | Page Titles |
| **H2** | `text-2xl` | 24px / 32px | Semibold (600) | Section Headers |
| **H3** | `text-xl` | 20px / 28px | Semibold (600) | Card Titles |
| **Large** | `text-lg` | 18px / 28px | Semibold (600) | Highlight text |
| **Base** | `text-base` | 16px / 24px | Regular (400) | Body Content |
| **Small** | `text-sm` | 14px / 20px | Medium (500) | Metadata, hints |
| **Tiny** | `text-xs` | 12px / 16px | Medium (500) | Badges, labels |

---

### 2.3 Spacing & Sizing

**Base Unit:** `4px` (0.25rem)

**Container Widths**

* **Mobile:** 100% (padding `px-4`)
* **Tablet:** `max-w-screen-md`
* **Desktop:** `max-w-screen-xl` (1280px)

**Spacing System**

* Inside Components: `p-2` (8px), `p-4` (16px), `gap-2` (8px)
* Between Sections: `py-8` (32px mobile), `py-16` (64px desktop)

---

### 2.4 Radius & Shadows

**Border Radius**

* `rounded-md` (6px): Small elements (badges, tags)
* `rounded-lg` (8px): Inputs, Buttons, Dropdowns
* `rounded-xl` (12px): Cards, Modals, Containers
* `rounded-full`: Avatars, Pills, Status Indicators

**Shadows**

* `shadow-sm`: Buttons, Inputs (default state)
* `shadow`: Cards (default state)
* `shadow-md`: Cards (hover state), Dropdowns
* `shadow-lg`: Modals, Sticky Headers

---

## 3. Component Specifications

### 3.1 Buttons

**Base Styles:**
`inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`

**Variants:**

1. **Default (Primary):**
    * `bg-primary text-primary-foreground hover:bg-primary/90`
    * Use for: "Beli Sekarang", "Checkout", "Login"
2. **Destructive:**
    * `bg-destructive text-destructive-foreground hover:bg-destructive/90`
    * Use for: "Hapus", "Logout"
3. **Outline:**
    * `border border-input bg-background hover:bg-accent hover:text-accent-foreground`
    * Use for: "Lihat Detail", "Kembali", Secondary actions
4. **Secondary:**
    * `bg-secondary text-secondary-foreground hover:bg-secondary/80`
    * Use for: Category tags, filters
5. **Ghost:**
    * `hover:bg-accent hover:text-accent-foreground`
    * Use for: Navigation links, icon buttons

**Sizes:**

* **Default:** `h-10 px-4 py-2`
* **Sm:** `h-9 rounded-md px-3`
* **Lg:** `h-11 rounded-md px-8` (Main CTA)
* **Icon:** `h-10 w-10`

---

### 3.2 Product Card

**Container:**

* `bg-card text-card-foreground`
* `rounded-xl border shadow-sm transition-all hover:shadow-md`
* `overflow-hidden`

**Structure:**

1. **Image Area:**
    * Aspect Ratio: `aspect-square` (1:1)
    * Background: `bg-secondary` (placeholder)
    * Badge: Absolute top-left `m-2`
2. **Content Area:**
    * Padding: `p-4`
    * Stack: Gap `gap-2`
3. **Typography:**
    * Category: `text-xs text-muted-foreground`
    * Title: `text-sm font-semibold leading-tight line-clamp-2`
    * Price: `text-base font-bold text-primary`

---

### 3.3 Inputs & Forms

**Input Field:**

* `h-10 w-full rounded-lg border border-input bg-background px-3 py-2`
* `text-sm ring-offset-background`
* `placeholder:text-muted-foreground`
* `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`

**Label:**

* `text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`

**Error Message:**

* `text-xs font-medium text-destructive mt-1`

---

### 3.4 Navigation Bar

**Mobile Bottom Nav:**

* Height: `h-16`
* Format: `fixed bottom-0 w-full bg-background border-t z-50`
* Items: Grid 5 columns. Icon (24px) + Label (10px).
* Active: `text-primary`

**Desktop Header:**

* Height: `h-16` (64px)
* Format: `sticky top-0 w-full bg-background/95 backdrop-blur z-50 border-b`
* Layout: Logo (Left) - Search (Center) - Actions (Right)

---

## 4. Assets & Icons

**Icon System:**

* **Library:** Lucide React
* **Props Default:** `size={20} strokeWidth={2}`
* **Stroke Caps:** Round
* **Stroke Join:** Round

**Common Icons:**

* Cart: `ShoppingCart`
* User: `User`
* Search: `Search`
* Menu: `Menu`
* Close: `X`
* Chevron: `ChevronDown`, `ChevronRight`

---

*Last updated: 6 Januari 2026*
