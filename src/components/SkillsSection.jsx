"use client";

import React, { useState } from "react";
import { Award, BookOpen, Mic, Users, Star, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { useCountUp } from "@/hooks/useCountUp";

const SKILLS = [
  {
    id: 1,
    name: "Quran Recitation & Tajweed",
    level: 98,
    icon: Star,
    desc: "Certified in Quranic recitation rules (Tajweed) and phonetic pronunciations, rendering verses with classic and soulful maqamat (melodic tones).",
    area: "Academic & Practice",
  },
  {
    id: 2,
    name: "Islamic Jurisprudence (Fiqh)",
    level: 92,
    icon: Compass,
    desc: "Rigorous study of Shari'ah rulings and practical contemporary application of Islamic law for daily living.",
    area: "Research & Consultation",
  },
  {
    id: 3,
    name: "Public Lecturing & Oratory",
    level: 95,
    icon: Mic,
    desc: "Expertise in engaging diverse audiences with hope-driven, structured and persuasive public speaking at institutions and events.",
    area: "Public Outreach",
  },
  {
    id: 4,
    name: "Youth Mentorship & Counseling",
    level: 94,
    icon: Users,
    desc: "Empathetic counseling methods addressing mental, emotional, and spiritual issues faced by the younger generation.",
    area: "Community Service",
  },
  {
    id: 5,
    name: "Arabic Linguistics & Grammar",
    level: 88,
    icon: BookOpen,
    desc: "Comprehensive understanding of classical Arabic syntax, morphology, and rhetoric to extract direct meaning from scriptures.",
    area: "Scriptural Studies",
  },
];

const METRICS = [
  { value: 5, label: "Years of Da'wah", suffix: "+", desc: "Active community building & guidance" },
  { value: 50, label: "Lectures Delivered", suffix: "+", desc: "Spoken at key masjids & academic centers" },
  { value: 500, label: "Youth Guided", suffix: "+", desc: "One-on-one sessions & mental support" },
  { value: 10, label: "Online Reach", suffix: "k+", desc: "Global digital audience base" },
];

function MetricCard({ value, suffix, label, desc }) {
  const count = useCountUp(value, { duration: 2000 });
  const cardRef = useTiltEffect({ max: 5, scale: 1.02 });
  const glowRef = useMouseGlow();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white border border-slate-205 rounded-2xl p-6 hover:border-emerald-300 transition-colors text-center shadow-sm relative group overflow-hidden cursor-pointer"
    >
      <div ref={glowRef} className="mouse-glow-card absolute inset-0 rounded-2xl pointer-events-none" />

      <div className="absolute top-2 right-2 text-emerald-800/[0.04] group-hover:text-amber-500/10 transition-colors">
        <Star className="w-4 h-4 fill-current" />
      </div>

      <p className="text-4xl font-serif font-black text-emerald-900 mb-1.5 leading-none">
        {count}
        {suffix}
      </p>
      <h4 className="text-sm font-bold text-slate-800 mb-1 font-sans">
        {metricLabel(label)}
      </h4>
      <p className="text-xs text-slate-500 font-sans font-light leading-relaxed">
        {desc}
      </p>
    </motion.div>
  );
}

// Helper to make labels safe
function metricLabel(lbl) {
  return lbl;
}

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);
  const gaugeRef = useTiltEffect({ max: 3, scale: 1.01 });

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-white via-stone-50 to-white text-slate-900 relative overflow-hidden"
    >
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
            <Award className="w-3.5 h-3.5" />
            <span>Expertise & Service</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-4">
            Knowledge & Skills Matrix
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Highlighting the specialized training, academic disciplines, and community
            counseling expertise Robiul Hasan Resad brings to his spiritual calling.
          </p>
        </motion.div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 max-w-6xl mx-auto">
          {/* Left Column: Interactive Gauges */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-serif font-bold text-emerald-800 mb-6 flex items-center gap-2">
              <span>Academic Disciplines</span>
              <span className="h-px bg-slate-200 flex-1" />
            </h3>

            {SKILLS.map((skill, idx) => {
              const SkillIcon = skill.icon;
              const isSelected = selectedSkill.id === skill.id;

              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-4 rounded-2xl border transition-all duration-350 flex items-center gap-4 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-50/40 border-emerald-300 shadow-md shadow-emerald-950/[0.02]"
                      : "bg-white border-slate-200 hover:border-emerald-100 hover:bg-slate-50/50 shadow-sm"
                  }`}
                >
                  {/* Skill Icon Container */}
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all ${
                      isSelected
                        ? "bg-emerald-800 border-emerald-800 text-white"
                        : "bg-slate-50 border-slate-200 text-emerald-800"
                    }`}
                  >
                    <SkillIcon className="w-5 h-5" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-2 mb-1.5">
                      <h4 className="font-bold text-sm sm:text-base text-slate-800 truncate">
                        {skill.name}
                      </h4>
                      <span className="text-xs text-amber-600 font-mono font-semibold">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Slider Bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 0.68, 0, 1] }}
                        className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Detailed Skill Insight Card */}
          <div className="lg:col-span-5">
            <motion.div 
              ref={gaugeRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 0.68, 0, 1] }}
              className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-xl backdrop-blur-md overflow-hidden cursor-pointer"
            >
              {/* Golden line top accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

              {/* Decorative circle backdrop */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/[0.02] rounded-full pointer-events-none" />

              {/* Skill Circular Gauge Visualization */}
              <div className="flex justify-center mb-8 relative">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="text-slate-100 stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="72"
                      cy="72"
                      r="60"
                      className="text-emerald-800 stroke-current drop-shadow-[0_0_4px_rgba(4,78,59,0.1)]"
                      strokeWidth="10"
                      strokeDasharray={376.99}
                      initial={{ strokeDashoffset: 376.99 }}
                      animate={{ strokeDashoffset: 376.99 - (376.99 * selectedSkill.level) / 100 }}
                      transition={{ duration: 1.2, ease: [0.22, 0.68, 0, 1] }}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-serif font-bold text-slate-800 leading-none">
                      {selectedSkill.level}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans uppercase tracking-widest mt-1">
                      Proficiency
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill Description Details */}
              <div className="text-center">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-sans tracking-wide uppercase font-semibold animate-pulse">
                  {selectedSkill.area}
                </span>
                <h3 className="text-xl font-serif font-bold text-emerald-900 mt-3 mb-4 leading-snug">
                  {selectedSkill.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed font-light">
                  {selectedSkill.desc}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Highlight Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto border-t border-slate-200 pt-16">
          {METRICS.map((metric) => (
            <MetricCard
              key={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              desc={metric.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
