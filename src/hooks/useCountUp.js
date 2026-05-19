"use client";

import { useState, useEffect, useRef } from "react";

/**
 * useCountUp — Animates a numeric value from zero to a specified target
 * using requestAnimationFrame with a premium cubic easing.
 *
 * @param {number} target - Target number to reach
 * @param {Object} options
 * @param {number} options.duration - Duration in milliseconds (default: 2000)
 * @param {number} options.delay - Delay before starting in milliseconds (default: 0)
 */
export function useCountUp(target, options = {}) {
  const [count, setCount] = useState(0);
  const { duration = 2000, delay = 0 } = options;
  const countRef = useRef(0);
  const isStarted = useRef(false);

  useEffect(() => {
    let animationFrameId;
    let startTimestamp = null;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const currentVal = Math.floor(easedProgress * target);
      setCount(currentVal);
      countRef.current = currentVal;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    const startAnimation = () => {
      if (isStarted.current) return;
      isStarted.current = true;
      animationFrameId = requestAnimationFrame(step);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration, delay]);

  return count;
}
