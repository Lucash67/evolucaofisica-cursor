import type { CompletedSession } from "./types";
import { formatSetPerformance } from "./format";
import { getExerciseProgressions, type ExerciseProgression } from "./progression";

export type EvolutionCategory = "progressed" | "stagnated" | "regressed" | "new";

export interface EvolutionInsight {
  exerciseName: string;
  category: EvolutionCategory;
  latestLabel: string;
  templateNames: string;
  deltaLabel?: string;
}

export interface EvolutionSummary {
  progressed: EvolutionInsight[];
  stagnated: EvolutionInsight[];
  regressed: EvolutionInsight[];
  newExercises: EvolutionInsight[];
  totalSessions: number;
  totalExercisesTracked: number;
}

function performanceScore(loadKg: number | null, reps: number | null): number {
  if (loadKg != null && loadKg > 0) return loadKg * 1000 + (reps ?? 0);
  if (reps != null && reps > 0) return reps;
  return 0;
}

function formatDelta(prevLoad: number | null, currLoad: number | null, prevReps: number | null, currReps: number | null): string | undefined {
  if (prevLoad != null && currLoad != null && prevLoad > 0 && currLoad > 0) {
    const d = currLoad - prevLoad;
    if (d === 0) return "mesma carga";
    return d > 0 ? `+${d}kg` : `${d}kg`;
  }
  if (prevReps != null && currReps != null && prevReps > 0 && currReps > 0) {
    const d = currReps - prevReps;
    if (d === 0) return "mesmas reps";
    return d > 0 ? `+${d} reps` : `${d} reps`;
  }
  return undefined;
}

function categorize(p: ExerciseProgression): EvolutionCategory {
  if (p.points.length <= 2) return "new";

  const loads = p.points.map((pt) => pt.loadKg).filter((v): v is number => v != null && v > 0);
  if (loads.length >= 2) {
    const prev = loads[loads.length - 2];
    const curr = loads[loads.length - 1];
    if (curr > prev) return "progressed";
    if (curr < prev) return "regressed";
    return "stagnated";
  }

  const reps = p.points.map((pt) => pt.reps).filter((v): v is number => v != null && v > 0);
  if (reps.length >= 2) {
    const prev = reps[reps.length - 2];
    const curr = reps[reps.length - 1];
    if (curr > prev) return "progressed";
    if (curr < prev) return "regressed";
    return "stagnated";
  }

  if (p.points.length >= 2) {
    const a = p.points[p.points.length - 2];
    const b = p.points[p.points.length - 1];
    const scoreA = performanceScore(a.loadKg, a.reps);
    const scoreB = performanceScore(b.loadKg, b.reps);
    if (scoreB > scoreA) return "progressed";
    if (scoreB < scoreA) return "regressed";
    return "stagnated";
  }

  return "new";
}

function toInsight(p: ExerciseProgression, category: EvolutionCategory): EvolutionInsight {
  const latest = p.points[p.points.length - 1];
  const prev = p.points.length >= 2 ? p.points[p.points.length - 2] : null;
  return {
    exerciseName: p.exerciseName,
    category,
    latestLabel: formatSetPerformance(latest.loadKg, latest.reps),
    templateNames: [...new Set(p.points.map((pt) => pt.templateName))].join(" · "),
    deltaLabel: prev
      ? formatDelta(prev.loadKg, latest.loadKg, prev.reps, latest.reps)
      : undefined,
  };
}

export function getEvolutionSummary(history: CompletedSession[]): EvolutionSummary {
  const progressions = getExerciseProgressions(history);
  const summary: EvolutionSummary = {
    progressed: [],
    stagnated: [],
    regressed: [],
    newExercises: [],
    totalSessions: history.length,
    totalExercisesTracked: progressions.length,
  };

  for (const p of progressions) {
    const category = categorize(p);
    const insight = toInsight(p, category);
    switch (category) {
      case "progressed":
        summary.progressed.push(insight);
        break;
      case "stagnated":
        summary.stagnated.push(insight);
        break;
      case "regressed":
        summary.regressed.push(insight);
        break;
      case "new":
        summary.newExercises.push(insight);
        break;
    }
  }

  const byName = (a: EvolutionInsight, b: EvolutionInsight) =>
    a.exerciseName.localeCompare(b.exerciseName, "pt-BR");
  summary.progressed.sort(byName);
  summary.stagnated.sort(byName);
  summary.regressed.sort(byName);
  summary.newExercises.sort(byName);

  return summary;
}
