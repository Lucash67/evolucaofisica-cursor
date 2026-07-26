import { getDayKey } from "./utils";

const STORAGE_KEY = "evolucao.training.todayTemplate";

interface StoredSelection {
  dayKey: string;
  templateId: string;
}

export function getSelectedTemplateIdForToday(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSelection;
    if (parsed.dayKey !== getDayKey()) return null;
    return parsed.templateId;
  } catch {
    return null;
  }
}

export function setSelectedTemplateIdForToday(templateId: string): void {
  if (typeof window === "undefined") return;
  const payload: StoredSelection = { dayKey: getDayKey(), templateId };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export function clearSelectedTemplateForToday(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
