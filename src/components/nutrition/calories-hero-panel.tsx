"use client";

import { MacroProgressRow } from "@/components/nutrition/macro-progress-row";
import { buildMacroProgress } from "@/lib/domain/nutrition/macro-progress";
import { cn } from "@/lib/utils";

interface CaloriesHeroPanelProps {
  current: number;
  target: number;
  className?: string;
}

export function CaloriesHeroPanel({ current, target, className }: CaloriesHeroPanelProps) {
  const progress = buildMacroProgress(current, target, "calories");
  const remaining = progress.isOver ? 0 : progress.gap;
  const headline = progress.isOver ? progress.over : remaining;
  const headlineLabel = progress.isOver ? "Acima" : "Restantes";

  return (
    <div className={cn("space-y-4", className)}>
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Consumidas</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{current}</p>
        </div>
        <div className="rounded-xl bg-muted/30 px-2 py-1">
          <p className="text-xs text-muted-foreground">{headlineLabel}</p>
          <p
            className={cn(
              "mt-0.5 text-2xl font-semibold tabular-nums tracking-tight",
              progress.isOver ? "text-amber-600 dark:text-amber-400" : "text-accent",
            )}
          >
            {headline}
          </p>
          <p className="text-[10px] text-muted-foreground">kcal</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Meta</p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{target}</p>
        </div>
      </div>

      <MacroProgressRow kind="calories" current={current} target={target} animate />
    </div>
  );
}
