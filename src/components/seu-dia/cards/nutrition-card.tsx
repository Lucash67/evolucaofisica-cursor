import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { SurfaceLabel } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { useNutrition } from "@/context/nutrition-context";
import {
  buildProteinProgress,
  getGapCopy,
  getProgressStory,
  getYesterdayDayKey,
} from "@/lib/domain/nutrition/progress-copy";
import { cn } from "@/lib/utils";

export type NutritionLayout = "stack" | "split";

interface NutritionCardProps {
  onRegister: () => void;
  layout?: NutritionLayout;
  className?: string;
  embedded?: boolean;
}

export function NutritionCard({
  onRegister,
  layout = "stack",
  className,
  embedded,
}: NutritionCardProps) {
  const { state } = useDay();
  const { todayMeals, historyByDay } = useNutrition();
  const { proteinCurrent, proteinTarget, caloriesCurrent, caloriesTarget } = state.nutrition;

  const progress = buildProteinProgress(proteinCurrent, proteinTarget);
  const yesterdayKey = getYesterdayDayKey();
  const yesterdayProtein =
    historyByDay.find(({ dayKey }) => dayKey === yesterdayKey)?.totals.proteinCurrent ?? null;
  const storyLine = getProgressStory({
    current: proteinCurrent,
    yesterdayProtein,
    mealCountToday: todayMeals.length,
    pct: progress.pct,
  });
  const gapLine = getGapCopy(progress.gap, progress.pct);
  const caloriesPct = Math.min(100, Math.round((caloriesCurrent / caloriesTarget) * 100));
  const isSplit = layout === "split";

  return (
    <div className={cn(!embedded && "contents", className)}>
      <div className="flex items-start justify-between gap-4">
        <Link to="/nutricao" className="group">
          <SurfaceLabel className="group-hover:text-accent">Proteína</SurfaceLabel>
        </Link>
        <button
          type="button"
          onClick={onRegister}
          className="flex items-center gap-1 text-[13px] text-muted-foreground transition-colors duration-200 hover:text-accent"
        >
          <Plus className="h-3.5 w-3.5" />
          Registrar
        </button>
      </div>

      <div className={cn("mt-3", isSplit && "grid gap-6 md:grid-cols-2")}>
        <div>
          <p className="text-2xl font-semibold tabular-nums tracking-tight">
            {proteinCurrent}
            <span className="ml-1 text-base font-normal text-muted-foreground">/ {proteinTarget}g</span>
          </p>
          <Progress value={progress.pct} className="mt-3 h-1 bg-muted/80 [&>div]:bg-accent/90" />
          <p className="mt-2 text-sm text-foreground">{progress.gap > 0 ? gapLine : storyLine}</p>
          {progress.gap > 0 && storyLine !== gapLine && (
            <p className="mt-1 text-xs text-muted-foreground">{storyLine}</p>
          )}
        </div>

        <div className={cn(!isSplit && "mt-4")}>
          <p className="text-sm text-muted-foreground">
            <span className="tabular-nums">{caloriesCurrent}</span>
            <span className="text-muted-foreground/60"> / {caloriesTarget} kcal</span>
          </p>
          {isSplit && (
            <Progress
              value={caloriesPct}
              className="mt-2 h-0.5 bg-muted/60 [&>div]:bg-muted-foreground/30"
            />
          )}
        </div>
      </div>

      <Link
        to="/nutricao"
        className="mt-3 inline-block text-xs text-muted-foreground hover:text-accent"
      >
        Ver nutrição
      </Link>
    </div>
  );
}
