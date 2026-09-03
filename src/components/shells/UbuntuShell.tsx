"use client";

import React, { useState, useEffect } from "react";
import { AppId, ThemeMode, WindowInstance } from "@/types/os";
import {
  Wifi,
  Volume2,
  Battery,
  FolderGit2,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  Terminal,
  Settings,
  Trash2,
  PlaySquare,
  Grid,
  Sun,
  Moon
} from "lucide-react";

interface UbuntuShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onOpenSettings: () => void;
}

export function UbuntuShell({
  windows,
  activeWindowId,
  themeMode = "dark",
  onToggleTheme,
  onOpenApp,
  onToggleMinimize,
  onOpenSettings
}: UbuntuShellProps) {
  const [currentTime, setCurrentTime] = useState<string>("Sep 3 12:00 PM");

  const isLight = themeMode === "light";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        }) +
        " " +
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAppIcon = (id: AppId) => {
    switch (id) {
      case "about":
        return <FileText className="h-5 w-5 text-orange-500" />;
      case "projects":
        return <FolderGit2 className="h-5 w-5 text-amber-500" />;
      case "skills":
        return <Cpu className="h-5 w-5 text-emerald-500" />;
      case "resume":
        return <GraduationCap className="h-5 w-5 text-purple-500" />;
      case "contact":
        return <Mail className="h-5 w-5 text-sky-500" />;
      case "terminal":
        return <Terminal className="h-5 w-5 text-emerald-500" />;
      case "youtube":
        return <PlaySquare className="h-5 w-5 text-rose-500" />;
      case "settings":
        return <Settings className="h-5 w-5 text-slate-400" />;
      case "trash":
        return <Trash2 className="h-5 w-5 text-rose-500" />;
    }
  };

  const dockApps: { id: AppId; name: string }[] = [
    { id: "about", name: "About Me" },
    { id: "projects", name: "Projects Explorer" },
    { id: "skills", name: "Skills" },
    { id: "resume", name: "Education & Resume" },
    { id: "youtube", name: "YouTube Player" },
    { id: "terminal", name: "Terminal" },
    { id: "contact", name: "Contact & Mail" },
    { id: "settings", name: "Settings" },
    { id: "trash", name: "Trash" }
  ];

  return (
    <>
      {/* Ubuntu Top Bar */}
      <header className={`fixed top-0 left-0 right-0 z-30 flex h-7 items-center justify-between px-3 text-xs select-none ${
        isLight
          ? "bg-[#ede8e1]/95 border-b border-orange-300 text-stone-900 shadow-xs"
          : "bg-[#110e14]/95 border-b border-orange-950/40 text-slate-200"
      }`}>
        {/* Left: Activities */}
        <button
          onClick={() => onOpenApp("projects")}
          className="font-medium hover:text-orange-500 transition"
        >
          Activities
        </button>

        {/* Center: Clock */}
        <button
          onClick={onOpenSettings}
          className="font-semibold hover:text-orange-500 transition"
        >
          {currentTime}
        </button>

        {/* Right: Quick Settings Pill & Theme Toggle */}
        <div className="flex items-center gap-1.5">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`p-1 rounded-full transition ${isLight ? "hover:bg-stone-200" : "hover:bg-white/10"}`}
              title="Toggle Theme"
            >
              {isLight ? <Moon className="h-3 w-3 text-indigo-700" /> : <Sun className="h-3 w-3 text-amber-300" />}
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className={`flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs transition ${
              isLight
                ? "bg-stone-200/80 text-stone-800 hover:bg-stone-300"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <Wifi className="h-3 w-3" />
            <Volume2 className="h-3 w-3" />
            <Battery className="h-3 w-3" />
          </button>
        </div>
      </header>

      {/* Ubuntu Left Dock */}
      <aside className={`fixed top-7 bottom-0 left-0 z-30 flex w-14 flex-col items-center justify-between py-3 select-none ${
        isLight
          ? "bg-[#e8e2d8]/95 border-r border-orange-200"
          : "bg-[#130f17]/95 border-r border-orange-950/40"
      }`}>
        <div className="flex flex-col items-center gap-2 w-full">
          {dockApps.map((app) => {
            const win = windows[app.id];
            const isRunning = win?.isOpen;
            const isActive = activeWindowId === app.id && isRunning && !win?.isMinimized;

            return (
              <button
                key={app.id}
                onClick={() => {
                  if (!isRunning) {
                    onOpenApp(app.id);
                  } else {
                    onToggleMinimize(app.id);
                  }
                }}
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${
                  isActive
                    ? isLight
                      ? "bg-orange-200 shadow-xs"
                      : "bg-white/15"
                    : isLight
                      ? "hover:bg-stone-200/70"
                      : "hover:bg-white/10"
                }`}
                title={app.name}
              >
                {/* Ubuntu Running Indicator (Left Orange Dot) */}
                {isRunning && (
                  <span className="absolute left-0.5 h-1.5 w-1.5 rounded-full bg-orange-500" />
                )}
                {getAppIcon(app.id)}
              </button>
            );
          })}
        </div>

        {/* Ubuntu App Grid / Show Apps Button */}
        <button
          onClick={() => onOpenApp("projects")}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
            isLight ? "text-stone-700 hover:bg-stone-200" : "text-slate-400 hover:bg-white/10 hover:text-white"
          }`}
          title="Show Applications"
        >
          <Grid className="h-5 w-5" />
        </button>
      </aside>
    </>
  );
}
