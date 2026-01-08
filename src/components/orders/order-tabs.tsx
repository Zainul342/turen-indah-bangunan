"use client";

/**
 * Order Tabs
 * ===========
 * Tab filter for order list.
 *
 * @file src/components/orders/order-tabs.tsx
 * @project Turen Indah Bangunan
 */

import { cn } from "@/lib/utils";
import type { OrderTabFilter } from "@/types/order";
import { ORDER_TAB_FILTERS } from "@/types/order";

// ============================================
// Props
// ============================================

interface OrderTabsProps {
    activeTab: OrderTabFilter;
    onTabChange: (tab: OrderTabFilter) => void;
    counts?: Partial<Record<OrderTabFilter, number>>;
}

// ============================================
// Component
// ============================================

export function OrderTabs({ activeTab, onTabChange, counts }: OrderTabsProps) {
    const tabs = Object.entries(ORDER_TAB_FILTERS) as [OrderTabFilter, typeof ORDER_TAB_FILTERS["all"]][];

    return (
        <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {tabs.map(([key, config]) => {
                const isActive = activeTab === key;
                const count = counts?.[key];

                return (
                    <button
                        key={key}
                        onClick={() => onTabChange(key)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                            isActive
                                ? "bg-white text-primary shadow-sm"
                                : "text-slate-600 hover:text-slate-900"
                        )}
                    >
                        {config.label}
                        {count !== undefined && count > 0 && (
                            <span
                                className={cn(
                                    "text-xs px-1.5 py-0.5 rounded-full",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "bg-slate-200 text-slate-600"
                                )}
                            >
                                {count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
