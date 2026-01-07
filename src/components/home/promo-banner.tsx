"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function PromoBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="relative bg-[#D32F2F] px-4 py-3 text-white">
            <div className="container mx-auto flex items-center justify-center text-center text-xs font-medium md:text-sm">
                <p>
                    🎉 Promo Spesial: Diskon ongkir untuk pembelian di atas 50 sak semen!
                    <span className="ml-2 underline hover:cursor-pointer font-bold">Cek Syarat & Ketentuan</span>
                </p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Tutup promo"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}
