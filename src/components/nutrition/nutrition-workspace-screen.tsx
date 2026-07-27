"use client";

import { useState, useEffect } from "react";
import { Plus, Repeat, Trash2 } from "lucide-react";

import { MacroDistribution } from "@/components/nutrition/macro-distribution";
import { MealRegisterSheet } from "@/components/nutrition/meal-register-sheet";
import { NutritionDashboardPanel } from "@/components/nutrition/nutrition-dashboard-panel";
import { NutritionInsightsStrip } from "@/components/nutrition/nutrition-insights-strip";
import {
  NutritionWorkspaceNav,
  type NutritionTab,
} from "@/components/nutrition/nutrition-workspace-nav";
import { WeeklyOverviewPanel } from "@/components/nutrition/weekly-overview-panel";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { useNutrition } from "@/context/nutrition-context";
import { MEAL_SIZE_ESTIMATES, MEAL_TYPE_LABELS } from "@/lib/domain/meal-presets";
import { getNutritionInsights } from "@/lib/domain/nutrition/insights";
import { buildMacroProgress } from "@/lib/domain/nutrition/macro-progress";
import { getYesterdayDayKey } from "@/lib/domain/nutrition/progress-copy";
import {
  getNutritionDayState,
  getNutritionDayStateCopy,
} from "@/lib/domain/nutrition/states";
import { formatDayKey, getDayKey } from "@/lib/domain/training/utils";

interface NutritionWorkspaceScreenProps {
  tab?: NutritionTab;
}

export function NutritionWorkspaceScreen({ tab = "hoje" }: NutritionWorkspaceScreenProps) {
  const { state } = useDay();
  const {
    goals,
    todayMeals,
    todayTotals,
    historyByDay,
    weekOverview,
    removeMeal,
    repeatLastMeal,
    updateGoals,
  } = useNutrition();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [proteinDraft, setProteinDraft] = useState(String(goals.proteinTarget));
  const [caloriesDraft, setCaloriesDraft] = useState(String(goals.caloriesTarget));
  const [carbsDraft, setCarbsDraft] = useState(String(goals.carbsTarget));
  const [fatDraft, setFatDraft] = useState(String(goals.fatTarget));

  const yesterdayKey = getYesterdayDayKey();
  const yesterdayEntry = historyByDay.find(({ dayKey }) => dayKey === yesterdayKey);
  const yesterdayTotals = yesterdayEntry?.totals ?? null;

  const insights = getNutritionInsights({
    today: todayTotals,
    goals,
    yesterday: yesterdayTotals,
    mealCount: todayMeals.length,
  });

  const dayState = getNutritionDayState(todayTotals, goals, todayMeals.length);
  const dayStateCopy = getNutritionDayStateCopy(dayState);

  const proteinPct = buildMacroProgress(
    todayTotals.proteinCurrent,
    goals.proteinTarget,
    "protein",
  ).pct;
  const caloriesPct = buildMacroProgress(
    todayTotals.caloriesCurrent,
    goals.caloriesTarget,
    "calories",
  ).pct;

  useEffect(() => {
    setProteinDraft(String(goals.proteinTarget));
    setCaloriesDraft(String(goals.caloriesTarget));
    setCarbsDraft(String(goals.carbsTarget));
    setFatDraft(String(goals.fatTarget));
  }, [goals]);

  const saveGoals = () => {
    const protein = Math.max(50, Math.min(300, Number(proteinDraft) || goals.proteinTarget));
    const calories = Math.max(1200, Math.min(5000, Number(caloriesDraft) || goals.caloriesTarget));
    const carbs = Math.max(50, Math.min(500, Number(carbsDraft) || goals.carbsTarget));
    const fat = Math.max(20, Math.min(200, Number(fatDraft) || goals.fatTarget));
    updateGoals({
      proteinTarget: protein,
      caloriesTarget: calories,
      carbsTarget: carbs,
      fatTarget: fat,
    });
    setProteinDraft(String(protein));
    setCaloriesDraft(String(calories));
    setCarbsDraft(String(carbs));
    setFatDraft(String(fat));
  };

  const registerActions = (
    <div className="flex gap-2">
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
  );

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Nutrição</h1>
        <p className="mt-1 text-sm text-muted-foreground">{dayStateCopy}</p>
      </header>

      <NutritionWorkspaceNav tab={tab} />

      {tab === "hoje" && (
        <div className="space-y-5">
          <Surface variant="featured" className="px-5 py-6">
            <NutritionInsightsStrip insights={insights} className="mb-5" />
            <NutritionDashboardPanel totals={todayTotals} goals={goals} />
            <div className="mt-6">{registerActions}</div>
          </Surface>

          <section>
            <h3 className="mb-3 text-sm font-medium">Refeições de hoje</h3>
            {todayMeals.length === 0 ? (
              <Surface className="px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">Nenhuma refeição registrada hoje.</p>
                <Button variant="link" className="mt-2 text-accent" onClick={() => setSheetOpen(true)}>
                  Registrar agora
                </Button>
              </Surface>
            ) : (
              <div className="space-y-2">
                {todayMeals.map((meal) => (
                  <Surface key={meal.id} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <p className="font-medium">{MEAL_TYPE_LABELS[meal.type]}</p>
                        <p className="text-sm font-medium tabular-nums text-accent">+{meal.protein}g</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {MEAL_SIZE_ESTIMATES[meal.size].label} · {meal.calories} kcal · {meal.carbs}g C ·{" "}
                        {meal.fat}g G
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

      {tab === "resumo" && (
        <div className="space-y-5">
          <Surface variant="featured" className="px-5 py-6">
            <h2 className="text-sm font-medium">Hoje</h2>
            <div className="mt-4">
              <NutritionDashboardPanel totals={todayTotals} goals={goals} />
            </div>
          </Surface>

          <Surface className="px-5 py-5">
            <h2 className="text-sm font-medium">Distribuição dos macros</h2>
            <p className="mt-1 text-xs text-muted-foreground">Proporção calórica do que você registrou</p>
            <MacroDistribution totals={todayTotals} className="mt-4" />
          </Surface>

          <Surface className="px-5 py-5">
            <h2 className="text-sm font-medium">Consistência</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Meta de proteína</dt>
                <dd className="text-lg font-semibold tabular-nums">{proteinPct}%</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm text-muted-foreground">Meta calórica</dt>
                <dd className="text-lg font-semibold tabular-nums">{caloriesPct}%</dd>
              </div>
            </dl>
            <NutritionInsightsStrip insights={insights} className="mt-4 border-t border-border/60 pt-4" />
          </Surface>

          <div>{registerActions}</div>
        </div>
      )}

      {tab === "semana" && <WeeklyOverviewPanel overview={weekOverview} goals={goals} />}

      {tab === "metas" && (
        <div className="space-y-4">
          <Surface className="px-5 py-5">
            <p className="text-sm text-muted-foreground">
              Metas diárias alinhadas ao seu objetivo ({state.user.objective} · {state.user.phase}).
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(
                [
                  { key: "protein" as const, label: "Proteína (g/dia)", draft: proteinDraft, set: setProteinDraft },
                  { key: "calories" as const, label: "Calorias (kcal/dia)", draft: caloriesDraft, set: setCaloriesDraft },
                  { key: "carbs" as const, label: "Carboidratos (g/dia)", draft: carbsDraft, set: setCarbsDraft },
                  { key: "fat" as const, label: "Gorduras (g/dia)", draft: fatDraft, set: setFatDraft },
                ] as const
              ).map(({ label, draft, set }) => (
                <label key={label} className="block">
                  <span className="text-sm font-medium">{label}</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={draft}
                    onChange={(e) => set(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                  />
                </label>
              ))}
            </div>
            <Button className="mt-5 w-full" onClick={saveGoals}>
              Salvar metas
            </Button>
          </Surface>

          <Surface className="px-4 py-4">
            <p className="text-xs text-muted-foreground">Referência rápida por tamanho de refeição</p>
            <ul className="mt-3 space-y-2 text-sm">
              {(["pequeno", "medio", "grande"] as const).map((size) => (
                <li key={size} className="flex justify-between gap-2">
                  <span>{MEAL_SIZE_ESTIMATES[size].label}</span>
                  <span className="text-right tabular-nums text-muted-foreground">
                    ~{MEAL_SIZE_ESTIMATES[size].protein}g P · ~{MEAL_SIZE_ESTIMATES[size].carbs}g C · ~
                    {MEAL_SIZE_ESTIMATES[size].fat}g G · ~{MEAL_SIZE_ESTIMATES[size].calories} kcal
                  </span>
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      )}

      {tab === "historico" && (
        <div className="space-y-5">
          <section>
            <h3 className="mb-3 text-sm font-medium">Histórico</h3>
            {historyByDay.length === 0 ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Registre refeições para ver o histórico.
              </p>
            ) : (
              <div className="space-y-2">
                {historyByDay.map(({ dayKey, meals, totals }) => {
                  const isToday = dayKey === getDayKey();
                  const isYesterday = dayKey === yesterdayKey;
                  const title = isToday
                    ? "Hoje"
                    : isYesterday
                      ? "Ontem"
                      : formatDayKey(dayKey);

                  return (
                    <Surface key={dayKey} className="px-4 py-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="font-medium">{title}</p>
                        <p className="text-xs text-muted-foreground">{meals.length} refeições</p>
                      </div>
                      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground">Calorias</dt>
                          <dd className="tabular-nums font-medium">
                            {totals.caloriesCurrent} / {goals.caloriesTarget}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Proteína</dt>
                          <dd className="tabular-nums font-medium">
                            {totals.proteinCurrent}g / {goals.proteinTarget}g
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Carboidratos</dt>
                          <dd className="tabular-nums font-medium">
                            {totals.carbsCurrent}g / {goals.carbsTarget}g
                          </dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Gorduras</dt>
                          <dd className="tabular-nums font-medium">
                            {totals.fatCurrent}g / {goals.fatTarget}g
                          </dd>
                        </div>
                      </dl>
                      {meals.length > 0 && (
                        <ul className="mt-3 space-y-1 border-t border-border/60 pt-3">
                          {meals.map((meal) => (
                            <li
                              key={meal.id}
                              className="flex justify-between text-xs text-muted-foreground"
                            >
                              <span>{MEAL_TYPE_LABELS[meal.type]}</span>
                              <span className="tabular-nums">
                                +{meal.protein}g · {meal.calories} kcal
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </Surface>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}

      <MealRegisterSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  );
}
