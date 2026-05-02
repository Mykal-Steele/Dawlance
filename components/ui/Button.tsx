import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#2A7BFF] text-white hover:bg-[#2A7BFF]/90 focus-visible:ring-[#2A7BFF]",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500",
        outline:
          "border-2 border-[#2A7BFF] bg-transparent text-[#2A7BFF] hover:bg-[#2A7BFF]/10",
        secondary:
          "bg-[#6DD3B0] text-white hover:bg-[#6DD3B0]/90 focus-visible:ring-[#6DD3B0]",
        ghost: "hover:bg-[#F8F9FA] text-[#3D4852]",
        link: "text-[#2A7BFF] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

// Made with Bob
