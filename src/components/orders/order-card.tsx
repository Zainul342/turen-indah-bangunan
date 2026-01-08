"use client";

/**
 * Order Card
 * ===========
 * Compact order card for list view.
 *
 * @file src/components/orders/order-card.tsx
 * @project Turen Indah Bangunan
 */

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "./order-status-badge";
import { formatCurrency } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

// ============================================
// Props
// ============================================

interface OrderCardProps {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    itemCount: number;
    total: number;
    createdAt: string;
    items?: { productName: string; productImage: string }[];
}

// ============================================
// Helper Functions
// ============================================

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

// ============================================
// Component
// ============================================

export function OrderCard({
    id,
    orderNumber,
    status,
    itemCount,
    total,
    createdAt,
    items = [],
}: OrderCardProps) {
    const isCompleted = status === "completed";
    const isCancelled = status === "cancelled" || status === "refunded";

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="font-semibold text-slate-900">{orderNumber}</p>
                    <p className="text-sm text-slate-500">{formatDate(createdAt)}</p>
                </div>
                <OrderStatusBadge status={status} size="sm" />
            </div>

            {/* Preview Items */}
            <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                    {items.slice(0, 3).map((item, idx) => (
                        <div
                            key={idx}
                            className="w-10 h-10 rounded-lg bg-slate-100 border-2 border-white overflow-hidden"
                        >
                            {item.productImage ? (
                                <Image
                                    src={item.productImage}
                                    alt={item.productName}
                                    width={40}
                                    height={40}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <ShoppingBag className="h-4 w-4 text-slate-400" />
                                </div>
                            )}
                        </div>
                    ))}
                    {itemCount > 3 && (
                        <div className="w-10 h-10 rounded-lg bg-slate-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-slate-600">
                                +{itemCount - 3}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-600 truncate">
                        {itemCount} item
                    </p>
                    <p className="font-semibold text-slate-900">
                        {formatCurrency(total)}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                {isCompleted && (
                    <Button variant="outline" size="sm" className="flex-1">
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Beli Lagi
                    </Button>
                )}
                <Button asChild size="sm" className={isCompleted || isCancelled ? "flex-1" : "w-full"}>
                    <Link href={`/orders/${id}`}>
                        Detail
                        <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
