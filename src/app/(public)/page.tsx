import { PromoBanner } from "@/components/home/promo-banner";
import { HeroSection } from "@/components/home/hero-section";
import { BrandPartners } from "@/components/home/brand-partners";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { USPSection } from "@/components/home/usp-section";
import { StoreLocations } from "@/components/home/store-locations";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterCTA } from "@/components/home/newsletter-cta";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <PromoBanner />
            <HeroSection />
            <BrandPartners />
            <CategoriesGrid />
            <FeaturedProducts />
            <USPSection />
            <StoreLocations />
            <Testimonials />
            <NewsletterCTA />
        </div>
    );
}
