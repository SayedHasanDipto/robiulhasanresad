// Premium Islamic Portfolio — Easing & Timing Tokens
// Spiritual, calm, intentional motion curves

// ─── Cubic Bezier Easings ───
export const easings = {
  // Primary motion curves
  islamicCalm: [0.22, 0.68, 0, 1],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeOutBack: [0.34, 1.56, 0.64, 1],

  // GSAP string format
  gsap: {
    islamicCalm: "cubic-bezier(0.22, 0.68, 0, 1)",
    smooth: "power2.out",
    smoothInOut: "power2.inOut",
    cinematic: "power3.out",
    dramatic: "power4.out",
    elastic: "elastic.out(1, 0.5)",
    back: "back.out(1.7)",
  },
};

// ─── Duration Scale (seconds) ───
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
  epic: 1.8,
  ambient: 3.0,
};

// ─── Stagger Scale (seconds) ───
export const staggers = {
  tight: 0.04,
  normal: 0.08,
  relaxed: 0.12,
  dramatic: 0.2,
  cinematic: 0.3,
};

// ─── Delay Presets ───
export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.3,
  long: 0.5,
  hero: 0.8,
};
