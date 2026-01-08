"use client";

/**
 * Order Detail Page
 * ==================
 * Single order detail with timeline and items.
 *
 * @file src/app/(public)/orders/[id]/page.tsx
 * @project Turen Indah Bangunan
 */

import { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Loader2,
    Phone,
    MapPin,
    MessageCircle,
    FileText,
    ShoppingBag,
    Copy,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderTimeline } from "@/components/orders/order-timeline";
import { useAuth } from "@/hooks/use-auth";
import { formatCurrency, cn } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";
import { ORDER_STATUS_CONFIG } from "@/types/order";

// ============================================
// Props
// ============================================

interface OrderDetailPageProps {
    params: Promise<{ id: string }>;
}

// ============================================
// Component
// ============================================

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
    const { id: orderId } = use(params);
    const router = useRouter();
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push(`/auth/login?redirect=/orders/${orderId}`);
        }
    }, [authLoading, isAuthenticated, router, orderId]);

    // Fetch order detail
    useEffect(() => {
        async function fetchOrder() {
            if (!isAuthenticated) return;

            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/orders/${orderId}`);
                const data = await response.json();

                if (data.success) {
                    setOrder(data.data);
                } else {
                    setError(data.error?.message || "Gagal memuat pesanan");
                }
            } catch {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            } finally {
                setIsLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchOrder();
        }
    }, [isAuthenticated, orderId]);

    // Copy tracking number
    const handleCopyTracking = () => {
        if (order?.trackingNumber) {
            navigator.clipboard.writeText(order.trackingNumber);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // WhatsApp deep link
    const handleContactWhatsApp = () => {
        const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281252462983";
        const message = encodeURIComponent(
            `Halo, saya ingin bertanya tentang pesanan ${order?.orderNumber}`
        );
        window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");
    };

    if (authLoading || isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <p className="text-red-600 mb-4">{error}</p>
                <Button asChild>
                    <Link href="/orders">Kembali ke Pesanan</Link>
                </Button>
            </div>
        );
    }

    if (!order) return null;

    const statusConfig = ORDER_STATUS_CONFIG[order.status as OrderStatus];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/orders">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold text-slate-900">
                                {order.orderNumber}
                            </h1>
                            <OrderStatusBadge status={order.status} size="sm" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
                {/* Progress Bar */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-600">
                            Status Pesanan
                        </span>
                        <span className={cn("text-sm font-medium", statusConfig.color)}>
                            {statusConfig.label}
                        </span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${statusConfig.progress}%` }}
                        />
                    </div>
                </div>

                {/* Tracking Number */}
                {order.trackingNumber && (
                    <div className="bg-purple-50 rounded-2xl p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-purple-600">Nomor Resi</p>
                            <p className="font-mono font-semibold text-purple-900">
                                {order.trackingNumber}
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyTracking}
                            className="text-purple-600"
                        >
                            {copied ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                )}

                {/* Timeline */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Riwayat Status
                    </h2>
                    <OrderTimeline
                        entries={order.statusHistory.map((sh) => ({
                            status: sh.status,
                            note: sh.note,
                            timestamp: typeof sh.timestamp === "string" ? sh.timestamp : "",
                            updatedBy: sh.updatedBy,
                        }))}
                        trackingNumber={order.trackingNumber}
                    />
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                        Item Pesanan ({order.itemCount})
                    </h2>
                    <div className="space-y-3">
                        {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-3">
                                <div className="w-16 h-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                                    {item.productImage ? (
                                        <Image
                                            src={item.productImage}
                                            alt={item.productName}
                                            width={64}
                                            height={64}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ShoppingBag className="h-6 w-6 text-slate-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-slate-900 truncate">
                                        {item.productName}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {item.quantity} x {formatCurrency(item.price)}
                                    </p>
                                </div>
                                <p className="font-semibold text-slate-900">
                                    {formatCurrency(item.subtotal)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Alamat Pengiriman
                    </h2>
                    <div className="text-sm text-slate-600 space-y-1">
                        <p className="font-medium text-slate-900">
                            {order.shippingAddress.recipientName}
                        </p>
                        <p className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {order.shippingAddress.phone}
                        </p>
                        <p>{order.shippingAddress.fullAddress}</p>
                        <p>
                            {order.shippingAddress.district}, {order.shippingAddress.city},{" "}
                            {order.shippingAddress.province} {order.shippingAddress.postalCode}
                        </p>
                    </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Ringkasan Pembayaran
                    </h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Subtotal</span>
                            <span>{formatCurrency(order.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Ongkir ({order.shippingMethod})
                            </span>
                            <span>{formatCurrency(order.shippingCost)}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Diskon</span>
                                <span>-{formatCurrency(order.discount)}</span>
                            </div>
                        )}
                        <div className="border-t pt-2 flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span className="text-primary">{formatCurrency(order.total)}</span>
                        </div>
                    </div>
                </div>

                {/* Customer Notes */}
                {order.customerNotes && (
                    <div className="bg-slate-100 rounded-2xl p-4">
                        <p className="text-sm text-slate-500 mb-1">Catatan:</p>
                        <p className="text-slate-700">{order.customerNotes}</p>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 gap-2"
                        onClick={handleContactWhatsApp}
                    >
                        <MessageCircle className="h-4 w-4" />
                        Hubungi via WA
                    </Button>
                    <Button asChild className="flex-1 gap-2">
                        <Link href="/products">
                            <ShoppingBag className="h-4 w-4" />
                            Belanja Lagi
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
