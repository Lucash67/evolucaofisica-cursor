import { MEAL_SIZE_ESTIMATES } from "@/lib/domain/meal-presets";

import { createInitialNutritionStore, DEFAULT_GOALS } from "./defaults";
import { enrichMealFromSize } from "./totals";
import type { LoggedMeal, NutritionStore } from "./types";

const STORAGE_KEY = "evolucao.nutrition.v1";

function migrateMeal(raw: Partial<LoggedMeal>): LoggedMeal | null {
  if (!raw.id || !raw.dayKey || !raw.type || !raw.size || raw.loggedAt == null) return null;
  const macros = enrichMealFromSize(raw as LoggedMeal);
  return {
    id: raw.id,
    dayKey: raw.dayKey,
    type: raw.type,
    size: raw.size,
    loggedAt: raw.loggedAt,
    ...macros,
  };
}

function migrateStore(raw: Partial<NutritionStore>): NutritionStore {
  const initial = createInitialNutritionStore();
  const meals = Array.isArray(raw.meals)
    ? raw.meals.map(migrateMeal).filter((m): m is LoggedMeal => m != null)
    : [];

  return {
    goals: {
      proteinTarget: raw.goals?.proteinTarget ?? initial.goals.proteinTarget,
      caloriesTarget: raw.goals?.caloriesTarget ?? initial.goals.caloriesTarget,
      carbsTarget: raw.goals?.carbsTarget ?? initial.goals.carbsTarget,
      fatTarget: raw.goals?.fatTarget ?? initial.goals.fatTarget,
    },
    meals,
  };
}

export function loadNutritionStore(): NutritionStore {
  if (typeof window === "undefined") {
    return createInitialNutritionStore();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialNutritionStore();
      saveNutritionStore(initial);
      return initial;
    }
    return migrateStore(JSON.parse(raw) as Partial<NutritionStore>);
  } catch {
    const initial = createInitialNutritionStore();
    saveNutritionStore(initial);
    return initial;
  }
}

export function saveNutritionStore(store: NutritionStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}
