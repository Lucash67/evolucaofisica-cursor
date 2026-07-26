"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useDay } from "@/context/day-context";
import { MEAL_SIZE_ESTIMATES } from "@/lib/domain/meal-presets";
import { createInitialNutritionStore } from "@/lib/domain/nutrition/defaults";
import { loadNutritionStore, saveNutritionStore } from "@/lib/domain/nutrition/storage";
import { computeDayTotals, groupMealsByDay } from "@/lib/domain/nutrition/totals";
import type { LoggedMeal, NutritionGoals, NutritionStore } from "@/lib/domain/nutrition/types";
import type { MealSize, MealType } from "@/lib/domain/types";
import { getDayKey, createId } from "@/lib/domain/training/utils";

function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  const demo = new URLSearchParams(window.location.search).get("demo");
  return demo != null && demo !== "default";
}

interface NutritionContextValue {
  goals: NutritionGoals;
  todayMeals: LoggedMeal[];
  todayTotals: ReturnType<typeof computeDayTotals>;
  historyByDay: ReturnType<typeof groupMealsByDay>;
  logMeal: (type: MealType, size: MealSize) => void;
  removeMeal: (mealId: string) => void;
  repeatLastMeal: () => void;
  updateGoals: (goals: Partial<NutritionGoals>) => void;
}

const NutritionContext = createContext<NutritionContextValue | null>(null);

export function NutritionProvider({ children }: { children: ReactNode }) {
  const { hydrateNutrition, applyMealRegistration } = useDay();
  const [store, setStore] = useState<NutritionStore>(() => loadNutritionStore());

  useEffect(() => {
    saveNutritionStore(store);
  }, [store]);

  const syncDayFromStore = useCallback(
    (nextStore: NutritionStore) => {
      if (isDemoMode()) return;
      const dayKey = getDayKey();
      const totals = computeDayTotals(nextStore.meals, dayKey);
      hydrateNutrition({
        proteinTarget: nextStore.goals.proteinTarget,
        caloriesTarget: nextStore.goals.caloriesTarget,
        proteinCurrent: totals.proteinCurrent,
        caloriesCurrent: totals.caloriesCurrent,
        registeredMeals: totals.registeredMeals,
      });
    },
    [hydrateNutrition],
  );

  useEffect(() => {
    syncDayFromStore(store);
  }, [store, syncDayFromStore]);

  const persist = useCallback((updater: (prev: NutritionStore) => NutritionStore) => {
    setStore((prev) => updater(prev));
  }, []);

  const logMeal = useCallback(
    (type: MealType, size: MealSize) => {
      const estimate = MEAL_SIZE_ESTIMATES[size];
      const meal: LoggedMeal = {
        id: createId(),
        dayKey: getDayKey(),
        type,
        size,
        protein: estimate.protein,
        calories: estimate.calories,
        loggedAt: Date.now(),
      };

      persist((prev) => ({ ...prev, meals: [meal, ...prev.meals] }));
      applyMealRegistration(type, size);
    },
    [applyMealRegistration, persist],
  );

  const removeMeal = useCallback(
    (mealId: string) => {
      persist((prev) => ({
        ...prev,
        meals: prev.meals.filter((m) => m.id !== mealId),
      }));
    },
    [persist],
  );

  const repeatLastMeal = useCallback(() => {
    const last = store.meals[0];
    if (!last) return;
    logMeal(last.type, last.size);
  }, [logMeal, store.meals]);

  const updateGoals = useCallback(
    (patch: Partial<NutritionGoals>) => {
      persist((prev) => ({
        ...prev,
        goals: { ...prev.goals, ...patch },
      }));
    },
    [persist],
  );

  const dayKey = getDayKey();
  const todayMeals = useMemo(
    () =>
      store.meals
        .filter((m) => m.dayKey === dayKey)
        .sort((a, b) => b.loggedAt - a.loggedAt),
    [store.meals, dayKey],
  );
  const todayTotals = useMemo(
    () => computeDayTotals(store.meals, dayKey),
    [store.meals, dayKey],
  );
  const historyByDay = useMemo(() => groupMealsByDay(store.meals), [store.meals]);

  const value = useMemo(
    () => ({
      goals: store.goals,
      todayMeals,
      todayTotals,
      historyByDay,
      logMeal,
      removeMeal,
      repeatLastMeal,
      updateGoals,
    }),
    [store.goals, todayMeals, todayTotals, historyByDay, logMeal, removeMeal, repeatLastMeal, updateGoals],
  );

  return <NutritionContext.Provider value={value}>{children}</NutritionContext.Provider>;
}

export function useNutrition() {
  const ctx = useContext(NutritionContext);
  if (!ctx) throw new Error("useNutrition must be used within NutritionProvider");
  return ctx;
}

export { createInitialNutritionStore };
