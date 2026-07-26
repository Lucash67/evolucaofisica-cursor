import { useEffect, useState } from "react";

import {
  getSequenceAtMs,
  type HeroSequencePhase,
} from "@/lib/experience/hero-sequence";
import type { HeroMode } from "@/lib/experience/types";

interface UseHeroExperienceOptions {
  mode: HeroMode;
  animateSequence: boolean;
  skipRecognition?: boolean;
  onSequenceSettled?: () => void;
}

export function useHeroExperience({
  mode,
  animateSequence,
  skipRecognition = false,
  onSequenceSettled,
}: UseHeroExperienceOptions) {
  const initialPhase: HeroSequencePhase =
    mode === "WORKOUT_DONE" && !animateSequence
      ? "action"
      : skipRecognition && animateSequence
        ? "bridge"
        : "recognition";

  const [phase, setPhase] = useState<HeroSequencePhase>(initialPhase);

  useEffect(() => {
    if (mode !== "WORKOUT_DONE") {
      setPhase("recognition");
      return;
    }

    if (!animateSequence) {
      setPhase("action");
      return;
    }

    if (skipRecognition) {
      setPhase("bridge");
      const timers = [
        setTimeout(() => {
          setPhase("action");
          onSequenceSettled?.();
        }, getSequenceAtMs("action") - getSequenceAtMs("bridge")),
      ];
      return () => timers.forEach(clearTimeout);
    }

    setPhase("recognition");
    const timers = [
      setTimeout(() => setPhase("bridge"), getSequenceAtMs("bridge")),
      setTimeout(() => {
        setPhase("action");
        onSequenceSettled?.();
      }, getSequenceAtMs("action")),
    ];
    return () => timers.forEach(clearTimeout);
  }, [mode, animateSequence, skipRecognition, onSequenceSettled]);

  const surfaceReady =
    mode === "WORKOUT_EXECUTE" || phase === "bridge" || phase === "action";

  return { phase, surfaceReady };
}
