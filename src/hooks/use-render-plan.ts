import { useMemo } from "react";

import { useDay } from "@/context/day-context";
import { computeRenderPlan } from "@/lib/experience/compute-render-plan";
import type { RenderPlan } from "@/lib/experience/types";

export function useRenderPlan(): RenderPlan | null {
  const { state } = useDay();
  return useMemo(() => computeRenderPlan(state), [state]);
}
