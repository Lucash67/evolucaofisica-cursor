import { getDayKey } from "@/lib/domain/training/utils";

import { computeDayTotals } from "./totals";
import type { DayNutritionTotals, LoggedMeal, NutritionGoals } from "./types";

export type WeekDayStatus = "complete" | "partial" | "empty";

export interface WeekDayEntry {
  dayKey: string;
  label: string;
  status: WeekDayStatus;
  totals: DayNutritionTotals;
  isToday: boolean;
}

export interface WeekOverview {
  days: WeekDayEntry[];
  proteinHitDays: number;
  avgProtein: number;
  avgCalories: number;
  avgCarbs: number;
  avgFat: number;
  daysWithData: number;
}

const WEEK_LABELS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] as const;

export function getWeekDayKeys(referenceDate = new Date()): string[] {
  const d = new Date(referenceDate);
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return getDayKey(date);
  });
}

function getDayStatus(totals: DayNutritionTotals, goals: NutritionGoals): WeekDayStatus {
  if (totals.proteinCurrent === 0 && totals.caloriesCurrent === 0) return "empty";
  if (totals.proteinCurrent >= goals.proteinTarget) return "complete";
  if (totals.proteinCurrent >= goals.proteinTarget * 0.5 || totals.registeredMeals.length > 0) {
    return "partial";
  }
  return "partial";
}

export function buildWeekOverview(
  meals: LoggedMeal[],
  goals: NutritionGoals,
  referenceDate = new Date(),
): WeekOverview {
  const todayKey = getDayKey(referenceDate);
  const dayKeys = getWeekDayKeys(referenceDate);

  const days: WeekDayEntry[] = dayKeys.map((dayKey, index) => {
    const totals = computeDayTotals(meals, dayKey);
    return {
      dayKey,
      label: WEEK_LABELS[index],
      status: getDayStatus(totals, goals),
      totals,
      isToday: dayKey === todayKey,
    };
  });

  const daysWithData = days.filter((d) => d.status !== "empty");
  const proteinHitDays = days.filter((d) => d.status === "complete").length;

  const sum = daysWithData.reduce(
    (acc, d) => ({
      protein: acc.protein + d.totals.proteinCurrent,
      calories: acc.calories + d.totals.caloriesCurrent,
      carbs: acc.carbs + d.totals.carbsCurrent,
      fat: acc.fat + d.totals.fatCurrent,
    }),
    { protein: 0, calories: 0, carbs: 0, fat: 0 },
  );

  const count = Math.max(1, daysWithData.length);

  return {
    days,
    proteinHitDays,
    avgProtein: Math.round(sum.protein / count),
    avgCalories: Math.round(sum.calories / count),
    avgCarbs: Math.round(sum.carbs / count),
    avgFat: Math.round(sum.fat / count),
    daysWithData: daysWithData.length,
  };
}

export function getWeekStateCopy(overview: WeekOverview): string {
  if (overview.daysWithData === 0) return "Sem registros esta semana.";
  if (overview.proteinHitDays >= 5) return "Semana excelente em proteína.";
  if (overview.proteinHitDays >= 3) return "Boa consistência esta semana.";
  if (overview.proteinHitDays <= 1) return "Semana ainda em construção.";
  return "Continue registrando para ver sua evolução.";
}
