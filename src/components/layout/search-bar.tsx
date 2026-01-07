"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
    return (
        <div className="relative w-full max-w-xl">
            <Input
                type="search"
                placeholder="Cari produk (semen, cat, pipa...)"
                className="h-10 w-full rounded-full border-slate-200 bg-slate-50 pl-5 pr-12 text-sm shadow-sm transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary"
            />
            <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-primary text-primary-foreground shadow-none hover:bg-primary/90"
            >
                <Search className="h-4 w-4" />
                <span className="sr-only">Cari</span>
            </Button>
        </div>
    );
}
