import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
    subtotal: number;
}

export function CartSummary({ subtotal }: CartSummaryProps) {
    // Simple tax/shipping logic placeholder
    const tax = 0; // PPN included usually
    const total = subtotal + tax;

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sticky top-24">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Ringkasan Belanja</h3>

            <div className="space-y-3 border-b border-slate-100 pb-4 text-sm">
                <div className="flex justify-between text-slate-600">
                    <span>Total Harga Barang</span>
                    <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                {/* 
         <div className="flex justify-between text-slate-600">
            <span>Total Diskon Barang</span>
            <span className="font-medium text-green-600">-Rp 0</span>
         </div> 
         */}
            </div>

            <div className="mt-4 mb-6 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Total Belanja</span>
                <span className="text-xl font-bold text-[#D32F2F]">Rp {total.toLocaleString("id-ID")}</span>
            </div>

            <Link href="/checkout">
                <Button className="w-full bg-[#D32F2F] hover:bg-[#B71C1C] h-12 text-base font-bold shadow-md shadow-red-100">
                    Checkout Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>

            <div className="mt-6 flex items-start gap-3 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
                <ShieldCheck className="h-5 w-5 text-green-600 shrink-0" />
                <p>Jaminan keamanan transaksi. Data Anda dilindungi dengan enkripsi standar industri.</p>
            </div>
        </div>
    );
}
