"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCTA() {
    return (
        <section className="relative overflow-hidden bg-[#D32F2F] py-16 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="container relative mx-auto px-4 md:px-6 text-center">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
                        <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight">
                        Dapatkan Info Promo & Harga Terbaru
                    </h2>
                    <p className="mb-8 text-red-100">
                        Jadilah yang pertama tahu tentang diskon Semen, promo Bata Ringan, dan update harga material bangunan di Malang Raya.
                    </p>

                    <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                        <Input
                            type="email"
                            placeholder="Masukkan email Anda"
                            className="h-12 border-0 bg-white/90 text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <Button size="lg" className="h-12 bg-slate-900 text-white hover:bg-slate-800 font-bold">
                            Langganan
                        </Button>
                    </form>
                    <p className="mt-4 text-xs text-red-200">
                        *Kami tidak akan mengirimkan spam. Unsubscribe kapan saja.
                    </p>
                </div>
            </div>
        </section>
    );
}
