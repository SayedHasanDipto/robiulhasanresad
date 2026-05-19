"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Search, Volume2, VolumeX, Sparkles, SkipBack, SkipForward, ArrowLeft, Disc, Compass, BookOpen, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { ALL_SURAHS } from "@/lib/quranData";

const WAVE_HEIGHTS = [8, 14, 18, 14, 8, 12, 20, 24, 20, 12, 10, 16, 22, 16, 10, 8, 14, 18, 14, 8, 12, 18, 12, 6, 8, 12, 16, 10, 6];

function SurahRowCard({
  surah,
  isActive,
  isTrackPlaying,
  handlePlayPause,
}) {
  const cardRef = useTiltEffect({ max: 3, scale: 1.01 });
  const glowRef = useMouseGlow();

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1] }}
      onClick={() => handlePlayPause(surah)}
      className={`relative bg-white/80 border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group ${
        isActive ? "border-emerald-500 shadow-md shadow-emerald-500/[0.03] ring-1 ring-emerald-500/30" : "border-slate-100"
      }`}
    >
      <div ref={glowRef} className="mouse-glow-card absolute inset-0 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header: Number & Revelation Type */}
        <div className="flex justify-between items-center mb-3">
          <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold font-mono flex items-center justify-center border border-emerald-100/50">
            {surah.number}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${
            surah.type === "Makki" 
              ? "bg-amber-50 border border-amber-100 text-amber-700" 
              : "bg-blue-50 border border-blue-100 text-blue-700"
          }`}>
            {surah.type}
          </span>
        </div>

        {/* Name in English and Arabic */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-serif leading-tight group-hover:text-emerald-800 transition-colors">
              Surah {surah.nameEnglish}
            </h3>
            <p className="text-[11px] text-slate-500 font-sans mt-0.5">
              {surah.translation}
            </p>
          </div>
          <span className="font-serif text-xl font-bold text-emerald-900 select-none">
            {surah.nameArabic}
          </span>
        </div>

        {/* Verses Count & Play Duration */}
        <div className="flex items-center gap-3 mt-4 text-[10px] text-slate-400 font-sans border-t border-slate-100 pt-3">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-slate-350" />
            {surah.verses} Verses
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-350" />
            {surah.duration}
          </span>
        </div>
      </div>

      {/* Floating Animated Audio waveform visualizer when playing */}
      {isActive && (
        <div className="absolute bottom-4 right-5 flex items-end gap-[2px] h-6 select-none z-10">
          {WAVE_HEIGHTS.slice(0, 15).map((height, idx) => (
            <motion.div
              key={idx}
              animate={isTrackPlaying ? {
                height: [height * 0.4, height * 0.9, height * 0.2, height * 0.4]
              } : { height: height * 0.4 }}
              transition={isTrackPlaying ? {
                duration: 1,
                repeat: Infinity,
                delay: idx * 0.04,
                ease: "easeInOut"
              } : { duration: 0.2 }}
              className="w-[2px] rounded-full bg-emerald-600"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function AllSurahsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentSurah, setCurrentSurah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  // Playback handlers
  const handlePlayPause = (surah) => {
    if (!surah) return;
    
    // Construct Mishary Rashid Alafasy padded 3-digit MP3 url
    const paddedNum = String(surah.id).padStart(3, "0");
    const audioUrl = `https://server8.mp3quran.net/afs/${paddedNum}.mp3`;

    if (currentSurah?.id === surah.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
        setIsPlaying(true);
      }
    } else {
      setCurrentSurah(surah);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        audioRef.current.play().catch(err => console.log("Audio play blocked:", err));
      }
    }
  };

  const handleSkipNext = () => {
    if (!currentSurah) return;
    const currentIndex = ALL_SURAHS.findIndex((s) => s.id === currentSurah.id);
    if (currentIndex < ALL_SURAHS.length - 1) {
      handlePlayPause(ALL_SURAHS[currentIndex + 1]);
    }
  };

  const handleSkipPrev = () => {
    if (!currentSurah) return;
    const currentIndex = ALL_SURAHS.findIndex((s) => s.id === currentSurah.id);
    if (currentIndex > 0) {
      handlePlayPause(ALL_SURAHS[currentIndex - 1]);
    }
  };

  // HTML5 audio listener updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    handleSkipNext();
  };

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleProgressBarClick = (e) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickFraction = clickX / width;
    audioRef.current.currentTime = clickFraction * duration;
    setCurrentTime(clickFraction * duration);
  };

  // Format digital timers
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Search & tab filters
  const filteredSurahs = ALL_SURAHS.filter((surah) => {
    const matchesSearch =
      surah.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.nameArabic.includes(searchQuery) ||
      surah.number.includes(searchQuery);

    const matchesFilter =
      filterType === "All" || surah.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50/20 via-white to-emerald-50/10 text-slate-900 pb-36 relative overflow-hidden">
      {/* Decorative large rotating geometry background */}
      <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] text-emerald-800/[0.02] pointer-events-none animate-spin-slow">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2" className="w-full h-full">
          <rect x="20" y="20" width="60" height="60" transform="rotate(15 50 50)" />
          <rect x="20" y="20" width="60" height="60" transform="rotate(45 50 50)" />
          <circle cx="50" cy="50" r="30" />
        </svg>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 text-xs font-serif font-bold tracking-widest uppercase text-emerald-800 hover:text-amber-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Title Banner Header */}
        <div className="mb-12 text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-amber-500 animate-pulse" />
            <span>Al-Quran Al-Kareem</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 leading-tight">
            Explore All 114 Surahs
          </h1>
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed mt-3 max-w-2xl">
            Listen to complete Quran recitations with crystal clear Tajweed by Mishary Rashid Alafasy. Use search or filter tabs to instantly locate any surah.
          </p>
        </div>

        {/* Search, Stats and Filters bar */}
        <div className="flex flex-col lg:flex-row gap-5 justify-between items-center mb-10 bg-white/70 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm">
          
          {/* Search bar input with focus glows */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Surah Name, Number or Meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-sans text-xs sm:text-sm transition-all duration-300"
            />
          </div>

          {/* Revelation Type tabs */}
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            {["All", "Makki", "Madani"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  filterType === type
                    ? "bg-emerald-850 text-white font-bold shadow-md shadow-emerald-900/10"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/50"
                }`}
              >
                {type} Surahs
              </button>
            ))}
          </div>

          {/* Statistics badge */}
          <div className="text-[10px] sm:text-xs font-serif font-bold text-slate-500 uppercase tracking-widest bg-emerald-50/50 border border-emerald-100 px-4 py-2 rounded-xl flex-shrink-0">
            Showing <span className="text-emerald-800">{filteredSurahs.length}</span> / 114
          </div>
        </div>

        {/* 114 Surahs Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSurahs.map((surah) => {
              const isActive = currentSurah?.id === surah.id;
              const isTrackPlaying = isActive && isPlaying;

              return (
                <SurahRowCard
                  key={surah.id}
                  surah={surah}
                  isActive={isActive}
                  isTrackPlaying={isTrackPlaying}
                  handlePlayPause={handlePlayPause}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Zero state search alert */}
        {filteredSurahs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-50 border border-slate-200 rounded-3xl max-w-xl mx-auto mt-8"
          >
            <Compass className="w-8 h-8 text-amber-500/60 mx-auto mb-4 animate-spin-slow" />
            <p className="text-slate-500 font-sans text-sm font-light">
              No surahs found matching your search. Please check the spelling or select "All Surahs" filter.
            </p>
          </motion.div>
        )}
      </div>

      {/* Floating Premium Dynamic Audio Media Player capsule bar at bottom */}
      <AnimatePresence>
        {currentSurah && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-6 left-4 right-4 md:left-6 md:right-6 lg:left-1/2 lg:-translate-x-1/2 lg:w-[760px] bg-slate-900/95 border border-slate-800 text-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl z-50 p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left side: Surah detail info */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/10">
                <Disc className={`w-6 h-6 text-white ${isPlaying ? "animate-spin-slow" : ""}`} />
                <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-slate-900 border border-slate-800 text-[9px] font-bold font-mono flex items-center justify-center">
                  {currentSurah.number}
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm tracking-wide flex items-center gap-2">
                  {currentSurah.nameEnglish} 
                  <span className="text-emerald-450 font-serif text-base">{currentSurah.nameArabic}</span>
                </h4>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  {currentSurah.translation} • Recited by Alafasy
                </p>
              </div>
            </div>

            {/* Middle: Custom audio controls & seek progress */}
            <div className="flex-1 max-w-sm flex flex-col items-center gap-1.5">
              
              {/* Media Button Triggers */}
              <div className="flex items-center gap-5">
                <button
                  onClick={handleSkipPrev}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Previous Surah"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handlePlayPause(currentSurah)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-900 hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md shadow-white/5"
                >
                  {isPlaying ? (
                    <Pause className="w-4.5 h-4.5 text-slate-900 fill-slate-900" />
                  ) : (
                    <Play className="w-4.5 h-4.5 text-slate-900 fill-slate-900 ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleSkipNext}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Next Surah"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Seek Bar slider */}
              <div className="w-full flex items-center gap-2.5 text-[10px] font-mono text-slate-400">
                <span>{formatTime(currentTime)}</span>
                <div 
                  onClick={handleProgressBarClick}
                  className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden relative cursor-pointer group"
                >
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full group-hover:brightness-110 transition-all duration-100"
                    style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right side: Volume and close action */}
            <div className="flex items-center gap-4 border-t border-slate-800 pt-3 md:border-t-0 md:pt-0 justify-between md:justify-end">
              
              {/* Volume Node */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4.5 h-4.5" /> : <Volume2 className="w-4.5 h-4.5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 h-1 bg-slate-800 rounded-full appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Dismiss player button */}
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlaying(false);
                  setCurrentSurah(null);
                }}
                className="px-3 py-1 bg-slate-800/80 hover:bg-slate-800 text-[10px] text-slate-350 hover:text-white font-sans uppercase font-bold tracking-wider rounded-lg transition-all border border-slate-700/30 cursor-pointer"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
