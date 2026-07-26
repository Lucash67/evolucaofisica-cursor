import type { MealType } from "@/lib/domain/types";
import type { DayNutritionTotals, LoggedMeal } from "./types";

export function computeDayTotals(meals: LoggedMeal[], dayKey: string): DayNutritionTotals {
  const dayMeals = meals.filter((m) => m.dayKey === dayKey);
  const registeredMeals: MealType[] = [];
  let proteinCurrent = 0;
  let caloriesCurrent = 0;

  for (const meal of dayMeals) {
    proteinCurrent += meal.protein;
    caloriesCurrent += meal.calories;
    if (!registeredMeals.includes(meal.type)) {
      registeredMeals.push(meal.type);
    }
  }

  return { proteinCurrent, caloriesCurrent, registeredMeals };
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
