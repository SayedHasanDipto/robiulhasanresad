"use client";

import { useEffect, useRef } from "react";

/**
 * useMagneticHover — Creates a magnetic attraction effect on hover.
 * The element subtly follows the mouse cursor within its bounds.
 *
 * @param {number} strength - Attraction strength multiplier (default: 0.3)
 */
export function useMagneticHover(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      el.style.transition = "transform 0.2s cubic-bezier(0.22, 0.68, 0, 1)";
    };

    const handleMouseLeave = () => {
      el.style.transform = "translate(0px, 0px)";
      el.style.transition = "transform 0.5s cubic-bezier(0.22, 0.68, 0, 1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
