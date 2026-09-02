"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Play,
  Search,
  SlidersHorizontal,
  ThumbsUp,
  Share2,
  Radio,
  ExternalLink,
  Sparkles,
  Flame
} from "lucide-react";

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  avatar: string;
  views: string;
  uploaded: string;
  category: "MERN Stack" | "Project Demos" | "Lo-Fi Beats" | "Tech Talks";
  description: string;
  isLive?: boolean;
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "lofi-stream",
    youtubeId: "jfKfPfyJRdk", // Lofi Girl / beats to code to
    title: "Lofi Hip Hop Radio 📚 Beats to Relax / Study / Code to",
    channel: "Lofi Girl",
    avatar: "/profile-logo.jpg",
    views: "34k watching",
    uploaded: "Live",
    category: "Lo-Fi Beats",
    description: "Peaceful lo-fi beats, ambient instrumental music for programming, deep focus, and relaxed coding sessions.",
    isLive: true
  },
  {
    id: "convox-demo",
    youtubeId: "dQw4w9WgXcQ", // Video player demo / custom embed
    title: "ConvoX - Real-Time Messaging & Collaboration Platform Demo",
    channel: "Md Rakib Ali",
    avatar: "/profile-logo.jpg",
    views: "1.4k views",
    uploaded: "2 weeks ago",
    category: "Project Demos",
    description: "Deep dive into ConvoX architecture: Next.js App Router, Socket.IO, Redis pub/sub, MongoDB clusters, and LiveKit audio/video rooms."
  },
  {
    id: "nextjs-mastery",
    youtubeId: "843nec-IvW0", // Next.js full course
    title: "Next.js Full Stack Architecture & Server Actions Masterclass",
    channel: "JavaScript Mastery",
    avatar: "/profile-logo.jpg",
    views: "240k views",
    uploaded: "3 months ago",
    category: "MERN Stack",
    description: "Learn how to build production-grade full stack web applications with Next.js, TypeScript, Tailwind CSS, and database optimization."
  },
  {
    id: "react-perf",
    youtubeId: "SqcY0GlETPk", // React Tutorial
    title: "React 19 & Next-Gen State Management Patterns",
    channel: "Web Dev Simplified",
    avatar: "/profile-logo.jpg",
    views: "180k views",
    uploaded: "1 month ago",
    category: "MERN Stack",
    description: "Mastering React 19 actions, useOptimistic, server components, and performance profiling."
  },
  {
    id: "redis-system-design",
    youtubeId: "G1rOthIU-uo", // Redis crash course
    title: "Real-Time System Design with WebSockets & Redis Pub/Sub",
    channel: "Fireship",
    avatar: "/profile-logo.jpg",
    views: "420k views",
    uploaded: "5 months ago",
    category: "Tech Talks",
    description: "How to scale WebSocket connections to millions of concurrent users using Redis pub/sub and distributed queues."
  },
  {
    id: "synthwave-coding",
    youtubeId: "4xDzrJKXOOY", // Synthwave chill
    title: "Synthwave Radio 🌌 Chill Synth / Retro Beats for Coding",
    channel: "Lofi Space",
    avatar: "/profile-logo.jpg",
    views: "12k watching",
    uploaded: "Live",
    category: "Lo-Fi Beats",
    description: "Retro synthwave instrumental beats for late-night software engineering and deep flow state.",
    isLive: true
  }
];

export function YouTubeApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<VideoItem>(DEFAULT_VIDEOS[0]);
  const [likes, setLikes] = useState<Record<string, number>>({
    "lofi-stream": 1420,
    "convox-demo": 320,
    "nextjs-mastery": 890,
    "react-perf": 650,
    "redis-system-design": 1100,
    "synthwave-coding": 540
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  const categories = ["All", "Lo-Fi Beats", "Project Demos", "MERN Stack", "Tech Talks"];

  const handleLike = (id: string) => {
    setHasLiked((prev) => {
      const isLiked = !prev[id];
      setLikes((l) => ({
        ...l,
        [id]: (l[id] || 0) + (isLiked ? 1 : -1)
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const filteredVideos = DEFAULT_VIDEOS.filter((v) => {
    const matchesCat =
      selectedCategory === "All" || v.category === selectedCategory;
    const matchesSearch =
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-rose-500/30">
      {/* Top YouTube Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/90 px-4 py-2.5 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-9 items-center justify-center rounded-lg bg-rose-600 text-white shadow-md shadow-rose-600/30">
            <Play className="h-4 w-4 fill-white ml-0.5" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
            YouTube <span className="text-[10px] text-rose-400 font-mono">DevStudio</span>
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-2">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search videos, topics, or beats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-full border border-white/10 bg-black/50 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-rose-500/50 focus:outline-none"
          />
        </div>

        {/* Action button */}
        <a
          href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 hover:border-rose-500/40 hover:text-white transition"
        >
          <ExternalLink className="h-3 w-3" /> Open in YouTube
        </a>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-slate-900/40 px-4 py-2 overflow-x-auto">
        <SlidersHorizontal className="mr-1 h-3.5 w-3.5 text-slate-500 shrink-0" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${selectedCategory === cat
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Content: Player + Playlist */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: Active Video Player */}
        <div className="space-y-4">
          {/* 16:9 Video Frame */}
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&enablejsapi=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>

          {/* Video Title & Actions */}
          <div className="space-y-3">
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {activeVideo.title}
            </h1>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
              {/* Channel Info */}
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-slate-800">
                  <Image
                    src={activeVideo.avatar}
                    alt={activeVideo.channel}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">
                    {activeVideo.channel}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    {activeVideo.views} • {activeVideo.uploaded}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(activeVideo.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${hasLiked[activeVideo.id]
                      ? "bg-rose-600 text-white"
                      : "bg-white/10 text-slate-200 hover:bg-white/15"
                    }`}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span>{likes[activeVideo.id] || 100}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://www.youtube.com/watch?v=${activeVideo.youtubeId}`
                    );
                    alert("Video link copied to clipboard!");
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/15 transition"
                >
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </div>

            {/* Video Description Card */}
            <div className="rounded-xl border border-white/5 bg-slate-900/60 p-3.5 text-xs text-slate-300 leading-relaxed space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-rose-300 text-[11px]">
                <Sparkles className="h-3 w-3" /> About this video
              </div>
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>

        {/* Right: Suggested Videos / Playlist */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-rose-400" /> Up Next / Video Queue
            </h3>
            <span className="text-[10px] text-slate-500">
              {filteredVideos.length} videos
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className={`group flex gap-3 rounded-xl border p-2.5 transition cursor-pointer ${activeVideo.id === video.id
                    ? "border-rose-500/50 bg-rose-950/20 ring-1 ring-rose-500/30"
                    : "border-white/5 bg-slate-900/50 hover:border-white/15 hover:bg-slate-900"
                  }`}
              >
                {/* Video Thumbnail */}
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-black border border-white/10">
                  <Image
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    fill
                    unoptimized
                    sizes="128px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  {video.isLive ? (
                    <span className="absolute bottom-1 right-1 flex items-center gap-1 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                      <Radio className="h-2 w-2 animate-pulse" /> Live
                    </span>
                  ) : (
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono font-medium text-white">
                      HD
                    </span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between overflow-hidden">
                  <div>
                    <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug group-hover:text-rose-200 transition">
                      {video.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-400 truncate">
                      {video.channel}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span>{video.views}</span>
                    <span>•</span>
                    <span className="capitalize">{video.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

