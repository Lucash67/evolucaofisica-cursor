import { useState } from "react";
import { Check, Droplets, Moon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useDay } from "@/context/day-context";
import type { SleepQuality } from "@/lib/domain/types";
import { cn } from "@/lib/utils";

const qualityOptions: { value: SleepQuality; label: string }[] = [
  { value: "ruim", label: "Ruim" },
  { value: "ok", label: "Ok" },
  { value: "boa", label: "Boa" },
];

export type HabitsLayout = "stack" | "grid";

interface HabitsCardProps {
  layout?: HabitsLayout;
  className?: string;
  embedded?: boolean;
}

export function HabitsCard({ layout = "stack", className, embedded }: HabitsCardProps) {
  const { state, logSleep, addWaterCup } = useDay();
  const [sleepHours, setSleepHours] = useState(state.sleepLastNight.hours);
  const [quality, setQuality] = useState<SleepQuality>(state.sleepLastNight.quality);

  const waterDone = state.waterCups >= state.waterTarget;
  const isGrid = layout === "grid";

  return (
    <div className={cn(!embedded && "contents", className)}>
      <div className={cn(isGrid ? "grid gap-6 md:grid-cols-2" : "space-y-6")}>
        <div>
          <div className="mb-3 flex items-center gap-2 text-[13px] text-muted-foreground">
            <Moon className="h-3.5 w-3.5" />
            Sono
            {state.sleepLoggedToday && (
              <Check className="ml-auto h-3.5 w-3.5 text-accent" aria-label="Registrado" />
            )}
          </div>
          {!state.sleepLoggedToday ? (
            <>
              <p className="mb-2 text-lg font-medium tabular-nums">{sleepHours}h</p>
              <Slider
                value={[sleepHours]}
                min={4}
                max={10}
                step={0.5}
                onValueChange={([v]) => setSleepHours(v)}
                className="[&_[role=slider]]:h-3.5 [&_[role=slider]]:w-3.5 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-accent"
              />
              <div className="mt-3 flex gap-1.5">
                {qualityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setQuality(opt.value)}
                    className={cn(
                      "flex-1 rounded-md px-2 py-1.5 text-xs transition-all duration-200",
                      quality === opt.value
                        ? "bg-accent/15 text-foreground"
                        : "text-muted-foreground hover:bg-muted/40",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 text-[13px] text-muted-foreground transition-colors hover:text-accent"
                onClick={() => {
                  logSleep(sleepHours, quality);
                  toast.success("Sono registrado");
                }}
              >
                Confirmar
              </button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              {state.sleepLastNight.hours}h ·{" "}
              {qualityOptions.find((q) => q.value === state.sleepLastNight.quality)?.label}
            </p>
          )}
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-[13px] text-muted-foreground">
            <Droplets className="h-3.5 w-3.5" />
            Água
            <span className="ml-auto tabular-nums">
              {state.waterCups}/{state.waterTarget}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-full justify-start px-0 text-muted-foreground hover:bg-transparent hover:text-accent"
            onClick={() => {
              addWaterCup();
              if (state.waterCups + 1 >= state.waterTarget) {
                toast.success("Meta de água atingida");
              }
            }}
            disabled={waterDone}
          >
            {waterDone ? "Suficiente hoje" : "+ Copo"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { qualityOptions };
