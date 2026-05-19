import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuranPlayer from "@/components/QuranPlayer";
import HadithSection from "@/components/HadithSection";
import MediaBooksGrid from "@/components/MediaBooksGrid";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Robiul Hasan Resad - Premium Islamic Portfolio Website",
  description:
    "A peaceful, premium, and modern Islamic portfolio website for Robiul Hasan Resad - Hafiz, Speaker, & Youth Mentor.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9] text-slate-900 font-sans selection:bg-amber-100 selection:text-emerald-900 scroll-smooth">
      {/* Serene Navigation Bar */}
      <Navbar />

      <main className="flex-grow">
        {/* Elegant Hero Welcome Intro */}
        <Hero />

        {/* Custom State-Managed Quran Player Grid */}
        <QuranPlayer />

        {/* Curated Hadith Reflections Slider */}
        <HadithSection />

        {/* Tabbed Books, Media & Vlogs Directory */}
        <MediaBooksGrid />

        {/* Skill Mastery circle gauges & stats */}
        <SkillsSection />

        {/* Fully Functional Query & Event Booking Form */}
        <ContactSection />
      </main>

      {/* Footer carrying Integrated Digital Tasbih count widget */}
      <Footer />
    </div>
  );
}
