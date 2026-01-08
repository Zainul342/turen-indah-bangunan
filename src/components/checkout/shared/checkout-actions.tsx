"use client";

/**
 * Checkout Actions
 * =================
 * Navigation buttons for checkout steps.
 *
 * @file src/components/checkout/shared/checkout-actions.tsx
 * @project Turen Indah Bangunan
 */

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ============================================
// Props
// ============================================

interface CheckoutActionsProps {
    onBack?: () => void;
    onContinue?: () => void;
    backLabel?: string;
    continueLabel?: string;
    showBack?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

// ============================================
// Component
// ============================================

export function CheckoutActions({
    onBack,
    onContinue,
    backLabel = "Kembali",
    continueLabel = "Lanjutkan",
    showBack = true,
    isLoading = false,
    disabled = false,
    className,
}: CheckoutActionsProps) {
    return (
        <div
            className={cn(
                "flex flex-col-reverse sm:flex-row justify-between gap-3 pt-6 border-t border-slate-100",
                className
            )}
        >
            {/* Back Button */}
            {showBack && onBack ? (
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onBack}
                    disabled={isLoading}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {backLabel}
                </Button>
            ) : (
                <div /> // Spacer for flex alignment
            )}

            {/* Continue Button */}
            {onContinue && (
                <Button
                    type="button"
                    onClick={onContinue}
                    disabled={disabled || isLoading}
                    className="gap-2 min-w-[160px]"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Memproses...
                        </>
                    ) : (
                        <>
                            {continueLabel}
                            <ArrowRight className="h-4 w-4" />
                        </>
                    )}
                </Button>
            )}
        </div>
    );
}
