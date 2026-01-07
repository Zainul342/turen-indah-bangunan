"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isNew?: boolean;
    stock?: number;
    rating?: number;
}

export function ProductCard({
    id,
    name,
    price,
    originalPrice,
    // image,
    category,
    isNew,
    stock = 10,
}: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const isOutOfStock = stock <= 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-transparent bg-white shadow-card transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:border-red-100/50">
            {/* Badge Section */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
                {isNew && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                        Baru
                    </span>
                )}
                {discount > 0 && (
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                        -{discount}%
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-slate-400 opacity-0 transition-opacity hover:bg-white hover:text-red-500 group-hover:opacity-100 backdrop-blur-sm">
                <Heart className="h-4 w-4" />
            </button>

            {/* Image */}
            <Link href={`/products/${id}`} className="relative aspect-square overflow-hidden bg-slate-50">
                {/* Replace with next/image in production */}
                <div className="flex h-full w-full items-center justify-center text-4xl select-none">
                    {/* Placeholder icon based on category/name if no image */}
                    📦
                </div>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                    {category}
                </div>
                <Link href={`/products/${id}`} className="mb-2">
                    <h3 className="text-sm font-semibold leading-tight text-slate-900 line-clamp-2 md:text-base group-hover:text-[#D32F2F] transition-colors">
                        {name}
                    </h3>
                </Link>

                <div className="mt-auto flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-[#D32F2F]">
                            Rp {price.toLocaleString("id-ID")}
                        </span>
                        {originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                                Rp {originalPrice.toLocaleString("id-ID")}
                            </span>
                        )}
                    </div>

                    {/* Action */}
                    <div className="mt-3">
                        <Button
                            className="w-full gap-2 rounded-xl bg-slate-900 text-white hover:bg-[#D32F2F] hover:shadow-glow-sm transition-all h-10 text-xs md:text-sm font-bold"
                            disabled={isOutOfStock}
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {isOutOfStock ? "Stok Habis" : "Keranjang"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
