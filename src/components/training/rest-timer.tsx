"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRESETS = [60, 90, 120, 180] as const;

function playRestCompleteSound() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    /* audio unavailable */
  }
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate([180, 80, 180]);
  }
}

interface RestTimerProps {
  visible: boolean;
  onDismiss: () => void;
  className?: string;
}

export function RestTimer({ visible, onDismiss, className }: RestTimerProps) {
  const [selectedSec, setSelectedSec] = useState<number>(90);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(90);

  useEffect(() => {
    if (!visible) {
      setRunning(false);
      setSelectedSec(90);
      setRemaining(90);
    }
  }, [visible]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          playRestCompleteSound();
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  if (!visible) return null;

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;

  if (running) {
    return (
      <div
        className={cn(
          "animate-in fade-in flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3 duration-200",
          remaining === 0 && "ring-1 ring-accent/40",
          className,
        )}
      >
        <span className="text-sm text-muted-foreground">Descanso</span>
        <span className="text-lg font-semibold tabular-nums">
          {m}:{String(s).padStart(2, "0")}
        </span>
        <button type="button" onClick={onDismiss} className="text-sm text-accent hover:underline">
          {remaining === 0 ? "Fechar" : "Pular"}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-in fade-in space-y-3 rounded-xl bg-muted/40 px-4 py-4 duration-200",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Descanso</span>
        <button type="button" onClick={onDismiss} className="text-xs text-muted-foreground hover:text-foreground">
          Pular
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setSelectedSec(sec)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm tabular-nums transition-colors",
              selectedSec === sec
                ? "bg-accent text-accent-foreground"
                : "bg-background/80 text-muted-foreground hover:text-foreground",
            )}
          >
            {sec >= 60 ? `${sec / 60} min` : `${sec}s`}
          </button>
        ))}
      </div>

      <Button
        type="button"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
        onClick={() => {
          setRemaining(selectedSec);
          setRunning(true);
        }}
      >
        Iniciar {selectedSec}s
      </Button>
    </div>
  );
}
