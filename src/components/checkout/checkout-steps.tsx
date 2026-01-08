"use client";

/**
 * Checkout Steps Indicator
 * =========================
 * Premium step indicator with animated progress.
 *
 * @file src/components/checkout/checkout-steps.tsx
 * @project Turen Indah Bangunan
 */

import { MapPin, CreditCard, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHECKOUT_STEPS, type CheckoutStep } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface CheckoutStepsProps {
    currentStep: CheckoutStep;
    completedSteps: CheckoutStep[];
    onStepClick?: (step: CheckoutStep) => void;
}

// ============================================
// Step Icons
// ============================================

const stepIcons = {
    1: MapPin,
    2: CreditCard,
    3: CheckCircle2,
};

// ============================================
// Component
// ============================================

export function CheckoutSteps({
    currentStep,
    completedSteps,
    onStepClick,
}: CheckoutStepsProps) {
    return (
        <div className="w-full">
            {/* Desktop View */}
            <div className="hidden md:flex items-center justify-between">
                {CHECKOUT_STEPS.map((stepConfig, index) => {
                    const StepIcon = stepIcons[stepConfig.step];
                    const isActive = currentStep === stepConfig.step;
                    const isCompleted = completedSteps.includes(stepConfig.step);
                    const isClickable = isCompleted || stepConfig.step < currentStep;

                    return (
                        <div key={stepConfig.step} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <button
                                onClick={() => isClickable && onStepClick?.(stepConfig.step)}
                                disabled={!isClickable}
                                className={cn(
                                    "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                                    isCompleted
                                        ? "bg-green-500 border-green-500 text-white"
                                        : isActive
                                            ? "bg-primary border-primary text-white shadow-glow"
                                            : "bg-white border-slate-200 text-slate-400",
                                    isClickable && !isActive && "cursor-pointer hover:border-primary/50"
                                )}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="h-6 w-6" />
                                ) : (
                                    <StepIcon className="h-5 w-5" />
                                )}

                                {/* Pulse animation for active step */}
                                {isActive && (
                                    <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                                )}
                            </button>

                            {/* Step Info */}
                            <div className="ml-3 mr-4">
                                <p
                                    className={cn(
                                        "text-sm font-semibold transition-colors",
                                        isActive || isCompleted ? "text-slate-900" : "text-slate-400"
                                    )}
                                >
                                    {stepConfig.title}
                                </p>
                                <p className="text-xs text-slate-500 hidden lg:block">
                                    {stepConfig.description}
                                </p>
                            </div>

                            {/* Connector Line */}
                            {index < CHECKOUT_STEPS.length - 1 && (
                                <div className="flex-1 h-0.5 mx-2">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            completedSteps.includes(stepConfig.step)
                                                ? "bg-green-500"
                                                : "bg-slate-200"
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Mobile View - Compact */}
            <div className="md:hidden flex items-center justify-between px-4">
                {CHECKOUT_STEPS.map((stepConfig, index) => {
                    const isActive = currentStep === stepConfig.step;
                    const isCompleted = completedSteps.includes(stepConfig.step);

                    return (
                        <div key={stepConfig.step} className="flex items-center flex-1">
                            {/* Step Dot */}
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                                    isCompleted
                                        ? "bg-green-500 text-white"
                                        : isActive
                                            ? "bg-primary text-white shadow-glow-sm"
                                            : "bg-slate-100 text-slate-400"
                                )}
                            >
                                {isCompleted ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                    stepConfig.step
                                )}
                            </div>

                            {/* Connector */}
                            {index < CHECKOUT_STEPS.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-0.5 mx-2 rounded-full transition-all",
                                        isCompleted ? "bg-green-500" : "bg-slate-200"
                                    )}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Mobile Step Title */}
            <div className="md:hidden text-center mt-3">
                <p className="font-semibold text-slate-900">
                    {CHECKOUT_STEPS.find((s) => s.step === currentStep)?.title}
                </p>
                <p className="text-xs text-slate-500">
                    {CHECKOUT_STEPS.find((s) => s.step === currentStep)?.description}
                </p>
            </div>
        </div>
    );
}
