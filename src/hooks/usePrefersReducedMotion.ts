import { useEffect, useState } from "react";

function getInitialPreference() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialPreference);

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(query.matches);
    handleChange();
    query.addEventListener("change", handleChange);

    return () => query.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}
