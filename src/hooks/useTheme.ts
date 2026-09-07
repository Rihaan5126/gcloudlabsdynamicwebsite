"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const THEME_CHANGE_EVENT = "portfolio-theme-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// Matches the default applied server-side in layout.tsx, so the first
// client render (pre-hydration) agrees with the server-rendered HTML.
function getServerSnapshot(): Theme {
  return "dark";
}

/**
 * Reads/writes the current theme via the DOM class the inline bootstrap
 * script (see layout.tsx) already sets before hydration. Using
 * useSyncExternalStore — rather than an effect + setState — means the
 * client's first render matches the server's, so no mount-flag dance is
 * needed to avoid a hydration mismatch.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (next: Theme) => {
    window.localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return { theme, setTheme };
}
