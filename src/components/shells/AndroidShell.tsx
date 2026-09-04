"use client";

import React, { useState, useEffect } from "react";
import { AppId, ThemeMode, WindowInstance } from "@/types/os";
import { portfolioData } from "@/data/portfolioData";
import {
  Wifi,
  FolderGit2,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  Terminal,
  Settings,
  Trash2,
  ArrowLeft,
  Sun,
  Moon,
  Mic,
  Camera
} from "lucide-react";

interface AndroidShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenApp: (id: AppId) => void;
  onCloseApp: (id: string) => void;
  onOpenSettings: () => void;
}

export function AndroidShell({
  windows,
  activeWindowId,
  themeMode = "dark",
  onToggleTheme,
  onOpenApp,
  onCloseApp,
  onOpenSettings
}: AndroidShellProps) {
  const [currentTime, setCurrentTime] = useState<string>("10:08");
  const [currentDate, setCurrentDate] = useState<string>("Wed, Sep 3");

  const isLight = themeMode === "light";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getMaterialIcon = (id: AppId) => {
    switch (id) {
      case "about":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-teal-100 border-teal-400 text-teal-800"
              : "bg-teal-900/60 border-teal-400/40 text-teal-300"
            }`}>
            <FileText className="h-6 w-6" />
          </div>
        );
      case "projects":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-amber-100 border-amber-400 text-amber-800"
              : "bg-amber-900/60 border-amber-400/40 text-amber-300"
            }`}>
            <FolderGit2 className="h-6 w-6" />
          </div>
        );
      case "skills":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-emerald-100 border-emerald-400 text-emerald-800"
              : "bg-emerald-900/60 border-emerald-400/40 text-emerald-300"
            }`}>
            <Cpu className="h-6 w-6" />
          </div>
        );
      case "resume":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-purple-100 border-purple-400 text-purple-800"
              : "bg-purple-900/60 border-purple-400/40 text-purple-300"
            }`}>
            <GraduationCap className="h-6 w-6" />
          </div>
        );
      case "contact":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-sky-100 border-sky-400 text-sky-800"
              : "bg-sky-900/60 border-sky-400/40 text-sky-300"
            }`}>
            <Mail className="h-6 w-6" />
          </div>
        );
      case "terminal":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 font-mono text-lg font-bold shadow-md transition ${isLight
              ? "bg-slate-200 border-slate-400 text-slate-900"
              : "bg-slate-900 border-slate-700 text-emerald-400"
            }`}>
            &gt;_
          </div>
        );
      case "youtube":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-rose-100 border-rose-400 text-rose-700"
              : "bg-rose-950/80 border-rose-500/50 text-rose-500"
            }`}>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        );
      case "settings":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-stone-200 border-stone-400 text-stone-800"
              : "bg-stone-900/80 border-stone-500/40 text-stone-300"
            }`}>
            <Settings className="h-6 w-6" />
          </div>
        );
      case "trash":
        return (
          <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md transition ${isLight
              ? "bg-rose-100 border-rose-400 text-rose-700"
              : "bg-rose-900/60 border-rose-400/40 text-rose-300"
            }`}>
            <Trash2 className="h-6 w-6" />
          </div>
        );
    }
  };

  const appGrid: { id: AppId; name: string }[] = [
    { id: "about", name: "About" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "resume", name: "Resume" },
    { id: "youtube", name: "YouTube" },
    { id: "terminal", name: "Terminal" },
    { id: "contact", name: "Contact" },
    { id: "settings", name: "Settings" },
    { id: "trash", name: "Bin" }
  ];

  const activeApp = activeWindowId && windows[activeWindowId]?.isOpen ? windows[activeWindowId] : null;

  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden select-none">
      {/* Android Top Status Bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 flex h-8 items-center justify-between px-5 text-xs ${isLight ? "text-slate-800" : "text-slate-200"
        }`}>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[13px] font-mono tracking-tight">
            {currentTime}
          </span>
          <div className={`hidden sm:flex items-center gap-1.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            <Mail className="h-3 w-3" />
            <Terminal className="h-3 w-3 text-emerald-500" />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1 rounded-full active:opacity-60"
              title="Toggle Theme"
            >
              {isLight ? <Moon className="h-3.5 w-3.5 text-indigo-600" /> : <Sun className="h-3.5 w-3.5 text-amber-300" />}
            </button>
          )}
          <Wifi className="h-3.5 w-3.5" />
          <div className="flex items-center gap-1 text-[11px] font-mono">
            <span>98%</span>
            <div className={`w-5 h-2.5 rounded-xs border p-0.5 flex items-center ${isLight ? "border-slate-800" : "border-white"}`}>
              <div className="h-full w-[90%] bg-emerald-500 rounded-xs" />
            </div>
          </div>
        </div>
      </header>

      {/* Android Home Screen Content */}
      <main className="flex-1 flex flex-col justify-between pt-12 pb-20 px-5 max-w-sm mx-auto w-full">
        {/* Material You At-A-Glance Widget */}
        <div className="space-y-1.5 mt-2">
          <div className={`flex items-center gap-2 font-medium text-sm ${isLight ? "text-slate-900" : "text-white"}`}>
            <span>{currentDate}</span>
            <span>•</span>
            <span className={`flex items-center gap-1 ${isLight ? "text-amber-600 font-semibold" : "text-amber-300"}`}>
              <Sun className="h-4 w-4" /> 28°C
            </span>
          </div>
          <div
            onClick={onOpenSettings}
            className={`rounded-2xl p-3.5 backdrop-blur-md border cursor-pointer transition active:scale-[0.98] ${isLight
                ? "border-teal-300/80 bg-white/70 shadow-sm hover:border-teal-400"
                : "border-teal-500/20 bg-teal-950/40 hover:border-teal-500/40"
              }`}
          >
            <p className={`text-xs font-semibold ${isLight ? "text-teal-900" : "text-teal-300"}`}>
              {portfolioData.name} • Developer Hub
            </p>
            <p className={`text-[11px] mt-0.5 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
              {portfolioData.title} • Available for Projects
            </p>
          </div>
        </div>

        {/* Material You Circular App Grid */}
        <div className="grid grid-cols-4 gap-4 my-auto justify-items-center">
          {appGrid.map((app) => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform duration-150 focus:outline-none"
            >
              {getMaterialIcon(app.id)}
              <span className={`text-[11px] font-medium ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Google Search Pill Widget */}
        <div className="w-full">
          <div
            onClick={() => onOpenApp("terminal")}
            className={`flex items-center justify-between rounded-full px-4 py-2.5 backdrop-blur-xl shadow-lg cursor-pointer transition border ${isLight
                ? "border-slate-300/90 bg-white/90 hover:border-slate-400"
                : "border-white/15 bg-slate-900/80 hover:border-white/30"
              }`}
          >
            <div className="flex items-center gap-2.5">
              {/* Google G Logo SVG */}
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                Search portfolio...
              </span>
            </div>

            <div className={`flex items-center gap-2 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
              <Mic className="h-3.5 w-3.5" />
              <Camera className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </main>

      {/* Android Modern Gesture Navigation Bar */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className={`h-1 w-28 rounded-full ${isLight ? "bg-slate-400/60" : "bg-white/40"
          }`} />
      </div>

      {/* Android Full-Screen App Screen */}
      {activeApp && (
        <div className={`fixed inset-0 z-50 flex flex-col animate-in fade-in duration-200 ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"
          }`}>
          {/* Material You Top App Bar */}
          <div className={`flex items-center justify-between border-b px-4 py-3 backdrop-blur-xl ${isLight ? "border-slate-200 bg-white/95" : "border-white/10 bg-slate-900/90"
            }`}>
            <button
              onClick={() => onCloseApp(activeApp.id)}
              className={`flex items-center gap-2 text-xs font-semibold ${isLight ? "text-teal-700 hover:text-teal-900" : "text-teal-300 hover:text-teal-200"
                }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <span className={`text-xs font-bold truncate max-w-[200px] ${isLight ? "text-slate-900" : "text-white"}`}>
              {activeApp.title}
            </span>

            <button
              onClick={() => onCloseApp(activeApp.id)}
              className={`text-xs ${isLight ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className={`flex-1 overflow-hidden pb-10 ${isLight ? "bg-slate-50" : "bg-slate-950"}`}>
            {/* Rendered via Desktop */}
          </div>
        </div>
      )}
    </div>
  );
}
