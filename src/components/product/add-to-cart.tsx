"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner"; // Assuming sonner is installed, or we use a simple alert/console for MVP

interface AddToCartProps {
    productId: string;
    stock: number;
    minOrder?: number;
}

export function AddToCart({ productId, stock, minOrder = 1 }: AddToCartProps) {
    const [quantity, setQuantity] = useState(minOrder);

    const handleIncrement = () => {
        if (quantity < stock) setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > minOrder) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        // Check if toaster is available, else alert/console
        // console.log(`Adding to cart: Product ${productId}, Qty: ${quantity}`);
        // Future: Integrate with Cart Stores (Zustand)
        alert("Produk berhasil ditambahkan ke keranjang! (Simulasi)");
    };

    const isOutOfStock = stock <= 0;

    return (
        <div className="flex flex-col gap-4 py-6 border-y border-slate-100 my-6">
            <div className="flex items-center gap-4">
                <span className="font-medium text-slate-700 min-w-[80px]">Jumlah:</span>
                <div className="flex items-center rounded-lg border border-slate-200">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={handleDecrement}
                        disabled={quantity <= minOrder || isOutOfStock}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <div className="h-10 w-12 flex items-center justify-center border-x border-slate-100 bg-slate-50 font-semibold text-slate-900">
                        {quantity}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={handleIncrement}
                        disabled={quantity >= stock || isOutOfStock}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <span className="text-sm text-slate-500">
                    Stok: <span className="font-bold">{stock} unit</span>
                </span>
            </div>

            <div className="flex gap-3">
                <Button
                    size="lg"
                    className="flex-1 bg-[#D32F2F] hover:bg-[#B71C1C] text-lg h-12 gap-2 shadow-lg shadow-red-100"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="h-5 w-5" />
                    {isOutOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
                </Button>
                {/* Wishlist Button Placeholder */}
                {/* <Button variant="outline" size="lg" className="px-4"><Heart className="h-5 w-5" /></Button> */}
            </div>
        </div>
    );
}
