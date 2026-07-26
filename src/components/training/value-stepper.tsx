"use client";

import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

interface ValueStepperProps {
  value: number | null;
  onChange: (value: number | null) => void;
  step?: number;
  min?: number;
  placeholder?: string;
  className?: string;
}

export function ValueStepper({
  value,
  onChange,
  step = 1,
  min = 0,
  placeholder = "—",
  className,
}: ValueStepperProps) {
  const display = value ?? null;

  const decrement = () => {
    if (display == null) {
      onChange(min);
      return;
    }
    onChange(Math.max(min, Math.round((display - step) * 10) / 10));
  };

  const increment = () => {
    const next = display ?? min;
    onChange(Math.round((next + step) * 10) / 10);
  };

  return (
    <div
      className={cn(
        "flex h-11 items-center rounded-lg bg-background/80 ring-1 ring-border/40",
        className,
      )}
    >
      <button
        type="button"
        onClick={decrement}
        className="flex h-full w-10 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
        aria-label="Diminuir"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex flex-1 items-center justify-center tabular-nums text-sm font-medium">
        {display ?? placeholder}
      </span>
      <button
        type="button"
        onClick={increment}
        className="flex h-full w-10 shrink-0 items-center justify-center text-muted-foreground hover:text-foreground"
        aria-label="Aumentar"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
