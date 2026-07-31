import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "relative bg-gradient-to-r from-secondary to-accent text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:-translate-y-0.5 after:absolute after:inset-0 after:rounded-xl after:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity",
        secondary:
          "bg-primary/70 text-white border border-white/10 hover:bg-primary/60 shadow-md hover:-translate-y-0.5 backdrop-blur",
        outline:
          "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:border-white/25 backdrop-blur",
        ghost: "text-white/90 hover:bg-white/10",
        link: "text-secondary underline-offset-4 hover:underline",
        dark: "bg-white text-primary hover:bg-slate-100 shadow-lg hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
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
