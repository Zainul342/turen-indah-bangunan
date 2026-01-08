/**
 * Midtrans Snap TypeScript Declarations
 * =======================================
 * Global type declarations for Midtrans Snap.js
 *
 * @file src/types/midtrans.d.ts
 * @project Turen Indah Bangunan
 */

// ============================================
// Midtrans Snap Types
// ============================================

interface MidtransSnapResult {
    transaction_id?: string;
    order_id?: string;
    gross_amount?: string;
    payment_type?: string;
    transaction_status?: string;
    transaction_time?: string;
    fraud_status?: string;
    status_code?: string;
    status_message?: string;
}

interface MidtransSnapCallbacks {
    onSuccess?: (result: MidtransSnapResult) => void;
    onPending?: (result: MidtransSnapResult) => void;
    onError?: (result: MidtransSnapResult) => void;
    onClose?: () => void;
}

interface MidtransSnap {
    pay: (token: string, callbacks?: MidtransSnapCallbacks) => void;
    show: () => void;
    hide: () => void;
}

// ============================================
// Extend Window Interface
// ============================================

declare global {
    interface Window {
        snap?: MidtransSnap;
    }
}

export type { MidtransSnap, MidtransSnapResult, MidtransSnapCallbacks };
