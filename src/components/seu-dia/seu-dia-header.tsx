import { getGreeting, useDay } from "@/context/day-context";
import { cn } from "@/lib/utils";

interface SeuDiaHeaderProps {
  className?: string;
  /** EP-01: Hero do engine carrega observação pós-treino */
  engineActive?: boolean;
}

export function SeuDiaHeader({ className, engineActive }: SeuDiaHeaderProps) {
  const { state } = useDay();
  const meta = `${state.user.dayOfWeek} · Semana ${state.user.weekNumber} · ${state.user.phase}`;

  return (
    <header className={cn("mb-8 lg:mb-10", className)}>
      <p className="text-[11px] font-medium tracking-wide text-muted-foreground/70">{meta}</p>
      <h1 className="mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight lg:text-[2rem]">
        {getGreeting(state)}
      </h1>
      {!engineActive && state.sleepLastNight.hours < 6 && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground lg:text-base">
          Noite curta ontem.
        </p>
      )}
      {engineActive && state.sleepLastNight.hours < 6 && (
        <p className="mt-3 text-[15px] text-muted-foreground">Noite curta ontem.</p>
      )}
      <p className="mt-4 text-[13px] text-muted-foreground/60">
        Ontem ·{" "}
        {[
          state.yesterday.workoutDone ? "Treino feito" : "Sem treino",
          `${state.yesterday.proteinGrams}g proteína`,
          `${state.yesterday.sleepHours} sono`,
        ].join(" · ")}
      </p>
    </header>
  );
}
