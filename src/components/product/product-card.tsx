"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

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
    image,
    category,
    isNew,
    stock = 10,
}: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const isOutOfStock = stock <= 0;

    // Connect to cart store
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent any parent link navigation (if any)
        e.stopPropagation();

        addItem({
            productId: id,
            productName: name,
            productImage: image || '/images/placeholder.png', // Fallback if image is missing
            price: price,
            quantity: 1,
        });

        // Simple feedback for now
        alert("Produk berhasil ditambahkan ke keranjang!");
    };

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-red-100">
            {/* Badge Section */}
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1.5">
                {/* Scarcity Badge */}
                {!isOutOfStock && stock <= 5 && (
                    <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-bold text-orange-700">
                        Sisa {stock}
                    </span>
                )}
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
            <button className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-2 text-slate-400 opacity-0 transition-all hover:bg-white hover:text-red-500 group-hover:opacity-100 backdrop-blur-sm hover:scale-110">
                <Heart className="h-4 w-4" />
            </button>

            {/* Image */}
            <Link href={`/products/${id}`} className="relative aspect-square overflow-hidden bg-slate-50 group/image">
                {/* Check if image exists, otherwise show placeholder */}
                {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/image:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-300 bg-gradient-to-br from-slate-50 to-slate-100 group-hover/image:scale-105 transition-transform duration-500">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-5xl">📦</div>
                            <span className="text-xs font-medium text-slate-400">{category}</span>
                        </div>
                    </div>
                )}
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

                <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-brand">
                            Rp {price.toLocaleString("id-ID")}
                        </span>
                        {originalPrice && (
                            <span className="text-xs text-slate-400 line-through">
                                Rp {originalPrice.toLocaleString("id-ID")}
                            </span>
                        )}
                    </div>

                    {/* Action */}
                    <Button
                        className="w-full gap-2 rounded-lg bg-slate-900 text-white hover:bg-brand hover:shadow-glow-sm transition-all h-9 text-sm font-semibold"
                        disabled={isOutOfStock}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4" />
                        {isOutOfStock ? "Stok Habis" : "Keranjang"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
