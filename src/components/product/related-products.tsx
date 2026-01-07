import { ProductCard } from "@/components/product/product-card";
import { ProductGrid } from "@/components/product/product-grid";

// Dummy data for simulation
const RELATED_PRODUCTS = [
    { id: "2", name: "Bata Ringan Citicon / Kubik", price: 525000, category: "Bata Ringan", image: "", stock: 50 },
    { id: "3", name: "Cat Dulux Catylac 5kg White", price: 135000, category: "Cat", image: "", isNew: true },
    { id: "4", name: "Keramik Asia Tile 40x40", price: 52000, category: "Keramik", image: "" },
    { id: "7", name: "Semen Tiga Roda 40kg", price: 63500, category: "Semen", image: "" },
];

export function RelatedProducts() {
    return (
        <section className="mt-16 border-t border-slate-100 pt-16">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Produk Terkait</h2>
            <ProductGrid>
                {RELATED_PRODUCTS.map((p) => (
                    <ProductCard key={p.id} {...p} />
                ))}
            </ProductGrid>
        </section>
    );
}
