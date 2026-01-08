"use client";

/**
 * Order Review
 * =============
 * Final order summary before payment.
 *
 * @file src/components/checkout/step-payment/order-review.tsx
 * @project Turen Indah Bangunan
 */

import { Package, MapPin, Truck, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { CheckoutItem, ShippingAddress, ShippingOption } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface OrderReviewProps {
    items: CheckoutItem[];
    shippingAddress: ShippingAddress;
    shippingOption: ShippingOption;
    subtotal: number;
    total: number;
}

// ============================================
// Component
// ============================================

export function OrderReview({
    items,
    shippingAddress,
    shippingOption,
    subtotal,
    total,
}: OrderReviewProps) {
    return (
        <div className="space-y-6">
            {/* Section: Items */}
            <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Barang Pesanan ({items.length} item)
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-center justify-between text-sm"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-slate-900">{item.productName}</p>
                                <p className="text-slate-500">
                                    {item.quantity} × {formatCurrency(item.price)}
                                </p>
                            </div>
                            <p className="font-semibold text-slate-900">
                                {formatCurrency(item.subtotal)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section: Shipping Address */}
            <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Alamat Pengiriman
                </h3>
                <div className="bg-slate-50 rounded-xl p-4">
                    <p className="font-medium text-slate-900">{shippingAddress.recipientName}</p>
                    <p className="text-sm text-slate-600">{shippingAddress.phone}</p>
                    <p className="text-sm text-slate-600 mt-2">
                        {shippingAddress.fullAddress}
                    </p>
                    <p className="text-sm text-slate-500">
                        {shippingAddress.district}, {shippingAddress.city},{" "}
                        {shippingAddress.province} {shippingAddress.postalCode}
                    </p>
                </div>
            </div>

            {/* Section: Shipping Method */}
            <div className="space-y-3">
                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Metode Pengiriman
                </h3>
                <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-900">{shippingOption.name}</p>
                        <p className="text-sm text-slate-500">
                            {shippingOption.service} • Estimasi {shippingOption.etd}
                        </p>
                    </div>
                    <p className="font-semibold text-slate-900">
                        {shippingOption.isFree ? (
                            <span className="text-green-600">GRATIS</span>
                        ) : (
                            formatCurrency(shippingOption.cost)
                        )}
                    </p>
                </div>
            </div>

            {/* Section: Totals */}
            <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Ongkos Kirim</span>
                    <span className="font-medium">
                        {shippingOption.isFree ? (
                            <span className="text-green-600">Gratis</span>
                        ) : (
                            formatCurrency(shippingOption.cost)
                        )}
                    </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-dashed border-slate-200">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(total)}</span>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Customer Notes Component
// ============================================

interface CustomerNotesProps {
    value: string;
    onChange: (value: string) => void;
}

export function CustomerNotes({ value, onChange }: CustomerNotesProps) {
    return (
        <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Catatan (Opsional)
            </h3>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Instruksi khusus untuk pengiriman, misalnya: 'Turunkan di depan pagar'"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm 
                           focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
            <p className="text-xs text-slate-400 text-right">{value.length}/500</p>
        </div>
    );
}
