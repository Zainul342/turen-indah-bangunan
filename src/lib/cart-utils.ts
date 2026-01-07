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
export function mergeCarts(
    existingItems: CartItem[],
    guestItems: CartItem[],
    priceMap: Map<string, number>
): CartItem[] {
    const mergedItemsMap = new Map<string, CartItem>();

    // 1. Add existing items to map first
    for (const item of existingItems) {
        // Validate price against source of truth (if available), otherwise keep existing (db) price
        const validPrice = priceMap.get(item.productId) ?? item.price;
        mergedItemsMap.set(item.productId, {
            ...item,
            price: validPrice
        });
    }

    // 2. Merge guest items
    for (const guestItem of guestItems) {
        // SECURITY: Always use the price from the database (priceMap)
        // If product doesn't exist in DB (priceMap is missing), we skip this item (don't add invalid items)
        const validPrice = priceMap.get(guestItem.productId);

        if (validPrice === undefined) {
            console.warn(`Skipping unknown product during sync: ${guestItem.productId}`);
            continue;
        }

        if (mergedItemsMap.has(guestItem.productId)) {
            // Item exists: Sum quantity
            const existingItem = mergedItemsMap.get(guestItem.productId)!;
            existingItem.quantity += guestItem.quantity;
            existingItem.price = validPrice; // Ensure price is up-to-date
        } else {
            // New item: Add to map only if we have a valid price
            mergedItemsMap.set(guestItem.productId, {
                ...guestItem,
                price: validPrice
            });
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
