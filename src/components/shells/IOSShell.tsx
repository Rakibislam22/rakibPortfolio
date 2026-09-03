"use client";

import React, { useState, useEffect } from "react";
import { AppId, ThemeMode, WindowInstance } from "@/types/os";
import { portfolioData } from "@/data/portfolioData";
import {
  Wifi,
  Battery,
  Search,
  FolderGit2,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  Settings,
  Trash2,
  ChevronLeft,
  Sun,
  Moon
} from "lucide-react";

interface IOSShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenApp: (id: AppId) => void;
  onCloseApp: (id: string) => void;
  onOpenSettings: () => void;
  children?: React.ReactNode;
}

export function IOSShell({
  windows,
  activeWindowId,
  themeMode = "dark",
  onToggleTheme,
  onOpenApp,
  onCloseApp,
  onOpenSettings
}: IOSShellProps) {
  const [currentTime, setCurrentTime] = useState<string>("9:41");
  const [currentDate, setCurrentDate] = useState<string>("Wednesday, September 3");
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);

  const isLight = themeMode === "light";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric"
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getIOSIcon = (id: AppId) => {
    switch (id) {
      case "about":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-cyan-600 via-sky-500 to-blue-400 text-white shadow-lg shadow-sky-500/25">
            <FileText className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
      case "projects":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-400 text-white shadow-lg shadow-orange-500/25">
            <FolderGit2 className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
      case "skills":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-emerald-600 via-teal-500 to-green-400 text-white shadow-lg shadow-emerald-500/25">
            <Cpu className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
      case "resume":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-purple-600 via-indigo-500 to-violet-400 text-white shadow-lg shadow-purple-500/25">
            <GraduationCap className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
      case "contact":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-blue-600 via-cyan-500 to-sky-400 text-white shadow-lg shadow-blue-500/25">
            <Mail className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
      case "terminal":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-slate-900 via-neutral-900 to-slate-800 text-emerald-400 shadow-lg border border-white/15 font-mono text-xl font-bold">
            &gt;_
          </div>
        );
      case "youtube":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 text-white shadow-lg shadow-rose-600/30">
            <svg className="h-7 w-7 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        );
      case "settings":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-slate-600 via-gray-500 to-slate-400 text-white shadow-lg">
            <Settings className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
      case "trash":
        return (
          <div className="flex h-14 w-14 items-center justify-center rounded-[22%] bg-gradient-to-tr from-rose-600 via-red-500 to-pink-500 text-white shadow-lg shadow-rose-500/25">
            <Trash2 className="h-7 w-7 stroke-[2.2]" />
          </div>
        );
    }
  };

  const mainApps: { id: AppId; name: string }[] = [
    { id: "about", name: "About Me" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "resume", name: "Resume" },
    { id: "youtube", name: "YouTube" },
    { id: "terminal", name: "Terminal" },
    { id: "contact", name: "Contact" },
    { id: "settings", name: "Settings" }
  ];

  const dockApps: { id: AppId; name: string }[] = [
    { id: "about", name: "About" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "contact", name: "Mail" }
  ];

  const activeApp = activeWindowId && windows[activeWindowId]?.isOpen ? windows[activeWindowId] : null;

  return (
    <div className="relative h-full w-full flex flex-col justify-between overflow-hidden select-none">
      {/* iOS Top Status Bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 flex h-11 items-center justify-between px-6 pt-1 text-xs font-semibold backdrop-blur-xs ${
        isLight ? "text-slate-900" : "text-white"
      }`}>
        {/* Left: Time */}
        <span className="font-semibold tracking-tight text-[13px]">{currentTime}</span>

        {/* Center: Dynamic Island */}
        <div
          onClick={() => {
            if (dynamicIslandExpanded) {
              onOpenSettings();
            } else {
              setDynamicIslandExpanded(true);
            }
          }}
          className={`flex items-center justify-between bg-black text-white px-3 py-1 cursor-pointer transition-all duration-300 shadow-xl border border-white/10 ${
            dynamicIslandExpanded
              ? "h-10 w-48 rounded-full"
              : "h-7 w-28 rounded-full"
          }`}
        >
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-slate-300 font-medium">
            {dynamicIslandExpanded ? "Tap for Settings ⚙️" : "RakibOS"}
          </span>
          <div className="h-2 w-2 rounded-full bg-sky-400/80" />
        </div>

        {/* Right: Icons & Theme Toggle */}
        <div className="flex items-center gap-2">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1 rounded-full active:opacity-60"
              title="Toggle Theme"
            >
              {isLight ? <Moon className="h-3.5 w-3.5 text-indigo-600" /> : <Sun className="h-3.5 w-3.5 text-amber-300" />}
            </button>
          )}
          <span className="text-[10px] font-bold">5G</span>
          <Wifi className="h-3.5 w-3.5" />
          <Battery className="h-4 w-4" />
        </div>
      </header>

      {/* iOS Home Screen Content */}
      <main className="flex-1 flex flex-col items-center justify-between pt-16 pb-28 px-4 max-w-md mx-auto w-full">
        {/* Date & Greeting Widget */}
        <div className="w-full text-center my-2 space-y-1">
          <p className={`text-xs font-semibold uppercase tracking-widest ${
            isLight ? "text-cyan-700" : "text-sky-200/80 drop-shadow"
          }`}>
            {currentDate}
          </p>
          <h2 className={`text-2xl font-bold tracking-tight ${
            isLight ? "text-slate-900" : "text-white drop-shadow-md"
          }`}>
            {portfolioData.name}
          </h2>
          <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-300 drop-shadow"}`}>
            {portfolioData.title}
          </p>
        </div>

        {/* 4xN iOS App Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-6 w-full max-w-xs my-auto justify-items-center">
          {mainApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="flex flex-col items-center gap-1.5 active:scale-90 transition-transform duration-150 focus:outline-none"
            >
              {getIOSIcon(app.id)}
              <span className={`text-[11px] font-medium ${
                isLight ? "text-slate-800" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
              }`}>
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* Search Pill Badge & Page Dots */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full shadow-sm ${isLight ? "bg-slate-800" : "bg-white"}`} />
            <span className={`h-1.5 w-1.5 rounded-full ${isLight ? "bg-slate-400" : "bg-white/40"}`} />
            <span className={`h-1.5 w-1.5 rounded-full ${isLight ? "bg-slate-400" : "bg-white/40"}`} />
          </div>

          <button
            onClick={() => onOpenApp("terminal")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs backdrop-blur-xl shadow-lg active:scale-95 transition ${
              isLight
                ? "bg-white/70 border border-slate-300 text-slate-800"
                : "bg-black/40 border border-white/20 text-white/90"
            }`}
          >
            <Search className="h-3 w-3" />
            <span className="text-[11px] font-medium">Search</span>
          </button>
        </div>
      </main>

      {/* iOS Frosted Bottom Dock */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-sm">
        <div className={`flex items-center justify-around rounded-[2rem] p-3 backdrop-blur-3xl shadow-2xl ${
          isLight
            ? "border border-white/80 bg-white/40 shadow-slate-900/10"
            : "border border-white/20 bg-white/15 shadow-black/40"
        }`}>
          {dockApps.map((app) => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app.id)}
              className="flex flex-col items-center active:scale-90 transition-transform duration-150"
              title={app.name}
            >
              {getIOSIcon(app.id)}
            </button>
          ))}
        </div>

        {/* iOS Home Indicator Bar */}
        <div
          onClick={() => {
            if (activeApp) onCloseApp(activeApp.id);
          }}
          className={`mx-auto mt-2 h-1 w-32 rounded-full cursor-pointer shadow-md transition ${
            isLight ? "bg-slate-600 hover:bg-slate-900" : "bg-white/80 hover:bg-white"
          }`}
        />
      </nav>

      {/* iOS Full-Screen Modal App Sheet */}
      {activeApp && (
        <div className={`fixed inset-0 z-50 flex flex-col animate-in slide-in-from-bottom duration-300 ${
          isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"
        }`}>
          {/* iOS Modal Top Grabber & Navigation Bar */}
          <div className={`flex flex-col border-b pt-3 px-4 pb-2 backdrop-blur-xl ${
            isLight ? "border-slate-200 bg-white/95" : "border-white/10 bg-slate-900/90"
          }`}>
            {/* Grabber */}
            <div className={`mx-auto h-1 w-10 rounded-full mb-2 ${isLight ? "bg-slate-300" : "bg-white/30"}`} />

            <div className="flex items-center justify-between">
              <button
                onClick={() => onCloseApp(activeApp.id)}
                className="flex items-center gap-0.5 text-xs font-semibold text-cyan-600 active:opacity-60"
              >
                <ChevronLeft className="h-4 w-4" /> Home
              </button>

              <span className={`text-xs font-bold truncate max-w-[200px] ${
                isLight ? "text-slate-900" : "text-white"
              }`}>
                {activeApp.title}
              </span>

              <button
                onClick={() => onCloseApp(activeApp.id)}
                className="text-xs font-bold text-cyan-600 active:opacity-60"
              >
                Done
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className={`flex-1 overflow-hidden pb-6 ${isLight ? "bg-slate-50" : "bg-slate-950"}`}>
            {/* App content rendered via Desktop */}
          </div>

          {/* Bottom Swipe Bar to close */}
          <div
            onClick={() => onCloseApp(activeApp.id)}
            className={`h-6 flex items-center justify-center cursor-pointer ${
              isLight ? "bg-slate-50" : "bg-slate-950"
            }`}
          >
            <div className={`h-1 w-32 rounded-full ${isLight ? "bg-slate-400 hover:bg-slate-600" : "bg-white/60 hover:bg-white"}`} />
          </div>
        </div>
      )}
    </div>
  );
}
