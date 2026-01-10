import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Nixtio Premium: pill shape, smooth transitions
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Nixtio style: black button, white text
        default:
          "bg-nix-black text-white shadow-sm hover:bg-black hover:shadow-card-hover hover:-translate-y-0.5",
        // TIB Brand: Red button
        brand:
          "bg-brand text-white shadow-sm hover:bg-brand-700 hover:shadow-glow-sm hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border-2 border-nix-black bg-transparent text-nix-black hover:bg-nix-black hover:text-white",
        secondary:
          "bg-white text-nix-black shadow-nix hover:bg-nix-offwhite",
        ghost: "hover:bg-white/80 hover:text-nix-black",
        link: "text-nix-black underline-offset-4 hover:underline",
      },
      size: {
        // Nixtio style: generous padding
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
