"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
    id: string;
    name: string;
    price: number;
    // image: string; // Unused
    quantity: number;
    unit?: string;
    onUpdateQuantity: (newQty: number) => void;
    onRemove: () => void;
}

export function CartItem({
    id,
    name,
    price,
    // image,
    quantity,
    unit = "unit",
    onUpdateQuantity,
    onRemove,
}: CartItemProps) {
    return (
        <div className="flex gap-4 py-6 border-b border-slate-100 last:border-0 items-start">
            {/* Image Placeholder - Replace with Next/Image */}
            <div className="h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border border-slate-100 bg-slate-50 relative group">
                <Link href={`/products/${id}`} className="absolute inset-0 flex items-center justify-center text-2xl">
                    📦
                </Link>
            </div>

            <div className="flex flex-1 flex-col justify-between min-h-[80px]">
                <div className="flex justify-between gap-2">
                    <div>
                        <Link href={`/products/${id}`} className="font-semibold text-slate-900 line-clamp-2 hover:text-primary transition-colors text-sm md:text-base">
                            {name}
                        </Link>
                        <p className="text-sm text-slate-500 mt-1">
                            Rp {price.toLocaleString("id-ID")} <span className="text-xs">/{unit}</span>
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-red-600 -mr-2"
                        onClick={onRemove}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center justify-between mt-4 md:mt-0">
                    {/* Qty Stepper */}
                    <div className="flex items-center rounded-lg border border-slate-200 h-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-8 rounded-none rounded-l-lg hover:bg-slate-50"
                            onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <div className="h-full px-3 flex items-center justify-center border-x border-slate-100 bg-white text-sm font-semibold text-slate-900 min-w-[2rem]">
                            {quantity}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-full w-8 rounded-none rounded-r-lg hover:bg-slate-50"
                            onClick={() => onUpdateQuantity(quantity + 1)}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>

                    {/* Subtotal Item */}
                    <div className="text-right font-bold text-slate-900">
                        Rp {(price * quantity).toLocaleString("id-ID")}
                    </div>
                </div>
            </div>
        </div>
    );
}
