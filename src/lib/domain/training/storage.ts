import { createDefaultProgram, createDefaultTemplates, createInitialStore } from "./defaults";
import type { TrainingStore } from "./types";
import { createId } from "./utils";

const STORAGE_KEY = "evolucao.training.v2";

function migrateStore(raw: Partial<TrainingStore>): TrainingStore {
  let store = { ...raw } as TrainingStore;

  if (!store.programs?.length) {
    const program = createDefaultProgram();
    store.programs = [program];
    store.templates = (store.templates ?? createDefaultTemplates(program.id)).map((t) => ({
      ...t,
      programId: t.programId ?? program.id,
    }));
  }

  if (!store.templates?.length) {
    store.templates = createDefaultTemplates(store.programs[0].id);
  }

  store.templates = store.templates.map((t) => ({
    ...t,
    programId: t.programId ?? store.programs[0].id,
  }));

  store.activeSession = store.activeSession ?? null;
  store.history = store.history ?? [];
  store.pendingClosure = store.pendingClosure ?? null;

  return store;
}

export function loadTrainingStore(): TrainingStore {
  if (typeof window === "undefined") {
    return createInitialStore();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createInitialStore();
      saveTrainingStore(initial);
      return initial;
    }
    return migrateStore(JSON.parse(raw) as Partial<TrainingStore>);
  } catch {
    const initial = createInitialStore();
    saveTrainingStore(initial);
    return initial;
  }
}

export function saveTrainingStore(store: TrainingStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function createProgram(name: string): TrainingStore["programs"][0] {
  const now = Date.now();
  return { id: createId(), name, description: "", createdAt: now, updatedAt: now };
}
