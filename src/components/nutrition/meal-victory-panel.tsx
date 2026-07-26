"use client";

import { Progress } from "@/components/ui/progress";
import type { MealVictoryView } from "@/lib/domain/nutrition/progress-copy";

interface MealVictoryPanelProps {
  victory: MealVictoryView;
}

export function MealVictoryPanel({ victory }: MealVictoryPanelProps) {
  return (
    <div className="animate-in fade-in zoom-in-95 py-4 text-center duration-300">
      <p className="text-3xl font-semibold tabular-nums text-accent">+{victory.delta}g</p>
      <p className="mt-2 text-sm text-muted-foreground">Você passou de</p>
      <p className="mt-1 text-lg tabular-nums font-medium">
        {victory.before}g → {victory.after}g
      </p>

      <Progress value={victory.pct} className="mx-auto mt-5 h-2 max-w-xs bg-muted/80 [&>div]:bg-accent/90" />

      <p className="mt-4 text-sm font-medium">{victory.gapCopy}</p>
      <p className="mt-1 text-xs text-muted-foreground">{victory.bandCopy}</p>
      {victory.directionCopy && (
        <p className="mt-3 text-xs text-muted-foreground">{victory.directionCopy}</p>
      )}
    </div>
  );
}
