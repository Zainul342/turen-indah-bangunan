/**
 * Checkout Store (Zustand)
 * =========================
 * Global state management for checkout flow.
 *
 * @file src/stores/checkout-store.ts
 * @project Turen Indah Bangunan
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
    CheckoutStep,
    ShippingAddress,
    ShippingOption,
    CheckoutItem,
    PaymentStatus,
} from '@/types/checkout';

// ============================================
// Store Types
// ============================================

interface CheckoutState {
    // Step navigation
    currentStep: CheckoutStep;
    completedSteps: CheckoutStep[];

    // Cart validation
    validatedItems: CheckoutItem[];
    subtotal: number;
    totalWeight: number;
    isCartValidated: boolean;

    // Shipping
    shippingAddress: ShippingAddress | null;
    shippingOptions: ShippingOption[];
    selectedShipping: ShippingOption | null;
    isLoadingShipping: boolean;

    // Order
    customerNotes: string;
    orderId: string | null;
    orderNumber: string | null;

    // Payment
    paymentToken: string | null;
    paymentStatus: PaymentStatus;

    // Loading states
    isCreatingOrder: boolean;

    // Actions
    setStep: (step: CheckoutStep) => void;
    completeStep: (step: CheckoutStep) => void;
    setValidatedCart: (items: CheckoutItem[], subtotal: number, weight: number) => void;
    setShippingAddress: (address: ShippingAddress) => void;
    setShippingOptions: (options: ShippingOption[]) => void;
    selectShipping: (option: ShippingOption) => void;
    setLoadingShipping: (loading: boolean) => void;
    setCustomerNotes: (notes: string) => void;
    setOrderDetails: (orderId: string, orderNumber: string, paymentToken: string) => void;
    setPaymentStatus: (status: PaymentStatus) => void;
    setCreatingOrder: (loading: boolean) => void;
    reset: () => void;

    // Computed (helper methods)
    getTotal: () => number;
    canProceedToPayment: () => boolean;
}

// ============================================
// Initial State
// ============================================

const initialState = {
    currentStep: 1 as CheckoutStep,
    completedSteps: [] as CheckoutStep[],
    validatedItems: [] as CheckoutItem[],
    subtotal: 0,
    totalWeight: 0,
    isCartValidated: false,
    shippingAddress: null,
    shippingOptions: [] as ShippingOption[],
    selectedShipping: null,
    isLoadingShipping: false,
    customerNotes: '',
    orderId: null,
    orderNumber: null,
    paymentToken: null,
    paymentStatus: 'idle' as PaymentStatus,
    isCreatingOrder: false,
};

// ============================================
// Store Implementation
// ============================================

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set, get) => ({
            ...initialState,

            // Step Navigation
            setStep: (step) => {
                const { completedSteps } = get();
                // Only allow going back or to next uncompleted step
                if (step <= get().currentStep || completedSteps.includes((step - 1) as CheckoutStep)) {
                    set({ currentStep: step });
                }
            },

            completeStep: (step) => {
                const { completedSteps } = get();
                if (!completedSteps.includes(step)) {
                    set({ completedSteps: [...completedSteps, step] });
                }
            },

            // Cart Validation
            setValidatedCart: (items, subtotal, weight) => {
                set({
                    validatedItems: items,
                    subtotal,
                    totalWeight: weight,
                    isCartValidated: true,
                });
            },

            // Shipping
            setShippingAddress: (address) => {
                set({ shippingAddress: address });
            },

            setShippingOptions: (options) => {
                set({ shippingOptions: options });
            },

            selectShipping: (option) => {
                set({ selectedShipping: option });
            },

            setLoadingShipping: (loading) => {
                set({ isLoadingShipping: loading });
            },

            // Order
            setCustomerNotes: (notes) => {
                set({ customerNotes: notes });
            },

            setOrderDetails: (orderId, orderNumber, paymentToken) => {
                set({ orderId, orderNumber, paymentToken });
            },

            setPaymentStatus: (status) => {
                set({ paymentStatus: status });
            },

            setCreatingOrder: (loading) => {
                set({ isCreatingOrder: loading });
            },

            // Reset
            reset: () => {
                set(initialState);
            },

            // Computed Helpers
            getTotal: () => {
                const { subtotal, selectedShipping } = get();
                const shippingCost = selectedShipping?.cost || 0;
                return subtotal + shippingCost;
            },

            canProceedToPayment: () => {
                const { shippingAddress, selectedShipping, isCartValidated } = get();
                return isCartValidated && shippingAddress !== null && selectedShipping !== null;
            },
        }),
        {
            name: 'tib-checkout-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                // Only persist essential data
                currentStep: state.currentStep,
                completedSteps: state.completedSteps,
                shippingAddress: state.shippingAddress,
                selectedShipping: state.selectedShipping,
                customerNotes: state.customerNotes,
            }),
        }
    )
);

// ============================================
// Selectors
// ============================================

export const selectCurrentStep = (state: CheckoutState) => state.currentStep;
export const selectShippingAddress = (state: CheckoutState) => state.shippingAddress;
export const selectSelectedShipping = (state: CheckoutState) => state.selectedShipping;
export const selectIsLoading = (state: CheckoutState) => state.isLoadingShipping || state.isCreatingOrder;

// ============================================
// Hook Shortcuts
// ============================================

export const useCheckoutStep = () => useCheckoutStore(selectCurrentStep);
export const useShippingAddress = () => useCheckoutStore(selectShippingAddress);
export const useSelectedShipping = () => useCheckoutStore(selectSelectedShipping);
