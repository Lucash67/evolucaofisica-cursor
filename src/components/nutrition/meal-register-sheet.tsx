"use client";

import { useEffect, useState } from "react";

import { MealVictoryPanel } from "@/components/nutrition/meal-victory-panel";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNutrition } from "@/context/nutrition-context";
import { MEAL_TYPE_LABELS } from "@/lib/domain/meal-presets";
import {
  buildLoggedAt,
  defaultTimeForDay,
  formatDayKeyShort,
} from "@/lib/domain/nutrition/date-utils";
import { buildMealVictory } from "@/lib/domain/nutrition/progress-copy";
import type { MealType } from "@/lib/domain/types";
import { cn } from "@/lib/utils";

const mealTypes: MealType[] = ["cafe", "almoco", "jantar", "lanche"];

interface MealRegisterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface MacroForm {
  protein: string;
  calories: string;
  carbs: string;
  fat: string;
  time: string;
}

const emptyForm = (dayKey: string): MacroForm => ({
  protein: "",
  calories: "",
  carbs: "",
  fat: "",
  time: defaultTimeForDay(dayKey),
});

function parseNonNegative(value: string): number {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n);
}

export function MealRegisterSheet({ open, onOpenChange }: MealRegisterSheetProps) {
  const { logMeal, goals, selectedDayTotals, selectedDayKey, isSelectedToday } = useNutrition();
  const [step, setStep] = useState<"type" | "details" | "victory">("type");
  const [selectedType, setSelectedType] = useState<MealType | null>(null);
  const [form, setForm] = useState<MacroForm>(() => emptyForm(selectedDayKey));
  const [victory, setVictory] = useState<ReturnType<typeof buildMealVictory> | null>(null);

  const reset = () => {
    setStep("type");
    setSelectedType(null);
    setForm(emptyForm(selectedDayKey));
    setVictory(null);
  };

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, time: defaultTimeForDay(selectedDayKey) }));
    }
  }, [open, selectedDayKey]);

  const confirmMeal = () => {
    if (!selectedType) return;

    const protein = parseNonNegative(form.protein);
    const calories = parseNonNegative(form.calories);
    const carbs = parseNonNegative(form.carbs);
    const fat = parseNonNegative(form.fat);

    if (protein + calories + carbs + fat === 0) return;

    const before = selectedDayTotals.proteinCurrent;
    setVictory(buildMealVictory(before, protein, goals.proteinTarget));

    logMeal({
      type: selectedType,
      protein,
      calories,
      carbs,
      fat,
      dayKey: selectedDayKey,
      loggedAt: buildLoggedAt(selectedDayKey, form.time),
    });

    setStep("victory");
  };

  useEffect(() => {
    if (step !== "victory" || !open) return;
    const timer = window.setTimeout(() => handleClose(false), 2400);
    return () => window.clearTimeout(timer);
  }, [step, open]);

  const dayLabel = isSelectedToday ? "hoje" : formatDayKeyShort(selectedDayKey);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto rounded-t-2xl pb-8">
        <SheetHeader className="text-left">
          <SheetTitle>
            {step === "victory" ? "Refeição registrada" : "Registrar refeição"}
          </SheetTitle>
          <SheetDescription>
            {step === "type" && `Escolha a refeição para ${dayLabel}`}
            {step === "details" && `${MEAL_TYPE_LABELS[selectedType!]} · ${dayLabel}`}
            {step === "victory" && "Isso te aproximou do objetivo."}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {step === "victory" && victory ? (
            <MealVictoryPanel victory={victory} />
          ) : step === "type" ? (
            <div className="grid grid-cols-2 gap-2">
              {mealTypes.map((type) => (
                <Button
                  key={type}
                  variant="outline"
                  className="h-12"
                  onClick={() => {
                    setSelectedType(type);
                    setStep("details");
                  }}
                >
                  {MEAL_TYPE_LABELS[type]}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground">Proteína (g)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={form.protein}
                    onChange={(e) => setForm((f) => ({ ...f, protein: e.target.value }))}
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground">Calorias (kcal)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={form.calories}
                    onChange={(e) => setForm((f) => ({ ...f, calories: e.target.value }))}
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground">Carboidratos (g)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={form.carbs}
                    onChange={(e) => setForm((f) => ({ ...f, carbs: e.target.value }))}
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground">Gorduras (g)</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min={0}
                    value={form.fat}
                    onChange={(e) => setForm((f) => ({ ...f, fat: e.target.value }))}
                    placeholder="0"
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm tabular-nums"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Horário</span>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
                  className={cn(
                    "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm",
                  )}
                />
              </label>

              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={confirmMeal}>
                Salvar refeição
              </Button>
              <Button variant="ghost" className="w-full" onClick={() => setStep("type")}>
                Voltar
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
