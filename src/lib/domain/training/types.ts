export type MuscleGroup =
  | "peito"
  | "costas"
  | "ombros"
  | "biceps"
  | "triceps"
  | "pernas"
  | "gluteos"
  | "abdomen"
  | "outro";

export const MUSCLE_GROUP_LABELS: Record<MuscleGroup, string> = {
  peito: "Peito",
  costas: "Costas",
  ombros: "Ombros",
  biceps: "Bíceps",
  triceps: "Tríceps",
  pernas: "Pernas",
  gluteos: "Glúteos",
  abdomen: "Abdômen",
  outro: "Outro",
};

export interface TemplateSet {
  id: string;
  targetReps: number;
  targetLoadKg?: number;
}

export interface TemplateExercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  notes: string;
  sets: TemplateSet[];
  order: number;
}

export interface WorkoutTemplate {
  id: string;
  programId: string;
  name: string;
  description: string;
  notes: string;
  exercises: TemplateExercise[];
  createdAt: number;
  updatedAt: number;
}

export interface TrainingProgram {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

export interface SessionSet {
  id: string;
  loadKg: number | null;
  reps: number | null;
  completed: boolean;
}

export interface SessionExercise {
  id: string;
  templateExerciseId: string;
  name: string;
  muscleGroup: MuscleGroup;
  /** Observação escrita durante a sessão */
  notes: string;
  /** Referência fixa do template (ex.: pegada, máquina) */
  referenceNote?: string;
  sets: SessionSet[];
  order: number;
}

export interface ActiveSession {
  id: string;
  templateId: string;
  templateName: string;
  dayKey: string;
  startedAt: number;
  sessionNotes: string;
  exercises: SessionExercise[];
  currentExerciseIndex: number;
}

export interface CompletedSession {
  id: string;
  templateId: string;
  templateName: string;
  dayKey: string;
  startedAt: number;
  completedAt: number;
  durationMin: number;
  sessionNotes: string;
  exercises: SessionExercise[];
  rpe?: number;
}

export interface TrainingStore {
  programs: TrainingProgram[];
  templates: WorkoutTemplate[];
  activeSession: ActiveSession | null;
  history: CompletedSession[];
  pendingClosure: SessionClosureStats | null;
}

export interface SessionClosureStats {
  templateName: string;
  durationMin: number;
  completedSets: number;
  totalSets: number;
  exerciseCount: number;
  volume: number;
  volumeDeltaPct: number | null;
}
