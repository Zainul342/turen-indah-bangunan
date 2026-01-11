"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
    const value = props.value || props.defaultValue

    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-200">
                <SliderPrimitive.Range className="absolute h-full bg-[#D32F2F]" />
            </SliderPrimitive.Track>
            {/* If value is array, render that many thumbs, otherwise just one */}
            {Array.isArray(value) ? (
                value.map((_, i) => (
                    <SliderPrimitive.Thumb
                        key={i}
                        className="block h-4 w-4 rounded-full border border-[#D32F2F] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-50 hover:scale-110 shadow-sm"
                    />
                ))
            ) : (
                <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-[#D32F2F] bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D32F2F] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-50 hover:scale-110 shadow-sm" />
            )}
        </SliderPrimitive.Root>
    )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
