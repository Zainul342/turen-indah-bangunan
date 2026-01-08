"use client";

/**
 * Order Empty State
 * ==================
 * Displayed when user has no orders.
 *
 * @file src/components/orders/order-empty.tsx
 * @project Turen Indah Bangunan
 */

import Link from "next/link";
import { Package, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================
// Props
// ============================================

interface OrderEmptyProps {
    type?: "all" | "ongoing" | "completed" | "cancelled";
}

// ============================================
// Component
// ============================================

export function OrderEmpty({ type = "all" }: OrderEmptyProps) {
    const messages = {
        all: {
            title: "Belum Ada Pesanan",
            subtitle: "Anda belum pernah melakukan pemesanan. Yuk mulai belanja!",
        },
        ongoing: {
            title: "Tidak Ada Pesanan Berlangsung",
            subtitle: "Semua pesanan Anda sudah selesai.",
        },
        completed: {
            title: "Belum Ada Pesanan Selesai",
            subtitle: "Pesanan yang sudah selesai akan muncul di sini.",
        },
        cancelled: {
            title: "Tidak Ada Pesanan Dibatalkan",
            subtitle: "Bagus! Anda tidak memiliki pesanan yang dibatalkan.",
        },
    };

    const message = messages[type];

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
                {message.title}
            </h3>
            <p className="text-slate-500 text-center mb-6 max-w-sm">
                {message.subtitle}
            </p>
            {type === "all" && (
                <Button asChild>
                    <Link href="/products">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Mulai Belanja
                    </Link>
                </Button>
            )}
        </div>
    );
}
