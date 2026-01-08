"use client";

/**
 * Orders List Page
 * =================
 * User's order history with tab filtering.
 *
 * @file src/app/(public)/orders/page.tsx
 * @project Turen Indah Bangunan
 */

import { Suspense, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderTabs } from "@/components/orders/order-tabs";
import { OrderCard } from "@/components/orders/order-card";
import { OrderEmpty } from "@/components/orders/order-empty";
import { useAuth } from "@/hooks/use-auth";
import type { OrderStatus, OrderTabFilter } from "@/types/order";
import { ORDER_TAB_FILTERS } from "@/types/order";

// ============================================
// Types
// ============================================

interface OrderListItem {
    id: string;
    orderNumber: string;
    status: OrderStatus;
    paymentStatus: string;
    total: number;
    itemCount: number;
    createdAt: string;
    items?: { productName: string; productImage: string }[];
}

// ============================================
// Main Content Component
// ============================================

function OrdersContent() {
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<OrderTabFilter>("all");

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push("/auth/login?redirect=/orders");
        }
    }, [authLoading, isAuthenticated, router]);

    // Fetch orders
    const fetchOrders = useCallback(async () => {
        if (!isAuthenticated) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/orders");
            const data = await response.json();

            if (data.success) {
                setOrders(data.data.orders);
            } else {
                setError(data.error?.message || "Gagal memuat pesanan");
            }
        } catch {
            setError("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated, fetchOrders]);

    // Filter orders by tab
    const filteredOrders = orders.filter((order) => {
        if (activeTab === "all") return true;
        const tabStatuses = ORDER_TAB_FILTERS[activeTab].statuses;
        return tabStatuses.includes(order.status);
    });

    // Count orders per tab
    const tabCounts: Partial<Record<OrderTabFilter, number>> = {
        all: orders.length,
        ongoing: orders.filter((o) =>
            ORDER_TAB_FILTERS.ongoing.statuses.includes(o.status)
        ).length,
        completed: orders.filter((o) =>
            ORDER_TAB_FILTERS.completed.statuses.includes(o.status)
        ).length,
        cancelled: orders.filter((o) =>
            ORDER_TAB_FILTERS.cancelled.statuses.includes(o.status)
        ).length,
    };

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-xl font-bold text-slate-900">Pesanan Saya</h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchOrders}
                            disabled={isLoading}
                            className="ml-auto"
                        >
                            <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-3">
                    <OrderTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        counts={tabCounts}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-6">
                {isLoading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : error ? (
                    <div className="text-center py-16">
                        <p className="text-red-600 mb-4">{error}</p>
                        <Button onClick={fetchOrders}>Coba Lagi</Button>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <OrderEmpty type={activeTab} />
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredOrders.map((order) => (
                            <OrderCard
                                key={order.id}
                                id={order.id}
                                orderNumber={order.orderNumber}
                                status={order.status}
                                itemCount={order.itemCount}
                                total={order.total}
                                createdAt={order.createdAt}
                                items={order.items}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================
// Loading Fallback
// ============================================

function OrdersLoading() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}

// ============================================
// Page Component
// ============================================

export default function OrdersPage() {
    return (
        <Suspense fallback={<OrdersLoading />}>
            <OrdersContent />
        </Suspense>
    );
}
