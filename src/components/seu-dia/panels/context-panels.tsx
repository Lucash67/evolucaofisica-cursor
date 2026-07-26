import { Progress } from "@/components/ui/progress";
import { SurfaceLabel } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { cn } from "@/lib/utils";

interface PanelProps {
  className?: string;
}

export function WeekSummaryPanel({ className }: PanelProps) {
  const { state } = useDay();
  const { nutrition, workoutsThisWeek, workoutsTarget, waterCups, waterTarget } = state;
  const workoutPct = Math.round((workoutsThisWeek / workoutsTarget) * 100);
  const proteinPct = Math.min(
    100,
    Math.round((nutrition.proteinCurrent / nutrition.proteinTarget) * 100),
  );
  const waterPct = Math.round((waterCups / waterTarget) * 100);

  const metrics = [
    { label: "Treinos", value: `${workoutsThisWeek}/${workoutsTarget}`, pct: workoutPct },
    { label: "Proteína", value: `${nutrition.proteinCurrent}g`, pct: proteinPct },
    { label: "Água", value: `${waterCups}/${waterTarget}`, pct: waterPct },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <SurfaceLabel>Esta semana</SurfaceLabel>
      <div className="space-y-3.5">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-medium tabular-nums">{m.value}</span>
            </div>
            <Progress value={m.pct} className="mt-1.5 h-0.5 bg-muted/60 [&>div]:bg-accent/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function InsightsPanel({ className }: PanelProps) {
  const { state } = useDay();
  const insights: string[] = [];

  const proteinPct = state.nutrition.proteinCurrent / state.nutrition.proteinTarget;
  if (proteinPct < 0.7) {
    insights.push(`Proteína em ${Math.round(proteinPct * 100)}% da meta.`);
  }
  if (state.sleepLastNight.hours < 6) {
    insights.push("Sono abaixo do ideal — considere reduzir intensidade.");
  }
  const remaining = state.workoutsTarget - state.workoutsThisWeek;
  if (remaining > 0 && state.todayWorkout.status !== "rest") {
    insights.push(
      remaining === 1 ? "1 treino restante esta semana." : `${remaining} treinos restantes.`,
    );
  }
  if (insights.length === 0) {
    insights.push("Semana equilibrada. Mantenha o ritmo.");
  }

  return (
    <div className={cn("space-y-3", className)}>
      <SurfaceLabel>Contexto</SurfaceLabel>
      <ul className="space-y-2">
        {insights.slice(0, 2).map((text) => (
          <li key={text} className="text-[13px] leading-relaxed text-muted-foreground">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function NextActionsPanel({ className }: PanelProps) {
  const { state, getNextAction } = useDay();
  const next = getNextAction();

  return (
    <div className={cn("space-y-4", className)}>
      <SurfaceLabel>Depois</SurfaceLabel>
      <div className="space-y-3 text-sm">
        <p className="font-medium">{next.label}</p>
        <p className="text-muted-foreground">
          Amanhã · {state.tomorrowWorkout.name} · {state.tomorrowWorkout.durationMin} min
        </p>
      </div>
    </div>
  );
}

export function PhaseSummaryPanel({ className }: PanelProps) {
  const { state } = useDay();

  return (
    <div className={cn("space-y-3", className)}>
      <SurfaceLabel>Fase</SurfaceLabel>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Objetivo</dt>
          <dd className="font-medium text-right">{state.user.objective}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">{state.user.phase}</dt>
          <dd className="text-muted-foreground text-right tabular-nums">Semana {state.user.weekNumber}</dd>
        </div>
      </dl>
    </div>
  );
}

export function WeekEvolutionPanel({ className }: PanelProps) {
  const { state } = useDay();
  const days = ["S", "T", "Q", "Q", "S", "S", "D"];
  const completed = state.workoutsThisWeek;
  const target = state.workoutsTarget;
  const todayIndex = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].indexOf(
    state.user.dayOfWeek,
  );

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-end justify-between gap-1">
        {days.map((day, i) => {
          const done = i < completed;
          const isToday = i === todayIndex;
          return (
            <div key={`${day}-${i}`} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={cn(
                  "w-full max-w-[20px] rounded-sm transition-all duration-300",
                  done ? "bg-accent/80" : "bg-muted/50",
                  isToday ? "h-10" : done ? "h-7" : "h-4",
                )}
              />
              <span
                className={cn(
                  "text-[9px] uppercase",
                  isToday ? "font-medium text-foreground" : "text-muted-foreground/50",
                )}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-[12px] text-muted-foreground/70">
        {completed}/{target} treinos
      </p>
    </div>
  );
}

export function PendingPanel({ className }: PanelProps) {
  const { getPendingItems } = useDay();
  const pending = getPendingItems();

  if (pending.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)} aria-label="Pendências">
      <SurfaceLabel>Falta</SurfaceLabel>
      <ul className="space-y-1.5">
        {pending.map((item) => (
          <li key={item} className="text-[13px] text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Coluna de contexto desktop — superfície única, sem cards aninhados. */
export function ContextColumn({ className }: PanelProps) {
  return (
    <aside
      className={cn(
        "space-y-8 rounded-2xl bg-muted/15 px-6 py-6 ring-1 ring-border/25 lg:sticky lg:top-8 lg:self-start",
        className,
      )}
    >
      <WeekSummaryPanel />
      <WeekEvolutionPanel />
      <NextActionsPanel />
      <InsightsPanel />
    </aside>
  );
}
