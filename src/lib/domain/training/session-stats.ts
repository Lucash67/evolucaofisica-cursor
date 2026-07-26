import type {
  ActiveSession,
  CompletedSession,
  SessionClosureStats,
  SessionExercise,
} from "./types";
import { hasMeaningfulSetData } from "./format";

export type { SessionClosureStats };

export function computeExerciseVolume(ex: SessionExercise): number {
  return ex.sets
    .filter((s) => hasMeaningfulSetData(s))
    .reduce((sum, s) => sum + (s.loadKg ?? 0) * (s.reps ?? 0), 0);
}

export function computeSessionVolume(session: ActiveSession | CompletedSession): number {
  return session.exercises.reduce((sum, ex) => sum + computeExerciseVolume(ex), 0);
}

export function countCompletedSets(session: ActiveSession | CompletedSession): number {
  return session.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => hasMeaningfulSetData(s)).length,
    0,
  );
}

export function countTotalSets(session: ActiveSession | CompletedSession): number {
  return session.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
}

export function computeClosureStats(
  completed: CompletedSession,
  history: CompletedSession[],
): SessionClosureStats {
  const volume = computeSessionVolume(completed);
  const previous = history.find(
    (s) => s.id !== completed.id && s.templateName === completed.templateName,
  );
  const prevVolume = previous ? computeSessionVolume(previous) : null;
  let volumeDeltaPct: number | null = null;
  if (prevVolume != null && prevVolume > 0) {
    volumeDeltaPct = Math.round(((volume - prevVolume) / prevVolume) * 100);
  }

  return {
    templateName: completed.templateName,
    durationMin: completed.durationMin,
    completedSets: countCompletedSets(completed),
    totalSets: countTotalSets(completed),
    exerciseCount: completed.exercises.length,
    volume,
    volumeDeltaPct,
  };
}

export function suggestLoadGoal(lastLoadKg: number | null): number | null {
  if (lastLoadKg == null) return null;
  return lastLoadKg + 2.5;
}
