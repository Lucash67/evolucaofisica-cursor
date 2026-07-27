export type MacroKind = "calories" | "protein" | "carbs" | "fat";

export interface MacroProgressView {
  kind: MacroKind;
  current: number;
  target: number;
  gap: number;
  over: number;
  pct: number;
  isOver: boolean;
  unit: "kcal" | "g";
}

export function buildMacroProgress(
  current: number,
  target: number,
  kind: MacroKind,
): MacroProgressView {
  const safeTarget = Math.max(1, target);
  const unit = kind === "calories" ? "kcal" : "g";
  const isOver = current > target;
  const gap = isOver ? 0 : target - current;
  const over = isOver ? current - target : 0;
  const pct = Math.min(100, Math.round((current / safeTarget) * 100));

  return { kind, current, target, gap, over, pct, isOver, unit };
}

export function getMacroGapCopy(view: MacroProgressView, label: string): string {
  if (view.isOver) {
    if (view.kind === "calories") {
      return `${view.over} kcal acima da meta.`;
    }
    return `${view.over}g de ${label.toLowerCase()} acima da meta.`;
  }
  if (view.gap <= 0) {
    return `Meta de ${label.toLowerCase()} atingida.`;
  }
  if (view.kind === "calories") {
    if (view.pct >= 75) return `Restam apenas ${view.gap} kcal.`;
    return `Restam ${view.gap} kcal.`;
  }
  if (view.pct >= 75) return `Faltam apenas ${view.gap}g.`;
  return `Faltam ${view.gap}g de ${label.toLowerCase()}.`;
}

export const MACRO_LABELS: Record<MacroKind, string> = {
  calories: "Calorias",
  protein: "Proteína",
  carbs: "Carboidratos",
  fat: "Gorduras",
};
