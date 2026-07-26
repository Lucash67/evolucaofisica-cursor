import type { CompletedSession, SessionExercise } from "./types";
import { hasMeaningfulSetData } from "./format";

export interface ExerciseProgressPoint {
  dayKey: string;
  loadKg: number | null;
  reps: number | null;
  sessionId: string;
  templateName: string;
}

export interface ExerciseProgression {
  exerciseName: string;
  points: ExerciseProgressPoint[];
  bestLoadKg: number | null;
  latestLoadKg: number | null;
  trend: "up" | "stable" | "down" | "unknown";
}

function isEffectiveSet(set: SessionExercise["sets"][0]): boolean {
  return hasMeaningfulSetData(set);
}

function bestSetFromExercise(ex: SessionExercise): { loadKg: number | null; reps: number | null } {
  const effective = ex.sets.filter(isEffectiveSet);
  if (!effective.length) return { loadKg: null, reps: null };

  const withLoad = effective.filter((s) => s.loadKg != null && s.loadKg > 0);
  if (withLoad.length) {
    const best = withLoad.reduce((a, b) => ((a.loadKg ?? 0) >= (b.loadKg ?? 0) ? a : b));
    return { loadKg: best.loadKg, reps: best.reps };
  }

  const bestReps = effective.reduce((a, b) => ((a.reps ?? 0) >= (b.reps ?? 0) ? a : b));
  return { loadKg: bestReps.loadKg, reps: bestReps.reps };
}

export function getExerciseProgressions(history: CompletedSession[]): ExerciseProgression[] {
  const byName = new Map<string, ExerciseProgressPoint[]>();

  for (const session of [...history].sort((a, b) => a.completedAt - b.completedAt)) {
    for (const ex of session.exercises) {
      const best = bestSetFromExercise(ex);
      if (best.loadKg == null && (best.reps == null || best.reps <= 0)) continue;
      const points = byName.get(ex.name) ?? [];
      points.push({
        dayKey: session.dayKey,
        loadKg: best.loadKg,
        reps: best.reps,
        sessionId: session.id,
        templateName: session.templateName,
      });
      byName.set(ex.name, points);
    }
  }

  return Array.from(byName.entries()).map(([exerciseName, points]) => {
    const loads = points.map((p) => p.loadKg).filter((v): v is number => v != null);
    const bestLoadKg = loads.length ? Math.max(...loads) : null;
    const latestLoadKg = loads.length ? loads[loads.length - 1] : null;
    let trend: ExerciseProgression["trend"] = "unknown";
    if (loads.length >= 2) {
      const prev = loads[loads.length - 2];
      const curr = loads[loads.length - 1];
      if (curr > prev) trend = "up";
      else if (curr < prev) trend = "down";
      else trend = "stable";
    }

    return { exerciseName, points, bestLoadKg, latestLoadKg, trend };
  });
}

export function getLastPerformance(
  history: CompletedSession[],
  exerciseName: string,
): { loadKg: number | null; reps: number | null } | null {
  const sorted = [...history].sort((a, b) => b.completedAt - a.completedAt);
  for (const session of sorted) {
    const ex = session.exercises.find((e) => e.name === exerciseName);
    if (ex) return bestSetFromExercise(ex);
  }
  return null;
}

export function getLastExerciseNote(
  history: CompletedSession[],
  exerciseName: string,
): string | null {
  const sorted = [...history].sort((a, b) => b.completedAt - a.completedAt);
  for (const session of sorted) {
    const ex = session.exercises.find((e) => e.name === exerciseName);
    if (ex?.notes?.trim()) return ex.notes.trim();
  }
  return null;
}

export function getLastSessionForTemplate(
  history: CompletedSession[],
  templateName: string,
): CompletedSession | null {
  return (
    [...history]
      .sort((a, b) => b.completedAt - a.completedAt)
      .find((s) => s.templateName === templateName) ?? null
  );
}
