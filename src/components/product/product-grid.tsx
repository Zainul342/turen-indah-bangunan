"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProductGridProps {
    children: ReactNode;
    className?: string;
    isEmpty?: boolean;
    emptyMessage?: string;
    isLoading?: boolean;
}

export function ProductGrid({
    children,
    className,
    isEmpty,
    emptyMessage = "Tidak ada produk ditemukan.",
    isLoading,
}: ProductGridProps) {
    if (isLoading) {
        return (
            <div className={cn("grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4", className)}>
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-slate-100" />
                ))}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-12 text-center">
                <div className="mb-4 text-4xl">🔎</div>
                <h3 className="text-lg font-bold text-slate-900">Maaf, Produk Tidak Ditemukan</h3>
                <p className="text-sm text-slate-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className={cn("grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4", className)}>
            {children}
        </div>
    );
}
