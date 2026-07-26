"use client";

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Repeat, Trash2, Utensils } from "lucide-react";

import { MealRegisterSheet } from "@/components/nutrition/meal-register-sheet";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Surface } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { useNutrition } from "@/context/nutrition-context";
import { MEAL_SIZE_ESTIMATES, MEAL_TYPE_LABELS } from "@/lib/domain/meal-presets";
import { formatDayKey } from "@/lib/domain/training/utils";
import { cn } from "@/lib/utils";

type Tab = "hoje" | "metas" | "historico";

interface NutritionWorkspaceScreenProps {
  tab?: Tab;
}

export function NutritionWorkspaceScreen({ tab = "hoje" }: NutritionWorkspaceScreenProps) {
  const { state } = useDay();
  const { goals, todayMeals, todayTotals, historyByDay, removeMeal, repeatLastMeal, updateGoals } =
    useNutrition();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [proteinDraft, setProteinDraft] = useState(String(goals.proteinTarget));
  const [caloriesDraft, setCaloriesDraft] = useState(String(goals.caloriesTarget));

  const proteinPct = Math.min(
    100,
    Math.round((todayTotals.proteinCurrent / goals.proteinTarget) * 100) || 0,
  );
  const proteinGap = Math.max(0, goals.proteinTarget - todayTotals.proteinCurrent);

  useEffect(() => {
    setProteinDraft(String(goals.proteinTarget));
    setCaloriesDraft(String(goals.caloriesTarget));
  }, [goals.proteinTarget, goals.caloriesTarget]);

  const saveGoals = () => {
    const protein = Math.max(50, Math.min(300, Number(proteinDraft) || goals.proteinTarget));
    const calories = Math.max(1200, Math.min(5000, Number(caloriesDraft) || goals.caloriesTarget));
    updateGoals({ proteinTarget: protein, caloriesTarget: calories });
    setProteinDraft(String(protein));
    setCaloriesDraft(String(calories));
  };

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Nutrição</h1>
      </header>

      <nav className="mb-6 flex gap-1 rounded-xl bg-muted/30 p-1">
        {(
          [
            { id: "hoje" as const, label: "Hoje", to: "/nutricao" },
            { id: "metas" as const, label: "Metas", to: "/nutricao/metas" },
            { id: "historico" as const, label: "Histórico", to: "/nutricao/historico" },
          ] as const
        ).map(({ id, label, to }) => (
          <Link
            key={id}
            to={to}
            className={cn(
              "flex-1 rounded-lg py-2 text-center text-sm transition-colors",
              tab === id
                ? "bg-background font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {tab === "hoje" && (
        <div className="space-y-5">
          <Surface variant="featured" className="px-5 py-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Utensils className="h-5 w-5 text-accent" />
              </span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Meta do dia</p>
                <p className="text-2xl font-semibold tabular-nums tracking-tight">
                  {todayTotals.proteinCurrent}
                  <span className="ml-1 text-base font-normal text-muted-foreground">
                    / {goals.proteinTarget}g proteína
                  </span>
                </p>
                <Progress
                  value={proteinPct}
                  className="mt-3 h-1.5 bg-muted/80 [&>div]:bg-accent/90"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  <span className="tabular-nums">{todayTotals.caloriesCurrent}</span>
                  {" / "}
                  <span className="tabular-nums">{goals.caloriesTarget}</span> kcal
                </p>
                {proteinGap > 0 && state.todayWorkout.status === "completed" && (
                  <p className="mt-2 text-xs text-accent">
                    Pós-treino — faltam {proteinGap}g de proteína
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <Button
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => setSheetOpen(true)}
              >
                <Plus className="mr-1 h-4 w-4" />
                Registrar refeição
              </Button>
              {historyByDay.length > 0 && (
                <Button type="button" variant="outline" size="icon" onClick={repeatLastMeal}>
                  <Repeat className="h-4 w-4" />
                  <span className="sr-only">Repetir última</span>
                </Button>
              )}
            </div>
          </Surface>

          <section>
            <h3 className="mb-3 text-sm font-medium">Refeições de hoje</h3>
            {todayMeals.length === 0 ? (
              <Surface className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma refeição registrada hoje.
                </p>
                <Button variant="link" className="mt-2 text-accent" onClick={() => setSheetOpen(true)}>
                  Registrar agora
                </Button>
              </Surface>
            ) : (
              <div className="space-y-2">
                {todayMeals.map((meal) => (
                  <Surface key={meal.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <p className="font-medium">{MEAL_TYPE_LABELS[meal.type]}</p>
                      <p className="text-sm text-muted-foreground">
                        {MEAL_SIZE_ESTIMATES[meal.size].label} · {meal.protein}g P · {meal.calories}{" "}
                        kcal
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMeal(meal.id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-muted/40 hover:text-destructive"
                      aria-label="Remover refeição"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </Surface>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {tab === "metas" && (
        <div className="space-y-4">
          <Surface className="px-5 py-5">
            <p className="text-sm text-muted-foreground">
              Metas diárias alinhadas ao seu objetivo ({state.user.objective} · {state.user.phase}).
            </p>
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Proteína (g/dia)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={proteinDraft}
                  onChange={(e) => setProteinDraft(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">Calorias (kcal/dia)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={caloriesDraft}
                  onChange={(e) => setCaloriesDraft(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                />
              </label>
            </div>
            <Button className="mt-5 w-full" onClick={saveGoals}>
              Salvar metas
            </Button>
          </Surface>

          <Surface className="px-4 py-4">
            <p className="text-xs text-muted-foreground">
              Referência rápida por tamanho de refeição
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {(["pequeno", "medio", "grande"] as const).map((size) => (
                <li key={size} className="flex justify-between">
                  <span>{MEAL_SIZE_ESTIMATES[size].label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    ~{MEAL_SIZE_ESTIMATES[size].protein}g P · ~{MEAL_SIZE_ESTIMATES[size].calories} kcal
                  </span>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      )}

      {tab === "historico" && (
        <div className="space-y-4">
          {historyByDay.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              Registre refeições para ver o histórico.
            </p>
          ) : (
            historyByDay.map(({ dayKey, meals, totals }) => (
              <Surface key={dayKey} className="px-4 py-4">
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{formatDayKey(dayKey)}</p>
                  <p className="text-sm tabular-nums text-muted-foreground">
                    {totals.proteinCurrent}g P · {totals.caloriesCurrent} kcal
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {meals.map((meal) => (
                    <li
                      key={meal.id}
                      className="flex justify-between text-sm text-muted-foreground"
                    >
                      <span>{MEAL_TYPE_LABELS[meal.type]}</span>
                      <span className="tabular-nums">
                        {MEAL_SIZE_ESTIMATES[meal.size].label} · {meal.protein}g
                      </span>
                    </li>
                  ))}
                </ul>
              </Surface>
            ))
          )}
        </div>
      )}

      <MealRegisterSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
