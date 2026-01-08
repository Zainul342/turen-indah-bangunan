"use client";

/**
 * Settings Row
 * =============
 * Reusable row for settings with label, value, and action.
 *
 * @file src/components/profile/settings-row.tsx
 * @project Turen Indah Bangunan
 */

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Props
// ============================================

interface SettingsRowProps {
    icon?: React.ReactNode;
    label: string;
    value?: string;
    description?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "default" | "danger";
    showArrow?: boolean;
    rightElement?: React.ReactNode;
}

// ============================================
// Component
// ============================================

export function SettingsRow({
    icon,
    label,
    value,
    description,
    onClick,
    disabled = false,
    variant = "default",
    showArrow = true,
    rightElement,
}: SettingsRowProps) {
    const Component = onClick ? "button" : "div";

    return (
        <Component
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                onClick && !disabled && "hover:bg-slate-50 cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed",
                variant === "danger" && "text-red-600"
            )}
        >
            {/* Icon */}
            {icon && (
                <div
                    className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                        variant === "danger" ? "bg-red-50" : "bg-slate-100"
                    )}
                >
                    {icon}
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p
                    className={cn(
                        "font-medium",
                        variant === "danger" ? "text-red-600" : "text-slate-900"
                    )}
                >
                    {label}
                </p>
                {description && (
                    <p className="text-sm text-slate-500 truncate">{description}</p>
                )}
                {value && !description && (
                    <p className="text-sm text-slate-500 truncate">{value}</p>
                )}
            </div>

            {/* Right Element */}
            {rightElement}

            {/* Arrow */}
            {onClick && showArrow && !rightElement && (
                <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0" />
            )}
        </Component>
    );
}
