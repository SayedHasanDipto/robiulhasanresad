"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Star, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const PHRASES = [
  { arabic: "سُبْحَانَ ٱللَّٰهِ", english: "SubhanAllah", translation: "Glory be to Allah", limit: 33 },
  { arabic: "ٱلْحَمْدُ لِلَّٰهِ", english: "Alhamdulillah", translation: "Praise be to Allah", limit: 33 },
  { arabic: "ٱللَّٰهُ أَكْبَرُ", english: "Allahu Akbar", translation: "Allah is the Greatest", limit: 34 },
  { arabic: "أَسْتَغْفِرُ ٱللَّٰهَ", english: "Astaghfirullah", translation: "I seek forgiveness from Allah", limit: 100 },
];

export default function TasbihWidget() {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const cardRef = useTiltEffect({ max: 4, scale: 1.015 });
  const glowRef = useMouseGlow();

  const activePhrase = PHRASES[activePhraseIndex];

  const handleIncrement = () => {
    if (soundEnabled && typeof window !== "undefined") {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioCtx.currentTime;

        // 1. Tactile wood tasbih bead click transient
        const oscClick = audioCtx.createOscillator();
        const gainClick = audioCtx.createGain();
        oscClick.type = "sine";
        oscClick.frequency.setValueAtTime(1100, now);
        gainClick.gain.setValueAtTime(0.04, now);
        gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        oscClick.connect(gainClick);
        gainClick.connect(audioCtx.destination);
        oscClick.start(now);
        oscClick.stop(now + 0.03);

        // 2. Warm spiritual hum resonance (sacred mosque hall echo)
        const oscRes = audioCtx.createOscillator();
        const gainRes = audioCtx.createGain();
        oscRes.type = "sine";
        oscRes.frequency.setValueAtTime(262, now); // Middle C4 note
        gainRes.gain.setValueAtTime(0, now);
        gainRes.gain.linearRampToValueAtTime(0.03, now + 0.015);
        gainRes.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        
        // 3. Shimmering warm bell harmonic
        const oscBell = audioCtx.createOscillator();
        const gainBell = audioCtx.createGain();
        oscBell.type = "sine";
        oscBell.frequency.setValueAtTime(524, now); // Octave C5
        gainBell.gain.setValueAtTime(0, now);
        gainBell.gain.linearRampToValueAtTime(0.015, now + 0.01);
        gainBell.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        oscRes.connect(gainRes);
        oscBell.connect(gainBell);
        gainRes.connect(audioCtx.destination);
        gainBell.connect(audioCtx.destination);
        
        oscRes.start(now);
        oscBell.start(now);
        oscRes.stop(now + 0.5);
        oscBell.stop(now + 0.35);

        // 4. Vocalize the active Dhikr in Arabic
        if ("speechSynthesis" in window) {
          // Instantly interrupt any preceding speech to stay responsive
          window.speechSynthesis.cancel();
          
          const utterance = new SpeechSynthesisUtterance(activePhrase.arabic);
          utterance.lang = "ar-SA"; // Saudi Arabic locale
          utterance.pitch = 1.05;
          utterance.rate = 0.9; // Peaceful, slightly slow pace
          utterance.volume = 0.9;
          
          // Select an Arabic voice if installed on the host OS
          const voices = window.speechSynthesis.getVoices();
          const arabicVoice = voices.find(v => v.lang.toLowerCase().includes("ar"));
          if (arabicVoice) {
            utterance.voice = arabicVoice;
          }
          
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        console.log("Vocal audio synthesis warning: ", err);
      }
    }

    setCount((prev) => {
      const nextVal = prev + 1;
      if (nextVal >= activePhrase.limit) {
        setTimeout(() => {
          setCount(0);
          setActivePhraseIndex((prevIdx) => (prevIdx + 1) % PHRASES.length);
        }, 300);
      }
      return nextVal;
    });

    setTotalCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setCount(0);
    setTotalCount(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md relative overflow-hidden max-w-sm mx-auto cursor-pointer group"
    >
      <div ref={glowRef} className="mouse-glow-card absolute inset-0 rounded-3xl pointer-events-none" />

      {/* Visual top border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Title Header */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <span className="text-[10px] text-emerald-800 font-serif font-bold uppercase tracking-widest flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
          <span>Interactive Dhikr Counter</span>
        </span>

        {/* Audio Toggle button */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
            soundEnabled
              ? "bg-emerald-50 border-emerald-205 text-emerald-800 animate-pulse"
              : "bg-slate-50 border-slate-250 text-slate-450 hover:text-slate-700"
          }`}
          title={soundEnabled ? "Mute Click Sound" : "Enable Click Sound"}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Phrase Selector Select Menu */}
      <div className="mb-4 relative z-10">
        <select
          value={activePhraseIndex}
          onChange={(e) => {
            setActivePhraseIndex(Number(e.target.value));
            setCount(0);
          }}
          className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-250 text-slate-750 font-sans text-xs focus:outline-none focus:border-emerald-500/50 cursor-pointer"
        >
          {PHRASES.map((phrase, idx) => (
            <option key={phrase.english} value={idx}>
              {phrase.english} ({phrase.limit}x)
            </option>
          ))}
        </select>
      </div>

      {/* Arabic Script & Translation Box */}
      <div className="text-center bg-emerald-50/40 border border-emerald-100 p-4 rounded-2xl mb-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhraseIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-serif text-2xl text-emerald-900 mb-1 tracking-wide select-none">
              {activePhrase.arabic}
            </p>
            <p className="text-[10px] text-slate-500 font-sans italic">
              {activePhrase.translation}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Incrementor Counter Button */}
      <div className="flex flex-col items-center justify-center gap-4 relative z-10">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={handleIncrement}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-emerald-800 to-emerald-950 p-1 cursor-pointer shadow-md shadow-emerald-800/10 flex items-center justify-center"
        >
          {/* Inner ring */}
          <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border border-emerald-100 group-hover:bg-slate-50 transition-colors">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-none">
              {count}
            </span>
            <span className="text-[9px] text-emerald-800 font-sans uppercase tracking-widest mt-1.5 font-semibold">
              Goal: {activePhrase.limit}
            </span>
          </div>
        </motion.button>

        {/* Counter Stats & Resetter */}
        <div className="flex justify-between items-center w-full px-2 text-xs font-sans mt-2">
          <span className="text-slate-500">
            Session Total: <strong className="text-slate-800 font-medium">{totalCount}</strong>
          </span>

          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] text-emerald-800 hover:text-emerald-700 font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
