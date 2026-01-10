import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";

// Dummy Data
const FEATURED_PRODUCTS = [
    {
        id: "1",
        name: "Semen Gresik 40kg PCC High Quality",
        price: 65000,
        category: "Semen",
        image: "/products/semen.jpg",
        stock: 100,
    },
    {
        id: "2",
        name: "Bata Ringan Citicon / Kubik",
        price: 525000,
        originalPrice: 540000,
        category: "Bata Ringan",
        image: "/products/hebel.jpg",
        stock: 50,
    },
    {
        id: "3",
        name: "Cat Tembok Dulux Catylac Interior 5kg Putih",
        price: 135000,
        category: "Cat",
        image: "/products/cat.jpg",
        isNew: true,
        stock: 20,
    },
    {
        id: "4",
        name: "Keramik Asia Tile 40x40 Putih Polos",
        price: 52000,
        category: "Keramik",
        image: "/products/keramik.jpg",
        stock: 200,
    },
];

export function FeaturedProducts() {
    return (
        <section className="py-12 md:py-16 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8 md:mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Produk Unggulan</h2>
                        <p className="mt-1 text-slate-500">Pilihan terbaik minggu ini untuk proyek Anda</p>
                    </div>
                    <Link href="/products" className="hidden text-sm font-semibold text-[#D32F2F] hover:underline md:block">
                        Lihat Katalog Lengkap &rarr;
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {FEATURED_PRODUCTS.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        Lihat Katalog Lengkap
                    </Link>
                </div>
            </div>
        </section>
    );
}
