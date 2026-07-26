import type { ExperienceEvent, ExperienceEventType } from "./types";

/** Event Layer mínimo — EP-01 */
export function createEvent(type: ExperienceEventType): ExperienceEvent {
  return { type, at: Date.now() };
}

export const WORKOUT_COMPLETED = createEvent("workout.completed");
export const MEAL_REGISTERED = createEvent("meal.registered");
