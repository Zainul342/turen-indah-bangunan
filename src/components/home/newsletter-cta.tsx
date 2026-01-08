"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterCTA() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubmitted(true);
            setEmail("");
            // Reset after 5 seconds
            setTimeout(() => setIsSubmitted(false), 5000);
        }
    };

    return (
        <section className="relative overflow-hidden bg-[#D32F2F] py-16 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="container relative mx-auto px-4 md:px-6 text-center">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm">
                        {isSubmitted ? <CheckCircle className="h-8 w-8 text-white" /> : <Mail className="h-8 w-8 text-white" />}
                    </div>

                    {isSubmitted ? (
                        <>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">
                                Terima Kasih! 🎉
                            </h2>
                            <p className="mb-8 text-red-100">
                                Anda akan menerima info promo dan harga terbaru di email Anda.
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className="mb-4 text-3xl font-bold tracking-tight">
                                Dapatkan Info Promo & Harga Terbaru
                            </h2>
                            <p className="mb-8 text-red-100">
                                Jadilah yang pertama tahu tentang diskon Semen, promo Bata Ringan, dan update harga material bangunan di Malang Raya.
                            </p>

                            <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
                                <Input
                                    type="email"
                                    placeholder="Masukkan email Anda"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-12 border-0 bg-white/90 text-slate-900 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <Button type="submit" size="lg" className="h-12 bg-slate-900 text-white hover:bg-slate-800 font-bold">
                                    Langganan
                                </Button>
                            </form>
                        </>
                    )}

                    <p className="mt-4 text-xs text-red-200">
                        *Kami tidak akan mengirimkan spam. Unsubscribe kapan saja.
                    </p>
                </div>
            </div>
        </section>
    );
}
