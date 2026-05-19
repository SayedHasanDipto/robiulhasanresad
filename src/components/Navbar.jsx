"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Menu, X, Star } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useMagneticHover } from "@/hooks/useMagneticHover";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hijriDate, setHijriDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  
  // Track scroll progress for scroll indicator bar
  const { scrollYProgress } = useScroll();

  const logoMagneticRef = useMagneticHover(0.2);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Dynamic Hijri and Gregorian Dates
    const gregToday = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    setGregorianDate(formatter.format(gregToday));

    // Dynamic Hijri Date calculation
    const hijriFormatter = new Intl.DateTimeFormat("en-TN-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setHijriDate(hijriFormatter.format(gregToday));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Quran Recitation", href: "#quran" },
    { name: "Hadith & Quotes", href: "#hadith" },
    { name: "Books & Media", href: "#media" },
    { name: "Expertise", href: "#skills" },
    { name: "Contact & Booking", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-emerald-100/50 py-3 shadow-sm shadow-slate-100/30"
            : "bg-transparent py-5"
        }`}
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Calligraphic Star */}
            <div 
              ref={logoMagneticRef}
              className="flex-shrink-0 flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 p-0.5 shadow-md shadow-amber-500/20 transition-transform duration-300">
                <Star className="w-5 h-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-emerald-800 tracking-wide uppercase leading-none transition-colors group-hover:text-emerald-700">
                  R. H. Resad
                </span>
                <span className="text-[10px] text-amber-600 font-sans tracking-widest mt-0.5">
                  ISLAMIC PORTFOLIO
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 + 0.2 }}
                  className={`font-sans text-sm font-medium tracking-wide transition-colors duration-300 relative group py-2 ${
                    scrolled ? "text-slate-700 hover:text-emerald-750" : "text-slate-800 hover:text-emerald-800"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-emerald-600 group-hover:w-full transition-all duration-350 rounded-full" />
                </motion.a>
              ))}
            </div>

            {/* Hijri & Gregorian Calendar Widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50/70 border border-emerald-100/60 text-emerald-900 shadow-sm shadow-emerald-500/5 hover:bg-emerald-50 transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <div className="flex flex-col text-[10px] leading-tight font-medium text-left">
                <span className="text-emerald-850 font-serif font-bold">{hijriDate || "Loading Hijri..."}</span>
                <span className="text-slate-500 text-[9px]">{gregorianDate}</span>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:text-emerald-850 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-colors cursor-pointer"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 0.68, 0, 1] }}
            className="lg:hidden fixed inset-x-0 top-[72px] z-40 bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-xl overflow-hidden"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="px-5 pt-6 pb-8 space-y-3"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="block px-4 py-3 rounded-xl text-slate-800 hover:text-emerald-800 hover:bg-emerald-50/50 text-base font-semibold tracking-wide border border-transparent hover:border-emerald-100/50 transition-all duration-200"
                >
                  {link.name}
                </motion.a>
              ))}

              {/* Mobile Date Widget */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="pt-4 border-t border-slate-100 flex items-center gap-3 px-4 text-slate-800"
              >
                <Calendar className="w-5 h-5 text-amber-600" />
                <div className="flex flex-col text-xs font-medium">
                  <span className="text-emerald-800 font-serif font-bold">{hijriDate}</span>
                  <span className="text-slate-500 text-[10px]">{gregorianDate}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
