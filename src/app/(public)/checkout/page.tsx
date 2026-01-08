"use client";

/**
 * Checkout Page
 * ==============
 * Main checkout page with multi-step wizard.
 *
 * @file src/app/(public)/checkout/page.tsx
 * @project Turen Indah Bangunan
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutLayout } from "@/components/checkout/checkout-layout";
import { AddressForm } from "@/components/checkout/step-shipping/address-form";
import { ShippingOptions } from "@/components/checkout/step-shipping/shipping-options";
import { OrderReview, CustomerNotes } from "@/components/checkout/step-payment/order-review";
import { PaymentTrigger } from "@/components/checkout/step-payment/payment-trigger";
import { CheckoutActions } from "@/components/checkout/shared/checkout-actions";
import { useCheckoutStore } from "@/stores/checkout-store";
import { useCart } from "@/hooks/use-cart";
import { Loader2, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ShippingAddress } from "@/types/checkout";

// ============================================
// Component
// ============================================

export default function CheckoutPage() {
    const router = useRouter();
    const { items: cartItems, isLoading: cartLoading } = useCart();

    const {
        currentStep,
        setStep,
        completeStep,
        setValidatedCart,
        shippingAddress,
        setShippingAddress,
        shippingOptions,
        setShippingOptions,
        selectedShipping,
        selectShipping,
        isLoadingShipping,
        setLoadingShipping,
        customerNotes,
        setCustomerNotes,
        validatedItems,
        isCartValidated,
        getTotal,
    } = useCheckoutStore();

    const [validationError, setValidationError] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(true);

    // Validate cart on mount
    useEffect(() => {
        const validateCart = async () => {
            if (cartItems.length === 0 && !cartLoading) {
                router.push("/cart");
                return;
            }

            if (cartItems.length > 0) {
                setIsValidating(true);
                try {
                    const response = await fetch("/api/checkout/validate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            items: cartItems.map((item) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                            })),
                        }),
                    });

                    const data = await response.json();

                    if (data.success && data.data.isValid) {
                        setValidatedCart(
                            data.data.items,
                            data.data.subtotal,
                            data.data.totalWeight
                        );
                    } else if (data.data?.errors) {
                        setValidationError(
                            `Beberapa produk tidak tersedia: ${data.data.errors
                                .map((e: { message: string }) => e.message)
                                .join(", ")}`
                        );
                    }
                } catch {
                    setValidationError("Gagal memvalidasi keranjang");
                } finally {
                    setIsValidating(false);
                }
            }
        };

        validateCart();
    }, [cartItems, cartLoading, router, setValidatedCart]);

    // Fetch shipping options when address is set
    const fetchShippingOptions = async (address: ShippingAddress) => {
        setLoadingShipping(true);
        try {
            const response = await fetch("/api/checkout/shipping", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    destinationCityId: address.cityId,
                    weight: useCheckoutStore.getState().totalWeight,
                    subtotal: useCheckoutStore.getState().subtotal,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setShippingOptions(data.data.options);
            }
        } catch {
            // eslint-disable-next-line no-console
            console.error("Failed to fetch shipping options");
        } finally {
            setLoadingShipping(false);
        }
    };

    // Handle address submission
    const handleAddressSubmit = (address: ShippingAddress) => {
        setShippingAddress(address);
        fetchShippingOptions(address);
    };

    // Handle shipping selection and proceed to payment
    const handleProceedToPayment = () => {
        if (selectedShipping) {
            completeStep(1);
            setStep(2);
        }
    };

    // Handle back to shipping
    const handleBackToShipping = () => {
        setStep(1);
    };

    // Loading state
    if (cartLoading || isValidating) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-slate-600">Memvalidasi keranjang...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (validationError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white rounded-2xl shadow-card p-8 max-w-md text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-heading font-bold text-slate-900 mb-2">
                        Ada Masalah
                    </h2>
                    <p className="text-slate-600 mb-6">{validationError}</p>
                    <Button asChild>
                        <Link href="/cart">Kembali ke Keranjang</Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Empty cart redirect
    if (!isCartValidated && validatedItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="bg-white rounded-2xl shadow-card p-8 max-w-md text-center">
                    <ShoppingCart className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-heading font-bold text-slate-900 mb-2">
                        Keranjang Kosong
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Tambahkan produk ke keranjang untuk melanjutkan checkout.
                    </p>
                    <Button asChild>
                        <Link href="/products">Lihat Produk</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <CheckoutLayout>
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-heading font-bold text-slate-900 mb-2">
                            Alamat Pengiriman
                        </h2>
                        <p className="text-slate-500">
                            Masukkan alamat lengkap untuk pengiriman pesanan Anda
                        </p>
                    </div>

                    {/* Address Form */}
                    {!shippingAddress ? (
                        <AddressForm onSubmit={handleAddressSubmit} />
                    ) : (
                        <>
                            {/* Selected Address Display */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-green-900">
                                            {shippingAddress.recipientName}
                                        </p>
                                        <p className="text-sm text-green-700">
                                            {shippingAddress.phone}
                                        </p>
                                        <p className="text-sm text-green-700 mt-1">
                                            {shippingAddress.fullAddress}
                                        </p>
                                        <p className="text-sm text-green-600">
                                            {shippingAddress.district}, {shippingAddress.city},{" "}
                                            {shippingAddress.province} {shippingAddress.postalCode}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShippingAddress(null as unknown as ShippingAddress)}
                                    >
                                        Ubah
                                    </Button>
                                </div>
                            </div>

                            {/* Shipping Options */}
                            <ShippingOptions
                                options={shippingOptions}
                                selectedId={selectedShipping?.id || null}
                                onSelect={selectShipping}
                                isLoading={isLoadingShipping}
                            />

                            {/* Actions */}
                            <CheckoutActions
                                showBack={false}
                                onContinue={handleProceedToPayment}
                                continueLabel="Lanjut ke Pembayaran"
                                disabled={!selectedShipping}
                            />
                        </>
                    )}
                </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && shippingAddress && selectedShipping && (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-heading font-bold text-slate-900 mb-2">
                            Review & Pembayaran
                        </h2>
                        <p className="text-slate-500">
                            Periksa pesanan Anda sebelum melakukan pembayaran
                        </p>
                    </div>

                    {/* Order Review */}
                    <OrderReview
                        items={validatedItems}
                        shippingAddress={shippingAddress}
                        shippingOption={selectedShipping}
                        subtotal={useCheckoutStore.getState().subtotal}
                        total={getTotal()}
                    />

                    {/* Customer Notes */}
                    <CustomerNotes value={customerNotes} onChange={setCustomerNotes} />

                    {/* Payment Trigger */}
                    <PaymentTrigger total={getTotal()} />

                    {/* Back Button */}
                    <CheckoutActions
                        onBack={handleBackToShipping}
                        backLabel="Ubah Pengiriman"
                    />
                </div>
            )}
        </CheckoutLayout>
    );
}
