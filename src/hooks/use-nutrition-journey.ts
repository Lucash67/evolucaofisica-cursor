import { useEffect, useState } from "react";

import {
  getNutritionSequenceAtMs,
  type NutritionSequencePhase,
} from "@/lib/experience/hero-sequence";

interface UseNutritionJourneyOptions {
  animateSequence: boolean;
  onSequenceSettled?: () => void;
}

export function useNutritionJourney({
  animateSequence,
  onSequenceSettled,
}: UseNutritionJourneyOptions) {
  const [phase, setPhase] = useState<NutritionSequencePhase>(
    animateSequence ? "recognition" : "action",
  );

  useEffect(() => {
    if (!animateSequence) {
      setPhase("action");
      return;
    }

    setPhase("recognition");

    const timers = [
      setTimeout(() => setPhase("progress"), getNutritionSequenceAtMs("progress")),
      setTimeout(() => {
        setPhase("action");
        onSequenceSettled?.();
      }, getNutritionSequenceAtMs("action")),
    ];

    return () => timers.forEach(clearTimeout);
  }, [animateSequence, onSequenceSettled]);

  const surfaceReady = phase === "progress" || phase === "action";

  return { phase, surfaceReady };
}
