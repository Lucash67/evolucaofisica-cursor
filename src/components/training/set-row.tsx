"use client";

import { Check, Trash2 } from "lucide-react";

import { NumericField } from "@/components/training/numeric-field";
import { cn } from "@/lib/utils";

interface SetRowProps {
  index: number;
  loadKg: number | null;
  reps: number | null;
  completed: boolean;
  active?: boolean;
  canDelete?: boolean;
  onLoadChange: (value: number | null) => void;
  onRepsChange: (value: number | null) => void;
  onToggleComplete: () => void;
  onRemove?: () => void;
}

export function SetRow({
  index,
  loadKg,
  reps,
  completed,
  active,
  canDelete,
  onLoadChange,
  onRepsChange,
  onToggleComplete,
  onRemove,
}: SetRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1.75rem_1fr_1fr_2.75rem_2rem] items-center gap-1.5 rounded-xl px-1 py-1.5 transition-colors duration-150",
        completed && "bg-accent/10",
        active && !completed && "bg-accent/5 ring-1 ring-accent/30",
      )}
    >
      <span className="text-center text-sm tabular-nums text-muted-foreground">{index + 1}</span>

      <NumericField
        value={loadKg}
        onChange={onLoadChange}
        placeholder="kg"
        suffix="kg"
        inputMode="decimal"
      />

      <NumericField
        value={reps}
        onChange={onRepsChange}
        placeholder="reps"
        inputMode="numeric"
      />

      <button
        type="button"
        onClick={onToggleComplete}
        aria-label={completed ? "Desmarcar série" : "Concluir série"}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-150",
          completed
            ? "bg-accent text-accent-foreground"
            : "bg-background ring-1 ring-border/40 hover:ring-accent/40",
        )}
      >
        <Check className="h-4 w-4" strokeWidth={2.5} />
      </button>

      {canDelete ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Excluir série"
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ) : (
        <span className="w-8" />
      )}
    </div>
  );
}
