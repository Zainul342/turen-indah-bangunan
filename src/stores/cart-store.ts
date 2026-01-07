/**
 * Cart Store (Zustand)
 * =====================
 * Client-side cart state with localStorage persistence.
 * Supports both guest and authenticated users.
 *
 * @file src/stores/cart-store.ts
 * @project Turen Indah Bangunan
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, AddToCartInput, Cart } from '@/types/cart';

// ============================================
// Store Types
// ============================================

interface CartState {
    // State
    items: CartItem[];
    isLoading: boolean;
    isSyncing: boolean;

    // Computed
    itemCount: number;
    subtotal: number;

    // Actions
    addItem: (input: AddToCartInput) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeItem: (productId: string) => void;
    clearCart: () => void;
    setItems: (items: CartItem[]) => void;
    setLoading: (loading: boolean) => void;
    setSyncing: (syncing: boolean) => void;

    // Merge guest cart with server cart on login
    mergeWithServerCart: (serverItems: CartItem[]) => void;
}

// ============================================
// Helper Functions
// ============================================

function calculateItemCount(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.quantity, 0);
}

function calculateSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ============================================
// Store Implementation
// ============================================

export const useCartStore = create<CartState>()(
    persist(
        (set, _get) => ({
            // Initial state
            items: [],
            isLoading: false,
            isSyncing: false,
            itemCount: 0,
            subtotal: 0,

            // Add item to cart
            addItem: (input) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (item) => item.productId === input.productId
                    );

                    let newItems: CartItem[];

                    if (existingIndex >= 0) {
                        // Update existing item quantity
                        newItems = state.items.map((item, index) =>
                            index === existingIndex
                                ? { ...item, quantity: item.quantity + input.quantity }
                                : item
                        );
                    } else {
                        // Add new item
                        const newItem: CartItem = {
                            productId: input.productId,
                            productName: input.productName,
                            productImage: input.productImage,
                            price: input.price,
                            quantity: input.quantity,
                            addedAt: new Date().toISOString(),
                        };
                        newItems = [...state.items, newItem];
                    }

                    return {
                        items: newItems,
                        itemCount: calculateItemCount(newItems),
                        subtotal: calculateSubtotal(newItems),
                    };
                });
            },

            // Update item quantity
            updateQuantity: (productId, quantity) => {
                set((state) => {
                    if (quantity <= 0) {
                        // Remove item if quantity is 0 or less
                        const newItems = state.items.filter(
                            (item) => item.productId !== productId
                        );
                        return {
                            items: newItems,
                            itemCount: calculateItemCount(newItems),
                            subtotal: calculateSubtotal(newItems),
                        };
                    }

                    const newItems = state.items.map((item) =>
                        item.productId === productId ? { ...item, quantity } : item
                    );

                    return {
                        items: newItems,
                        itemCount: calculateItemCount(newItems),
                        subtotal: calculateSubtotal(newItems),
                    };
                });
            },

            // Remove item from cart
            removeItem: (productId) => {
                set((state) => {
                    const newItems = state.items.filter(
                        (item) => item.productId !== productId
                    );
                    return {
                        items: newItems,
                        itemCount: calculateItemCount(newItems),
                        subtotal: calculateSubtotal(newItems),
                    };
                });
            },

            // Clear entire cart
            clearCart: () => {
                set({
                    items: [],
                    itemCount: 0,
                    subtotal: 0,
                });
            },

            // Set items (used for syncing from server)
            setItems: (items) => {
                set({
                    items,
                    itemCount: calculateItemCount(items),
                    subtotal: calculateSubtotal(items),
                });
            },

            setLoading: (isLoading) => set({ isLoading }),
            setSyncing: (isSyncing) => set({ isSyncing }),

            // Merge local cart with server cart on login
            mergeWithServerCart: (serverItems) => {
                set((state) => {
                    const mergedMap = new Map<string, CartItem>();

                    // Add server items first
                    serverItems.forEach((item) => {
                        mergedMap.set(item.productId, item);
                    });

                    // Merge local items (add quantities if exists, otherwise add new)
                    state.items.forEach((localItem) => {
                        const existing = mergedMap.get(localItem.productId);
                        if (existing) {
                            // Take the higher quantity
                            mergedMap.set(localItem.productId, {
                                ...existing,
                                quantity: Math.max(existing.quantity, localItem.quantity),
                            });
                        } else {
                            mergedMap.set(localItem.productId, localItem);
                        }
                    });

                    const mergedItems = Array.from(mergedMap.values());

                    return {
                        items: mergedItems,
                        itemCount: calculateItemCount(mergedItems),
                        subtotal: calculateSubtotal(mergedItems),
                    };
                });
            },
        }),
        {
            name: 'tib-cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                items: state.items,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    // Recalculate derived values after rehydration
                    state.itemCount = calculateItemCount(state.items);
                    state.subtotal = calculateSubtotal(state.items);
                }
            },
        }
    )
);

// ============================================
// Selectors
// ============================================

export const selectCartItems = (state: CartState) => state.items;
export const selectItemCount = (state: CartState) => state.itemCount;
export const selectSubtotal = (state: CartState) => state.subtotal;
export const selectIsLoading = (state: CartState) => state.isLoading;

export const selectCartItem = (productId: string) => (state: CartState) =>
    state.items.find((item) => item.productId === productId);

// ============================================
// Hook Shortcuts
// ============================================

export const useCartItems = () => useCartStore(selectCartItems);
export const useCartItemCount = () => useCartStore(selectItemCount);
export const useCartSubtotal = () => useCartStore(selectSubtotal);
