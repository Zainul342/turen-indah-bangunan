/**
 * Cart Utilities
 * ==============
 * Helper functions for cart manipulation.
 *
 * @file src/lib/cart-utils.ts
 * @project Turen Indah Bangunan
 */

import { CartItem } from '@/types/cart';

/**
 * Merges two arrays of cart items.
 * - If a product exists in both, quantities are summed.
 * - If a product exists in only one, it is kept.
 * - Price is updated to the latest (guest) price.
 * 
 * @param existingItems Items currently in the user's database cart
 * @param guestItems Items from the guest/local cart being synced
 * @returns Merged array of CartItems
 */
export function mergeCarts(existingItems: CartItem[], guestItems: CartItem[]): CartItem[] {
    const mergedItemsMap = new Map<string, CartItem>();

    // 1. Add existing items to map first
    for (const item of existingItems) {
        mergedItemsMap.set(item.productId, { ...item });
    }

    // 2. Merge guest items
    for (const guestItem of guestItems) {
        if (mergedItemsMap.has(guestItem.productId)) {
            // Item exists: Sum quantity
            const existingItem = mergedItemsMap.get(guestItem.productId)!;
            existingItem.quantity += guestItem.quantity;
            // Update price to use the one from guest (assumed fresher)
            existingItem.price = guestItem.price;
        } else {
            // New item: Add to map
            mergedItemsMap.set(guestItem.productId, { ...guestItem });
        }
    }

    return Array.from(mergedItemsMap.values());
}

/**
 * Calculates total item count and subtotal for a list of items.
 * 
 * @param items Array of CartItems
 * @returns { itemCount, subtotal }
 */
export function calculateCartTotals(items: CartItem[]) {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { itemCount, subtotal };
}
