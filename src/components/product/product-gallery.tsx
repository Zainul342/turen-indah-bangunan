"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
// import Image from "next/image"; // Use real image in prod

interface ProductGalleryProps {
    images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Fallback if no images
    const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-100 bg-white">
                <div className="flex h-full w-full items-center justify-center bg-slate-50 text-6xl select-none">
                    {/* Replace with <Image> component */}
                    {/* For MVP placeholder logic: */}
                    {displayImages[selectedIndex] ? (
                        <span className="text-8xl">📦</span>
                    ) : (
                        <span className="text-slate-300">No Image</span>
                    )}
                </div>
            </div>

            {/* Thumbnails */}
            {displayImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {displayImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                "relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 bg-slate-50 transition-all aspect-square w-20 items-center justify-center text-xl",
                                selectedIndex === index
                                    ? "border-[#D32F2F] ring-2 ring-red-100"
                                    : "border-transparent hover:border-slate-300"
                            )}
                        >
                            📦
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
