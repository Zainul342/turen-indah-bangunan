/**
 * Order Types
 * ============
 * TypeScript type definitions for order-related data.
 * Matches Firestore schema in docs/database.md
 *
 * @file src/types/order.ts
 * @project Turen Indah Bangunan
 */

import type { Timestamp } from 'firebase/firestore';
import type { Address } from './user';

// ============================================
// Order Status
// ============================================

export type OrderStatus =
    | 'pending_payment'
    | 'processing'
    | 'confirmed'
    | 'shipped'
    | 'delivered'
    | 'completed'
    | 'cancelled'
    | 'refunded';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

// ============================================
// Order Item
// ============================================

export interface OrderItem {
    productId: string;
    productName: string;
    productImage: string;
    sku: string;
    price: number;
    quantity: number;
    subtotal: number;
}

// ============================================
// Status History
// ============================================

export interface StatusHistory {
    status: OrderStatus;
    note?: string;
    timestamp: Timestamp | string;
    updatedBy: string;
}

// ============================================
// Order Interface (Firestore)
// ============================================

export interface Order {
    // Identity
    id: string;
    orderNumber: string; // TIB-20260107-001

    // Customer
    userId: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;

    // Items
    items: OrderItem[];
    itemCount: number;

    // Pricing
    subtotal: number;
    shippingCost: number;
    discount: number;
    total: number;

    // Shipping
    shippingAddress: Address;
    shippingMethod: string;
    shippingProvider?: string;
    trackingNumber?: string;
    estimatedDelivery?: string;

    // Payment
    paymentMethod: string;
    paymentStatus: PaymentStatus;
    paymentId?: string;
    paidAt?: Timestamp | string;

    // Order Status
    status: OrderStatus;
    statusHistory: StatusHistory[];

    // Notes
    customerNotes?: string;
    adminNotes?: string;

    // Metadata
    createdAt: Timestamp | string;
    updatedAt: Timestamp | string;
}

// ============================================
// API Response Types
// ============================================

export interface OrderListItem {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    total: number;
    itemCount: number;
    createdAt: string;
}

export interface CreateOrderResponse {
    success: true;
    data: {
        orderId: string;
        orderNumber: string;
        total: number;
        paymentToken?: string;
    };
}

export interface OrderListResponse {
    success: true;
    data: {
        orders: OrderListItem[];
    };
}

export interface OrderDetailResponse {
    success: true;
    data: Order;
}

// ============================================
// Input Types
// ============================================

export interface CreateOrderInput {
    shippingAddress: Address;
    shippingMethod: string;
    shippingCost: number;
    paymentMethod: string;
    customerNotes?: string;
}

// ============================================
// Order Status Config (for UI)
// ============================================

export interface OrderStatusConfig {
    label: string;
    color: string;
    bgColor: string;
    icon: string;
    progress: number;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfig> = {
    pending_payment: {
        label: 'Menunggu Pembayaran',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100',
        icon: 'Clock',
        progress: 10,
    },
    processing: {
        label: 'Diproses',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: 'Package',
        progress: 25,
    },
    confirmed: {
        label: 'Dikonfirmasi',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: 'CheckCircle',
        progress: 40,
    },
    shipped: {
        label: 'Dikirim',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        icon: 'Truck',
        progress: 70,
    },
    delivered: {
        label: 'Terkirim',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: 'MapPin',
        progress: 90,
    },
    completed: {
        label: 'Selesai',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        icon: 'CheckCircle2',
        progress: 100,
    },
    cancelled: {
        label: 'Dibatalkan',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
        icon: 'XCircle',
        progress: 0,
    },
    refunded: {
        label: 'Dikembalikan',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        icon: 'RotateCcw',
        progress: 0,
    },
};

// ============================================
// Tab Filter Types
// ============================================

export type OrderTabFilter = 'all' | 'ongoing' | 'completed' | 'cancelled';

export const ORDER_TAB_FILTERS: Record<OrderTabFilter, { label: string; statuses: OrderStatus[] }> = {
    all: {
        label: 'Semua',
        statuses: [],
    },
    ongoing: {
        label: 'Berlangsung',
        statuses: ['pending_payment', 'processing', 'confirmed', 'shipped', 'delivered'],
    },
    completed: {
        label: 'Selesai',
        statuses: ['completed'],
    },
    cancelled: {
        label: 'Dibatalkan',
        statuses: ['cancelled', 'refunded'],
    },
};

