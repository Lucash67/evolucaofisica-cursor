"use client";

import type { DayNutritionTotals } from "@/lib/domain/nutrition/types";
import { cn } from "@/lib/utils";

interface MacroDistributionProps {
  totals: DayNutritionTotals;
  className?: string;
}

const SEGMENTS = [
  { key: "protein" as const, label: "Proteína", color: "bg-accent" },
  { key: "carbs" as const, label: "Carbo", color: "bg-accent/60" },
  { key: "fat" as const, label: "Gordura", color: "bg-accent/35" },
];

export function MacroDistribution({ totals, className }: MacroDistributionProps) {
  const proteinKcal = totals.proteinCurrent * 4;
  const carbsKcal = totals.carbsCurrent * 4;
  const fatKcal = totals.fatCurrent * 9;
  const total = Math.max(1, proteinKcal + carbsKcal + fatKcal);

  const segments = SEGMENTS.map(({ key, label, color }) => {
    const grams =
      key === "protein"
        ? totals.proteinCurrent
        : key === "carbs"
          ? totals.carbsCurrent
          : totals.fatCurrent;
    const kcal = key === "fat" ? grams * 9 : grams * 4;
    const pct = Math.round((kcal / total) * 100);
    return { label, color, grams, pct };
  });

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex h-2 overflow-hidden rounded-full bg-muted/80">
        {segments.map((seg) =>
          seg.pct > 0 ? (
            <div
              key={seg.label}
              className={cn("h-full transition-all duration-500", seg.color)}
              style={{ width: `${seg.pct}%` }}
            />
          ) : null,
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        {segments.map((seg) => (
          <div key={seg.label}>
            <p className="text-muted-foreground">{seg.label}</p>
            <p className="tabular-nums font-medium">
              {seg.grams}g · {seg.pct}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
