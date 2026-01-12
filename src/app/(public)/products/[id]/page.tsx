import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfo } from '@/components/product/product-info';
import { RelatedProducts } from '@/components/product/related-products';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { getProduct } from '@/lib/products';
import type { Metadata } from 'next';

// ============================================
// Types
// ============================================

interface Props {
    params: Promise<{ id: string }>;
}

// ============================================
// Metadata (SEO & Open Graph)
// ============================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return { title: 'Produk Tidak Ditemukan — Turen Indah Bangunan' };
    }

    return {
        title: `${product.name} — Turen Indah Bangunan`,
        description: product.description.slice(0, 160) + '...',
        openGraph: {
            title: product.name,
            description: product.description.slice(0, 160),
            images: product.images[0] ? [{ url: product.images[0] }] : undefined,
        },
    };
}

// ============================================
// Related Products Loading Skeleton
// ============================================

function RelatedSkeleton() {
    return (
        <section className="mt-16 border-t border-slate-100 pt-16">
            <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-slate-100 rounded-xl animate-pulse" />
                ))}
            </div>
        </section>
    );
}

// ============================================
// Page Component
// ============================================

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = await getProduct(id);

    // Product not found → 404
    if (!product) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Breadcrumbs */}
            <nav className="container mx-auto px-4 md:px-6 py-4" aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 text-sm text-slate-500">
                    <li>
                        <Link href="/" className="hover:text-primary" aria-label="Beranda">
                            <Home className="h-4 w-4" />
                        </Link>
                    </li>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    <li>
                        <Link href="/products" className="hover:text-primary">
                            Katalog
                        </Link>
                    </li>
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    <li>
                        <span
                            className="font-semibold text-slate-900 truncate max-w-[200px] inline-block"
                            aria-current="page"
                            title={product.name}
                        >
                            {product.name}
                        </span>
                    </li>
                </ol>
            </nav>

            <div className="container mx-auto px-4 md:px-6 mt-4">
                <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
                    {/* Left: Gallery */}
                    <ProductGallery images={product.images} />

                    {/* Right: Info */}
                    <ProductInfo product={product} />
                </div>

                {/* Related Products - Wrapped in Suspense for streaming */}
                <Suspense fallback={<RelatedSkeleton />}>
                    <RelatedProducts currentId={product.id} category={product.category} />
                </Suspense>
            </div>
        </main>
    );
}
