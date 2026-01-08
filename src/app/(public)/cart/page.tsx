"use client";

import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { CartEmpty } from "@/components/cart/cart-empty";
import { ChevronRight, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
    const { items, itemCount, subtotal, updateQuantity, removeFromCart, clearCart, isLoading } = useCart();

    const handleUpdateQuantity = (id: string, newQty: number) => {
        updateQuantity(id, newQty);
    };

    const handleRemove = (id: string) => {
        removeFromCart(id);
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // If empty show empty state
    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 md:px-6">
                <CartEmpty />
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-white border-b py-6 md:py-8">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                        <Link href="/" className="hover:text-primary"><Home className="h-4 w-4" /></Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-semibold text-slate-900">Keranjang</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        Keranjang Belanja <span className="text-lg font-normal text-slate-500 ml-2">({itemCount} Barang)</span>
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            {items.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    id={item.productId}
                                    name={item.productName}
                                    price={item.price}
                                    quantity={item.quantity}
                                    onUpdateQuantity={(qty) => handleUpdateQuantity(item.productId, qty)}
                                    onRemove={() => handleRemove(item.productId)}
                                />
                            ))}

                            <div className="mt-6 flex justify-between items-center pt-6 border-t border-slate-100">
                                <Link href="/products">
                                    <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                                        &larr; Lanjut Belanja
                                    </Button>
                                </Link>
                                <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100" onClick={() => clearCart()}>
                                    Hapus Semua
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <CartSummary subtotal={subtotal} />
                    </div>
                </div>
            </div>
        </div>
    );
}
