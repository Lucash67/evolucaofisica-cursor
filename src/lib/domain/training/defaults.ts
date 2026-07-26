import { createId } from "./utils";
import type { MuscleGroup, TemplateExercise, TrainingProgram, WorkoutTemplate } from "./types";

const DEFAULT_SET_COUNT = 2;

function exercise(
  name: string,
  muscleGroup: MuscleGroup,
  sets: { reps: number; loadKg?: number }[],
  order: number,
): TemplateExercise {
  return {
    id: createId(),
    name,
    muscleGroup,
    notes: "",
    order,
    sets: sets.slice(0, DEFAULT_SET_COUNT).map((s) => ({
      id: createId(),
      targetReps: s.reps,
      targetLoadKg: s.loadKg,
    })),
  };
}

export function createDefaultProgram(): TrainingProgram {
  const now = Date.now();
  return {
    id: createId(),
    name: "Hipertrofia — Bulking",
    description: "Programa principal de hipertrofia",
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultTemplates(programId: string): WorkoutTemplate[] {
  const now = Date.now();

  return [
    {
      id: createId(),
      programId,
      name: "Pernas",
      description: "Treino de pernas — foco em quadríceps e posterior",
      notes: "",
      createdAt: now,
      updatedAt: now,
      exercises: [
        exercise("Agachamento livre", "pernas", [{ reps: 8, loadKg: 100 }, { reps: 8, loadKg: 100 }], 0),
        exercise("Leg press", "pernas", [{ reps: 12, loadKg: 180 }, { reps: 12, loadKg: 180 }], 1),
        exercise("Mesa flexora", "pernas", [{ reps: 12, loadKg: 45 }, { reps: 12, loadKg: 45 }], 2),
        exercise("Cadeira extensora", "pernas", [{ reps: 12 }, { reps: 12 }], 3),
        exercise("Panturrilha", "pernas", [{ reps: 15, loadKg: 80 }, { reps: 15, loadKg: 80 }], 4),
      ],
    },
    {
      id: createId(),
      programId,
      name: "Peito",
      description: "Peito e tríceps",
      notes: "",
      createdAt: now,
      updatedAt: now,
      exercises: [
        exercise("Supino reto", "peito", [{ reps: 8, loadKg: 70 }, { reps: 8, loadKg: 70 }], 0),
        exercise("Supino inclinado", "peito", [{ reps: 10, loadKg: 55 }, { reps: 10, loadKg: 55 }], 1),
        exercise("Crucifixo", "peito", [{ reps: 12, loadKg: 14 }, { reps: 12, loadKg: 14 }], 2),
        exercise("Tríceps pulley", "triceps", [{ reps: 12, loadKg: 25 }, { reps: 12, loadKg: 25 }], 3),
      ],
    },
    {
      id: createId(),
      programId,
      name: "Costas",
      description: "Costas e bíceps",
      notes: "",
      createdAt: now,
      updatedAt: now,
      exercises: [
        exercise("Barra fixa", "costas", [{ reps: 8 }, { reps: 8 }], 0),
        exercise("Remada curvada", "costas", [{ reps: 10, loadKg: 60 }, { reps: 10, loadKg: 60 }], 1),
        exercise("Puxada frontal", "costas", [{ reps: 12, loadKg: 50 }, { reps: 12, loadKg: 50 }], 2),
        exercise("Rosca direta", "biceps", [{ reps: 12, loadKg: 20 }, { reps: 12, loadKg: 20 }], 3),
      ],
    },
  ];
}

export function createInitialStore() {
  const program = createDefaultProgram();
  return {
    programs: [program],
    templates: createDefaultTemplates(program.id),
    activeSession: null,
    history: [],
    pendingClosure: null,
  };
}

export { DEFAULT_SET_COUNT };
