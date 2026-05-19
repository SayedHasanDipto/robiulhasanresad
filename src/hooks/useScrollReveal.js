"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal — Triggers a GSAP fade-up + blur-clear animation
 * when the element scrolls into the viewport.
 *
 * @param {Object} options
 * @param {number} options.y - Starting Y offset (default: 40)
 * @param {number} options.duration - Animation duration (default: 0.9)
 * @param {number} options.delay - Delay before animation (default: 0)
 * @param {string} options.ease - GSAP easing (default: "power2.out")
 * @param {string} options.start - ScrollTrigger start position (default: "top 85%")
 * @param {boolean} options.blur - Enable blur effect (default: true)
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  const {
    y = 40,
    duration = 0.9,
    delay = 0,
    ease = "power2.out",
    start = "top 85%",
    blur = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(el, {
      opacity: 0,
      y,
      filter: blur ? "blur(8px)" : "none",
    });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [y, duration, delay, ease, start, blur]);

  return ref;
}

/**
 * useStaggerReveal — Staggers child elements into view on scroll.
 *
 * @param {string} childSelector - CSS selector for children (default: "> *")
 * @param {Object} options
 */
export function useStaggerReveal(childSelector = "> *", options = {}) {
  const ref = useRef(null);

  const {
    y = 30,
    duration = 0.8,
    stagger = 0.08,
    ease = "power2.out",
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    if (prefersReducedMotion) {
      gsap.set(children, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    gsap.set(children, { opacity: 0, y, filter: "blur(6px)" });

    gsap.to(children, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [childSelector, y, duration, stagger, ease, start]);

  return ref;
}
