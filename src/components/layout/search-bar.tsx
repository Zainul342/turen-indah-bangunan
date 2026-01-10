"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
    return (
        <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
            <Input
                type="search"
                placeholder="Cari produk (semen, cat, pipa...)"
                className="h-11 w-full rounded-full border-slate-200 bg-slate-50 pl-11 pr-14 text-sm shadow-sm transition-all focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20 focus:shadow-md"
            />
            <Button
                type="submit"
                size="icon"
                variant="brand"
                className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full shadow-sm"
            >
                <Search className="h-4 w-4" />
                <span className="sr-only">Cari</span>
            </Button>
        </div>
    );
}
