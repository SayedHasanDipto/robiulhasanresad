"use client";

import React, { useState } from "react";
import { Send, Phone, Mail, MapPin, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { useMagneticHover } from "@/hooks/useMagneticHover";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Lecture Invitation",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const leftCardRef = useTiltEffect({ max: 3, scale: 1.01 });
  const rightCardRef = useTiltEffect({ max: 2, scale: 1.005 });
  const leftGlowRef = useMouseGlow();
  const rightGlowRef = useMouseGlow();
  const submitBtnRef = useMagneticHover(0.15);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "Lecture Invitation",
        message: "",
      });

      setTimeout(() => setIsSuccess(false), 5000);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-white via-stone-50 to-stone-100/30 text-slate-900 relative overflow-hidden"
    >
      {/* Decorative Rotating Geometric Graphic */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
        className="absolute bottom-[-100px] left-[-100px] w-64 h-64 text-emerald-800/[0.03] pointer-events-none"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <rect x="25" y="25" width="50" height="50" transform="rotate(30 50 50)" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(75 50 50)" />
        </svg>
      </motion.div>

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
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Channel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-4">
            Contact & Event Booking
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Invite Robiul Hasan Resad to speak at your masjid, educational seminar,
            or youth event. You can also reach out for individual counseling queries.
          </p>
        </motion.div>

        {/* Form and Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Left Column: Quick Contact Details */}
          <motion.div
            ref={leftCardRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 0.68, 0, 1] }}
            className="lg:col-span-5 flex flex-col justify-between bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden cursor-pointer"
          >
            <div ref={leftGlowRef} className="mouse-glow-card absolute inset-0 rounded-3xl pointer-events-none" />

            {/* Top Amber Bar */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

            <div>
              <h3 className="text-xl font-serif font-bold text-emerald-900 mb-6">
                Get in Touch
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-light mb-8">
                Please fill out the contact form, and we will get back to you within
                24-48 hours. Let us collaborate to spread beautiful, beneficial knowledge!
              </p>

              {/* Detail Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 shadow-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-widest leading-none mb-1">
                      Email Address
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 font-sans">
                      mdresadislam2025@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 shadow-sm">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-widest leading-none mb-1">
                      Mobile Number
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 font-sans">
                      +880 1619-450849
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-widest leading-none mb-1">
                      Location / Region
                    </h4>
                    <p className="text-sm font-semibold text-slate-800 font-sans">
                      Dhaka, Bangladesh (Available globally)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Quote Reminder */}
            <div className="mt-12 pt-6 border-t border-slate-100">
              <span className="text-[10px] text-amber-600 font-serif font-bold tracking-widest uppercase mb-1 block">
                Beautiful Intention
              </span>
              <p className="text-[11px] text-slate-500 italic font-sans leading-relaxed">
                "Whoever calls others to guidance will have a reward like the rewards
                of those who follow them..." <br />
                <span className="text-emerald-850 not-italic block mt-1 text-[9px] font-bold">
                  — Sahih Muslim 2674
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Functional Form */}
          <motion.div
            ref={rightCardRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 0.68, 0, 1] }}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden cursor-pointer"
          >
            <div ref={rightGlowRef} className="mouse-glow-card absolute inset-0 rounded-3xl pointer-events-none" />

            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* Form success notification */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -15, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -15, height: 0 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs sm:text-sm font-sans shadow-inner overflow-hidden"
                  >
                    <Check className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div>
                      <strong className="block text-emerald-900 mb-0.5 font-serif">Message Dispatched Successfully!</strong>
                      <span>Assalamu Alaikum. Thank you for reaching out. Resad Bhai or his team will respond to your query very soon, In Sha Allah.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name & Email inputs in grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-slate-600 font-sans tracking-wide uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-205 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-sans text-sm transition-all duration-300"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-slate-600 font-sans tracking-wide uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-205 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-sans text-sm transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject dropdown select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-bold text-slate-600 font-sans tracking-wide uppercase">
                  Subject / Inquiry Type
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-205 text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-sans text-sm transition-all duration-300 cursor-pointer"
                >
                  <option value="Lecture Invitation">Lecture Invitation (Masjid / Event)</option>
                  <option value="Youth Quran Classes">Quran Class / Tajweed Training</option>
                  <option value="Individual Counseling">Personal Spiritual Counseling</option>
                  <option value="General Query">General Query & Islamic Advice</option>
                </select>
              </div>

              {/* Message text area */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-slate-600 font-sans tracking-wide uppercase">
                  Message Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Detail your event date, theme, or general question..."
                  value={formData.message}
                  onChange={handleChange}
                  className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-205 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-sans text-sm transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div ref={submitBtnRef} className="w-full flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center justify-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-950 text-white font-serif text-xs font-bold tracking-widest uppercase shadow-[0_4px_20px_rgba(6,78,59,0.25)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.35)] transition-all duration-500 overflow-hidden cursor-pointer border border-emerald-700/60 w-full sm:w-auto z-10"
                >
                  <Send className="w-4 h-4 text-white fill-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <span className="relative z-10">{isSubmitting ? "Dispatching..." : "Send Message"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
