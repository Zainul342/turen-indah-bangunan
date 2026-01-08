"use client";

/**
 * Payment Trigger
 * ================
 * Initiates Midtrans Snap payment.
 *
 * @file src/components/checkout/step-payment/payment-trigger.tsx
 * @project Turen Indah Bangunan
 */

import { useEffect, useState } from "react";
import { CreditCard, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useRouter } from "next/navigation";

// ============================================
// Props
// ============================================

interface PaymentTriggerProps {
    total: number;
    onPaymentStart?: () => void;
    onPaymentSuccess?: () => void;
    onPaymentError?: (message: string) => void;
}

// ============================================
// Midtrans Snap Script Loader
// ============================================

const MIDTRANS_SNAP_URL = process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";

// ============================================
// Component
// ============================================

export function PaymentTrigger({
    total,
    onPaymentStart,
    onPaymentSuccess,
    onPaymentError,
}: PaymentTriggerProps) {
    const router = useRouter();
    const [isSnapLoaded, setSnapLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        shippingAddress,
        selectedShipping,
        customerNotes,
        setOrderDetails,
        setPaymentStatus,
        setCreatingOrder,
        orderId,
        paymentToken,
    } = useCheckoutStore();

    // Load Midtrans Snap.js script
    useEffect(() => {
        if (typeof window !== "undefined" && !window.snap) {
            const script = document.createElement("script");
            script.src = MIDTRANS_SNAP_URL;
            script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
            script.onload = () => setSnapLoaded(true);
            script.onerror = () => setError("Gagal memuat sistem pembayaran");
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else if (window.snap) {
            setSnapLoaded(true);
        }
        return undefined;
    }, []);

    // Create order and get payment token
    const handleCreateOrder = async () => {
        if (!shippingAddress || !selectedShipping) {
            setError("Data pengiriman tidak lengkap");
            return;
        }

        setIsProcessing(true);
        setCreatingOrder(true);
        setError(null);
        onPaymentStart?.();

        try {
            const response = await fetch("/api/checkout/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    shippingAddress,
                    shippingMethod: `${selectedShipping.code}_${selectedShipping.service}`,
                    shippingCost: selectedShipping.cost,
                    customerNotes,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error?.message || "Gagal membuat pesanan");
            }

            // Store order details
            setOrderDetails(data.data.orderId, data.data.orderNumber, data.data.paymentToken);

            // Trigger Midtrans Snap
            triggerPayment(data.data.paymentToken);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            setError(message);
            onPaymentError?.(message);
        } finally {
            setIsProcessing(false);
            setCreatingOrder(false);
        }
    };

    // Trigger Snap payment popup
    const triggerPayment = (token: string) => {
        if (!window.snap) {
            setError("Sistem pembayaran belum siap");
            return;
        }

        window.snap.pay(token, {
            onSuccess: (_result) => {
                setPaymentStatus("success");
                onPaymentSuccess?.();
                router.push(`/checkout/success?order_id=${orderId}`);
            },
            onPending: (_result) => {
                setPaymentStatus("pending");
                router.push(`/checkout/success?order_id=${orderId}&status=pending`);
            },
            onError: (_result) => {
                setPaymentStatus("failed");
                setError("Pembayaran gagal. Silakan coba lagi.");
                onPaymentError?.("Pembayaran gagal");
            },
            onClose: () => {
                // User closed the popup without completing payment
                setPaymentStatus("idle");
            },
        });
    };

    // If order already created, directly trigger payment
    const handlePayNow = () => {
        if (paymentToken) {
            triggerPayment(paymentToken);
        } else {
            handleCreateOrder();
        }
    };

    return (
        <div className="space-y-4">
            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-red-800">Pembayaran Gagal</p>
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Transaksi aman dengan Midtrans</span>
            </div>

            {/* Pay Button */}
            <Button
                onClick={handlePayNow}
                disabled={isProcessing || !isSnapLoaded}
                className="w-full h-14 text-lg gap-3"
                size="lg"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Memproses Pesanan...
                    </>
                ) : !isSnapLoaded ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Memuat Sistem Pembayaran...
                    </>
                ) : (
                    <>
                        <CreditCard className="h-5 w-5" />
                        Bayar Sekarang • {formatCurrency(total)}
                    </>
                )}
            </Button>

            {/* Payment Methods Info */}
            <p className="text-xs text-center text-slate-400">
                Mendukung Transfer Bank, E-Wallet, Kartu Kredit, dan lainnya
            </p>
        </div>
    );
}
