"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ClickEffect() {
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Capture coordinates relative to viewport
      const x = e.clientX;
      const y = e.clientY;
      const id = Date.now() + Math.random();

      // Generate 5 mini-particles that shoot out in different directions
      const particles = Array.from({ length: 5 }).map((_, idx) => {
        const angle = (idx * (360 / 5) * Math.PI) / 180;
        const velocity = 30 + Math.random() * 40;
        return {
          id: idx,
          targetX: Math.cos(angle) * velocity,
          targetY: Math.sin(angle) * velocity,
          size: 4 + Math.random() * 6,
        };
      });

      // Add to active effects state
      setEffects((prev) => [...prev, { id, x, y, particles }]);

      // Auto-remove after 800ms to maintain DOM efficiency
      setTimeout(() => {
        setEffects((prev) => prev.filter((eff) => eff.id !== id));
      }, 800);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      <AnimatePresence>
        {effects.map((eff) => (
          <div
            key={eff.id}
            className="absolute"
            style={{ left: eff.x, top: eff.y }}
          >
            {/* 1. Gorgeous primary expanding gold ripple ring */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            />

            {/* 2. Soft emerald secondary expanding glow circle */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.5 }}
              animate={{ scale: 1.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-emerald-500/10 blur-[4px]"
            />

            {/* 3. Floating sparkling particles */}
            {eff.particles.map((part) => (
              <motion.div
                key={part.id}
                initial={{ x: 0, y: 0, scale: 1, opacity: 0.9 }}
                animate={{
                  x: part.targetX,
                  y: part.targetY + 15, // slight downward drift
                  scale: 0.1,
                  opacity: 0,
                }}
                transition={{ duration: 0.7, ease: [0.1, 0.8, 0.3, 1] }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: part.size,
                  height: part.size,
                  backgroundColor: part.id % 2 === 0 ? "#f59e0b" : "#10b981", // Alternating Gold and Emerald particles
                  boxShadow: part.id % 2 === 0 
                    ? "0 0 6px rgba(245,158,11,0.6)" 
                    : "0 0 6px rgba(16,185,129,0.6)",
                }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
