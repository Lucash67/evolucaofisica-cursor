"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Dumbbell, Plus, TrendingUp } from "lucide-react";

import { EvolutionSummaryPanel } from "@/components/training/evolution-summary-panel";
import { WorkoutPickerSheet } from "@/components/training/workout-picker-sheet";
import { Button } from "@/components/ui/button";
import { Surface } from "@/components/ui/surface";
import { useDay } from "@/context/day-context";
import { useTraining } from "@/context/training-context";
import { getEvolutionSummary } from "@/lib/domain/training/evolution-summary";
import { formatSetPerformance, hasMeaningfulSetData } from "@/lib/domain/training/format";
import { getExerciseProgressions } from "@/lib/domain/training/progression";
import {
  getSelectedTemplateIdForToday,
  setSelectedTemplateIdForToday,
} from "@/lib/domain/training/selected-workout";
import { formatDayKey, formatTomorrowDate } from "@/lib/domain/training/utils";
import { cn } from "@/lib/utils";

type Tab = "hoje" | "programas" | "historico";
type HistoryLens = "evolucao" | "sessoes" | "resumo";

interface TrainingWorkspaceScreenProps {
  tab?: Tab;
  historyLens?: HistoryLens;
}

export function TrainingWorkspaceScreen({
  tab = "hoje",
  historyLens = "evolucao",
}: TrainingWorkspaceScreenProps) {
  const navigate = useNavigate();
  const { state } = useDay();
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const {
    programs,
    templates,
    activeSession,
    history,
    findTemplateForWorkoutName,
    getTemplate,
    getTemplatesForProgram,
    hasActiveSession,
  } = useTraining();

  const suggestedTemplate = findTemplateForWorkoutName(state.todayWorkout.name);
  const suggestedTemplateId = suggestedTemplate?.id ?? null;

  useEffect(() => {
    setSelectedTemplateId(getSelectedTemplateIdForToday());
  }, []);

  const effectiveTemplateId = selectedTemplateId ?? suggestedTemplateId;
  const todayTemplate = effectiveTemplateId ? getTemplate(effectiveTemplateId) : suggestedTemplate;
  const swappedFromPlan =
    selectedTemplateId != null &&
    suggestedTemplateId != null &&
    selectedTemplateId !== suggestedTemplateId;
  const todayTemplateEmpty = todayTemplate != null && todayTemplate.exercises.length === 0;

  const handleSelectWorkout = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setSelectedTemplateIdForToday(templateId);
  };

  const evolutionSummary = getEvolutionSummary(history);

  const goWarmup = (templateId: string) => {
    navigate({ to: "/treino/warmup/$templateId", params: { templateId } });
  };

  const progressions = getExerciseProgressions(history);

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Workspace</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Treino</h1>
      </header>

      <nav className="mb-6 flex gap-1 rounded-xl bg-muted/30 p-1">
        {(
          [
            { id: "hoje" as const, label: "Hoje", to: "/treino" },
            { id: "programas" as const, label: "Programas", to: "/treino/programas" },
            { id: "historico" as const, label: "Histórico", to: "/treino/historico" },
          ] as const
        ).map(({ id, label, to }) => (
          <Link
            key={id}
            to={to}
            className={cn(
              "flex-1 rounded-lg py-2 text-center text-sm transition-colors",
              tab === id
                ? "bg-background font-medium text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {tab === "hoje" && (
        <div className="space-y-5">
          {hasActiveSession && activeSession && (
            <Surface className="border-accent/20 bg-accent/5 px-5 py-4">
              <p className="text-xs font-medium text-accent uppercase">Sessão ativa</p>
              <p className="mt-1 font-semibold">{activeSession.templateName}</p>
              <Button asChild className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/treino/sessao">Retomar sessão</Link>
              </Button>
            </Surface>
          )}

          {todayTemplateEmpty && !hasActiveSession && state.todayWorkout.status !== "completed" && (
            <Surface className="px-5 py-6">
              <h2 className="text-xl font-semibold">{todayTemplate!.name}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Treino sem exercícios. Apague ou adicione exercícios no programa para começar.
              </p>
              <Button asChild className="mt-5 w-full" variant="outline">
                <Link
                  to="/treino/programas/treino/$templateId"
                  params={{ templateId: todayTemplate!.id }}
                >
                  Editar treino
                </Link>
              </Button>
            </Surface>
          )}

          {todayTemplate &&
            todayTemplate.exercises.length > 0 &&
            !hasActiveSession &&
            state.todayWorkout.status !== "completed" && (
            <Surface variant="featured" className="px-5 py-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                  <Dumbbell className="h-5 w-5 text-accent" />
                </span>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">
                    Semana {state.user.weekNumber}
                  </p>
                  <h2 className="text-xl font-semibold">{todayTemplate.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {todayTemplate.exercises.length} exercícios
                  </p>
                  {swappedFromPlan && suggestedTemplate && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Plano sugeria{" "}
                      <span className="font-medium text-foreground">{suggestedTemplate.name}</span>
                    </p>
                  )}
                  {!swappedFromPlan && suggestedTemplateId === todayTemplate.id && (
                    <p className="mt-1 text-xs text-accent">Sugerido pelo plano</p>
                  )}
                </div>
              </div>
              <Button
                className="mt-5 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
                onClick={() => goWarmup(todayTemplate.id)}
              >
                Iniciar sessão
              </Button>
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="mt-3 block w-full text-center text-sm text-muted-foreground hover:text-accent"
              >
                Trocar treino de hoje
              </button>
            </Surface>
          )}

          {templates.length > 0 && (
            <WorkoutPickerSheet
              open={pickerOpen}
              onOpenChange={setPickerOpen}
              templates={templates}
              suggestedTemplateId={suggestedTemplateId}
              selectedTemplateId={effectiveTemplateId ?? templates[0]!.id}
              onSelect={handleSelectWorkout}
            />
          )}

          {!todayTemplate && !hasActiveSession && state.todayWorkout.status !== "completed" && (
            <Surface className="px-5 py-6">
              <p className="text-sm text-muted-foreground">
                Nenhum treino encontrado para &ldquo;{state.todayWorkout.name}&rdquo;. Escolha um
                treino do programa para hoje.
              </p>
              <Button className="mt-4 w-full" onClick={() => setPickerOpen(true)}>
                Escolher treino
              </Button>
              <Button asChild className="mt-2 w-full" variant="outline">
                <Link to="/treino/programas">Ver programas</Link>
              </Button>
            </Surface>
          )}

          {state.todayWorkout.status === "completed" && (
            <div className="space-y-4">
              <Surface className="px-5 py-5">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Concluído hoje
                </p>
                <p className="mt-1 text-lg font-semibold">{state.todayWorkout.name}</p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/treino/historico">Ver histórico</Link>
                </Button>
              </Surface>

              <Surface variant="featured" className="px-5 py-5">
                <p className="text-xs text-muted-foreground">Próximo treino</p>
                <h2 className="mt-1 text-xl font-semibold">{state.tomorrowWorkout.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Amanhã · {formatTomorrowDate()}
                </p>
              </Surface>
            </div>
          )}

          {progressions.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-medium">Evolução recente</h3>
                <Link
                  to="/treino/historico/resumo"
                  className="text-xs text-muted-foreground hover:text-accent"
                >
                  Ver resumo
                </Link>
              </div>
              <div className="space-y-2">
                {progressions.slice(0, 3).map((p) => (
                  <div
                    key={p.exerciseName}
                    className="flex items-center justify-between rounded-xl bg-muted/20 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{p.exerciseName}</p>
                      <p className="text-xs tabular-nums text-muted-foreground">
                        {p.latestLoadKg != null
                          ? `${p.latestLoadKg}kg`
                          : formatSetPerformance(
                              p.points.at(-1)?.loadKg ?? null,
                              p.points.at(-1)?.reps ?? null,
                            )}
                        {p.points.at(-1)?.templateName && (
                          <span className="text-muted-foreground/70">
                            {" "}
                            · {p.points.at(-1)!.templateName}
                          </span>
                        )}
                      </p>
                    </div>
                    {p.trend === "up" && <TrendingUp className="h-4 w-4 text-accent" />}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {tab === "programas" && (
        <div className="space-y-4">
          {programs.map((program) => (
            <div key={program.id}>
              <h2 className="mb-2 text-sm font-medium">{program.name}</h2>
              <p className="mb-3 text-sm text-muted-foreground">{program.description}</p>
              <div className="space-y-2">
                {getTemplatesForProgram(program.id).map((t) => (
                  <Link
                    key={t.id}
                    to="/treino/programas/treino/$templateId"
                    params={{ templateId: t.id }}
                    className="flex items-center justify-between rounded-xl bg-muted/20 px-4 py-4 transition-colors hover:bg-muted/35"
                  >
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.exercises.length} exercícios
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
              <Button asChild variant="outline" size="sm" className="mt-3">
                <Link to="/treino/programas/treino/novo" search={{ programId: program.id }}>
                  <Plus className="mr-1 h-4 w-4" />
                  Adicionar treino
                </Link>
              </Button>
            </div>
          ))}
        </div>
      )}

      {tab === "historico" && (
        <div className="space-y-4">
          <div className="flex gap-1 rounded-lg bg-muted/30 p-1">
            <Link
              to="/treino/historico"
              className={cn(
                "flex-1 rounded-md py-1.5 text-center text-sm",
                historyLens === "evolucao" ? "bg-background font-medium shadow-sm" : "text-muted-foreground",
              )}
            >
              Evolução
            </Link>
            <Link
              to="/treino/historico/resumo"
              className={cn(
                "flex-1 rounded-md py-1.5 text-center text-sm",
                historyLens === "resumo" ? "bg-background font-medium shadow-sm" : "text-muted-foreground",
              )}
            >
              Resumo
            </Link>
            <Link
              to="/treino/historico/sessoes"
              className={cn(
                "flex-1 rounded-md py-1.5 text-center text-sm",
                historyLens === "sessoes" ? "bg-background font-medium shadow-sm" : "text-muted-foreground",
              )}
            >
              Sessões
            </Link>
          </div>

          {historyLens === "resumo" && <EvolutionSummaryPanel summary={evolutionSummary} />}

          {historyLens === "evolucao" && (
            <div className="space-y-3">
              {progressions.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Complete treinos para ver evolução.
                </p>
              ) : (
                progressions.map((p) => (
                  <Surface key={p.exerciseName} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{p.exerciseName}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {[...new Set(p.points.map((pt) => pt.templateName))].join(" · ")}
                        </p>
                      </div>
                      {p.trend === "up" && <TrendingUp className="h-4 w-4 shrink-0 text-accent" />}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.points.slice(-8).map((pt) => (
                        <span
                          key={`${pt.sessionId}-${pt.dayKey}`}
                          className="rounded-md bg-muted/40 px-2.5 py-1 text-xs tabular-nums"
                          title={`${pt.templateName} · ${formatDayKey(pt.dayKey)}`}
                        >
                          <span className="text-muted-foreground">{pt.templateName} · </span>
                          {formatSetPerformance(pt.loadKg, pt.reps)}
                        </span>
                      ))}
                    </div>
                    {p.points.length >= 2 && p.latestLoadKg != null && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Melhor · {p.bestLoadKg}kg
                      </p>
                    )}
                  </Surface>
                ))
              )}
            </div>
          )}

          {historyLens === "sessoes" && (
            <div className="space-y-3">
              {history.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nenhuma sessão registrada.
                </p>
              ) : (
                history.map((session) => {
                  const expanded = expandedSessionId === session.id;
                  const loggedExercises = session.exercises.filter((ex) =>
                    ex.sets.some((s) => hasMeaningfulSetData(s)),
                  );

                  return (
                    <Surface key={session.id} className="overflow-hidden px-4 py-4">
                      <button
                        type="button"
                        className="flex w-full items-start justify-between gap-3 text-left"
                        onClick={() =>
                          setExpandedSessionId(expanded ? null : session.id)
                        }
                      >
                        <div>
                          <p className="font-medium">{session.templateName}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDayKey(session.dayKey)} · {session.durationMin} min
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {loggedExercises.length} exercícios registrados
                          </p>
                        </div>
                        {expanded ? (
                          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>

                      {session.sessionNotes && !expanded && (
                        <p className="mt-2 text-sm italic text-muted-foreground line-clamp-2">
                          {session.sessionNotes}
                        </p>
                      )}

                      {expanded && (
                        <div className="mt-4 space-y-3 border-t border-border/30 pt-4">
                          {loggedExercises.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              Nenhuma série registrada nesta sessão.
                            </p>
                          ) : (
                            loggedExercises.map((ex) => (
                              <div key={ex.id}>
                                <p className="text-sm font-medium">{ex.name}</p>
                                <div className="mt-1.5 flex flex-wrap gap-1.5">
                                  {ex.sets
                                    .filter((s) => hasMeaningfulSetData(s))
                                    .map((set) => (
                                      <span
                                        key={set.id}
                                        className="rounded-md bg-muted/40 px-2 py-0.5 text-xs tabular-nums"
                                      >
                                        {formatSetPerformance(set.loadKg, set.reps)}
                                      </span>
                                    ))}
                                </div>
                                {ex.referenceNote && (
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    Ref. · {ex.referenceNote}
                                  </p>
                                )}
                                {ex.notes?.trim() && (
                                  <p className="mt-1 text-xs text-muted-foreground italic">
                                    Obs. · {ex.notes.trim()}
                                  </p>
                                )}
                              </div>
                            ))
                          )}
                          {session.sessionNotes && (
                            <p className="text-sm italic text-muted-foreground">
                              {session.sessionNotes}
                            </p>
                          )}
                        </div>
                      )}
                    </Surface>
                  );
                })
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
