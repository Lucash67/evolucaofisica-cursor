export type Breakpoint = "mobile" | "tablet" | "desktop" | "ultra";

export const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
  ultra: 1440,
} as const;

export function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS.ultra) return "ultra";
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "mobile";
}
