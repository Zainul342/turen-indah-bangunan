"use client";

/**
 * Checkout Success Page
 * ======================
 * Order confirmation after successful payment.
 *
 * @file src/app/(public)/checkout/success/page.tsx
 * @project Turen Indah Bangunan
 */

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle2,
    Clock,
    Package,
    ArrowRight,
    Home,
    FileText,
    Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckoutStore } from "@/stores/checkout-store";
import { cn } from "@/lib/utils";

// ============================================
// Inner Component (needs Suspense wrapper)
// ============================================

function CheckoutSuccessContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status") || "success";
    const orderIdParam = searchParams.get("order_id");

    const { orderNumber, reset } = useCheckoutStore();
    const [showConfetti, setShowConfetti] = useState(false);

    // Show confetti on success
    useEffect(() => {
        if (status === "success") {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [status]);

    // Reset checkout store after viewing success
    useEffect(() => {
        const timer = setTimeout(() => {
            reset();
        }, 5000);
        return () => clearTimeout(timer);
    }, [reset]);

    const isPending = status === "pending";

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            {/* Confetti Animation */}
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                backgroundColor: ['#D32F2F', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0'][
                                    Math.floor(Math.random() * 5)
                                ],
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-card max-w-lg w-full p-8 text-center">
                {/* Status Icon */}
                <div
                    className={cn(
                        "w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center",
                        isPending ? "bg-yellow-100" : "bg-green-100"
                    )}
                >
                    {isPending ? (
                        <Clock className="h-10 w-10 text-yellow-600" />
                    ) : (
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    )}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">
                    {isPending ? "Menunggu Pembayaran" : "Pesanan Berhasil!"}
                </h1>

                {/* Description */}
                <p className="text-slate-600 mb-6">
                    {isPending
                        ? "Silakan selesaikan pembayaran Anda sesuai instruksi yang diberikan."
                        : "Terima kasih! Pesanan Anda sedang diproses."}
                </p>

                {/* Order Number */}
                {(orderNumber || orderIdParam) && (
                    <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                        <p className="text-sm text-slate-500 mb-1">Nomor Pesanan</p>
                        <p className="text-xl font-bold text-slate-900 font-mono">
                            {orderNumber || orderIdParam}
                        </p>
                    </div>
                )}

                {/* Status Badge */}
                <div
                    className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8",
                        isPending
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                    )}
                >
                    {isPending ? (
                        <>
                            <Clock className="h-4 w-4" />
                            Menunggu Pembayaran
                        </>
                    ) : (
                        <>
                            <Package className="h-4 w-4" />
                            Pesanan Diproses
                        </>
                    )}
                </div>

                {/* Next Steps */}
                <div className="space-y-4 mb-8">
                    <h3 className="font-semibold text-slate-900">Langkah Selanjutnya</h3>
                    <div className="text-left space-y-3">
                        {isPending ? (
                            <>
                                <div className="flex items-start gap-3 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs">
                                        1
                                    </div>
                                    <p className="text-slate-600">
                                        Selesaikan pembayaran sesuai metode yang dipilih
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 text-xs">
                                        2
                                    </div>
                                    <p className="text-slate-600">
                                        Konfirmasi akan dikirim via email/WhatsApp
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-start gap-3 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 text-xs">
                                        ✓
                                    </div>
                                    <p className="text-slate-600">
                                        Pembayaran berhasil diterima
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-xs">
                                        2
                                    </div>
                                    <p className="text-slate-600">
                                        Pesanan akan dikirim dalam 1-3 hari kerja
                                    </p>
                                </div>
                                <div className="flex items-start gap-3 text-sm">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 text-xs">
                                        3
                                    </div>
                                    <p className="text-slate-600">
                                        Anda akan menerima notifikasi saat pesanan dikirim
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild variant="outline" className="flex-1 gap-2">
                        <Link href="/orders">
                            <FileText className="h-4 w-4" />
                            Lihat Pesanan
                        </Link>
                    </Button>
                    <Button asChild className="flex-1 gap-2">
                        <Link href="/">
                            <Home className="h-4 w-4" />
                            Kembali ke Beranda
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ============================================
// Loading Fallback
// ============================================

function SuccessPageLoading() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-card max-w-lg w-full p-8 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-slate-600">Memuat konfirmasi pesanan...</p>
            </div>
        </div>
    );
}

// ============================================
// Main Page Component (with Suspense)
// ============================================

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<SuccessPageLoading />}>
            <CheckoutSuccessContent />
        </Suspense>
    );
}
