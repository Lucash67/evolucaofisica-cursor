"use client";

import { Progress } from "@/components/ui/progress";
import {
  buildProteinProgress,
  getDirectionCopy,
  getGapCopy,
  getProgressStory,
  type ProgressStoryInput,
} from "@/lib/domain/nutrition/progress-copy";
import { cn } from "@/lib/utils";

interface ProteinProgressPanelProps {
  current: number;
  target: number;
  story?: Omit<ProgressStoryInput, "current" | "pct">;
  size?: "default" | "hero";
  showCalories?: { current: number; target: number };
  className?: string;
}

export function ProteinProgressPanel({
  current,
  target,
  story,
  size = "default",
  showCalories,
  className,
}: ProteinProgressPanelProps) {
  const progress = buildProteinProgress(current, target);
  const storyLine = story
    ? getProgressStory({
        current,
        yesterdayProtein: story.yesterdayProtein,
        mealCountToday: story.mealCountToday,
        pct: progress.pct,
      })
    : getGapCopy(progress.gap, progress.pct);

  const direction = getDirectionCopy(progress.gap, progress.pct);
  const isHero = size === "hero";

  return (
    <div className={cn("space-y-3", className)}>
      <div>
        <p className={cn("text-xs text-muted-foreground", isHero && "uppercase tracking-wide")}>
          Proteína
        </p>
        <p
          className={cn(
            "font-semibold tabular-nums tracking-tight",
            isHero ? "mt-1 text-3xl" : "mt-0.5 text-2xl",
          )}
        >
          {progress.current}
          <span className="ml-1 text-base font-normal text-muted-foreground">
            / {progress.target}g
          </span>
        </p>
      </div>

      <Progress
        value={progress.pct}
        className={cn(
          "bg-muted/80 [&>div]:bg-accent/90",
          isHero ? "h-2" : "h-1.5",
        )}
      />

      <p className={cn("text-sm", progress.gap > 0 ? "text-foreground" : "text-accent")}>
        {progress.gap > 0 ? getGapCopy(progress.gap, progress.pct) : storyLine}
      </p>

      {progress.gap > 0 && storyLine !== getGapCopy(progress.gap, progress.pct) && (
        <p className="text-sm text-muted-foreground">{storyLine}</p>
      )}

      {direction && <p className="text-xs text-muted-foreground">{direction}</p>}

      {showCalories && (
        <p className="text-xs tabular-nums text-muted-foreground">
          {showCalories.current} / {showCalories.target} kcal
        </p>
      )}
    </div>
  );
}
