"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { RestTimer } from "@/components/training/rest-timer";
import { SetRow } from "@/components/training/set-row";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDay } from "@/context/day-context";
import { useTraining } from "@/context/training-context";
import { hasMeaningfulSetData } from "@/lib/domain/training/format";
import { getLastExerciseNote } from "@/lib/domain/training/progression";
import { MUSCLE_GROUP_LABELS } from "@/lib/domain/training/types";
import { formatDuration } from "@/lib/domain/training/utils";

export function ActiveSessionScreen() {
  const navigate = useNavigate();
  const { completeWorkout } = useDay();
  const {
    activeSession,
    history,
    updateExerciseNotes,
    setCurrentExerciseIndex,
    updateSet,
    toggleSetComplete,
    addSet,
    removeSet,
    getSessionProgress,
    finishSessionWithClosure,
  } = useTraining();

  const [restVisible, setRestVisible] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!activeSession) return;
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, [activeSession]);

  if (!activeSession) {
    navigate({ to: "/treino" });
    return null;
  }

  const exercise = activeSession.exercises[activeSession.currentExerciseIndex];
  const prevEx = activeSession.exercises[activeSession.currentExerciseIndex - 1];
  const nextEx = activeSession.exercises[activeSession.currentExerciseIndex + 1];
  const { completedSets, totalSets } = getSessionProgress();
  const lastNote = getLastExerciseNote(history, exercise.name);
  const firstIncompleteIdx = exercise.sets.findIndex((s) => !s.completed);
  const loggedSets = activeSession.exercises.reduce(
    (sum, ex) => sum + ex.sets.filter((s) => hasMeaningfulSetData(s)).length,
    0,
  );

  const handleToggleComplete = (setId: string) => {
    const set = exercise.sets.find((s) => s.id === setId);
    const willComplete = set && !set.completed;
    toggleSetComplete(exercise.id, setId);
    if (willComplete) setRestVisible(true);
  };

  const finish = () => {
    finishSessionWithClosure();
    completeWorkout();
    setConfirmFinish(false);
    navigate({ to: "/treino/fechamento" });
  };

  return (
    <div className="mx-auto flex min-h-[90dvh] max-w-lg flex-col pb-6">
      <header className="flex items-center gap-3 border-b border-border/30 pb-4">
        <button
          type="button"
          onClick={() => navigate({ to: "/treino" })}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted/40 hover:text-foreground"
          aria-label="Minimizar sessão"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1 text-center">
          <p className="text-sm font-medium">{activeSession.templateName}</p>
          <p className="text-xs tabular-nums text-muted-foreground">
            {formatDuration(Date.now() - activeSession.startedAt)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => setConfirmFinish(true)}
        >
          Concluir
        </Button>
      </header>

      <div className="mt-4 mb-5">
        <div className="mb-2 flex justify-between text-xs tabular-nums text-muted-foreground">
          <span>{completedSets}/{totalSets} séries</span>
          <span>
            Ex. {activeSession.currentExerciseIndex + 1}/{activeSession.exercises.length}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-muted/60">
          <div
            className="h-full bg-accent/90 transition-all duration-300"
            style={{ width: `${totalSets ? (completedSets / totalSets) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex-1 animate-in fade-in duration-200">
        <h1 className="text-2xl font-semibold tracking-tight">{exercise.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {MUSCLE_GROUP_LABELS[exercise.muscleGroup]}
        </p>

        {exercise.referenceNote && (
          <p className="mt-3 rounded-lg border border-border/40 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
            Referência · {exercise.referenceNote}
          </p>
        )}

        {lastNote && lastNote !== exercise.referenceNote && (
          <p className="mt-3 rounded-lg bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
            Última observação · {lastNote}
          </p>
        )}

        <div className="mt-6 space-y-2">
          {exercise.sets.map((set, i) => (
            <SetRow
              key={set.id}
              index={i}
              loadKg={set.loadKg}
              reps={set.reps}
              completed={set.completed}
              active={i === firstIncompleteIdx}
              canDelete={exercise.sets.length > 1}
              onLoadChange={(v) => updateSet(exercise.id, set.id, { loadKg: v })}
              onRepsChange={(v) => updateSet(exercise.id, set.id, { reps: v })}
              onToggleComplete={() => handleToggleComplete(set.id)}
              onRemove={() => removeSet(exercise.id, set.id)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => addSet(exercise.id)}
          className="mt-3 w-full py-2.5 text-sm text-muted-foreground hover:text-accent"
        >
          + Série
        </button>

        <RestTimer
          visible={restVisible}
          onDismiss={() => setRestVisible(false)}
          className="mt-4"
        />

        <div className="mt-5">
          <label htmlFor="exercise-notes" className="text-sm text-muted-foreground">
            Observação desta sessão
          </label>
          <Textarea
            id="exercise-notes"
            className="mt-2 min-h-[88px] resize-none"
            placeholder="Anotações de hoje: sensação, ajuste de carga, foco…"
            value={exercise.notes}
            onChange={(e) => updateExerciseNotes(exercise.id, e.target.value)}
          />
        </div>
      </div>

      <footer className="mt-6 space-y-3 border-t border-border/30 pt-4">
        <div className="flex items-center justify-between gap-2 text-sm">
          <button
            type="button"
            disabled={!prevEx}
            onClick={() => {
              setCurrentExerciseIndex(activeSession.currentExerciseIndex - 1);
              setRestVisible(false);
            }}
            className="flex items-center gap-1 text-muted-foreground disabled:opacity-30 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {prevEx?.name ?? "—"}
          </button>
          <button
            type="button"
            disabled={!nextEx}
            onClick={() => {
              setCurrentExerciseIndex(activeSession.currentExerciseIndex + 1);
              setRestVisible(false);
            }}
            className="flex items-center gap-1 text-muted-foreground disabled:opacity-30 hover:text-foreground"
          >
            {nextEx?.name ?? "—"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </footer>

      <AlertDialog open={confirmFinish} onOpenChange={setConfirmFinish}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Encerrar sessão?</AlertDialogTitle>
            <AlertDialogDescription>
              {loggedSets} séries com carga ou repetições registradas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar</AlertDialogCancel>
            <AlertDialogAction onClick={finish}>Encerrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
