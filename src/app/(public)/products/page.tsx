"use client";

import { Suspense, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductCard } from "@/components/product/product-card";
import {
    ChevronDown,
    LayoutGrid,
    List,
    SlidersHorizontal,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

// Category slug to display name mapping
const CATEGORY_MAP: Record<string, string> = {
    "semen": "Semen & Perekat",
    "bata-ringan": "Bata Ringan",
    "builder-hardware": "Builder Hardware",
    "flash": "Flash Sale",
    "keramik": "Keramik Lantai",
    "kran": "Kran & Sanitary",
    "plumbing": "Plumbing",
    "cat": "Cat Tembok",
    "promo": "Promo",
};

// Sidebar categories with slugs
const CATEGORIES = [
    { slug: "", name: "Semua Kategori" },
    { slug: "semen", name: "Semen & Perekat" },
    { slug: "bata-ringan", name: "Bata Ringan" },
    { slug: "cat", name: "Cat Tembok" },
    { slug: "keramik", name: "Keramik Lantai" },
    { slug: "kran", name: "Kran & Sanitary" },
    { slug: "plumbing", name: "Plumbing" },
    { slug: "builder-hardware", name: "Builder Hardware" },
];

// Dummy Data for Catalog - with category slugs
const DUMMY_PRODUCTS = [
    { id: "1", name: "Semen Gresik 40kg PCC", price: 65000, category: "semen", image: "", stock: 100 },
    { id: "2", name: "Bata Ringan Citicon / Kubik", price: 525000, category: "bata-ringan", image: "", stock: 50 },
    { id: "3", name: "Cat Dulux Catylac 5kg White", price: 135000, category: "cat", image: "", isNew: true },
    { id: "4", name: "Keramik Asia Tile 40x40", price: 52000, category: "keramik", image: "" },
    { id: "5", name: "Pipa Rucika 4 Inch AW", price: 185000, category: "plumbing", image: "" },
    { id: "6", name: "Kran Air Onda 1/2 Inch", price: 45000, category: "kran", image: "" },
    { id: "7", name: "Semen Tiga Roda 40kg", price: 63500, category: "semen", image: "" },
    { id: "8", name: "Baut Baja Ringan 10x19", price: 250, category: "builder-hardware", image: "" },
    { id: "9", name: "Semen Holcim 50kg", price: 72000, category: "semen", image: "" },
    { id: "10", name: "Kran Shower Toto", price: 350000, category: "kran", image: "", isNew: true },
    { id: "11", name: "Bata Ringan Hebel", price: 550000, category: "bata-ringan", image: "" },
    { id: "12", name: "Cat Nippon Vinilex 5kg", price: 125000, category: "cat", image: "" },
];

function ProductsContent() {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get("category") || "";

    const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
    const [priceRange, setPriceRange] = useState([0, 1000000]);
    const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "popular">("newest");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Sync state with URL param when it changes
    useEffect(() => {
        setSelectedCategory(categoryFromUrl);
    }, [categoryFromUrl]);

    // Filter AND Sort products
    const filteredProducts = useMemo(() => {
        let result = [...DUMMY_PRODUCTS]; // Clone to avoid mutating original

        // Filter by Category
        if (selectedCategory && selectedCategory !== "") {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Filter by Price
        result = result.filter(p => p.price >= priceRange[0]! && p.price <= priceRange[1]!);

        // Sort
        switch (sortBy) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "popular":
                // For now, just reverse (mock popularity)
                result.reverse();
                break;
            case "newest":
            default:
                // Keep original order (newest first assumed)
                break;
        }

        return result;
    }, [selectedCategory, priceRange, sortBy]);

    // Get display name for current category
    const categoryDisplayName = selectedCategory
        ? (CATEGORY_MAP[selectedCategory] || selectedCategory)
        : "Semua Kategori";

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    // Sort label map
    const SORT_LABELS: Record<typeof sortBy, string> = {
        "newest": "Terbaru",
        "price-asc": "Harga: Rendah - Tinggi",
        "price-desc": "Harga: Tinggi - Rendah",
        "popular": "Terpopuler",
    };


    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header / Breadcrumbs */}
            <div className="bg-white border-b py-6 md:py-10">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                        {selectedCategory ? categoryDisplayName : "Pusat Belanja Material"}
                    </h1>
                    <p className="mt-2 text-slate-500">
                        {selectedCategory
                            ? `Menampilkan produk kategori ${categoryDisplayName}`
                            : "Kualitas Terjamin, Garansi Retur. Temukan material terbaik untuk proyek Anda."
                        }
                    </p>
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
                                    <Link
                                        key={cat.slug}
                                        href={cat.slug ? `/products?category=${cat.slug}` : "/products"}
                                        className={`text-left text-sm transition-colors py-1 ${selectedCategory === cat.slug ? "text-[#D32F2F] font-bold" : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="border-t pt-8">
                            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Harga</h3>
                            <div className="space-y-4">
                                <Slider
                                    defaultValue={[0, 1000000]}
                                    max={1000000}
                                    step={5000}
                                    value={priceRange}
                                    onValueChange={handlePriceChange}
                                    className="py-4"
                                />
                                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                    <span>Rp {priceRange[0]!.toLocaleString("id-ID")}</span>
                                    <span>Rp {priceRange[1]!.toLocaleString("id-ID")}+</span>
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
                                Menampilkan <span className="text-slate-900">{filteredProducts.length}</span> Produk
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-2">
                                        Urutkan: {SORT_LABELS[sortBy]}
                                        <ChevronDown className="h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSortBy("price-asc")}>
                                        Harga: Rendah - Tinggi
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy("price-desc")}>
                                        Harga: Tinggi - Rendah
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy("newest")}>
                                        Terbaru
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setSortBy("popular")}>
                                        Terpopuler
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="hidden items-center gap-1 border-l pl-2 sm:flex">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 ${viewMode === "grid" ? "text-[#D32F2F]" : "text-slate-400"}`}
                                    onClick={() => setViewMode("grid")}
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className={`h-8 w-8 ${viewMode === "list" ? "text-[#D32F2F]" : "text-slate-400"}`}
                                    onClick={() => setViewMode("list")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <ProductGrid>
                            {filteredProducts.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </ProductGrid>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                            <p className="text-slate-500 mb-4">
                                Tidak ada produk di kategori <span className="font-bold">{categoryDisplayName}</span>
                            </p>
                            <Link href="/products">
                                <Button variant="outline">Lihat Semua Produk</Button>
                            </Link>
                        </div>
                    )}

                    {/* Pagination Placeholder */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-12 flex justify-center">
                            <div className="flex items-center gap-2">
                                <Button variant="outline" disabled>Prev</Button>
                                <Button variant="default" className="bg-[#D32F2F]">1</Button>
                                <Button variant="outline">2</Button>
                                <Button variant="outline">Next</Button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

// Loading fallback
function ProductsLoading() {
    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#D32F2F]" />
        </div>
    );
}

// Main export with Suspense wrapper
export default function ProductsPage() {
    return (
        <Suspense fallback={<ProductsLoading />}>
            <ProductsContent />
        </Suspense>
    );
}
