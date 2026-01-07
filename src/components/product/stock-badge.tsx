import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";


interface StockBadgeProps {
    stock: number;
    minStock?: number; // Threshold for low stock warning
}

export function StockBadge({ stock, minStock = 5 }: StockBadgeProps) {
    if (stock <= 0) {
        return (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                <XCircle className="h-4 w-4" />
                Stok Habis
            </div>
        );
    }

    if (stock <= minStock) {
        return (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                <AlertTriangle className="h-4 w-4" />
                Sisa {stock} unit
            </div>
        );
    }

    return (
        <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Stok Tersedia
        </div>
    );
}
