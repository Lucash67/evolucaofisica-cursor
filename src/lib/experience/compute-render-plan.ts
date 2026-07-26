import type { DayState } from "@/lib/domain/types";

import { buildExperienceContext } from "./context";
import { buildHeroProjection } from "./hero";
import { getPrimaryIntent } from "./priority";
import { buildSurfaceProjection } from "./surface-engine";
import type { RenderPlan } from "./types";

/** Orquestra Event → Context → Priority → Hero → Surface */
export function computeRenderPlan(state: DayState): RenderPlan | null {
  const ctx = buildExperienceContext(state);
  if (!ctx) return null;

  const primaryIntent = getPrimaryIntent(ctx);
  const hero = buildHeroProjection(primaryIntent, ctx);
  const surface = buildSurfaceProjection(primaryIntent);

  return { primaryIntent, hero, surface };
}
