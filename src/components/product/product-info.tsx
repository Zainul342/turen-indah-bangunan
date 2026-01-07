import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockBadge } from "./stock-badge";
import { AddToCart } from "./add-to-cart";
import { ProductSpecs } from "./product-specs";

interface ProductInfoProps {
    product: {
        id: string;
        name: string;
        price: number;
        description: string;
        category: string;
        stock: number;
        unit: string;
        specs: { label: string; value: string }[];
    };
}

export function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="flex flex-col">
            <div className="flex items-start justify-between">
                <div>
                    <div className="mb-2 text-sm font-bold uppercase tracking-wider text-[#D32F2F]">
                        {product.category}
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        {product.name}
                    </h1>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>

            <div className="mt-4 flex items-center gap-4">
                <h2 className="text-3xl font-bold text-[#D32F2F]">
                    Rp {product.price.toLocaleString("id-ID")}
                    <span className="ml-1 text-sm font-medium text-slate-400">/{product.unit}</span>
                </h2>
                <StockBadge stock={product.stock} />
            </div>

            <div className="mt-6 prose prose-slate text-slate-600 leading-relaxed">
                <p>{product.description}</p>
            </div>

            <AddToCart productId={product.id} stock={product.stock} />

            <div className="mt-2 flex gap-6 text-sm text-slate-500 border-b border-slate-100 pb-6">
                <div className="flex items-center gap-2">
                    🛡️ <span>Garansi Asli</span>
                </div>
                <div className="flex items-center gap-2">
                    🚚 <span>Dikirim Kurir Toko</span>
                </div>
            </div>

            <ProductSpecs specs={product.specs} />
        </div>
    );
}
