"use client";

import { Link, useRouterState } from "@tanstack/react-router";

import { useTraining } from "@/context/training-context";
import { formatDuration } from "@/lib/domain/training/utils";

export function ActiveSessionBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { activeSession, hasActiveSession } = useTraining();

  if (!hasActiveSession || !activeSession) return null;
  if (pathname.startsWith("/treino/sessao")) return null;

  return (
    <Link
      to="/treino/sessao"
      className="fixed inset-x-0 bottom-[52px] z-50 mx-auto flex max-w-lg items-center justify-between gap-3 border-t border-accent/20 bg-accent/10 px-5 py-3 backdrop-blur-lg lg:bottom-4 lg:left-[200px] lg:right-4 lg:max-w-none lg:rounded-xl lg:border lg:shadow-sm"
    >
      <div>
        <p className="text-xs font-medium text-accent">Sessão ativa</p>
        <p className="text-sm font-semibold">{activeSession.templateName}</p>
      </div>
      <p className="text-sm tabular-nums text-muted-foreground">
        {formatDuration(Date.now() - activeSession.startedAt)}
      </p>
    </Link>
  );
}
