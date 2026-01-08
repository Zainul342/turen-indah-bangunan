"use client";

/**
 * Profile Header
 * ===============
 * User avatar, name, email, and edit button.
 *
 * @file src/components/profile/profile-header.tsx
 * @project Turen Indah Bangunan
 */

import Image from "next/image";
import { Phone, Mail, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// Props
// ============================================

interface ProfileHeaderProps {
    displayName: string;
    email: string;
    phone?: string;
    photoURL?: string;
    onEditPhoto?: () => void;
}

// ============================================
// Component
// ============================================

export function ProfileHeader({
    displayName,
    email,
    phone,
    photoURL,
    onEditPhoto,
}: ProfileHeaderProps) {
    // Get initials for avatar fallback
    const initials = displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-6">
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                    <div
                        className={cn(
                            "w-20 h-20 rounded-full overflow-hidden flex items-center justify-center",
                            photoURL ? "bg-white" : "bg-primary text-white"
                        )}
                    >
                        {photoURL ? (
                            <Image
                                src={photoURL}
                                alt={displayName}
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <span className="text-2xl font-bold">{initials}</span>
                        )}
                    </div>
                    {onEditPhoto && (
                        <button
                            onClick={onEditPhoto}
                            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
                        >
                            <Camera className="h-4 w-4 text-slate-600" />
                        </button>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-slate-900 truncate">
                        {displayName}
                    </h2>
                    <div className="flex items-center gap-1 text-sm text-slate-600 mt-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate">{email}</span>
                    </div>
                    {phone && (
                        <div className="flex items-center gap-1 text-sm text-slate-600 mt-0.5">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{phone}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
