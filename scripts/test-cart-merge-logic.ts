
/**
 * Test Script for Cart Merge Logic
 * ================================
 * Verifies that mergeCarts correctly:
 * 1. Sums quantities for same product
 * 2. Keeps unique items from both sides
 * 3. Updates price from guest
 */

import { mergeCarts, calculateCartTotals } from '../src/lib/cart-utils';
import type { CartItem } from '../src/types/cart';

const existingItems: CartItem[] = [
    {
        productId: 'p1',
        productName: 'Semen A',
        productImage: 'img1',
        price: 50000,
        quantity: 2,
        addedAt: '2023-01-01T00:00:00Z',
    },
    {
        productId: 'p2',
        productName: 'Bata Merah',
        productImage: 'img2',
        price: 1000,
        quantity: 100,
        addedAt: '2023-01-01T00:00:00Z',
    },
];

const guestItems: CartItem[] = [
    {
        productId: 'p1', // Overlap
        productName: 'Semen A',
        productImage: 'img1',
        price: 55000, // Price changed
        quantity: 3,
        addedAt: '2023-01-02T00:00:00Z',
    },
    {
        productId: 'p3', // New
        productName: 'Pasir',
        productImage: 'img3',
        price: 200000,
        quantity: 1,
        addedAt: '2023-01-02T00:00:00Z',
    },
];

console.log('--- TEST START ---');

const merged = mergeCarts(existingItems, guestItems);
const { itemCount, subtotal } = calculateCartTotals(merged);

console.log('Merged Items:', JSON.stringify(merged, null, 2));
console.log('Item Count:', itemCount);
console.log('Subtotal:', subtotal);

// Assertions
let passed = true;

// Check P1 (Overlap)
const p1 = merged.find((i) => i.productId === 'p1');
if (p1?.quantity !== 5) {
    console.error('FAIL: P1 quantity should be 5, got', p1?.quantity);
    passed = false;
}
if (p1?.price !== 55000) {
    console.error('FAIL: P1 price should be 55000, got', p1?.price);
    passed = false;
}

// Check P2 (Existing only)
const p2 = merged.find((i) => i.productId === 'p2');
if (p2?.quantity !== 100) {
    console.error('FAIL: P2 quantity should be 100, got', p2?.quantity);
    passed = false;
}

// Check P3 (Guest only)
const p3 = merged.find((i) => i.productId === 'p3');
if (p3?.quantity !== 1) {
    console.error('FAIL: P3 quantity should be 1, got', p3?.quantity);
    passed = false;
}

// Check Totals
if (itemCount !== 106) {
    console.error('FAIL: Total items should be 106, got', itemCount);
    passed = false;
}

if (passed) {
    console.log('✅ ALL TESTS PASSED');
} else {
    console.error('❌ SOME TESTS FAILED');
    process.exit(1);
}
