"use client";

import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useDay } from "@/context/day-context";
import { useTraining } from "@/context/training-context";

interface StartWorkoutButtonProps {
  label: string;
  className?: string;
}

export function StartWorkoutButton({ label, className }: StartWorkoutButtonProps) {
  const navigate = useNavigate();
  const { state } = useDay();
  const { findTemplateForWorkoutName, templates, hasActiveSession } = useTraining();

  const handleClick = () => {
    if (hasActiveSession) {
      navigate({ to: "/treino/sessao" });
      return;
    }
    const template = findTemplateForWorkoutName(state.todayWorkout.name);
    if (!template) return;
    if (template.exercises.length === 0) {
      navigate({
        to: "/treino/programas/treino/$templateId",
        params: { templateId: template.id },
      });
      return;
    }
    navigate({ to: "/treino/warmup/$templateId", params: { templateId: template.id } });
  };

  return (
    <Button size="lg" className={className} onClick={handleClick}>
      {hasActiveSession ? "Retomar sessão" : label}
    </Button>
  );
}
