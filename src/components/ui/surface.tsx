import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Container contínuo — substitui múltiplos cards empilhados. */
export function Surface({
  children,
  className,
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "featured";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variant === "default" && "bg-card/40 ring-1 ring-border/40",
        variant === "muted" && "bg-muted/20 ring-1 ring-border/30",
        variant === "featured" && "bg-card ring-1 ring-accent/15",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SurfaceSection({
  children,
  className,
  noDivider,
}: {
  children: ReactNode;
  className?: string;
  noDivider?: boolean;
}) {
  return (
    <section
      className={cn(
        "px-5 py-5",
        !noDivider && "border-t border-border/30 first:border-t-0",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SurfaceLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-[11px] font-medium tracking-wide text-muted-foreground/80", className)}>
      {children}
    </p>
  );
}
