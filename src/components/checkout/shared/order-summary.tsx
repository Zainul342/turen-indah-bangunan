"use client";

/**
 * Order Summary Sidebar
 * ======================
 * Displays cart items and totals during checkout.
 *
 * @file src/components/checkout/shared/order-summary.tsx
 * @project Turen Indah Bangunan
 */

import { ShoppingBag, Package, Truck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CheckoutItem } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface OrderSummaryProps {
    items: CheckoutItem[];
    subtotal: number;
    shippingCost: number;
    total: number;
    discount?: number;
    shippingMethod?: string;
}

// ============================================
// Component
// ============================================

export function OrderSummary({
    items,
    subtotal,
    shippingCost,
    total,
    discount = 0,
    shippingMethod,
}: OrderSummaryProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h3 className="font-heading font-semibold text-slate-900">
                        Ringkasan Pesanan
                    </h3>
                </div>
            </div>

            {/* Items List */}
            {items.length > 0 ? (
                <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-start gap-3 text-sm"
                        >
                            {/* Item Icon/Image Placeholder */}
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="h-5 w-5 text-slate-400" />
                            </div>

                            {/* Item Details */}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-900 truncate">
                                    {item.productName}
                                </p>
                                <p className="text-slate-500">
                                    {item.quantity} × {formatCurrency(item.price)}
                                </p>
                            </div>

                            {/* Item Subtotal */}
                            <p className="font-semibold text-slate-900 flex-shrink-0">
                                {formatCurrency(item.subtotal)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-6 text-center text-slate-500">
                    <Package className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                    <p>Keranjang kosong</p>
                </div>
            )}

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Totals */}
            <div className="p-4 space-y-3">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-900">
                        {formatCurrency(subtotal)}
                    </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-1">
                        <Truck className="h-4 w-4" />
                        {shippingMethod || "Pengiriman"}
                    </span>
                    {shippingCost === 0 ? (
                        <span className="font-medium text-green-600">Gratis</span>
                    ) : shippingCost > 0 ? (
                        <span className="font-medium text-slate-900">
                            {formatCurrency(shippingCost)}
                        </span>
                    ) : (
                        <span className="text-slate-400">—</span>
                    )}
                </div>

                {/* Discount (if any) */}
                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Diskon</span>
                        <span className="font-medium text-green-600">
                            -{formatCurrency(discount)}
                        </span>
                    </div>
                )}

                {/* Divider */}
                <div className="border-t border-dashed border-slate-200 pt-3" />

                {/* Total */}
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Total</span>
                    <span className="text-xl font-bold text-primary">
                        {formatCurrency(total)}
                    </span>
                </div>
            </div>
        </div>
    );
}
