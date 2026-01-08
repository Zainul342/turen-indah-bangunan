"use client";

/**
 * Destination Search
 * ===================
 * Autocomplete search for RajaOngkir destinations.
 *
 * @file src/components/checkout/step-shipping/destination-search.tsx
 * @project Turen Indah Bangunan
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DestinationResult } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface DestinationSearchProps {
    onSelect: (destination: DestinationResult) => void;
    initialValue?: string;
    placeholder?: string;
}

// ============================================
// Component
// ============================================

export function DestinationSearch({
    onSelect,
    initialValue,
    placeholder = "Ketik nama kota atau kecamatan...",
}: DestinationSearchProps) {
    const [query, setQuery] = useState(initialValue || "");
    const [results, setResults] = useState<DestinationResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(initialValue || "");
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Debounced search
    const searchDestinations = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 3) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/shipping/destinations?search=${encodeURIComponent(searchQuery)}`
            );
            const data = await response.json();

            if (data.success && data.data) {
                setResults(data.data);
            } else {
                setResults([]);
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Failed to search destinations:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Handle input change with debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedLabel("");

        // Clear previous timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Set new debounce
        debounceRef.current = setTimeout(() => {
            searchDestinations(value);
        }, 300);
    };

    // Handle selection
    const handleSelect = (destination: DestinationResult) => {
        const label = `${destination.district}, ${destination.city}, ${destination.province}`;
        setSelectedLabel(label);
        setQuery(label);
        setIsOpen(false);
        setResults([]);
        onSelect(destination);
    };

    // Clear selection
    const handleClear = () => {
        setQuery("");
        setSelectedLabel("");
        setResults([]);
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Show dropdown when results are available
    useEffect(() => {
        if (results.length > 0) {
            setIsOpen(true);
        }
    }, [results]);

    return (
        <div ref={containerRef} className="relative">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                    placeholder={placeholder}
                    className="pl-10 pr-10"
                />
                {/* Loading / Clear Icons */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />
                    ) : query && !selectedLabel ? (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    ) : null}
                </div>
            </div>

            {/* Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {results.map((destination) => (
                        <button
                            key={destination.id}
                            type="button"
                            onClick={() => handleSelect(destination)}
                            className={cn(
                                "w-full px-4 py-3 text-left hover:bg-slate-50 flex items-start gap-3 transition-colors",
                                "border-b border-slate-100 last:border-0"
                            )}
                        >
                            <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-slate-900">{destination.label}</p>
                                <p className="text-xs text-slate-500">
                                    {destination.district}, {destination.city}, {destination.province}{" "}
                                    ({destination.postalCode})
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No Results Message */}
            {isOpen && !isLoading && query.length >= 3 && results.length === 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-slate-500">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">Lokasi tidak ditemukan</p>
                </div>
            )}
        </div>
    );
}
