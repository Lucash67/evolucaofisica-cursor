import type { ExperienceIntent, SurfaceBlock, SurfaceProjection } from "./types";

/** Surface Engine — EP-01 + EP-02 Nutrition Journey */
export function buildSurfaceProjection(primaryIntent: ExperienceIntent): SurfaceProjection {
  if (primaryIntent === "close.protein") {
    return {
      blocks: [
        { id: "nutrition", visibility: "visible", emphasis: "featured", order: 1 },
        { id: "habits", visibility: "visible", emphasis: "default", order: 2 },
        { id: "workoutCollapsed", visibility: "collapsed", emphasis: "default", order: 3 },
      ],
    };
  }

  const blocks: SurfaceBlock[] = [
    { id: "nutrition", visibility: "visible", emphasis: "default", order: 1 },
    { id: "habits", visibility: "visible", emphasis: "default", order: 2 },
  ];

  if (primaryIntent === "recover.postWorkout") {
    blocks.push({
      id: "workoutCollapsed",
      visibility: "collapsed",
      emphasis: "default",
      order: 3,
    });
  }

  return { blocks };
}
