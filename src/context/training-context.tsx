"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { capSetsToDefault } from "@/lib/domain/training/defaults";
import { normalizeExercisesForSave } from "@/lib/domain/training/format";
import { getLastPerformance } from "@/lib/domain/training/progression";
import { loadTrainingStore, saveTrainingStore } from "@/lib/domain/training/storage";
import type {
  ActiveSession,
  CompletedSession,
  SessionClosureStats,
  SessionExercise,
  SessionSet,
  TemplateExercise,
  TrainingProgram,
  TrainingStore,
  WorkoutTemplate,
} from "@/lib/domain/training/types";
import { createId, getDayKey } from "@/lib/domain/training/utils";

interface TrainingContextValue {
  programs: TrainingProgram[];
  templates: WorkoutTemplate[];
  activeSession: ActiveSession | null;
  history: CompletedSession[];
  pendingClosure: SessionClosureStats | null;
  hasActiveSession: boolean;
  getProgram: (id: string) => TrainingProgram | undefined;
  getTemplatesForProgram: (programId: string) => WorkoutTemplate[];
  getTemplate: (id: string) => WorkoutTemplate | undefined;
  findTemplateForWorkoutName: (name: string) => WorkoutTemplate | undefined;
  saveTemplate: (template: WorkoutTemplate) => void;
  deleteTemplate: (id: string) => void;
  createTemplate: (programId: string) => WorkoutTemplate;
  startSession: (templateId: string) => ActiveSession;
  cancelSession: () => void;
  updateSessionNotes: (notes: string) => void;
  updateExerciseNotes: (exerciseId: string, notes: string) => void;
  setCurrentExerciseIndex: (index: number) => void;
  updateSet: (exerciseId: string, setId: string, patch: Partial<SessionSet>) => void;
  toggleSetComplete: (exerciseId: string, setId: string) => void;
  addSet: (exerciseId: string) => void;
  removeSet: (exerciseId: string, setId: string) => void;
  finishSessionWithClosure: () => SessionClosureStats | null;
  clearPendingClosure: () => void;
  getSessionProgress: () => { completedSets: number; totalSets: number };
}

const TrainingContext = createContext<TrainingContextValue | null>(null);

function sessionFromTemplate(
  template: WorkoutTemplate,
  history: CompletedSession[],
): ActiveSession {
  const exercises: SessionExercise[] = [...template.exercises]
    .sort((a, b) => a.order - b.order)
    .map((ex) => {
      const last = getLastPerformance(history, ex.name);
      return {
        id: createId(),
        templateExerciseId: ex.id,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        notes: "",
        referenceNote: ex.notes.trim(),
        order: ex.order,
        sets: capSetsToDefault(ex.sets).map((s) => ({
          id: createId(),
          loadKg: last?.loadKg ?? s.targetLoadKg ?? null,
          reps: last?.reps ?? s.targetReps,
          completed: false,
        })),
      };
    });

  return {
    id: createId(),
    templateId: template.id,
    templateName: template.name,
    dayKey: getDayKey(),
    startedAt: Date.now(),
    sessionNotes: template.notes,
    exercises,
    currentExerciseIndex: 0,
  };
}

export function TrainingProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<TrainingStore>(() => loadTrainingStore());

  useEffect(() => {
    saveTrainingStore(store);
  }, [store]);

  const persist = useCallback((updater: (prev: TrainingStore) => TrainingStore) => {
    setStore((prev) => updater(prev));
  }, []);

  const getProgram = useCallback(
    (id: string) => store.programs.find((p) => p.id === id),
    [store.programs],
  );

  const getTemplatesForProgram = useCallback(
    (programId: string) => store.templates.filter((t) => t.programId === programId),
    [store.templates],
  );

  const getTemplate = useCallback(
    (id: string) => store.templates.find((t) => t.id === id),
    [store.templates],
  );

  const findTemplateForWorkoutName = useCallback(
    (name: string) => {
      const normalized = name.toLowerCase();
      return store.templates.find((t) => t.name.toLowerCase() === normalized);
    },
    [store.templates],
  );

  const saveTemplate = useCallback((template: WorkoutTemplate) => {
    persist((prev) => ({
      ...prev,
      templates: prev.templates.some((t) => t.id === template.id)
        ? prev.templates.map((t) => (t.id === template.id ? { ...template, updatedAt: Date.now() } : t))
        : [...prev.templates, { ...template, updatedAt: Date.now() }],
    }));
  }, [persist]);

  const deleteTemplate = useCallback(
    (id: string) => {
      persist((prev) => ({
        ...prev,
        templates: prev.templates.filter((t) => t.id !== id),
      }));
    },
    [persist],
  );

  const createTemplate = useCallback((programId: string): WorkoutTemplate => {
    const now = Date.now();
    return {
      id: createId(),
      programId,
      name: "Novo treino",
      description: "",
      notes: "",
      exercises: [],
      createdAt: now,
      updatedAt: now,
    };
  }, []);

  const startSession = useCallback(
    (templateId: string): ActiveSession => {
      const template = store.templates.find((t) => t.id === templateId);
      if (!template) throw new Error("Template não encontrado");
      if (template.exercises.length === 0) {
        throw new Error("Treino sem exercícios");
      }
      const session = sessionFromTemplate(template, store.history);
      persist((prev) => ({ ...prev, activeSession: session }));
      return session;
    },
    [persist, store.history, store.templates],
  );

  const cancelSession = useCallback(() => {
    persist((prev) => ({ ...prev, activeSession: null }));
  }, [persist]);

  const updateActiveSession = useCallback(
    (updater: (session: ActiveSession) => ActiveSession) => {
      persist((prev) => {
        if (!prev.activeSession) return prev;
        return { ...prev, activeSession: updater(prev.activeSession) };
      });
    },
    [persist],
  );

  const updateSessionNotes = useCallback(
    (notes: string) => updateActiveSession((s) => ({ ...s, sessionNotes: notes })),
    [updateActiveSession],
  );

  const updateExerciseNotes = useCallback(
    (exerciseId: string, notes: string) =>
      updateActiveSession((s) => ({
        ...s,
        exercises: s.exercises.map((ex) => (ex.id === exerciseId ? { ...ex, notes } : ex)),
      })),
    [updateActiveSession],
  );

  const setCurrentExerciseIndex = useCallback(
    (index: number) => updateActiveSession((s) => ({ ...s, currentExerciseIndex: index })),
    [updateActiveSession],
  );

  const updateSet = useCallback(
    (exerciseId: string, setId: string, patch: Partial<SessionSet>) =>
      updateActiveSession((s) => ({
        ...s,
        exercises: s.exercises.map((ex) =>
          ex.id === exerciseId
            ? {
                ...ex,
                sets: ex.sets.map((set) => (set.id === setId ? { ...set, ...patch } : set)),
              }
            : ex,
        ),
      })),
    [updateActiveSession],
  );

  const toggleSetComplete = useCallback(
    (exerciseId: string, setId: string) =>
      updateActiveSession((s) => ({
        ...s,
        exercises: s.exercises.map((ex) =>
          ex.id === exerciseId
            ? {
                ...ex,
                sets: ex.sets.map((set) =>
                  set.id === setId ? { ...set, completed: !set.completed } : set,
                ),
              }
            : ex,
        ),
      })),
    [updateActiveSession],
  );

  const addSet = useCallback(
    (exerciseId: string) =>
      updateActiveSession((s) => ({
        ...s,
        exercises: s.exercises.map((ex) => {
          if (ex.id !== exerciseId) return ex;
          const last = ex.sets[ex.sets.length - 1];
          return {
            ...ex,
            sets: [
              ...ex.sets,
              {
                id: createId(),
                loadKg: last?.loadKg ?? null,
                reps: last?.reps ?? null,
                completed: false,
              },
            ],
          };
        }),
      })),
    [updateActiveSession],
  );

  const removeSet = useCallback(
    (exerciseId: string, setId: string) =>
      updateActiveSession((s) => ({
        ...s,
        exercises: s.exercises.map((ex) => {
          if (ex.id !== exerciseId) return ex;
          if (ex.sets.length <= 1) return ex;
          return { ...ex, sets: ex.sets.filter((set) => set.id !== setId) };
        }),
      })),
    [updateActiveSession],
  );

  const finishSessionWithClosure = useCallback((): SessionClosureStats | null => {
    if (!store.activeSession) return null;
    const completedAt = Date.now();
    const durationMin = Math.max(
      1,
      Math.round((completedAt - store.activeSession.startedAt) / 60000),
    );
    const normalizedExercises = normalizeExercisesForSave(store.activeSession.exercises);
    const completed: CompletedSession = {
      id: store.activeSession.id,
      templateId: store.activeSession.templateId,
      templateName: store.activeSession.templateName,
      dayKey: store.activeSession.dayKey,
      startedAt: store.activeSession.startedAt,
      completedAt,
      durationMin,
      sessionNotes: store.activeSession.sessionNotes,
      exercises: normalizedExercises,
    };
    const stats = computeClosureStats(completed, store.history);
    persist((prev) => ({
      ...prev,
      activeSession: null,
      history: [completed, ...prev.history],
      pendingClosure: stats,
    }));
    return stats;
  }, [persist, store.activeSession, store.history]);

  const clearPendingClosure = useCallback(() => {
    persist((prev) => ({ ...prev, pendingClosure: null }));
  }, [persist]);

  const getSessionProgress = useCallback(() => {
    if (!store.activeSession) return { completedSets: 0, totalSets: 0 };
    let completedSets = 0;
    let totalSets = 0;
    for (const ex of store.activeSession.exercises) {
      for (const set of ex.sets) {
        totalSets++;
        if (set.completed) completedSets++;
      }
    }
    return { completedSets, totalSets };
  }, [store.activeSession]);

  const value = useMemo(
    () => ({
      programs: store.programs,
      templates: store.templates,
      activeSession: store.activeSession,
      history: store.history,
      pendingClosure: store.pendingClosure,
      hasActiveSession: store.activeSession != null,
      getProgram,
      getTemplatesForProgram,
      getTemplate,
      findTemplateForWorkoutName,
      saveTemplate,
      deleteTemplate,
      createTemplate,
      startSession,
      cancelSession,
      updateSessionNotes,
      updateExerciseNotes,
      setCurrentExerciseIndex,
      updateSet,
      toggleSetComplete,
      addSet,
      removeSet,
      finishSessionWithClosure,
      clearPendingClosure,
      getSessionProgress,
    }),
    [
      store,
      getProgram,
      getTemplatesForProgram,
      getTemplate,
      findTemplateForWorkoutName,
      saveTemplate,
      deleteTemplate,
      createTemplate,
      startSession,
      cancelSession,
      updateSessionNotes,
      updateExerciseNotes,
      setCurrentExerciseIndex,
      updateSet,
      toggleSetComplete,
      addSet,
      removeSet,
      finishSessionWithClosure,
      clearPendingClosure,
      getSessionProgress,
    ],
  );

  return <TrainingContext.Provider value={value}>{children}</TrainingContext.Provider>;
}

export function useTraining() {
  const ctx = useContext(TrainingContext);
  if (!ctx) throw new Error("useTraining must be used within TrainingProvider");
  return ctx;
}

export type { TemplateExercise, WorkoutTemplate };
