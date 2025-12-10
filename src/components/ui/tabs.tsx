"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-xl p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `
          inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-transparent
          px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow]
          text-foreground dark:text-muted-foreground
          disabled:pointer-events-none disabled:opacity-50
          focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring
          [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4

          /* === ESTADO ACTIVO (TU COLOR) === */
          data-[state=active]:bg-[#1e5b96]
          data-[state=active]:text-white

          /* FORZAR PRIORIDAD EN MODO OSCURO */
          dark:data-[state=active]:bg-[#1e5b96]
          dark:data-[state=active]:text-white
        `,
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
