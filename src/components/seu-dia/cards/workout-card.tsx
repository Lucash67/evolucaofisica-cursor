import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { SurfaceLabel } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { cn } from "@/lib/utils";

export type CardLayout = "stack" | "horizontal" | "featured";

interface WorkoutCardProps {
  layout?: CardLayout;
  className?: string;
  embedded?: boolean;
}

export function WorkoutCard({ layout = "stack", className, embedded }: WorkoutCardProps) {
  const { state, rescheduleWorkout } = useDay();
  const { todayWorkout, workoutsThisWeek, workoutsTarget } = state;

  const isHorizontal = layout === "horizontal" || layout === "featured";
  const isFeatured = layout === "featured";

  if (todayWorkout.status === "rest") {
    return (
      <div className={cn(!embedded && "rounded-2xl bg-card/40 px-5 py-5 ring-1 ring-border/40", className)}>
        <SurfaceLabel>Recuperação</SurfaceLabel>
        <p className="mt-2 text-lg font-medium tracking-tight">Dia de descanso</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {workoutsThisWeek}/{workoutsTarget} treinos esta semana
        </p>
      </div>
    );
  }

  const completed = todayWorkout.status === "completed";
  const rescheduled = todayWorkout.status === "rescheduled";

  return (
    <div className={cn(!embedded && isFeatured && "rounded-2xl bg-card px-5 py-6 ring-1 ring-accent/10", !embedded && !isFeatured && "contents", className)}>
      <div
        className={cn(
          isHorizontal && !completed && !rescheduled
            ? "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"
            : undefined,
        )}
      >
        <div className={cn(isHorizontal && "flex-1")}>
          {!embedded && !isFeatured && <SurfaceLabel>Agora</SurfaceLabel>}
          <h2
            className={cn(
              "font-semibold tracking-tight",
              isFeatured ? "mt-2 text-2xl lg:text-[1.75rem]" : "mt-1 text-xl",
            )}
          >
            {completed && <Check className="mr-2 inline h-5 w-5 text-accent" aria-hidden />}
            {rescheduled ? "Remarcado" : todayWorkout.name}
          </h2>
          {!completed && !rescheduled && (
            <p className="mt-1.5 text-sm text-muted-foreground">
              {todayWorkout.durationMin} min · {todayWorkout.exerciseCount} exercícios ·{" "}
              {workoutsThisWeek}/{workoutsTarget} esta semana
            </p>
          )}
          {rescheduled && (
            <p className="mt-1.5 text-sm text-muted-foreground">
              {todayWorkout.name} movido para amanhã
            </p>
          )}
          {completed && (
            <p className="mt-1.5 text-sm text-muted-foreground">
              {workoutsThisWeek}/{workoutsTarget} treinos esta semana
            </p>
          )}
        </div>

        {!completed && !rescheduled && (
          <div
            className={cn(
              "flex flex-col gap-2",
              isHorizontal ? "w-full shrink-0 lg:w-auto lg:min-w-[200px]" : "mt-5",
            )}
          >
            <Button
              asChild
              size={isFeatured ? "lg" : "default"}
              className="bg-accent text-accent-foreground shadow-none hover:bg-accent/90"
            >
              <Link to="/treino">Iniciar treino</Link>
            </Button>
            {todayWorkout.status === "pending" && (
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => {
                  rescheduleWorkout();
                  toast.message("Treino remarcado para amanhã");
                }}
              >
                Remarcar
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
