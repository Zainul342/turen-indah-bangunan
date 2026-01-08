"use client";

/**
 * Order Timeline
 * ===============
 * Visual timeline of order status history.
 *
 * @file src/components/orders/order-timeline.tsx
 * @project Turen Indah Bangunan
 */

import {
    Clock,
    Package,
    CheckCircle,
    CheckCircle2,
    Truck,
    MapPin,
    XCircle,
    RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";
import { ORDER_STATUS_CONFIG } from "@/types/order";

// ============================================
// Icon Map
// ============================================

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
    Clock,
    Package,
    CheckCircle,
    CheckCircle2,
    Truck,
    MapPin,
    XCircle,
    RotateCcw,
};

// ============================================
// Props
// ============================================

interface TimelineEntry {
    status: OrderStatus;
    note?: string;
    timestamp: string;
    updatedBy: string;
}

interface OrderTimelineProps {
    entries: TimelineEntry[];
    trackingNumber?: string;
}

// ============================================
// Helper Functions
// ============================================

function formatDateTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}

// ============================================
// Component
// ============================================

export function OrderTimeline({ entries, trackingNumber }: OrderTimelineProps) {
    // Sort entries by timestamp (newest first)
    const sortedEntries = [...entries].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return (
        <div className="space-y-0">
            {sortedEntries.map((entry, index) => {
                const config = ORDER_STATUS_CONFIG[entry.status];
                const IconComponent = ICON_MAP[config.icon];
                const isFirst = index === 0;
                const isLast = index === sortedEntries.length - 1;

                return (
                    <div key={index} className="flex gap-4">
                        {/* Timeline Line & Dot */}
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    isFirst ? config.bgColor : "bg-slate-100"
                                )}
                            >
                                {IconComponent && (
                                    <IconComponent
                                        className={cn(
                                            "h-4 w-4",
                                            isFirst ? config.color : "text-slate-400"
                                        )}
                                    />
                                )}
                            </div>
                            {!isLast && (
                                <div className="w-0.5 h-full min-h-[24px] bg-slate-200" />
                            )}
                        </div>

                        {/* Content */}
                        <div className={cn("pb-4", isLast && "pb-0")}>
                            <p
                                className={cn(
                                    "font-medium",
                                    isFirst ? "text-slate-900" : "text-slate-500"
                                )}
                            >
                                {config.label}
                            </p>
                            <p className="text-sm text-slate-500">
                                {formatDateTime(entry.timestamp)}
                            </p>
                            {entry.note && (
                                <p className="text-sm text-slate-600 mt-1">{entry.note}</p>
                            )}
                            {/* Show tracking number for shipped status */}
                            {entry.status === "shipped" && trackingNumber && (
                                <div className="mt-2 px-3 py-2 bg-purple-50 rounded-lg">
                                    <p className="text-xs text-purple-600">Nomor Resi</p>
                                    <p className="font-mono font-semibold text-purple-800">
                                        {trackingNumber}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
