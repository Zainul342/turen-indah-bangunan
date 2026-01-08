/**
 * Checkout Types
 * ===============
 * TypeScript interfaces for the checkout flow.
 *
 * @file src/types/checkout.ts
 * @project Turen Indah Bangunan
 */

// ============================================
// Step Types
// ============================================

export type CheckoutStep = 1 | 2 | 3;

export type CheckoutStepName = 'shipping' | 'payment' | 'success';

export interface StepConfig {
    step: CheckoutStep;
    name: CheckoutStepName;
    title: string;
    description: string;
}

export const CHECKOUT_STEPS: StepConfig[] = [
    {
        step: 1,
        name: 'shipping',
        title: 'Pengiriman',
        description: 'Alamat & metode kirim',
    },
    {
        step: 2,
        name: 'payment',
        title: 'Pembayaran',
        description: 'Review & bayar',
    },
    {
        step: 3,
        name: 'success',
        title: 'Selesai',
        description: 'Konfirmasi pesanan',
    },
];

// ============================================
// Address Types
// ============================================

export interface ShippingAddress {
    id?: string;
    label: string;
    recipientName: string;
    phone: string;
    province: string;
    provinceId?: string;
    city: string;
    cityId: string;
    district: string;
    postalCode: string;
    fullAddress: string;
    isDefault?: boolean;
}

export interface DestinationResult {
    id: string;
    label: string;
    province: string;
    city: string;
    district: string;
    postalCode: string;
}

// ============================================
// Shipping Types
// ============================================

export interface ShippingOption {
    id: string;
    code: string;
    name: string;
    service: string;
    description: string;
    cost: number;
    etd: string;
    isRecommended?: boolean;
    isFree?: boolean;
    provider: 'tib_fleet' | 'jne' | 'jnt' | 'sicepat' | 'anteraja' | 'pos';
}

export interface ShippingCalculationRequest {
    destinationCityId: string;
    weight: number;
    subtotal: number;
}

export interface ShippingCalculationResponse {
    success: boolean;
    data?: {
        options: ShippingOption[];
        originCity: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

// ============================================
// Order Types
// ============================================

export interface CheckoutItem {
    productId: string;
    productName: string;
    productImage?: string;
    price: number;
    quantity: number;
    subtotal: number;
}

export interface CheckoutOrder {
    // Order details
    orderId: string;
    orderNumber: string;

    // Items
    items: CheckoutItem[];
    itemCount: number;

    // Pricing
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;

    // Shipping
    shippingAddress: ShippingAddress;
    shippingMethod: string;
    shippingProvider: string;
    estimatedDelivery: string;

    // Payment
    paymentToken?: string;
    paymentStatus: PaymentStatus;

    // Notes
    customerNotes?: string;

    // Timestamps
    createdAt: string;
}

export type PaymentStatus = 'idle' | 'pending' | 'success' | 'failed' | 'expired';

// ============================================
// API Response Types
// ============================================

export interface ValidateCartResponse {
    success: boolean;
    data?: {
        items: CheckoutItem[];
        subtotal: number;
        totalWeight: number;
        isValid: boolean;
        errors?: Array<{
            productId: string;
            message: string;
        }>;
    };
    error?: {
        code: string;
        message: string;
    };
}

export interface CreateOrderRequest {
    shippingAddress: ShippingAddress;
    shippingMethod: string;
    shippingCost: number;
    customerNotes?: string;
}

export interface CreateOrderResponse {
    success: boolean;
    data?: {
        orderId: string;
        orderNumber: string;
        total: number;
        paymentToken: string;
    };
    error?: {
        code: string;
        message: string;
    };
}

// ============================================
// Midtrans Types
// ============================================

export interface MidtransResult {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: string;
    fraud_status?: string;
}

export type MidtransCallback = (result: MidtransResult) => void;

// Extend window for Snap.js
declare global {
    interface Window {
        snap?: {
            pay: (
                token: string,
                options: {
                    onSuccess: MidtransCallback;
                    onPending: MidtransCallback;
                    onError: MidtransCallback;
                    onClose: () => void;
                }
            ) => void;
        };
    }
}
