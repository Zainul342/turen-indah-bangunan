"use client";

/**
 * Order Status Badge
 * ===================
 * Displays order status with colored badge and icon.
 *
 * @file src/components/orders/order-status-badge.tsx
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

interface OrderStatusBadgeProps {
    status: OrderStatus;
    size?: "sm" | "md" | "lg";
    showIcon?: boolean;
}

// ============================================
// Component
// ============================================

export function OrderStatusBadge({
    status,
    size = "md",
    showIcon = true,
}: OrderStatusBadgeProps) {
    const config = ORDER_STATUS_CONFIG[status];
    const IconComponent = ICON_MAP[config.icon];

    const sizeClasses = {
        sm: "text-xs px-2 py-0.5 gap-1",
        md: "text-sm px-3 py-1 gap-1.5",
        lg: "text-base px-4 py-2 gap-2",
    };

    const iconSizes = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full font-medium",
                config.bgColor,
                config.color,
                sizeClasses[size]
            )}
        >
            {showIcon && IconComponent && (
                <IconComponent className={iconSizes[size]} />
            )}
            {config.label}
        </span>
    );
}
