import Link from "next/link";
import { Package, BrickWall, Hammer, Zap, Layers, Droplet, Wrench } from "lucide-react";

const CATEGORIES = [
    { id: "semen", name: "Semen & Perekat", icon: Package, count: "12+ Produk" },
    { id: "bata-ringan", name: "Bata Ringan", icon: BrickWall, count: "5+ Produk" },
    { id: "builder-hardware", name: "Builder Hardware", icon: Hammer, count: "40+ Produk" },
    { id: "flash", name: "Flash Sale", icon: Zap, count: "Promo Terbatas" },
    { id: "keramik", name: "Keramik Lantai", icon: Layers, count: "100+ Motif" },
    { id: "kran", name: "Kran & Sanitary", icon: Droplet, count: "25+ Model" },
    { id: "plumbing", name: "Pipa Plumbing", icon: Wrench, count: "30+ Ukuran" },
];

export function CategoriesGrid() {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Kategori Pilihan</h2>
                    <Link href="/products" className="text-sm font-semibold text-[#D32F2F] hover:underline">
                        Lihat Semua
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:gap-4">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.id}`}
                            className="group flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm p-5 md:p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-red-100"
                        >
                            <div className="mb-3 md:mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-slate-50 border border-slate-100 group-hover:bg-red-50 group-hover:border-red-200 transition-all">
                                <cat.icon className="h-6 w-6 md:h-7 md:w-7 text-slate-600 group-hover:text-brand group-hover:scale-110 transition-all" />
                            </div>
                            <h3 className="font-semibold text-slate-900 text-xs md:text-sm group-hover:text-brand transition-colors">
                                {cat.name}
                            </h3>
                            <span className="mt-1 text-[10px] md:text-xs text-slate-500">
                                {cat.count}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
