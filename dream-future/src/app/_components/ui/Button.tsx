import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "text-sm font-semibold text-nowrap px-4 py-1.5 md:py-2 rounded-full items-center inline-flex hover:translate-x-0.5 transition-all duration-300 ease-in-out cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-black bg-primary hover:bg-primary/90",
        outline:
          "text-primary border-primary bg-trasparent border shadow-xs hover:bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Button({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
