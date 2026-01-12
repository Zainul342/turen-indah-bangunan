/**
 * Checkout Store (Zustand)
 * =========================
 * Global state management for checkout flow.
 * Refactored for security, stability, and debugging.
 *
 * @file src/stores/checkout-store.ts
 * @project Turen Indah Bangunan
 */

import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
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
    lastValidatedAt: number | null; // Timestamp for freshness

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
    isStepValid: (step: number) => boolean;
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
    lastValidatedAt: null,
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
    devtools(
        persist(
            (set, get) => ({
                ...initialState,

                // Step Navigation
                setStep: (step) => {
                    const { currentStep, completedSteps } = get();

                    // Prevent jumping forward to locked steps
                    // Allow: 
                    // 1. Staying on same step
                    // 2. Going back (step < current)
                    // 3. Going forward only if previous step completed
                    if (step > currentStep) {
                        const previousStep = (step - 1) as CheckoutStep;
                        if (!completedSteps.includes(previousStep)) {
                            return; // Block forward jump
                        }
                        set({ currentStep: step });
                        return;
                    }

                    // Going backward or staying same
                    if (step === currentStep) return;

                    // Handling backward navigation: Clear downstream state
                    set((state) => {
                        let nextState = { ...state, currentStep: step };

                        // If going back before Payment (Step 2), clear payment/order data
                        if (step < 2) {
                            nextState = {
                                ...nextState,
                                orderId: null,
                                orderNumber: null,
                                paymentToken: null,
                                paymentStatus: 'idle',
                                // We keep shipping selection/address as user needs to see it to change it
                            };
                        }

                        return nextState;
                    });
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
                        lastValidatedAt: Date.now(),
                    });
                },

                // Shipping
                setShippingAddress: (address) => {
                    // Reset shipping options if address changes prevents invalid shipping cost
                    set({
                        shippingAddress: address,
                        shippingOptions: [],
                        selectedShipping: null
                    });
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
                    // Clear storage explicitly
                    try {
                        localStorage.removeItem('tib-checkout-storage');
                    } catch (e) {
                        // eslint-disable-next-line no-console
                        console.warn('Failed to clear checkout storage', e);
                    }
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

                isStepValid: (step) => {
                    const s = get();
                    // Step 1: Address & Shipping
                    if (step === 1) {
                        return s.isCartValidated && !!s.shippingAddress && !!s.selectedShipping;
                    }
                    // Step 2: Payment Review (ready to pay)
                    if (step === 2) {
                        return s.isCartValidated && !!s.shippingAddress && !!s.selectedShipping;
                    }
                    return false;
                }
            }),
            {
                name: 'tib-checkout-storage',
                storage: createJSONStorage(() => localStorage),
                version: 2,
                migrate: (persistedState: unknown, version) => {
                    if (version === 0 || version === 1) {
                        return { ...initialState }; // Reset if old version to be safe
                    }
                    return persistedState as CheckoutState;
                },
                partialize: (state) => ({
                    currentStep: state.currentStep,
                    completedSteps: state.completedSteps,
                    shippingAddress: state.shippingAddress,
                    selectedShipping: state.selectedShipping,
                    customerNotes: state.customerNotes,
                    validatedItems: state.validatedItems,
                    subtotal: state.subtotal,
                    totalWeight: state.totalWeight,
                    isCartValidated: state.isCartValidated,
                    lastValidatedAt: state.lastValidatedAt,
                }),
            }
        ),
        { name: 'CheckoutStore' }
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
