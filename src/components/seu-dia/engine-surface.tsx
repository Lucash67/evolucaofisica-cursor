import { Check } from "lucide-react";

import { HabitsCard } from "@/components/seu-dia/cards/habits-card";
import { NutritionCard } from "@/components/seu-dia/cards/nutrition-card";
import { Surface, SurfaceSection } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import type { SurfaceBlock, SurfaceProjection } from "@/lib/experience/types";

interface EngineSurfaceProps {
  surface: SurfaceProjection;
  onRegisterMeal: () => void;
  habitsLayout?: "stack" | "grid";
  nutritionLayout?: "stack" | "split";
  surfaceReady?: boolean;
}

function WorkoutCollapsedBlock() {
  const { state } = useDay();
  const { todayWorkout } = state;

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
      {todayWorkout.name} · {todayWorkout.durationMin} min · concluído
    </p>
  );
}

function renderBlock(
  block: SurfaceBlock,
  onRegisterMeal: () => void,
  habitsLayout: "stack" | "grid",
  nutritionLayout: "stack" | "split",
) {
  switch (block.id) {
    case "nutrition":
      return (
        <NutritionCard embedded layout={nutritionLayout} onRegister={onRegisterMeal} />
      );
    case "habits":
      return <HabitsCard embedded layout={habitsLayout} />;
    case "workoutCollapsed":
      return <WorkoutCollapsedBlock />;
    default:
      return null;
  }
}

export function EngineSurface({
  surface,
  onRegisterMeal,
  habitsLayout = "stack",
  nutritionLayout = "stack",
  surfaceReady = true,
}: EngineSurfaceProps) {
  const sorted = [...surface.blocks]
    .sort((a, b) => a.order - b.order)
    .filter((block) => surfaceReady || block.id !== "workoutCollapsed");

  return (
    <Surface className="animate-in fade-in duration-200">
      {sorted.map((block, index) => (
        <SurfaceSection
          key={block.id}
          noDivider={index === 0}
          className={block.emphasis === "featured" ? "rounded-xl bg-accent/[0.03] px-1 -mx-1" : undefined}
        >
          {block.id === "workoutCollapsed" ? (
            <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">
              {renderBlock(block, onRegisterMeal, habitsLayout, nutritionLayout)}
            </div>
          ) : (
            renderBlock(block, onRegisterMeal, habitsLayout, nutritionLayout)
          )}
        </SurfaceSection>
      ))}
    </Surface>
  );
}
