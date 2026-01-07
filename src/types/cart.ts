/**
 * Cart Types
 * ===========
 * TypeScript type definitions for cart-related data.
 *
 * @file src/types/cart.ts
 * @project Turen Indah Bangunan
 */

// ============================================
// Cart Item
// ============================================

export interface CartItem {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
    addedAt: string; // ISO string
}

// ============================================
// Cart
// ============================================

export interface Cart {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    updatedAt: string;
}

// ============================================
// Cart Actions
// ============================================

export interface AddToCartInput {
    productId: string;
    productName: string;
    productImage: string;
    price: number;
    quantity: number;
}

export interface UpdateCartItemInput {
    productId: string;
    quantity: number;
}

// ============================================
// API Response Types
// ============================================

export interface CartResponse {
    success: true;
    data: Cart;
}

export interface CartSyncResponse {
    success: true;
    message: string;
    data: Cart;
}
