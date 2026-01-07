import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { RelatedProducts } from "@/components/product/related-products";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Dummy Data Lookup
const PRODUCTS_DB: Record<string, any> = {
    "1": {
        id: "1",
        name: "Semen Gresik 40kg PCC High Quality",
        price: 65000,
        unit: "sak",
        category: "Semen",
        description: "Semen Gresik PCC (Portland Composite Cement) adalah bahan pengikat hidrolis hasil penggilingan bersama-sama terak (clinker) semen portland dan gipsum dengan satu atau lebih bahan anorganik, atau hasil pencampuran antara bubuk semen portland dengan bubuk bahan anorganik lain. Cocok untuk bangunan umum, jembatan, jalan raya, bangunan irigasi, dan bahan bangunan beton.",
        stock: 100,
        specs: [
            { label: "Berat", value: "40 kg" },
            { label: "Tipe", value: "PCC" },
            { label: "Warna", value: "Abu-abu" },
            { label: "Kemasan", value: "Zak Kertas 3 Lapis" }
        ],
        images: ["/products/semen.jpg", "/products/semen-2.jpg"] // Placeholders
    },
    "2": {
        id: "2",
        name: "Bata Ringan Citicon / Kubik",
        price: 525000,
        unit: "m3",
        category: "Bata Ringan",
        description: "Bata ringan Citicon adalah beton ringan aerasi yang diproduksi dengan teknologi tinggi. Memiliki berat jenis yang ringan namun kuat tekan yang tinggi. Tahan api, kedap suara, dan presisi tinggi sehingga pemasangan lebih cepat dan rapi. Cocok untuk dinding bangunan bertingkat.",
        stock: 50,
        specs: [
            { label: "Dimensi", value: "60 x 20 x 10 cm" },
            { label: "Berat Kering", value: "520 kg/m3" },
            { label: "Kuat Tekan", value: "4.0 N/mm2" },
            { label: "Isi per m3", value: "83 pcs (tebal 10cm)" }
        ],
        images: []
    }
};

// Next.js 15: params is a Promise
interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const product = PRODUCTS_DB[resolvedParams.id] || PRODUCTS_DB["1"]; // Fallback to id 1 for simulation

    if (!product && resolvedParams.id !== "1") {
        notFound();
    }

    // Override ID if fallback used
    if (!PRODUCTS_DB[resolvedParams.id]) {
        product.name = `[Demo] ${product.name}`;
    }

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 md:px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="hover:text-primary"><Home className="h-4 w-4" /></Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/products" className="hover:text-primary">Katalog</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="font-semibold text-slate-900 truncate max-w-[200px]">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-4">
                <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* Left: Gallery */}
                    <ProductGallery images={product.images} productName={product.name} />

                    {/* Right: Info */}
                    <ProductInfo product={product} />
                </div>

                {/* Related Strategy */}
                <RelatedProducts />
            </div>
        </div>
    );
}
