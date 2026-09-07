"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view. The transition itself is
 * neutralized by the global `prefers-reduced-motion` rule in globals.css,
 * so reduced-motion users still get the observer-driven reveal, just
 * without an animated transition.
 */
export function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
