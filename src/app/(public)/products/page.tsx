"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCard } from "@/components/product/product-card";
import {
    Filter,
    ChevronDown,
    LayoutGrid,
    List,
    SlidersHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy Data for Catalog
const DUMMY_PRODUCTS = [
    { id: "1", name: "Semen Gresik 40kg PCC", price: 65000, category: "Semen", image: "", stock: 100 },
    { id: "2", name: "Bata Ringan Citicon / Kubik", price: 525000, category: "Bata Ringan", image: "", stock: 50 },
    { id: "3", name: "Cat Dulux Catylac 5kg White", price: 135000, category: "Cat", image: "", isNew: true },
    { id: "4", name: "Keramik Asia Tile 40x40", price: 52000, category: "Keramik", image: "" },
    { id: "5", name: "Pipa Rucika 4 Inch AW", price: 185000, category: "Plumbing", image: "" },
    { id: "6", name: "Kran Air Onda 1/2 Inch", price: 45000, category: "Kran", image: "" },
    { id: "7", name: "Semen Tiga Roda 40kg", price: 63500, category: "Semen", image: "" },
    { id: "8", name: "Baut Baja Ringan 10x19", price: 250, category: "Hardwares", image: "" },
];

const CATEGORIES = [
    "Semua Kategori",
    "Semen & Perekat",
    "Bata Ringan",
    "Cat Tembok",
    "Keramik Lantai",
    "Kran & Sanitary",
    "Plumbing",
    "Builder Hardware"
];

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b py-6 md:py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Katalog Produk</h1>
                    <p className="mt-2 text-sm text-slate-500">Menampilkan produk-produk berkualitas untuk kebutuhan bangunan Anda</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:flex lg:gap-8">

                {/* Sidebar Filters (Desktop) */}
                <aside className="hidden w-64 shrink-0 lg:block">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Kategori</h3>
                            <div className="flex flex-col gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left text-sm transition-colors py-1 ${selectedCategory === cat ? "text-[#D32F2F] font-bold" : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-8">
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Harga</h3>
                            <div className="space-y-4">
                                {/* Placeholder for range slider */}
                                <div className="h-1 rounded-full bg-slate-200 relative">
                                    <div className="absolute left-0 right-1/2 h-full bg-[#D32F2F] rounded-full"></div>
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 border-[#D32F2F] shadow-sm"></div>
                                    <div className="absolute right-1/2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white border-2 border-[#D32F2F] shadow-sm"></div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                    <span>Rp 0</span>
                                    <span>Rp 1.000.000+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Toolbar */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-4 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="lg:hidden gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filter
                            </Button>
                            <span className="text-sm font-medium text-slate-500">
                                Menampilkan <span className="text-slate-900">8</span> Produk
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        Urutkan: Terbaru
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Harga: Rendah - Tinggi</DropdownMenuItem>
                                    <DropdownMenuItem>Harga: Tinggi - Rendah</DropdownMenuItem>
                                    <DropdownMenuItem>Terbaru</DropdownMenuItem>
                                    <DropdownMenuItem>Terpopuler</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="hidden items-center gap-1 border-l pl-2 sm:flex">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <ProductGrid>
                        {DUMMY_PRODUCTS.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </ProductGrid>

                    {/* Pagination Placeholder */}
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" disabled>Prev</Button>
                            <Button variant="default" className="bg-[#D32F2F]">1</Button>
                            <Button variant="outline">2</Button>
                            <Button variant="outline">Next</Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
