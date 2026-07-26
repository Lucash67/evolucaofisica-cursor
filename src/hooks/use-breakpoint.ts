import * as React from "react";

import { BREAKPOINTS, getBreakpoint, type Breakpoint } from "@/lib/layout/breakpoints";

export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "mobile",
  );

  React.useEffect(() => {
    const onResize = () => setBreakpoint(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", onResize);
    onResize();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return breakpoint;
}

export function useIsDesktopNav(): boolean {
  const bp = useBreakpoint();
  return bp === "desktop" || bp === "ultra";
}

export { BREAKPOINTS };
