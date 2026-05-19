// Premium Islamic Portfolio — Framer Motion Variant Presets
// Calm, spiritual, intentional motion

import { easings, durations, staggers } from "./easings";

// ─── Fade Up Reveal ───
export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durations.slow,
      ease: easings.islamicCalm,
    },
  },
};

// ─── Fade Up with Stagger Children ───
export const fadeUpStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggers.normal,
      delayChildren: 0.1,
    },
  },
};

export const fadeUpChild = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durations.slow,
      ease: easings.islamicCalm,
    },
  },
};

// ─── Scale Fade ───
export const scaleFade = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: durations.cinematic,
      ease: easings.easeOutQuart,
    },
  },
};

// ─── Slide In from Left ───
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.easeOutQuart,
    },
  },
};

// ─── Slide In from Right ───
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.easeOutQuart,
    },
  },
};

// ─── Card Hover (lift + glow) ───
export const cardHover = {
  rest: {
    y: 0,
    scale: 1,
    transition: { duration: durations.normal, ease: easings.islamicCalm },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: durations.normal, ease: easings.islamicCalm },
  },
};

// ─── Button Hover ───
export const buttonHover = {
  rest: {
    scale: 1,
    transition: { duration: 0.2, ease: easings.islamicCalm },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: easings.islamicCalm },
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};

// ─── Shimmer Gradient ───
export const shimmer = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 3,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// ─── Float Animation ───
export const float = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// ─── Gentle Rotate ───
export const gentleRotate = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 120,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

// ─── Page Transition ───
export const pageTransition = {
  initial: {
    opacity: 0,
    filter: "blur(12px)",
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: durations.cinematic,
      ease: easings.islamicCalm,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    transition: {
      duration: durations.normal,
      ease: easings.easeInOutCubic,
    },
  },
};
