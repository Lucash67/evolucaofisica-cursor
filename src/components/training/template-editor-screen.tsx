"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTraining, type WorkoutTemplate } from "@/context/training-context";
import {
  MUSCLE_GROUP_LABELS,
  type MuscleGroup,
  type TemplateExercise,
} from "@/lib/domain/training/types";
import { createId } from "@/lib/domain/training/utils";

interface TemplateEditorScreenProps {
  templateId: string;
  programId?: string;
}

export function TemplateEditorScreen({ templateId, programId }: TemplateEditorScreenProps) {
  const navigate = useNavigate();
  const { getTemplate, saveTemplate, deleteTemplate, createTemplate, programs } = useTraining();
  const isNew = templateId === "novo";
  const defaultProgramId = programId ?? programs[0]?.id ?? "";

  const [draft, setDraft] = useState<WorkoutTemplate>(() => {
    if (isNew) return createTemplate(defaultProgramId);
    return getTemplate(templateId) ?? createTemplate(defaultProgramId);
  });

  useEffect(() => {
    if (!isNew) {
      const t = getTemplate(templateId);
      if (t) setDraft(t);
    }
  }, [templateId, isNew, getTemplate]);

  const updateExercise = (id: string, patch: Partial<TemplateExercise>) => {
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((ex) => (ex.id === id ? { ...ex, ...patch } : ex)),
    }));
  };

  const addExercise = () => {
    const order = draft.exercises.length;
    setDraft((d) => ({
      ...d,
      exercises: [
        ...d.exercises,
        {
          id: createId(),
          name: "Novo exercício",
          muscleGroup: "outro" as MuscleGroup,
          notes: "",
          order,
          sets: [
            { id: createId(), targetReps: 10 },
            { id: createId(), targetReps: 10 },
          ],
        },
      ],
    }));
  };

  const removeExercise = (id: string) => {
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.filter((ex) => ex.id !== id).map((ex, i) => ({ ...ex, order: i })),
    }));
  };

  const moveExercise = (id: string, dir: -1 | 1) => {
    const sorted = [...draft.exercises].sort((a, b) => a.order - b.order);
    const idx = sorted.findIndex((e) => e.id === id);
    const next = idx + dir;
    if (next < 0 || next >= sorted.length) return;
    [sorted[idx], sorted[next]] = [sorted[next], sorted[idx]];
    setDraft((d) => ({
      ...d,
      exercises: sorted.map((ex, i) => ({ ...ex, order: i })),
    }));
  };

  const addSetToExercise = (exerciseId: string) => {
    setDraft((d) => ({
      ...d,
      exercises: d.exercises.map((ex) => {
        if (ex.id !== exerciseId) return ex;
        const last = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [
            ...ex.sets,
            {
              id: createId(),
              targetReps: last?.targetReps ?? 10,
              targetLoadKg: last?.targetLoadKg,
            },
          ],
        };
      }),
    }));
  };

  const save = () => {
    saveTemplate(draft);
    navigate({ to: "/treino/programas" });
  };

  const remove = () => {
    if (!isNew && confirm("Excluir este treino?")) {
      deleteTemplate(templateId);
      navigate({ to: "/treino/programas" });
    }
  };

  const sorted = [...draft.exercises].sort((a, b) => a.order - b.order);

  return (
    <div className="mx-auto max-w-2xl pb-12">
      <Link
        to="/treino/programas"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Programas
      </Link>

      <div className="space-y-6">
        <div>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="desc">Descrição</Label>
          <Input
            id="desc"
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="notes">Observações padrão da sessão</Label>
          <Textarea
            id="notes"
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
            className="mt-1.5 min-h-[80px]"
            placeholder="Aparecem ao iniciar cada sessão deste treino"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Exercícios</h2>
            <Button type="button" variant="outline" size="sm" onClick={addExercise}>
              <Plus className="mr-1 h-4 w-4" />
              Adicionar
            </Button>
          </div>

          <div className="space-y-4">
            {sorted.map((ex, idx) => (
              <div key={ex.id} className="rounded-xl bg-muted/20 p-4">
                <div className="flex gap-2">
                  <Input
                    value={ex.name}
                    onChange={(e) => updateExercise(ex.id, { name: e.target.value })}
                    className="font-medium"
                  />
                  <Select
                    value={ex.muscleGroup}
                    onValueChange={(v) => updateExercise(ex.id, { muscleGroup: v as MuscleGroup })}
                  >
                    <SelectTrigger className="w-[130px] shrink-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(MUSCLE_GROUP_LABELS) as MuscleGroup[]).map((g) => (
                        <SelectItem key={g} value={g}>
                          {MUSCLE_GROUP_LABELS[g]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Textarea
                  value={ex.notes}
                  onChange={(e) => updateExercise(ex.id, { notes: e.target.value })}
                  placeholder="Referência fixa (ex.: barra pegada aberta)"
                  className="mt-2 min-h-[60px] text-sm"
                />

                <div className="mt-3 space-y-2">
                  {ex.sets.map((set, si) => (
                    <div key={set.id} className="flex items-center gap-2 text-sm">
                      <span className="w-6 text-muted-foreground tabular-nums">{si + 1}</span>
                      <Input
                        type="number"
                        placeholder="kg"
                        value={set.targetLoadKg ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          setDraft((d) => ({
                            ...d,
                            exercises: d.exercises.map((e2) =>
                              e2.id === ex.id
                                ? {
                                    ...e2,
                                    sets: e2.sets.map((s) =>
                                      s.id === set.id
                                        ? {
                                            ...s,
                                            targetLoadKg: v === "" ? undefined : Number(v),
                                          }
                                        : s,
                                    ),
                                  }
                                : e2,
                            ),
                          }));
                        }}
                        className="h-9 w-20"
                      />
                      <span className="text-muted-foreground">×</span>
                      <Input
                        type="number"
                        placeholder="reps"
                        value={set.targetReps}
                        onChange={(e) => {
                          setDraft((d) => ({
                            ...d,
                            exercises: d.exercises.map((e2) =>
                              e2.id === ex.id
                                ? {
                                    ...e2,
                                    sets: e2.sets.map((s) =>
                                      s.id === set.id
                                        ? { ...s, targetReps: Number(e.target.value) || 0 }
                                        : s,
                                    ),
                                  }
                                : e2,
                            ),
                          }));
                        }}
                        className="h-9 w-20"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addSetToExercise(ex.id)}
                    className="text-xs text-muted-foreground hover:text-accent"
                  >
                    + série
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" onClick={() => moveExercise(ex.id, -1)} disabled={idx === 0}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => moveExercise(ex.id, 1)} disabled={idx === sorted.length - 1}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeExercise(ex.id)} className="ml-auto text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" onClick={save}>
            Salvar treino
          </Button>
          {!isNew && (
            <Button type="button" variant="outline" onClick={remove}>
              Excluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
