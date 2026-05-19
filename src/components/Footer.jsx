"use client";

import React from "react";
import { Star, Mail } from "lucide-react";
import { motion } from "framer-motion";
import TasbihWidget from "./TasbihWidget";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#fafaf9] via-stone-50 to-white border-t border-slate-200/80 text-slate-900 relative overflow-hidden">
      {/* Decorative Golden Star Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute top-10 right-10 w-32 h-32 text-emerald-800/[0.02] pointer-events-none"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="25" y="25" width="50" height="50" transform="rotate(20 50 50)" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(65 50 50)" />
        </svg>
      </motion.div>

      {/* Floating soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-emerald-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Columns: Brand Identity, Arabic Calligraphy & Bio */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 p-0.5 shadow-md shadow-amber-500/10">
                <Star className="w-4.5 h-4.5 text-white fill-white" />
              </div>
              <span className="font-serif text-xl font-bold text-emerald-900 tracking-wide uppercase">
                Robiul Hasan Resad
              </span>
            </div>

            {/* Calligraphy Overlay */}
            <div className="py-2.5">
              <span className="font-serif text-3xl sm:text-4xl text-emerald-800/90 tracking-wide block leading-normal direction-rtl">
                وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
              </span>
              <span className="text-[9px] text-amber-600 font-sans tracking-widest uppercase leading-none font-bold block mt-1">
                "And my success is only by Allah" — Surah Hud: 88
              </span>
            </div>

            <p className="text-slate-600 font-sans text-sm leading-relaxed max-w-md mx-auto lg:mx-0 font-light">
              Spreading beautiful and authentic Islamic knowledge, connecting today's
              youth to divine guidance, and helping minds find peace through Quranic
              recitations and educational mentorship.
            </p>

            {/* Social channels grid */}
            <div className="flex gap-4 justify-center lg:justify-start items-center pt-2">
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-250 flex items-center justify-center text-slate-700 hover:text-emerald-800 hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
                aria-label="YouTube Channel"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.389-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white border border-slate-250 flex items-center justify-center text-slate-700 hover:text-emerald-800 hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
                aria-label="Facebook Page"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:robiulhasanresad@gmail.com"
                className="w-10 h-10 rounded-xl bg-white border border-slate-250 flex items-center justify-center text-slate-700 hover:text-emerald-800 hover:border-emerald-300 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-95 shadow-sm"
                aria-label="Email Address"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Columns: Integrated Digital Tasbih Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="max-w-xs mx-auto lg:mr-0">
              <TasbihWidget />
            </div>
          </div>
        </div>

        {/* Lower Subfooter */}
        <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-sans font-light">
          <p>© {new Date().getFullYear()} Robiul Hasan Resad. All rights reserved.</p>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1.5 text-emerald-800/90 font-semibold font-serif">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>Built with Serenity & Faith</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
