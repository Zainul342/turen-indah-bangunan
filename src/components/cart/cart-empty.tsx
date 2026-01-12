import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartEmpty() {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center animate-in fade-in zoom-in duration-500">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 shadow-sm">
                <ShoppingCart className="h-10 w-10 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Keranjang Anda masih kosong.</h2>
            <p className="mt-2 text-slate-500 max-w-md mx-auto leading-relaxed">
                Sepertinya Anda belum menemukan material yang tepat. Butuh bantuan untuk memulai? Lihat produk terlaris kami atau konsultasikan kebutuhan proyek Anda dengan tim ahli kami.
            </p>
            <div className="mt-8">
                <Link href="/products">
                    <Button size="lg" className="bg-[#D32F2F] hover:bg-[#B71C1C] px-8 font-semibold shadow-lg shadow-red-500/10">
                        Lihat Produk Terlaris
                    </Button>
                </Link>
            </div>
        </div>
    );
}
