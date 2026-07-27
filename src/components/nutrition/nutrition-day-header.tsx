"use client";

import { useState } from "react";
import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useNutrition } from "@/context/nutrition-context";
import {
  dayKeyToDate,
  formatDayKeyLong,
} from "@/lib/domain/nutrition/date-utils";
import { getDayKey } from "@/lib/domain/training/utils";
import { cn } from "@/lib/utils";

export function NutritionDayHeader() {
  const { selectedDayKey, setSelectedDayKey, daysWithMeals, isSelectedToday } = useNutrition();
  const [open, setOpen] = useState(false);

  const mealDays = daysWithMeals.map(dayKeyToDate);

  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {isSelectedToday ? "Hoje" : "Consultando"}
        </p>
        <p className="mt-0.5 text-lg font-semibold capitalize leading-snug">
          {formatDayKeyLong(selectedDayKey)}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {!isSelectedToday && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-accent"
            onClick={() => setSelectedDayKey(getDayKey())}
          >
            Hoje
          </Button>
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button type="button" variant="outline" size="icon" aria-label="Escolher dia">
              <CalendarDays className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={dayKeyToDate(selectedDayKey)}
              onSelect={(date) => {
                if (!date) return;
                setSelectedDayKey(getDayKey(date));
                setOpen(false);
              }}
              modifiers={{ hasMeals: mealDays }}
              modifiersClassNames={{
                hasMeals: cn("relative after:absolute after:bottom-1 after:h-1 after:w-1 after:rounded-full after:bg-accent"),
              }}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
