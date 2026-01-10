"use client";

// import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281252462983";

export function WhatsAppButton() {
    // Simplified: Always visible
    const handleClick = () => {
        const message = encodeURIComponent("Halo Turen Indah Bangunan, saya ingin bertanya tentang produk Anda.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    };

    return (
        <Button
            onClick={handleClick}
            size="icon"
            className={cn(
                "fixed bottom-20 right-4 z-50 h-14 w-14 rounded-full bg-[#25D366] shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-[#128C7E] hover:scale-110 active:scale-95 md:bottom-8 md:right-8",
                "animate-in fade-in zoom-in duration-500"
            )}
            aria-label="Chat WhatsApp"
        >
            <MessageCircle className="h-6 w-6 text-white" />
        </Button>
    );
}
