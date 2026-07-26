import type { ExperienceContext, ExperienceIntent } from "./types";

const INTENTS: ExperienceIntent[] = [
  "execute.workout",
  "recover.postWorkout",
  "close.protein",
];

/** Priority Engine — EP-01 + EP-02 Nutrition Journey */
export function scoreIntent(intent: ExperienceIntent, ctx: ExperienceContext): number {
  switch (intent) {
    case "execute.workout":
      if (ctx.workoutStatus === "planned" || ctx.workoutStatus === "pending") {
        return 100;
      }
      return 0;

    case "recover.postWorkout":
      if (ctx.dayState === "RECOVERY" && !ctx.postWorkoutMealRegistered) {
        return 100;
      }
      return 0;

    case "close.protein":
      if (ctx.dayState === "RECOVERY" && ctx.postWorkoutMealRegistered) {
        return ctx.proteinGap > 0 ? 100 : 60;
      }
      return 0;

    default:
      return 0;
  }
}

export function rankIntents(ctx: ExperienceContext): ExperienceIntent[] {
  return [...INTENTS].sort((a, b) => scoreIntent(b, ctx) - scoreIntent(a, ctx));
}

export function getPrimaryIntent(ctx: ExperienceContext): ExperienceIntent {
  return rankIntents(ctx)[0];
}
