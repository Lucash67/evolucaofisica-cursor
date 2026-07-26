import { createInitialNutritionStore } from "./defaults";
import type { NutritionStore } from "./types";

const STORAGE_KEY = "evolucao.nutrition.v1";

function migrateStore(raw: Partial<NutritionStore>): NutritionStore {
  const initial = createInitialNutritionStore();
  return {
    goals: {
      proteinTarget: raw.goals?.proteinTarget ?? initial.goals.proteinTarget,
      caloriesTarget: raw.goals?.caloriesTarget ?? initial.goals.caloriesTarget,
    },
    meals: Array.isArray(raw.meals) ? raw.meals : [],
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
