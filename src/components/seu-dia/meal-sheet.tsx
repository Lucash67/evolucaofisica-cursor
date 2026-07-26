"use client";

import { MEAL_SIZE_ESTIMATES, MEAL_TYPE_LABELS } from "@/lib/domain/meal-presets";
import type { MealSize, MealType } from "@/lib/domain/types";
import { useDay } from "@/context/day-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mealTypes: MealType[] = ["cafe", "almoco", "jantar", "lanche"];
const mealSizes: MealSize[] = ["pequeno", "medio", "grande"];

interface MealSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MealSheet({ open, onOpenChange }: MealSheetProps) {
  const { registerMeal } = useDay();
  const [step, setStep] = useState<"type" | "size">("type");
  const [selectedType, setSelectedType] = useState<MealType | null>(null);

  const reset = () => {
    setStep("type");
    setSelectedType(null);
  };

  const handleClose = (value: boolean) => {
    if (!value) reset();
    onOpenChange(value);
  };

  const confirmMeal = (size: MealSize) => {
    if (!selectedType) return;
    registerMeal(selectedType, size);
    handleClose(false);
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="rounded-t-2xl pb-8">
        <SheetHeader className="text-left">
          <SheetTitle>Registrar refeição</SheetTitle>
          <SheetDescription>
            {step === "type" ? "Escolha a refeição" : MEAL_TYPE_LABELS[selectedType!]}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {step === "type" ? (
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
                    <span className="text-sm text-muted-foreground">~{est.protein}g P</span>
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
