"use client";

import React, { useEffect, useRef } from "react";
import { Star, Volume2, Sparkles, Phone, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { useCountUp } from "@/hooks/useCountUp";
import Image from "next/image";
import HeroImg from "@/app/hero.png";

// ─── Stat Counter Sub-component ───
function StatItem({ target, label, prefix = "", suffix = "", delay = 0 }) {
  const count = useCountUp(target, { duration: 2500, delay });
  return (
    <div className="text-center lg:text-left">
      <p className="text-3xl sm:text-4xl font-serif font-black text-emerald-900 leading-none">
        {prefix}
        {count}
        {suffix}
      </p>
      <p className="text-[10px] sm:text-xs text-slate-700 font-sans tracking-wide uppercase font-semibold mt-2">
        {label}
      </p>
    </div>
  );
}

export default function Hero() {
  const listenBtnRef = useMagneticHover(0.2);
  const inviteBtnRef = useMagneticHover(0.2);
  const mihrabCardRef = useTiltEffect({ max: 6, perspective: 1000, scale: 1.015 });
  const glowContainerRef = useMouseGlow();

  // Word-by-word reveal details
  const greetingWords = "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ".split(" ");
  const nameWords = "Robiul Hasan Resad".split(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/20 pt-28 pb-16 overflow-hidden"
    >
      {/* Sacred Geometry Background Dots */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1.5px,transparent_1.5px)] [background-size:20px_20px]" />
      </div>

      {/* Floating Glowing Aura Rings */}
      <div className="absolute top-1/4 left-10 w-[450px] h-[450px] bg-emerald-500/[0.04] rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-amber-500/[0.035] rounded-full blur-[150px] pointer-events-none" />

      {/* Slowly Rotating Large Islamic Geometric Star in Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 180, ease: "linear", repeat: Infinity }}
        className="absolute right-[-8%] top-[8%] w-[600px] h-[600px] text-emerald-800/[0.03] pointer-events-none"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="w-full h-full"
        >
          <rect x="20" y="20" width="60" height="60" transform="rotate(0 50 50)" />
          <rect x="20" y="20" width="60" height="60" transform="rotate(30 50 50)" />
          <rect x="20" y="20" width="60" height="60" transform="rotate(60 50 50)" />
          <circle cx="50" cy="50" r="12" />
          <circle cx="50" cy="50" r="24" />
          <circle cx="50" cy="50" r="35" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography, Biography, Actions */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left">

            {/* Spiritual Peace Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1] }}
              className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6 mx-auto lg:mx-0"
            >
              <span className="px-5 py-2 rounded-full bg-emerald-50/70 border border-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wider flex items-center gap-2 shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-serif tracking-normal flex gap-1">
                  {greetingWords.map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ filter: "blur(4px)", opacity: 0 }}
                      animate={{ filter: "blur(0px)", opacity: 1 }}
                      transition={{ delay: 0.15 + index * 0.08, duration: 0.5 }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </span>
            </motion.div>

            {/* Arabic Transliteration & Primary Title */}
            <h1 className="text-slate-900 font-sans tracking-tight mb-2">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.68, 0, 1] }}
                className="block text-amber-600 font-serif text-3xl sm:text-4xl font-normal mb-1"
              >
                Assalamu Alaikum
              </motion.span>
              <span className="block text-4xl sm:text-6xl font-serif font-black text-slate-900 leading-tight">
                I am{" "}
                <span className="inline-flex gap-1.5 text-emerald-800">
                  {nameWords.map((word, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.35 + idx * 0.1,
                        ease: [0.22, 0.68, 0, 1]
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </span>
            </h1>

            {/* Core Roles Subheader */}
            <motion.h2
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-lg sm:text-2xl font-serif text-emerald-900 font-medium tracking-wide mb-6"
            >
              Hafiz of Quran • Islamic Speaker • Youth Counselor
            </motion.h2>

            {/* Inspiring Professional Biography */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 0.68, 0, 1] }}
              className="text-slate-700 font-sans text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8 font-light"
            >
              Bridging classical spiritual heritage with contemporary mental well-being.
              Through beautiful Quranic recitations, interactive public speaking, and
              empathetic youth mentorship, I strive to help minds find peace and connect
              with authentic divine guidance.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.22, 0.68, 0, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <div ref={listenBtnRef} className="w-full sm:w-auto">
                <a
                  href="#quran"
                  className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white font-serif text-xs font-bold tracking-widest uppercase shadow-[0_4px_20px_rgba(6,78,59,0.2)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.3)] transition-all duration-500 overflow-hidden cursor-pointer border border-emerald-700/60 w-full sm:w-auto z-10"
                >
                  <Volume2 className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Listen to Quran Recitation</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </a>
              </div>
              <div ref={inviteBtnRef} className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className="group relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-[1.5px] border-amber-500 bg-white/95 text-amber-900 font-serif text-xs font-bold tracking-widest uppercase shadow-sm hover:shadow-[0_6px_20px_rgba(245,158,11,0.15)] transition-all duration-500 overflow-hidden cursor-pointer w-full sm:w-auto z-10"
                >
                  <Phone className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">Invite for Event</span>
                  <div className="absolute inset-0 bg-amber-50/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </a>
              </div>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.1 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/85 mt-12 max-w-md mx-auto lg:mx-0"
            >
              <StatItem target={100} label="Authentic Sources" suffix="%" delay={1100} />
              <div className="border-x border-slate-200/80 px-4">
                <StatItem target={50} label="Minds Inspired" suffix="k+" delay={1300} />
              </div>
              <StatItem target={5} label="Years of Da'wah" suffix="+" delay={1500} />
            </motion.div>
          </div>

          {/* Right Column: Premium Mihrab Geometric Frame Art */}
          <div className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0">
            {/* Decorative background aura */}
            <div className="absolute inset-0 m-auto w-80 h-80 rounded-full border border-emerald-500/10 bg-emerald-500/[0.01] blur-md animate-pulse pointer-events-none" />

            {/* Glowing Golden-Emerald Arch Mihrab Frame */}
            <motion.div
              ref={mihrabCardRef}
              initial={{ opacity: 0, scale: 0.93, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 0.68, 0, 1] }}
              className="relative w-72 h-96 sm:w-80 sm:h-[440px] rounded-[40px] p-2.5 bg-gradient-to-b from-amber-400/40 via-emerald-500/20 to-emerald-600/40 border border-emerald-250/70 shadow-2xl shadow-emerald-900/5 backdrop-blur-md overflow-hidden group cursor-pointer"
            >
              {/* Islamic Lattice Background Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#0f766e_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-10" />

              {/* Central Content Box */}
              <div
                ref={glowContainerRef}
                className="mouse-glow-card relative w-full h-full rounded-[30px] bg-white flex flex-col items-center justify-between p-8 text-center border border-emerald-100 shadow-inner overflow-hidden"
              >

                {/* Top Calligraphy Badge */}
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-amber-500 shadow-sm transition-transform duration-500 group-hover:rotate-180">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>

                {/* Profile Identity Details */}
                <div>
                  <h3 className="text-xl font-serif font-bold text-emerald-900 mb-1">
                    Robiul Hasan Resad
                  </h3>
                  <p className="text-xs text-amber-600 tracking-wider font-sans uppercase font-medium">
                    Hafiz & Islamic Speaker
                  </p>
                </div>

                {/* SVG Mihrab Arch & Detailed Arabesque Star Pattern */}
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center p-2 rounded-full bg-gradient-to-tr from-amber-500 via-amber-100 to-emerald-650 shadow-lg shadow-emerald-500/5">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-white to-emerald-50/50 flex items-center justify-center overflow-hidden relative border border-white">
                    <Image
                      src={HeroImg}
                      alt="Robiul Hasan Resad"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-radial-gradient(from_center,transparent_40%,rgba(16,185,129,0.05)_100%)" />
                  </div>
                </div>

                {/* Sacred Scripture Quote */}
                <div>
                  <p className="text-[11px] text-slate-500 font-sans leading-relaxed italic max-w-[220px] mx-auto">
                    "Invite people to the path of your Lord with wisdom and good preaching."
                  </p>
                  <span className="text-emerald-900 not-italic block mt-1.5 font-serif text-[10px] font-bold">
                    — Surah An-Nahl: 125
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <span className="text-[10px] text-emerald-800 tracking-widest font-sans uppercase font-bold">
            Scroll down
          </span>
          <ArrowDown className="w-4 h-4 text-emerald-900 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
