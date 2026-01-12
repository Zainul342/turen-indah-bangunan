import { ProductCard } from '@/components/product/product-card';
import { ProductGrid } from '@/components/product/product-grid';
import { getRelatedProducts } from '@/lib/products';

interface RelatedProductsProps {
    currentId: string;
    category: string;
}

export async function RelatedProducts({ currentId, category }: RelatedProductsProps) {
    const products = await getRelatedProducts(category, currentId, 4);

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 border-t border-slate-100 pt-16">
            <h2 className="mb-8 text-2xl font-bold text-slate-900">Produk Terkait</h2>
            <ProductGrid>
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        price={p.price}
                        category={p.category}
                        image={p.images[0] || ''}
                        stock={p.stock}
                    />
                ))}
            </ProductGrid>
        </section>
    );
}
