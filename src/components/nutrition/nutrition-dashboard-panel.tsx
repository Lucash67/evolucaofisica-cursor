"use client";

import { CaloriesHeroPanel } from "@/components/nutrition/calories-hero-panel";
import { MacroProgressRow } from "@/components/nutrition/macro-progress-row";
import type { DayNutritionTotals, NutritionGoals } from "@/lib/domain/nutrition/types";
import { cn } from "@/lib/utils";

interface NutritionDashboardPanelProps {
  totals: DayNutritionTotals;
  goals: NutritionGoals;
  className?: string;
}

export function NutritionDashboardPanel({ totals, goals, className }: NutritionDashboardPanelProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <CaloriesHeroPanel current={totals.caloriesCurrent} target={goals.caloriesTarget} />

      <div className="space-y-5 border-t border-border/60 pt-5">
        <MacroProgressRow
          kind="protein"
          current={totals.proteinCurrent}
          target={goals.proteinTarget}
          highlight
          animate
        />
        <MacroProgressRow
          kind="carbs"
          current={totals.carbsCurrent}
          target={goals.carbsTarget}
          animate
        />
        <MacroProgressRow
          kind="fat"
          current={totals.fatCurrent}
          target={goals.fatTarget}
          animate
        />
      </div>
    </div>
  );
}
