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
import { createInitialNutritionStore } from "@/lib/domain/nutrition/defaults";
import { loadNutritionStore, saveNutritionStore } from "@/lib/domain/nutrition/storage";
import { computeDayTotals, groupMealsByDay } from "@/lib/domain/nutrition/totals";
import { buildWeekOverview } from "@/lib/domain/nutrition/weekly";
import type {
  LoggedMeal,
  MealRegistrationInput,
  NutritionGoals,
  NutritionStore,
} from "@/lib/domain/nutrition/types";
import { getDayKey, createId } from "@/lib/domain/training/utils";
import { isTodayDayKey } from "@/lib/domain/nutrition/date-utils";

function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  const demo = new URLSearchParams(window.location.search).get("demo");
  return demo != null && demo !== "default";
}

interface NutritionContextValue {
  goals: NutritionGoals;
  selectedDayKey: string;
  isSelectedToday: boolean;
  setSelectedDayKey: (dayKey: string) => void;
  selectedDayMeals: LoggedMeal[];
  selectedDayTotals: ReturnType<typeof computeDayTotals>;
  todayMeals: LoggedMeal[];
  todayTotals: ReturnType<typeof computeDayTotals>;
  daysWithMeals: string[];
  historyByDay: ReturnType<typeof groupMealsByDay>;
  weekOverview: ReturnType<typeof buildWeekOverview>;
  logMeal: (input: MealRegistrationInput) => void;
  removeMeal: (mealId: string) => void;
  repeatLastMeal: () => void;
  updateGoals: (goals: Partial<NutritionGoals>) => void;
}

const NutritionContext = createContext<NutritionContextValue | null>(null);

export function NutritionProvider({ children }: { children: ReactNode }) {
  const { hydrateNutrition, applyMealRegistration } = useDay();
  const [store, setStore] = useState<NutritionStore>(() => loadNutritionStore());
  const [selectedDayKey, setSelectedDayKey] = useState(() => getDayKey());

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
    (input: MealRegistrationInput) => {
      const meal: LoggedMeal = {
        id: createId(),
        dayKey: input.dayKey,
        type: input.type,
        protein: input.protein,
        calories: input.calories,
        carbs: input.carbs,
        fat: input.fat,
        loggedAt: input.loggedAt,
      };

      persist((prev) => ({ ...prev, meals: [meal, ...prev.meals] }));

      if (isTodayDayKey(input.dayKey)) {
        applyMealRegistration(input.type, {
          protein: input.protein,
          calories: input.calories,
          carbs: input.carbs,
          fat: input.fat,
        });
      }
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
    const dayMeals = store.meals
      .filter((m) => m.dayKey === selectedDayKey)
      .sort((a, b) => b.loggedAt - a.loggedAt);
    const last = dayMeals[0] ?? store.meals[0];
    if (!last) return;

    logMeal({
      type: last.type,
      protein: last.protein,
      calories: last.calories,
      carbs: last.carbs,
      fat: last.fat,
      dayKey: selectedDayKey,
      loggedAt: Date.now(),
    });
  }, [logMeal, selectedDayKey, store.meals]);

  const updateGoals = useCallback(
    (patch: Partial<NutritionGoals>) => {
      persist((prev) => ({
        ...prev,
        goals: { ...prev.goals, ...patch },
      }));
    },
    [persist],
  );

  const todayKey = getDayKey();

  const selectedDayMeals = useMemo(
    () =>
      store.meals
        .filter((m) => m.dayKey === selectedDayKey)
        .sort((a, b) => b.loggedAt - a.loggedAt),
    [store.meals, selectedDayKey],
  );

  const selectedDayTotals = useMemo(
    () => computeDayTotals(store.meals, selectedDayKey),
    [store.meals, selectedDayKey],
  );

  const todayMeals = useMemo(
    () =>
      store.meals
        .filter((m) => m.dayKey === todayKey)
        .sort((a, b) => b.loggedAt - a.loggedAt),
    [store.meals, todayKey],
  );

  const todayTotals = useMemo(
    () => computeDayTotals(store.meals, todayKey),
    [store.meals, todayKey],
  );

  const daysWithMeals = useMemo(
    () => [...new Set(store.meals.map((m) => m.dayKey))],
    [store.meals],
  );

  const historyByDay = useMemo(() => groupMealsByDay(store.meals), [store.meals]);
  const weekOverview = useMemo(
    () => buildWeekOverview(store.meals, store.goals),
    [store.meals, store.goals],
  );

  const isSelectedToday = isTodayDayKey(selectedDayKey);

  const value = useMemo(
    () => ({
      goals: store.goals,
      selectedDayKey,
      isSelectedToday,
      setSelectedDayKey,
      selectedDayMeals,
      selectedDayTotals,
      todayMeals,
      todayTotals,
      daysWithMeals,
      historyByDay,
      weekOverview,
      logMeal,
      removeMeal,
      repeatLastMeal,
      updateGoals,
    }),
    [
      store.goals,
      selectedDayKey,
      isSelectedToday,
      selectedDayMeals,
      selectedDayTotals,
      todayMeals,
      todayTotals,
      daysWithMeals,
      historyByDay,
      weekOverview,
      logMeal,
      removeMeal,
      repeatLastMeal,
      updateGoals,
    ],
  );

  return <NutritionContext.Provider value={value}>{children}</NutritionContext.Provider>;
}

export function useNutrition() {
  const ctx = useContext(NutritionContext);
  if (!ctx) throw new Error("useNutrition must be used within NutritionProvider");
  return ctx;
}

export { createInitialNutritionStore };
