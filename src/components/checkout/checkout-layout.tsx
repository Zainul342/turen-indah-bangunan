"use client";

/**
 * Checkout Layout
 * ================
 * Two-column responsive layout for checkout flow.
 *
 * @file src/components/checkout/checkout-layout.tsx
 * @project Turen Indah Bangunan
 */

import { ReactNode } from "react";
import { CheckoutSteps } from "./checkout-steps";
import { OrderSummary } from "./shared/order-summary";
import { useCheckoutStore } from "@/stores/checkout-store";
import type { CheckoutStep } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface CheckoutLayoutProps {
    children: ReactNode;
}

// ============================================
// Component
// ============================================

export function CheckoutLayout({ children }: CheckoutLayoutProps) {
    const {
        currentStep,
        completedSteps,
        setStep,
        validatedItems,
        subtotal,
        selectedShipping,
    } = useCheckoutStore();

    const handleStepClick = (step: CheckoutStep) => {
        setStep(step);
    };

    const shippingCost = selectedShipping?.cost || 0;
    const total = subtotal + shippingCost;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header with Steps */}
            <div className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <CheckoutSteps
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={handleStepClick}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6 md:py-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Step Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-6 md:p-8">
                            {children}
                        </div>
                    </div>

                    {/* Right: Order Summary (Sticky on Desktop) */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-32">
                            <OrderSummary
                                items={validatedItems}
                                subtotal={subtotal}
                                shippingCost={shippingCost}
                                total={total}
                                shippingMethod={selectedShipping?.name}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
