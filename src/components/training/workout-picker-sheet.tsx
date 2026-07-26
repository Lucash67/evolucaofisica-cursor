"use client";

import { Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { WorkoutTemplate } from "@/lib/domain/training/types";
import { cn } from "@/lib/utils";

interface WorkoutPickerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: WorkoutTemplate[];
  suggestedTemplateId: string | null;
  selectedTemplateId: string;
  onSelect: (templateId: string) => void;
}

export function WorkoutPickerSheet({
  open,
  onOpenChange,
  templates,
  suggestedTemplateId,
  selectedTemplateId,
  onSelect,
}: WorkoutPickerSheetProps) {
  const sorted = [...templates].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>Escolher treino de hoje</SheetTitle>
        </SheetHeader>
        <p className="mt-2 text-sm text-muted-foreground">
          O plano sugere um treino, mas você pode trocar em dias atípicos.
        </p>
        <div className="mt-4 space-y-2 overflow-y-auto pb-4">
          {sorted.map((t) => {
            const isSuggested = t.id === suggestedTemplateId;
            const isSelected = t.id === selectedTemplateId;
            const empty = t.exercises.length === 0;

            return (
              <button
                key={t.id}
                type="button"
                disabled={empty}
                onClick={() => {
                  onSelect(t.id);
                  onOpenChange(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors",
                  isSelected ? "bg-accent/15 ring-1 ring-accent/40" : "bg-muted/25 hover:bg-muted/40",
                  empty && "cursor-not-allowed opacity-50",
                )}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <Dumbbell className="h-5 w-5 text-accent" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {empty
                      ? "Sem exercícios — edite no programa"
                      : `${t.exercises.length} exercícios`}
                  </p>
                  {isSuggested && (
                    <p className="mt-0.5 text-xs text-accent">Sugerido pelo plano</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
          Fechar
        </Button>
      </SheetContent>
    </Sheet>
  );
}
