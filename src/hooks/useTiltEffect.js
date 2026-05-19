"use client";

import { useEffect, useRef } from "react";

/**
 * useTiltEffect — Creates a highly polished, interactive 3D parallax tilt effect on hover.
 *
 * @param {Object} options
 * @param {number} options.max - Maximum rotation angle in degrees (default: 8)
 * @param {number} options.perspective - Perspective depth in pixels (default: 1000)
 * @param {number} options.scale - Scale factor on hover (default: 1.01)
 */
export function useTiltEffect(options = {}) {
  const ref = useRef(null);
  const { max = 8, perspective = 1000, scale = 1.01 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to center of element
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Calculate percentage rotation based on limits
      const rotateX = ((-mouseY / (height / 2)) * max).toFixed(2);
      const rotateY = ((mouseX / (width / 2)) * max).toFixed(2);

      el.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      el.style.transition = "transform 0.1s ease-out";
    };

    const handleMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      el.style.transition = "transform 0.6s cubic-bezier(0.22, 0.68, 0, 1)";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [max, perspective, scale]);

  return ref;
}
