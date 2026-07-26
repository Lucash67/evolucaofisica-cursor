/** Timings da sequência pós-treino — EP-01.5 (pausas, não explicações) */
export const HERO_SEQUENCE_MS = {
  bridge: 1_400,
  action: 2_800,
} as const;

export type HeroSequencePhase = "recognition" | "bridge" | "action";

/** Momento acumulado em que cada fase começa (ms desde o início) */
export function getSequenceAtMs(phase: HeroSequencePhase): number {
  switch (phase) {
    case "recognition":
      return 0;
    case "bridge":
      return HERO_SEQUENCE_MS.bridge;
    case "action":
      return HERO_SEQUENCE_MS.bridge + HERO_SEQUENCE_MS.action;
  }
}

/** Timings da Nutrition Journey — EP-02 */
export const NUTRITION_SEQUENCE_MS = {
  progress: 1_200,
  action: 2_400,
} as const;

export type NutritionSequencePhase = "recognition" | "progress" | "action";

export function getNutritionSequenceAtMs(phase: NutritionSequencePhase): number {
  switch (phase) {
    case "recognition":
      return 0;
    case "progress":
      return NUTRITION_SEQUENCE_MS.progress;
    case "action":
      return NUTRITION_SEQUENCE_MS.progress + NUTRITION_SEQUENCE_MS.action;
  }
}
