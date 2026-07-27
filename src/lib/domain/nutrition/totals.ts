import type { MealType } from "@/lib/domain/types";
import { MEAL_SIZE_ESTIMATES } from "@/lib/domain/meal-presets";

import type { DayNutritionTotals, LoggedMeal } from "./types";

export function computeDayTotals(meals: LoggedMeal[], dayKey: string): DayNutritionTotals {
  const dayMeals = meals.filter((m) => m.dayKey === dayKey);
  const registeredMeals: MealType[] = [];
  let proteinCurrent = 0;
  let caloriesCurrent = 0;
  let carbsCurrent = 0;
  let fatCurrent = 0;

  for (const meal of dayMeals) {
    proteinCurrent += meal.protein;
    caloriesCurrent += meal.calories;
    carbsCurrent += meal.carbs;
    fatCurrent += meal.fat;
    if (!registeredMeals.includes(meal.type)) {
      registeredMeals.push(meal.type);
    }
  }

  return { proteinCurrent, caloriesCurrent, carbsCurrent, fatCurrent, registeredMeals };
}

export function groupMealsByDay(
  meals: LoggedMeal[],
): { dayKey: string; meals: LoggedMeal[]; totals: DayNutritionTotals }[] {
  const keys = [...new Set(meals.map((m) => m.dayKey))].sort((a, b) => b.localeCompare(a));
  return keys.map((dayKey) => {
    const dayMeals = meals
      .filter((m) => m.dayKey === dayKey)
      .sort((a, b) => b.loggedAt - a.loggedAt);
    return {
      dayKey,
      meals: dayMeals,
      totals: computeDayTotals(meals, dayKey),
    };
  });
}

export function enrichMealFromSize(meal: Partial<LoggedMeal> & Pick<LoggedMeal, "size">): {
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
} {
  const est = MEAL_SIZE_ESTIMATES[meal.size];
  return {
    protein: meal.protein ?? est.protein,
    calories: meal.calories ?? est.calories,
    carbs: meal.carbs ?? est.carbs,
    fat: meal.fat ?? est.fat,
  };
}
