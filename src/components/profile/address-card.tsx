"use client";

/**
 * Address Card
 * =============
 * Single address display with actions.
 *
 * @file src/components/profile/address-card.tsx
 * @project Turen Indah Bangunan
 */

import { Home, Building2, MapPin, MoreVertical, Edit, Trash2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Address } from "@/types/user";

// ============================================
// Label Icons
// ============================================

const LABEL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    rumah: Home,
    home: Home,
    kantor: Building2,
    office: Building2,
};

// ============================================
// Props
// ============================================

interface AddressCardProps {
    address: Address;
    onEdit?: (address: Address) => void;
    onDelete?: (addressId: string) => void;
    onSetDefault?: (addressId: string) => void;
}

// ============================================
// Component
// ============================================

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
    const labelLower = address.label.toLowerCase();
    const LabelIcon = LABEL_ICONS[labelLower] || MapPin;

    return (
        <div
            className={cn(
                "border rounded-xl p-4 transition-all",
                address.isDefault
                    ? "border-primary bg-primary/5"
                    : "border-slate-200 hover:border-slate-300"
            )}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                    <div
                        className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                            address.isDefault ? "bg-primary/10" : "bg-slate-100"
                        )}
                    >
                        <LabelIcon
                            className={cn(
                                "h-5 w-5",
                                address.isDefault ? "text-primary" : "text-slate-500"
                            )}
                        />
                    </div>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">{address.label}</span>
                            {address.isDefault && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-white">
                                    Utama
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                            {address.recipientName} • {address.phone}
                        </p>
                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">
                            {address.fullAddress}, {address.district}, {address.city},{" "}
                            {address.province} {address.postalCode}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(address)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                        )}
                        {!address.isDefault && onSetDefault && (
                            <DropdownMenuItem onClick={() => onSetDefault(address.id || "")}>
                                <Star className="h-4 w-4 mr-2" />
                                Jadikan Utama
                            </DropdownMenuItem>
                        )}
                        {onDelete && (
                            <DropdownMenuItem
                                onClick={() => onDelete(address.id || "")}
                                className="text-red-600"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Hapus
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
