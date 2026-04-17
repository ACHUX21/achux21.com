import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

function readLowPowerMode() {
  if (typeof window === "undefined") {
    return false;
  }

  const smallScreen = window.innerWidth < 900;
  const saveData = Boolean((navigator as NavigatorWithConnection).connection?.saveData);
  return smallScreen || saveData;
}

export function useLowPowerMode() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lowPowerMode, setLowPowerMode] = useState(readLowPowerMode);

  useEffect(() => {
    const onResize = () => setLowPowerMode(readLowPowerMode());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return prefersReducedMotion || lowPowerMode;
}
