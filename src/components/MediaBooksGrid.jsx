"use client";

import React, { useState } from "react";
import { BookOpen, Video, Download, Play, X, ExternalLink, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useMouseGlow } from "@/hooks/useMouseGlow";

const BOOKS = [
  {
    id: 1,
    title: "Understanding Quranic Tajweed",
    author: "Robiul Hasan Resad",
    description: "A comprehensive guide designed specifically for youth and beginners to perfect their pronunciation and rules of Quranic recitation with ease.",
    pages: 120,
    size: "4.2 MB",
    coverColor: "from-emerald-700 to-emerald-950",
    tags: ["Tajweed", "Recitation", "Beginners"],
  },
  {
    id: 2,
    title: "Youth & Faith in the Modern Era",
    author: "Recommended by Resad",
    description: "Addressing the common spiritual challenges and intellectual doubts faced by modern Muslim youth, with highly practical guidelines from the Seerah.",
    pages: 215,
    size: "6.8 MB",
    coverColor: "from-amber-600 to-amber-900",
    tags: ["Mentorship", "Faith", "Youth"],
  },
  {
    id: 3,
    title: "Daily Adhkar & Protection",
    author: "Curated by Resad",
    description: "A beautifully organized collection of authentic morning, evening, and post-Salah supplications with English translation and transliteration.",
    pages: 64,
    size: "2.1 MB",
    coverColor: "from-slate-700 to-slate-950",
    tags: ["Adhkar", "Protection", "Daily Practice"],
  },
];

const VIDEOS = [
  {
    id: 1,
    title: "Perfecting Your Recitation: Common Tajweed Mistakes",
    category: "Quran Class",
    date: "May 12, 2026",
    duration: "14:20",
    youtubeId: "W2h30_QYq_A",
    thumbnail: "https://images.unsplash.com/photo-1609599006353-e629f1d40968?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "How to Maintain Absolute Khushu (Focus) in Salah?",
    category: "Spiritual Reminder",
    date: "April 28, 2026",
    duration: "08:45",
    youtubeId: "c_l70d-G_Dk",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Connecting with the Quran: A Youth Perspective",
    category: "Youth Vlog & Advice",
    date: "April 05, 2026",
    duration: "18:12",
    youtubeId: "vB-W3uB7G0Q",
    thumbnail: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
  },
];

// ─── Elegant Book Card Sub-component ───
function BookCard({ book, downloadingBookId, handleDownload }) {
  const cardRef = useTiltEffect({ max: 4, perspective: 1200, scale: 1.01 });
  const glowRef = useMouseGlow();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1] }}
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-between group h-full relative overflow-hidden cursor-pointer"
    >
      <div ref={glowRef} className="mouse-glow-card absolute inset-0 rounded-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Book cover visual structure */}
        <div className="w-full h-48 rounded-xl bg-slate-100 flex items-center justify-center mb-6 overflow-hidden relative border border-slate-200 shadow-inner group-hover:scale-[1.02] transition-transform duration-500">
          <div
            className={`absolute left-0 inset-y-0 w-full bg-gradient-to-r ${book.coverColor} p-4 flex flex-col justify-between shadow-2xl`}
          >
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/35 border-r border-white/5" />
            <div className="absolute inset-2 border border-amber-500/20 rounded-md pointer-events-none flex flex-col items-center justify-between p-2">
              <span className="text-[7px] tracking-widest text-amber-500/60 uppercase">
                Holy Islamic Study
              </span>
              <span className="text-[7px] tracking-widest text-amber-500/60 uppercase">
                R. H. Resad
              </span>
            </div>
            <div className="relative text-center my-auto px-4">
              <h4 className="font-serif text-sm sm:text-base font-bold text-amber-400 tracking-wide line-clamp-2 leading-tight">
                {book.title}
              </h4>
              <p className="text-[9px] text-zinc-300 font-sans mt-2">
                {book.author}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-sans uppercase font-semibold tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-emerald-800 transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed font-sans font-light mb-6">
          {book.description}
        </p>
      </div>

      {/* Footer Info & Downloader */}
      <div className="relative z-10 flex justify-between items-center pt-4 border-t border-slate-100">
        <span className="text-[10px] text-slate-400 font-sans">
          PDF • {book.pages} pages • {book.size}
        </span>
        <button
          onClick={() => handleDownload(book)}
          disabled={downloadingBookId === book.id}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-600/40 text-emerald-950 font-bold text-xs tracking-wide transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{downloadingBookId === book.id ? "Downloading..." : "Download PDF"}</span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Elegant Video Card Sub-component ───
function VideoCard({ video, setSelectedVideo }) {
  const cardRef = useTiltEffect({ max: 3, perspective: 1200, scale: 1.01 });
  const glowRef = useMouseGlow();

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.22, 0.68, 0, 1] }}
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 group h-full flex flex-col justify-between relative cursor-pointer"
    >
      <div ref={glowRef} className="mouse-glow-card absolute inset-0 rounded-3xl pointer-events-none" />

      {/* Thumbnail and Overlay Play */}
      <div
        onClick={() => setSelectedVideo(video)}
        className="relative aspect-video w-full overflow-hidden bg-slate-100 border-b border-slate-200 z-10"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-white/95 border border-emerald-250 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300 text-slate-800">
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </div>
        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-zinc-300 font-mono tracking-wider">
          {video.duration}
        </span>
      </div>

      {/* Video Details */}
      <div className="p-6 flex flex-col justify-between flex-1 relative z-10">
        <div>
          <div className="flex justify-between items-center gap-4 mb-2.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-sans tracking-wide uppercase font-semibold">
              {video.category}
            </span>
            <span className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {video.date}
            </span>
          </div>
          <h3
            onClick={() => setSelectedVideo(video)}
            className="text-base font-bold text-slate-800 leading-snug hover:text-emerald-800 cursor-pointer transition-colors line-clamp-2"
          >
            {video.title}
          </h3>
        </div>

        <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-100">
          <span className="text-[10px] text-slate-500 font-sans font-light">
            Speaker: Robiul Hasan Resad
          </span>
          <button
            onClick={() => setSelectedVideo(video)}
            className="text-emerald-800 hover:text-emerald-705 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
          >
            <span>Watch Lecture</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MediaBooksGrid() {
  const [activeTab, setActiveTab] = useState("books");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [downloadingBookId, setDownloadingBookId] = useState(null);

  const handleDownload = (book) => {
    setDownloadingBookId(book.id);
    setTimeout(() => {
      setDownloadingBookId(null);
      alert(`Success: "${book.title}" PDF download started! (${book.size})`);
    }, 1500);
  };

  return (
    <section
      id="media"
      className="py-24 bg-gradient-to-b from-stone-50 to-white text-slate-900 relative overflow-hidden"
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
            <BookOpen className="w-3.5 h-3.5" />
            <span>Islamic Knowledge Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 tracking-wide mb-4">
            Books, Media & Vlogs
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6" />
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Explore authentic literature and interactive lecture media compiled and
            recommended by Robiul Hasan Resad. Acquire verified teachings for your
            daily journey.
          </p>
        </motion.div>

        {/* Tab Selection Row */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("books")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border cursor-pointer transition-all duration-300 relative ${activeTab === "books"
              ? "bg-emerald-900 text-white border-emerald-900 font-bold shadow-lg shadow-emerald-500/10"
              : "bg-white border-slate-200 text-slate-700 hover:text-emerald-850 hover:border-emerald-100 shadow-sm"
              }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Recommended Books</span>
            {activeTab === "books" && (
              <motion.span 
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-xl bg-emerald-900/10 -z-10 border border-emerald-950/20"
              />
            )}
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold tracking-wide border cursor-pointer transition-all duration-300 relative ${activeTab === "videos"
              ? "bg-emerald-900 text-white border-emerald-900 font-bold shadow-lg shadow-emerald-500/10"
              : "bg-white border-slate-200 text-slate-700 hover:text-emerald-850 hover:border-emerald-100 shadow-sm"
              }`}
          >
            <Video className="w-4 h-4" />
            <span>Video Lectures & Vlogs</span>
            {activeTab === "videos" && (
              <motion.span 
                layoutId="activeTabGlow"
                className="absolute inset-0 rounded-xl bg-emerald-900/10 -z-10 border border-emerald-950/20"
              />
            )}
          </button>
        </div>

        {/* Dynamic Display Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "books" ? (
              <motion.div 
                key="booksGrid"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {BOOKS.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    downloadingBookId={downloadingBookId}
                    handleDownload={handleDownload}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="videosGrid"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.08 } }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {VIDEOS.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    setSelectedVideo={setSelectedVideo}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video Lightbox Modal Embed */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 30 }}
                transition={{ duration: 0.4, ease: [0.22, 0.68, 0, 1] }}
                className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 text-slate-800 hover:text-emerald-800 border border-slate-200 transition-all active:scale-95 cursor-pointer shadow-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Responsive Video Frame */}
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>

                {/* Title & Metadata Details */}
                <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 font-sans tracking-wide uppercase font-semibold">
                    {selectedVideo.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 mt-2 leading-snug">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans font-light mt-1.5">
                    Published: {selectedVideo.date} • Duration: {selectedVideo.duration} • Speaker: Robiul Hasan Resad
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
