"use client";

/**
 * Address Form
 * =============
 * Comprehensive shipping address form with validation.
 *
 * @file src/components/checkout/step-shipping/address-form.tsx
 * @project Turen Indah Bangunan
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, User, Phone, Home, Save } from "lucide-react";
import { addressSchema, type AddressFormData } from "@/schemas/checkout-schema";
import { cn } from "@/lib/utils";
import { DestinationSearch } from "./destination-search";
import type { DestinationResult, ShippingAddress } from "@/types/checkout";

// ============================================
// Props
// ============================================

interface AddressFormProps {
    initialData?: Partial<ShippingAddress>;
    onSubmit: (data: ShippingAddress) => void;
    isLoading?: boolean;
    showSaveOption?: boolean;
}

// ============================================
// Component
// ============================================

export function AddressForm({
    initialData,
    onSubmit,
    isLoading = false,
    showSaveOption = false,
}: AddressFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            label: initialData?.label || "Rumah",
            recipientName: initialData?.recipientName || "",
            phone: initialData?.phone || "",
            province: initialData?.province || "",
            city: initialData?.city || "",
            cityId: initialData?.cityId || "",
            district: initialData?.district || "",
            postalCode: initialData?.postalCode || "",
            fullAddress: initialData?.fullAddress || "",
            isDefault: initialData?.isDefault || false,
        },
    });

    // Watch for destination selection
    const cityId = watch("cityId");

    // Handle destination autocomplete selection
    const handleDestinationSelect = (destination: DestinationResult) => {
        setValue("province", destination.province);
        setValue("city", destination.city);
        setValue("cityId", destination.id);
        setValue("district", destination.district);
        setValue("postalCode", destination.postalCode);
    };

    // Handle form submission
    const onFormSubmit = (data: AddressFormData) => {
        onSubmit(data as ShippingAddress);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Section: Label */}
            <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Label Alamat
                </Label>
                <div className="flex gap-2">
                    {["Rumah", "Kantor", "Proyek", "Lainnya"].map((labelOption) => (
                        <Button
                            key={labelOption}
                            type="button"
                            variant="outline"
                            size="sm"
                            className={cn(
                                "rounded-full",
                                watch("label") === labelOption &&
                                "bg-primary text-white border-primary"
                            )}
                            onClick={() => setValue("label", labelOption)}
                        >
                            {labelOption}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Section: Recipient */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Recipient Name */}
                <div className="space-y-2">
                    <Label htmlFor="recipientName" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nama Penerima
                    </Label>
                    <Input
                        id="recipientName"
                        placeholder="John Doe"
                        {...register("recipientName")}
                        className={cn(errors.recipientName && "border-red-500")}
                    />
                    {errors.recipientName && (
                        <p className="text-xs text-red-500">{errors.recipientName.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Nomor Telepon
                    </Label>
                    <Input
                        id="phone"
                        placeholder="08123456789"
                        {...register("phone")}
                        className={cn(errors.phone && "border-red-500")}
                    />
                    {errors.phone && (
                        <p className="text-xs text-red-500">{errors.phone.message}</p>
                    )}
                </div>
            </div>

            {/* Section: Destination Search */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Cari Kota/Kecamatan
                </Label>
                <DestinationSearch
                    onSelect={handleDestinationSelect}
                    initialValue={
                        initialData?.city
                            ? `${initialData.district}, ${initialData.city}, ${initialData.province}`
                            : undefined
                    }
                />
                {/* Hidden inputs for form validation */}
                <input type="hidden" {...register("province")} />
                <input type="hidden" {...register("city")} />
                <input type="hidden" {...register("cityId")} />
                <input type="hidden" {...register("district")} />
                <input type="hidden" {...register("postalCode")} />
                {errors.cityId && (
                    <p className="text-xs text-red-500">Pilih kota tujuan dari pencarian</p>
                )}
            </div>

            {/* Display Selected Location */}
            {cityId && (
                <div className="bg-slate-50 rounded-lg p-4 text-sm space-y-1">
                    <div className="flex justify-between">
                        <span className="text-slate-500">Provinsi:</span>
                        <span className="font-medium">{watch("province")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Kota/Kabupaten:</span>
                        <span className="font-medium">{watch("city")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Kecamatan:</span>
                        <span className="font-medium">{watch("district")}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-slate-500">Kode Pos:</span>
                        <span className="font-medium">{watch("postalCode")}</span>
                    </div>
                </div>
            )}

            {/* Section: Full Address */}
            <div className="space-y-2">
                <Label htmlFor="fullAddress">Alamat Lengkap</Label>
                <textarea
                    id="fullAddress"
                    rows={3}
                    placeholder="Jalan, nomor rumah, RT/RW, patokan..."
                    {...register("fullAddress")}
                    className={cn(
                        "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary resize-none",
                        errors.fullAddress && "border-red-500"
                    )}
                />
                {errors.fullAddress && (
                    <p className="text-xs text-red-500">{errors.fullAddress.message}</p>
                )}
            </div>

            {/* Save as Default (for logged in users) */}
            {showSaveOption && (
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="isDefault"
                        {...register("isDefault")}
                    />
                    <Label htmlFor="isDefault" className="text-sm text-slate-600 cursor-pointer">
                        Simpan sebagai alamat utama
                    </Label>
                </div>
            )}

            {/* Submit Button */}
            <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                <Save className="h-4 w-4" />
                {isLoading ? "Menyimpan..." : "Simpan Alamat"}
            </Button>
        </form>
    );
}
