"use client";

import React, { useState, useEffect, useRef } from "react";
import { Quote, Copy, ChevronLeft, ChevronRight, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const HADITHS = [
  {
    textArabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.",
    translation: "Actions are but by intention, and every man shall have only that which he intended.",
    source: "Sahih al-Bukhari 1",
    topic: "Sincerity (Niyyah)",
    explanation: "This fundamental Hadith emphasizes that the spiritual value and acceptability of our daily efforts depend entirely on the purity of our hearts and intentions.",
  },
  {
    textArabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ.",
    translation: "A true Muslim is the one from whose tongue and hand other Muslims are safe.",
    source: "Sahih al-Bukhari 10",
    topic: "Character & Peace",
    explanation: "True faith manifests as safety, respect, and kindness toward others. Resad Bhai frequently teaches that physical or verbal harm contradicts spiritual growth.",
  },
  {
    textArabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ.",
    translation: "Whoever takes a path upon which he seeks knowledge, Allah will make the path to Paradise easy for him.",
    source: "Sahih Muslim 2699",
    topic: "Seeking Knowledge",
    explanation: "The pursuit of knowledge is an act of worship. Allah eases our eternal journey when we dedicate our minds to understanding faith and truth.",
  },
  {
    textArabic: "يَسِّرُوا وَلاَ تُعَسِّرُوا، وَبَشِّرُوا وَلاَ تُنَفِّرُوا.",
    translation: "Make things easy for people and do not make them difficult, and give good tidings and do not push people away.",
    source: "Sahih al-Bukhari 6125",
    topic: "Method of Da'wah",
    explanation: "Resad Bhai aligns his calling strategy with this guideline: conveying the beautiful, hopeful, and supportive aspects of Islam rather than placing unnecessary burdens.",
  },
];

export default function HadithSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const hadithCardRef = useTiltEffect({ max: 3, perspective: 1200, scale: 1.01 });
  const hadithGlowRef = useMouseGlow();

  const currentHadith = HADITHS[currentIndex];

  // Auto-carousel hook
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HADITHS.length);
      setCopied(false);
    }, 8000); // Elegant, slow 8-second rotation
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HADITHS.length);
    setCopied(false);
    setAutoplay(false); // Pause autoplay on manual click
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HADITHS.length) % HADITHS.length);
    setCopied(false);
    setAutoplay(false); // Pause autoplay on manual click
  };

  const handleCopy = () => {
    const textToCopy = `"${currentHadith.translation}"\n\n— Hadith: ${currentHadith.source} (${currentHadith.topic})\n\nShared via Robiul Hasan Resad's Islamic Portfolio.`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hadith"
      className="py-24 bg-gradient-to-b from-white to-stone-50 text-slate-900 relative overflow-hidden"
    >
      {/* Background Glowing Circles */}
      <div className="absolute inset-0 m-auto w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 0.68, 0, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Quote className="w-3.5 h-3.5" />
            <span>Reminders & Wisdom</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-4">
            Curated Hadith & Reminders
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Nourish your soul with authentic sayings of the Prophet Muhammad (PBUH)
            hand-selected by Robiul Hasan Resad. Deepen your understanding with brief
            commentary guides.
          </p>
        </motion.div>

        {/* Hadith Slider Card */}
        <div className="max-w-4xl mx-auto relative px-4">
          <motion.div 
            ref={hadithCardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 0.68, 0, 1] }}
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
            className="relative bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl backdrop-blur-md overflow-hidden cursor-pointer"
          >
            {/* Dynamic Hover Glow Container */}
            <div ref={hadithGlowRef} className="mouse-glow-card absolute inset-0 rounded-3xl pointer-events-none" />

            {/* Elegant Islamic Arch Background Graphic */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center text-emerald-850">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-[300px] h-[300px]">
                <path d="M50 0 C25 25 10 50 10 80 L90 80 C90 50 75 25 50 0 Z" />
              </svg>
            </div>

            {/* Glowing accent top line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.22, 0.68, 0, 1] }}
              >
                {/* Top Row: Hadith Topic Narrator */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <span className="px-3.5 py-1 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs font-semibold tracking-wider uppercase font-sans">
                    Topic: {currentHadith.topic}
                  </span>
                  <span className="text-xs text-slate-500 font-sans font-medium flex items-center gap-1">
                    Source: <strong className="text-slate-700 font-semibold">{currentHadith.source}</strong>
                  </span>
                </div>

                {/* Arabic Script */}
                <div className="mb-8 text-center select-all">
                  <p className="font-serif text-2xl sm:text-4xl text-emerald-800 leading-loose tracking-wide text-right sm:text-center block direction-rtl">
                    {currentHadith.textArabic}
                  </p>
                </div>

                {/* English Translation */}
                <div className="mb-8 text-center relative max-w-3xl mx-auto">
                  <Quote className="absolute -top-6 -left-2 sm:-left-6 w-8 h-8 text-emerald-800/[0.07] -scale-x-100" />
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-light italic">
                    "{currentHadith.translation}"
                  </p>
                </div>

                {/* Commentary / Reflections */}
                <div className="pt-6 border-t border-slate-100 max-w-2xl mx-auto">
                  <h4 className="text-xs text-amber-600 font-serif font-bold tracking-widest uppercase mb-2 text-center flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>Reflections by Resad Bhai</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-center font-sans font-light">
                    {currentHadith.explanation}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Actions Row */}
            <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-slate-100 relative z-10">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-emerald-500/50 text-slate-700 hover:text-emerald-800 text-xs font-semibold transition-all duration-300 cursor-pointer bg-slate-50 shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Hadith Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Slider Controllers */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-emerald-500/50 text-slate-655 hover:text-emerald-800 shadow-sm transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <span className="text-xs text-slate-550 font-sans font-semibold tracking-wider">
              {currentIndex + 1} of {HADITHS.length}
            </span>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-slate-200 hover:border-emerald-500/50 text-slate-655 hover:text-emerald-800 shadow-sm transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
