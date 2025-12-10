// src/components/ui/badge.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

import { badgeVariants } from "./badge-variants";

interface BadgeProps extends React.ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
