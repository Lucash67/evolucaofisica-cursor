export function formatSetPerformance(loadKg: number | null, reps: number | null): string {
  if (loadKg != null && reps != null && reps > 0) {
    return `${loadKg}kg × ${reps}`;
  }
  if (loadKg != null) return `${loadKg}kg`;
  if (reps != null && reps > 0) return `${reps} reps`;
  return "—";
}

export function hasMeaningfulSetData(set: {
  loadKg: number | null;
  reps: number | null;
  completed?: boolean;
}): boolean {
  if (set.completed) return true;
  return (set.reps != null && set.reps > 0) || (set.loadKg != null && set.loadKg > 0);
}

function normalizeSetForSave<T extends { loadKg: number | null; reps: number | null; completed: boolean }>(
  set: T,
): T | null {
  const hasData = (set.reps != null && set.reps > 0) || (set.loadKg != null && set.loadKg > 0);
  if (!hasData && !set.completed) return null;
  if (hasData && !set.completed) return { ...set, completed: true };
  return set;
}

export function normalizeExercisesForSave<
  T extends { sets: { loadKg: number | null; reps: number | null; completed: boolean }[] },
>(exercises: T[]): T[] {
  return exercises.map((ex) => ({
    ...ex,
    sets: ex.sets
      .map((set) => normalizeSetForSave(set))
      .filter((set): set is NonNullable<typeof set> => set != null),
  }));
}
