"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Search, Volume2, VolumeX, Sparkles, SkipBack, SkipForward, ListMusic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const SURAHS = [
  {
    id: 1,
    number: "01",
    nameEnglish: "Al-Fatiha",
    nameArabic: "الفاتحة",
    translation: "The Opening",
    verses: 7,
    type: "Makki",
    audioUrl: "https://server8.mp3quran.net/afs/001.mp3",
    duration: "1:42",
  },
  {
    id: 18,
    number: "18",
    nameEnglish: "Al-Kahf",
    nameArabic: "الكهف",
    translation: "The Cave",
    verses: 110,
    type: "Makki",
    audioUrl: "https://server8.mp3quran.net/afs/018.mp3",
    duration: "32:45",
  },
  {
    id: 55,
    number: "55",
    nameEnglish: "Ar-Rahman",
    nameArabic: "الرحمن",
    translation: "The Beneficent",
    verses: 78,
    type: "Madani",
    audioUrl: "https://server8.mp3quran.net/afs/055.mp3",
    duration: "14:22",
  },
  {
    id: 67,
    number: "67",
    nameEnglish: "Al-Mulk",
    nameArabic: "الملك",
    translation: "The Sovereignty",
    verses: 30,
    type: "Makki",
    audioUrl: "https://server8.mp3quran.net/afs/067.mp3",
    duration: "6:58",
  },
  {
    id: 78,
    number: "78",
    nameEnglish: "An-Naba",
    nameArabic: "النبأ",
    translation: "The Tidings",
    verses: 40,
    type: "Makki",
    audioUrl: "https://server8.mp3quran.net/afs/078.mp3",
    duration: "4:36",
  },
  {
    id: 93,
    number: "93",
    nameEnglish: "Ad-Duha",
    nameArabic: "الضحى",
    translation: "The Morning Hours",
    verses: 11,
    type: "Makki",
    audioUrl: "https://server8.mp3quran.net/afs/093.mp3",
    duration: "1:22",
  },
];

const WAVE_HEIGHTS = [8, 14, 18, 14, 8, 12, 20, 24, 20, 12, 10, 16, 22, 16, 10, 8, 14, 18, 14, 8, 12, 18, 12, 6, 8, 12, 16, 10, 6];

// ─── Elegant Surah Card Sub-component ───
function SurahCard({
  surah,
  isActive,
  isTrackPlaying,
  currentTime,
  duration,
  progressFraction,
  formatTime,
  handleSkipPrev,
  handlePlayPause,
  handleSkipNext,
  isMuted,
  setIsMuted,
  volume,
  setVolume,
}) {
  const cardRef = useTiltEffect({ max: 4, perspective: 1000, scale: 1.01 });
  const glowRef = useMouseGlow();

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1] }}
      className={`relative bg-white border rounded-[30px] p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between overflow-hidden cursor-pointer group ${
        isActive ? "border-emerald-355 shadow-lg shadow-emerald-500/[0.03]" : "border-slate-200"
      }`}
    >
      <div ref={glowRef} className="mouse-glow-card absolute inset-0 rounded-[30px] pointer-events-none" />

      <div className="relative z-10">
        {/* Top Row: Surah Label & Arabic Name */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold text-emerald-700 tracking-widest font-sans uppercase">
            SURAH {surah.number}
          </span>
          <motion.span 
            animate={isTrackPlaying ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-serif text-3xl font-bold text-emerald-900 select-none"
          >
            {surah.nameArabic}
          </motion.span>
        </div>

        {/* Middle Row: English Title & Subtitle */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 font-serif leading-none mt-1 group-hover:text-emerald-800 transition-colors">
            Surah {surah.nameEnglish}
          </h3>
          <span className="text-xs text-slate-500 font-sans font-light mt-2 block">
            {surah.translation} • {surah.verses} Verses
          </span>
        </div>

        {/* Custom Audio Waveform Visualizer */}
        <div className="flex items-end gap-[3px] h-10 my-6 select-none justify-center">
          {WAVE_HEIGHTS.map((height, idx) => {
            const barFraction = idx / WAVE_HEIGHTS.length;
            const isPlayed = isActive && barFraction <= progressFraction;

            return (
              <motion.div
                key={idx}
                animate={isTrackPlaying ? {
                  height: [height, height * 1.5, height * 0.7, height]
                } : { height }}
                transition={isTrackPlaying ? {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: idx * 0.03,
                  ease: "easeInOut"
                } : {
                  duration: 0.3
                }}
                className="w-[3px] rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: isPlayed ? "#0f766e" : "#e2e8f0",
                }}
              />
            );
          })}
        </div>

        {/* Time Progress Values */}
        <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-6">
          <span>{isActive ? formatTime(currentTime) : "00:00"}</span>
          <span>{isActive ? formatTime(duration) : surah.duration}</span>
        </div>
      </div>

      {/* Actions & Controls */}
      <div className="relative z-10 flex justify-between items-center pt-4 border-t border-slate-100 min-h-[64px]">
        {isActive ? (
          <>
            {/* Left Side: Playlist controllers */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleSkipPrev}
                className="p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                title="Previous Surah"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => handlePlayPause(surah)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-900 text-white hover:bg-slate-850 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md shadow-slate-900/10"
              >
                {isTrackPlaying ? (
                  <Pause className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                )}
              </button>

              <button
                onClick={handleSkipNext}
                className="p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
                title="Next Surah"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Right Side: Volume seek controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-slate-400 hover:text-emerald-800 transition-colors cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-amber-500 animate-pulse" />
                ) : (
                  <Volume2 className="w-4 h-4 text-emerald-800" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-16 accent-emerald-700 h-1 rounded-full cursor-pointer bg-slate-100"
                title="Volume Control"
              />
            </div>
          </>
        ) : (
          <>
            {/* Inactive Track Details */}
            <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1.5">
              <ListMusic className="w-3.5 h-3.5 text-emerald-600" />
              Duration: {surah.duration}
            </span>

            {/* Simple elegant Play Button for inactive tracks */}
            <button
              onClick={() => handlePlayPause(surah)}
              className="w-11 h-11 rounded-full border border-slate-200 hover:border-emerald-500/50 flex items-center justify-center text-slate-700 hover:text-emerald-800 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer bg-slate-50 hover:bg-white shadow-sm"
              title={`Play Surah ${surah.nameEnglish}`}
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function QuranPlayer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentSurah, setCurrentSurah] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isFocused, setIsFocused] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const handlePlayPause = (surah) => {
    if (currentSurah?.id === surah.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err) => console.log("Play interrupted", err));
        setIsPlaying(true);
      }
    } else {
      setCurrentSurah(surah);
      setIsPlaying(false);
      setCurrentTime(0);

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.src = surah.audioUrl;
          audioRef.current.load();
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.log("Error playing audio: ", err);
            });
        }
      }, 50);
    }
  };

  const handleSkipPrev = () => {
    if (!currentSurah) return;
    const currentIndex = SURAHS.findIndex((s) => s.id === currentSurah.id);
    if (currentIndex > 0) {
      handlePlayPause(SURAHS[currentIndex - 1]);
    }
  };

  const handleSkipNext = () => {
    if (!currentSurah) return;
    const currentIndex = SURAHS.findIndex((s) => s.id === currentSurah.id);
    if (currentIndex < SURAHS.length - 1) {
      handlePlayPause(SURAHS[currentIndex + 1]);
    }
  };

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
    setCurrentTime(0);
    handleSkipNext();
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || timeInSeconds === 0) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const filteredSurahs = SURAHS.filter((surah) => {
    const matchesSearch =
      surah.nameEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      surah.nameArabic.includes(searchQuery);

    const matchesFilter = filterType === "All" || surah.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <section
      id="quran"
      className="py-24 bg-gradient-to-b from-white via-stone-50 to-white text-slate-900 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-10 right-10 w-24 h-24 text-emerald-800/5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="25" y="25" width="50" height="50" transform="rotate(15 50 50)" />
          <rect x="25" y="25" width="50" height="50" transform="rotate(60 50 50)" />
        </svg>
      </div>

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
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Spiritual Recitations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-4">
            Beautiful Quran Tilawat
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Listen to the soul-stirring Quranic recitations by Robiul Hasan Resad.
            Immerse yourself in the tranquility of Tajweed, recorded with absolute
            devotion and clarity.
          </p>
        </motion.div>

        {/* Dynamic player audio control node */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnded}
        />

        {/* Filter and Search controls */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
          className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto"
        >
          {/* Search bar input with focus glows & width expansion animation */}
          <motion.div 
            animate={{ width: isFocused ? "100%" : "auto" }}
            className="relative w-full md:w-80 min-w-[280px]"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Surah (e.g. Al-Fatiha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-205 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-sans text-sm transition-all duration-300"
            />
          </motion.div>

          {/* Revelation Type tabs */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <div className="flex gap-2">
              {["All", "Makki", "Madani"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${
                    filterType === type
                      ? "bg-emerald-800 text-white font-bold shadow-md shadow-emerald-900/10"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/50"
                  }`}
                >
                  {type} Surahs
                </button>
              ))}
            </div>

            <div className="h-6 w-[1.5px] bg-slate-200/80 hidden sm:block" />

            <Link
              href="/surahs"
              className="group relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-serif text-[10px] font-bold tracking-widest uppercase shadow-md shadow-amber-500/10 hover:shadow-[0_4px_15px_rgba(245,158,11,0.25)] transition-all duration-300 flex-shrink-0 cursor-pointer border border-amber-600/30"
            >
              <ListMusic className="w-3.5 h-3.5 text-white" />
              <span>All 114 Surahs</span>
            </Link>
          </div>
        </motion.div>

        {/* Audio Card Playlists */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSurahs.map((surah) => {
              const isActive = currentSurah?.id === surah.id;
              const isTrackPlaying = isActive && isPlaying;
              const progressFraction = isActive && duration ? currentTime / duration : 0;

              return (
                <SurahCard
                  key={surah.id}
                  surah={surah}
                  isActive={isActive}
                  isTrackPlaying={isTrackPlaying}
                  currentTime={currentTime}
                  duration={duration}
                  progressFraction={progressFraction}
                  formatTime={formatTime}
                  handleSkipPrev={handleSkipPrev}
                  handlePlayPause={handlePlayPause}
                  handleSkipNext={handleSkipNext}
                  isMuted={isMuted}
                  setIsMuted={setIsMuted}
                  volume={volume}
                  setVolume={setVolume}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSurahs.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 max-w-xl mx-auto"
          >
            <Sparkles className="w-8 h-8 text-amber-500/60 mx-auto mb-4 animate-pulse" />
            <p className="text-slate-500 font-sans text-sm">
              No recitations found matching your search. Please try another term.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
