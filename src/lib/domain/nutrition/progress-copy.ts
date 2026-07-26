import type { MealType } from "@/lib/domain/types";
import { getDayKey } from "@/lib/domain/training/utils";

export interface ProteinProgressView {
  current: number;
  target: number;
  gap: number;
  pct: number;
}

export function buildProteinProgress(current: number, target: number): ProteinProgressView {
  const safeTarget = Math.max(1, target);
  return {
    current,
    target: safeTarget,
    gap: Math.max(0, safeTarget - current),
    pct: Math.min(100, Math.round((current / safeTarget) * 100)),
  };
}

/** Copy por faixa de progresso — Sprint 02.2.1 Calibration */
export function getProgressBandCopy(pct: number): string {
  if (pct >= 100) return "Meta atingida. Agora é só manter.";
  if (pct >= 75) return "Está muito perto da meta.";
  if (pct >= 50) return "Ótimo. Falta menos da metade.";
  if (pct >= 25) return "Você está ganhando ritmo.";
  return "Vamos começar o dia.";
}

export function getGapCopy(gap: number, pct: number): string {
  if (gap <= 0) return "Proteína do dia completa.";
  if (pct >= 75) return `Faltam apenas ${gap}g.`;
  return `Faltam ${gap}g de proteína hoje.`;
}

export function getDirectionCopy(gap: number, pct: number): string | null {
  if (gap <= 0) return null;
  if (pct >= 75) return "Quase lá — uma refeição rica em proteína pode fechar o dia.";
  if (pct >= 50) return "Uma refeição rica em proteína pode ajudar você a atingir a meta.";
  return null;
}

export interface ProgressStoryInput {
  current: number;
  yesterdayProtein: number | null;
  mealCountToday: number;
  pct: number;
}

export function getProgressStory(input: ProgressStoryInput): string {
  const { current, yesterdayProtein, mealCountToday, pct } = input;

  if (yesterdayProtein != null && current > yesterdayProtein && mealCountToday > 0) {
    return "Você está melhor que ontem.";
  }
  if (mealCountToday >= 3) {
    return `Hoje você já registrou ${mealCountToday} refeições.`;
  }
  if (mealCountToday >= 1) {
    return getProgressBandCopy(pct);
  }
  return getProgressBandCopy(pct);
}

export function getYesterdayDayKey(date = new Date()): string {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return getDayKey(yesterday);
}

export type TimeOfDay = "morning" | "afternoon" | "evening";

export interface HeroNutritionCopyInput {
  proteinGap: number;
  proteinCurrent: number;
  proteinTarget: number;
  timeOfDay: TimeOfDay;
  postWorkout: boolean;
  postWorkoutMealRegistered: boolean;
}

export function getHeroNutritionCopy(input: HeroNutritionCopyInput): {
  headline: string;
  subheadline: string | null;
} {
  const { proteinGap, proteinCurrent, proteinTarget, timeOfDay, postWorkout, postWorkoutMealRegistered } =
    input;
  const pct = Math.min(100, Math.round((proteinCurrent / Math.max(1, proteinTarget)) * 100));

  if (proteinGap <= 0 && proteinCurrent >= proteinTarget) {
    return {
      headline: "Proteína concluída.",
      subheadline: "Agora apenas mantenha.",
    };
  }

  if (postWorkout && !postWorkoutMealRegistered) {
    return {
      headline: "Hora da proteína.",
      subheadline: proteinGap > 0 ? `Faltam ${proteinGap}g hoje.` : null,
    };
  }

  if (timeOfDay === "evening" && proteinGap > 0) {
    return {
      headline: "Vale a pena fechar a meta hoje.",
      subheadline: `Faltam ${proteinGap}g de proteína.`,
    };
  }

  if (timeOfDay === "afternoon" && proteinGap > 0) {
    return {
      headline: `Você ainda precisa de ${proteinGap}g hoje.`,
      subheadline: `${proteinCurrent} / ${proteinTarget}g`,
    };
  }

  if (proteinGap > 0) {
    return {
      headline: getProgressBandCopy(pct),
      subheadline: `Faltam ${proteinGap}g · ${proteinCurrent}/${proteinTarget}g`,
    };
  }

  return {
    headline: "Proteína em dia.",
    subheadline: null,
  };
}

export interface MealVictoryView {
  delta: number;
  before: number;
  after: number;
  gap: number;
  target: number;
  pct: number;
  bandCopy: string;
  gapCopy: string;
  directionCopy: string | null;
}

export function buildMealVictory(
  before: number,
  proteinAdded: number,
  target: number,
): MealVictoryView {
  const after = before + proteinAdded;
  const progress = buildProteinProgress(after, target);
  return {
    delta: proteinAdded,
    before,
    after,
    gap: progress.gap,
    target,
    pct: progress.pct,
    bandCopy: getProgressBandCopy(progress.pct),
    gapCopy: getGapCopy(progress.gap, progress.pct),
    directionCopy: getDirectionCopy(progress.gap, progress.pct),
  };
}

export function formatMealLogLabel(type: MealType, protein: number): string {
  return `+${protein}g`;
}
