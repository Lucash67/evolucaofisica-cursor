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
import { MEAL_SIZE_ESTIMATES, MEAL_TYPE_LABELS } from "@/lib/domain/meal-presets";
import { buildMealVictory } from "@/lib/domain/nutrition/progress-copy";
import type { MealSize, MealType } from "@/lib/domain/types";
import { cn } from "@/lib/utils";

const mealTypes: MealType[] = ["cafe", "almoco", "jantar", "lanche"];
const mealSizes: MealSize[] = ["pequeno", "medio", "grande"];

interface MealRegisterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MealRegisterSheet({ open, onOpenChange }: MealRegisterSheetProps) {
  const { logMeal, goals, todayTotals } = useNutrition();
  const [step, setStep] = useState<"type" | "size" | "victory">("type");
  const [selectedType, setSelectedType] = useState<MealType | null>(null);
  const [victory, setVictory] = useState<ReturnType<typeof buildMealVictory> | null>(null);

  const reset = () => {
    setStep("type");
    setSelectedType(null);
    setVictory(null);
  };

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  const confirmMeal = (size: MealSize) => {
    if (!selectedType) return;
    const proteinAdded = MEAL_SIZE_ESTIMATES[size].protein;
    const before = todayTotals.proteinCurrent;
    setVictory(buildMealVictory(before, proteinAdded, goals.proteinTarget));
    logMeal(selectedType, size);
    setStep("victory");
  };

  useEffect(() => {
    if (step !== "victory" || !open) return;
    const timer = window.setTimeout(() => handleClose(false), 2400);
    return () => window.clearTimeout(timer);
  }, [step, open]);

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="rounded-t-2xl pb-8">
        <SheetHeader className="text-left">
          <SheetTitle>
            {step === "victory" ? "Refeição registrada" : "Registrar refeição"}
          </SheetTitle>
          <SheetDescription>
            {step === "type" && "Escolha a refeição"}
            {step === "size" && MEAL_TYPE_LABELS[selectedType!]}
            {step === "victory" && "Isso te aproximou do objetivo de hoje."}
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
                    setStep("size");
                  }}
                >
                  {MEAL_TYPE_LABELS[type]}
                </Button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {mealSizes.map((size) => {
                const est = MEAL_SIZE_ESTIMATES[size];
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => confirmMeal(size)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border border-border px-4 py-4 text-left transition-colors duration-200",
                      "hover:border-accent/40 hover:bg-accent/5 active:scale-[0.99]",
                    )}
                  >
                    <span className="font-medium">{est.label}</span>
                    <span className="text-sm text-muted-foreground">
                      +{est.protein}g · ~{est.calories} kcal
                    </span>
                  </button>
                );
              })}
              <Button variant="ghost" className="mt-2 w-full" onClick={() => setStep("type")}>
                Voltar
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
