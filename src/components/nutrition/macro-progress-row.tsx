"use client";

import { Progress } from "@/components/ui/progress";
import { useAnimatedNumber } from "@/hooks/use-animated-number";
import {
  buildMacroProgress,
  getMacroGapCopy,
  MACRO_LABELS,
  type MacroKind,
} from "@/lib/domain/nutrition/macro-progress";
import { cn } from "@/lib/utils";

interface MacroProgressRowProps {
  kind: MacroKind;
  current: number;
  target: number;
  highlight?: boolean;
  animate?: boolean;
  className?: string;
}

export function MacroProgressRow({
  kind,
  current,
  target,
  highlight = false,
  animate = true,
  className,
}: MacroProgressRowProps) {
  const label = MACRO_LABELS[kind];
  const progress = buildMacroProgress(current, target, kind);
  const animatedCurrent = useAnimatedNumber(current, 400);
  const displayCurrent = animate ? animatedCurrent : current;
  const unit = progress.unit;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p
          className={cn(
            "text-xs text-muted-foreground",
            highlight && "font-medium uppercase tracking-wide text-foreground",
          )}
        >
          {label}
        </p>
        <p className="text-xs tabular-nums text-muted-foreground">{progress.pct}%</p>
      </div>

      <p
        className={cn(
          "font-semibold tabular-nums tracking-tight",
          highlight ? "text-3xl" : "text-xl",
        )}
      >
        {displayCurrent}
        <span className="ml-1 text-base font-normal text-muted-foreground">
          / {target}
          {unit === "kcal" ? " kcal" : "g"}
        </span>
      </p>

      <Progress
        value={progress.pct}
        className={cn(
          "bg-muted/80 transition-all duration-300",
          progress.isOver
            ? "[&>div]:bg-amber-500/70"
            : highlight
              ? "h-2 [&>div]:bg-accent/90"
              : "h-1.5 [&>div]:bg-accent/80",
        )}
      />

      <p
        className={cn(
          "text-sm",
          progress.isOver ? "text-muted-foreground" : progress.gap === 0 ? "text-accent" : "text-foreground",
        )}
      >
        {getMacroGapCopy(progress, label)}
      </p>
    </div>
  );
}
