/**
 * useCart Hook
 * =============
 * Custom hook for cart operations with Firestore sync.
 *
 * @file src/hooks/use-cart.ts
 * @project Turen Indah Bangunan
 */

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { useAuth } from '@/hooks/use-auth';
import type { AddToCartInput, CartItem } from '@/types/cart';

// ============================================
// useCart Hook
// ============================================

export function useCart() {
    const {
        items,
        itemCount,
        subtotal,
        isLoading,
        isSyncing,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        // setItems,
        // setLoading,
        setSyncing,
        mergeWithServerCart,
    } = useCartStore();

    const { user, isAuthenticated } = useAuth();
    const hasSyncedRef = useRef(false);

    // Sync cart with Firestore on login
    useEffect(() => {
        if (isAuthenticated && user && !hasSyncedRef.current) {
            hasSyncedRef.current = true;
            syncCartOnLogin();
        }

        if (!isAuthenticated) {
            hasSyncedRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, user]);

    /**
     * Sync current cart state to Firestore
     */
    const syncCartToServer = useCallback(async () => {
        if (!isAuthenticated) return;

        try {
            await fetch('/api/cart/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // eslint-disable-next-line react-hooks/exhaustive-deps
                body: JSON.stringify({ items: useCartStore.getState().items }),
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to sync cart to server:', error);
        }
    }, [isAuthenticated]);

    /**
     * Sync local cart with Firestore on login
     */
    const syncCartOnLogin = useCallback(async () => {
        if (!isAuthenticated) return;

        setSyncing(true);
        try {
            // Fetch server cart
            const response = await fetch('/api/cart');
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data?.items) {
                    // Merge with local cart
                    mergeWithServerCart(data.data.items);

                    // Sync merged cart back to server
                    await syncCartToServer();
                }
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to sync cart on login:', error);
        } finally {
            setSyncing(false);
        }
    }, [isAuthenticated, mergeWithServerCart, setSyncing, syncCartToServer]);

    /**
     * Add item to cart (with auto-sync for logged in users)
     */
    const addToCart = useCallback(
        async (input: AddToCartInput) => {
            addItem(input);

            // Sync to server if authenticated
            if (isAuthenticated) {
                await syncCartToServer();
            }
        },
        [addItem, isAuthenticated, syncCartToServer]
    );

    /**
     * Update cart item quantity
     */
    const updateCartQuantity = useCallback(
        async (productId: string, quantity: number) => {
            updateQuantity(productId, quantity);

            if (isAuthenticated) {
                await syncCartToServer();
            }
        },
        [updateQuantity, isAuthenticated, syncCartToServer]
    );

    /**
     * Remove item from cart
     */
    const removeFromCart = useCallback(
        async (productId: string) => {
            removeItem(productId);

            if (isAuthenticated) {
                await syncCartToServer();
            }
        },
        [removeItem, isAuthenticated, syncCartToServer]
    );

    /**
     * Clear entire cart
     */
    const emptyCart = useCallback(async () => {
        clearCart();

        if (isAuthenticated) {
            await syncCartToServer();
        }
    }, [clearCart, isAuthenticated, syncCartToServer]);

    /**
     * Get item from cart by product ID
     */
    const getCartItem = useCallback(
        (productId: string): CartItem | undefined => {
            return items.find((item) => item.productId === productId);
        },
        [items]
    );

    /**
     * Check if product is in cart
     */
    const isInCart = useCallback(
        (productId: string): boolean => {
            return items.some((item) => item.productId === productId);
        },
        [items]
    );

    return {
        // State
        items,
        itemCount,
        subtotal,
        isLoading,
        isSyncing,

        // Actions
        addToCart,
        updateQuantity: updateCartQuantity,
        removeFromCart,
        clearCart: emptyCart,

        // Helpers
        getCartItem,
        isInCart,
        syncCartToServer,
    };
}

export default useCart;
