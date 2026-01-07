import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Turen Indah Bangunan | Bahan Bangunan Berkualitas",
    description:
        "E-commerce bahan bangunan modern di Indonesia. Semen, bata ringan, keramik, cat, dan material konstruksi berkualitas dengan harga terjangkau.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={inter.className}>
                <AuthProvider>
                    <div className="flex min-h-screen flex-col bg-slate-50">
                        <Header />
                        <main className="flex-1 pb-16 md:pb-0">
                            {children}
                        </main>
                        <Footer />
                        <MobileNav />
                        <WhatsAppButton />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}

