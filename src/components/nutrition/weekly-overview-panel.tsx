"use client";

import { Surface } from "@/components/ui/surface";
import { buildMacroProgress } from "@/lib/domain/nutrition/macro-progress";
import type { WeekOverview } from "@/lib/domain/nutrition/weekly";
import { getWeekStateCopy } from "@/lib/domain/nutrition/weekly";
import type { NutritionGoals } from "@/lib/domain/nutrition/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface WeeklyOverviewPanelProps {
  overview: WeekOverview;
  goals: NutritionGoals;
  className?: string;
}

function DayStatusIcon({ status }: { status: WeekOverview["days"][0]["status"] }) {
  if (status === "complete") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (status === "partial") {
    return (
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
        ◐
      </span>
    );
  }
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-muted/60 text-sm text-muted-foreground/50">
      ·
    </span>
  );
}

export function WeeklyOverviewPanel({ overview, goals, className }: WeeklyOverviewPanelProps) {
  return (
    <div className={cn("space-y-5", className)}>
      <Surface className="px-4 py-4">
        <p className="text-sm text-muted-foreground">{getWeekStateCopy(overview)}</p>
        <p className="mt-2 text-2xl font-semibold tabular-nums">
          {overview.proteinHitDays}
          <span className="ml-1 text-base font-normal text-muted-foreground">
            / 7 dias na meta de proteína
          </span>
        </p>
      </Surface>

      <div className="flex justify-between gap-1">
        {overview.days.map((day) => (
          <div
            key={day.dayKey}
            className={cn(
              "flex flex-col items-center gap-1.5",
              day.isToday && "rounded-lg bg-muted/30 px-1 py-1",
            )}
          >
            <span className="text-[11px] text-muted-foreground">{day.label}</span>
            <DayStatusIcon status={day.status} />
          </div>
        ))}
      </div>

      <Surface className="px-4 py-4">
        <h3 className="text-sm font-medium">Médias da semana</h3>
        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Proteína</dt>
            <dd className="tabular-nums font-medium">
              {overview.avgProtein}g
              <span className="text-muted-foreground"> / {goals.proteinTarget}g</span>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Calorias</dt>
            <dd className="tabular-nums font-medium">
              {overview.avgCalories}
              <span className="text-muted-foreground"> / {goals.caloriesTarget}</span>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Carboidratos</dt>
            <dd className="tabular-nums font-medium">
              {overview.avgCarbs}g
              <span className="text-muted-foreground"> / {goals.carbsTarget}g</span>
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Gorduras</dt>
            <dd className="tabular-nums font-medium">
              {overview.avgFat}g
              <span className="text-muted-foreground"> / {goals.fatTarget}g</span>
            </dd>
          </div>
        </dl>
      </Surface>

      <div className="space-y-2">
        {overview.days
          .filter((d) => d.status !== "empty")
          .reverse()
          .map((day) => {
            const protein = buildMacroProgress(
              day.totals.proteinCurrent,
              goals.proteinTarget,
              "protein",
            );
            return (
              <Surface key={day.dayKey} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-medium">
                    {day.label}
                    {day.isToday && (
                      <span className="ml-2 text-xs font-normal text-accent">Hoje</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{protein.pct}% proteína</p>
                </div>
                <p className="text-sm tabular-nums text-muted-foreground">
                  {day.totals.proteinCurrent}g P · {day.totals.caloriesCurrent} kcal
                </p>
              </Surface>
            );
          })}
      </div>
    </div>
  );
}
