"use client";

import { useEffect, useState } from "react";

/**
 * Types out a string one character at a time. Renders the full string
 * immediately if the user prefers reduced motion.
 */
export function useTypewriter(text: string, speedMs = 45, startDelayMs = 300) {
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let index = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const startTimeout = setTimeout(
      () => {
        if (prefersReducedMotion) {
          setOutput(text);
          setDone(true);
          return;
        }

        intervalId = setInterval(() => {
          index += 1;
          setOutput(text.slice(0, index));
          if (index >= text.length) {
            clearInterval(intervalId);
            setDone(true);
          }
        }, speedMs);
      },
      prefersReducedMotion ? 0 : startDelayMs,
    );

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [text, speedMs, startDelayMs]);

  return { output, done };
}
