import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";

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
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}

