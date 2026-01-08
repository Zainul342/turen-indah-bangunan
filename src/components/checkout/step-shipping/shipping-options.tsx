"use client";

/**
 * Shipping Options
 * =================
 * Shipping method selection cards.
 *
 * @file src/components/checkout/step-shipping/shipping-options.tsx
 * @project Turen Indah Bangunan
 */

import { Truck, Package, Clock, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { ShippingOption } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface ShippingOptionsProps {
    options: ShippingOption[];
    selectedId: string | null;
    onSelect: (option: ShippingOption) => void;
    isLoading?: boolean;
}

// ============================================
// Provider Icons
// ============================================

const providerIcons: Record<string, string> = {
    tib_fleet: "🚛",
    jne: "JNE",
    jnt: "J&T",
    sicepat: "⚡",
    anteraja: "🏃",
    pos: "📮",
};

// ============================================
// Component
// ============================================

export function ShippingOptions({
    options,
    selectedId,
    onSelect,
    isLoading = false,
}: ShippingOptionsProps) {
    // Loading state - skeleton cards
    if (isLoading) {
        return (
            <div className="space-y-3">
                <p className="text-sm font-medium text-slate-700">Memuat opsi pengiriman...</p>
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="border border-slate-200 rounded-xl p-4 animate-pulse"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-slate-200 rounded-lg" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-slate-200 rounded w-1/3" />
                                <div className="h-3 bg-slate-100 rounded w-1/2" />
                            </div>
                            <div className="h-5 bg-slate-200 rounded w-20" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Empty state
    if (options.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500">
                <Truck className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                <p className="font-medium">Tidak ada opsi pengiriman</p>
                <p className="text-sm">Pilih alamat tujuan terlebih dahulu</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-slate-700">Pilih Metode Pengiriman</p>

            {options.map((option) => {
                const isSelected = selectedId === option.id;

                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => onSelect(option)}
                        className={cn(
                            "w-full border rounded-xl p-4 text-left transition-all duration-200",
                            "hover:border-primary/50 hover:bg-primary/5",
                            isSelected
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                : "border-slate-200 bg-white"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            {/* Provider Icon */}
                            <div
                                className={cn(
                                    "w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold",
                                    option.provider === "tib_fleet"
                                        ? "bg-gradient-to-br from-primary to-primary/80 text-white"
                                        : "bg-slate-100 text-slate-600"
                                )}
                            >
                                {providerIcons[option.provider] || <Package className="h-5 w-5" />}
                            </div>

                            {/* Option Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-slate-900">
                                        {option.name}
                                    </p>
                                    {option.isFree && (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                            <Sparkles className="h-3 w-3" />
                                            Gratis
                                        </span>
                                    )}
                                    {option.isRecommended && !option.isFree && (
                                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                            Rekomendasi
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-500 truncate">
                                    {option.description}
                                </p>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                                        <Clock className="h-3 w-3" />
                                        {option.etd}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {option.service}
                                    </span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col items-end">
                                <p
                                    className={cn(
                                        "font-bold",
                                        option.isFree
                                            ? "text-green-600"
                                            : "text-slate-900"
                                    )}
                                >
                                    {option.isFree ? "GRATIS" : formatCurrency(option.cost)}
                                </p>
                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="mt-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
