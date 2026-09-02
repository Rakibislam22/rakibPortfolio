"use client";

import React, { useState, useEffect } from "react";
import { AppId, WindowInstance } from "@/types/os";
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
  Grid
} from "lucide-react";

interface UbuntuShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onOpenSettings: () => void;
}

export function UbuntuShell({
  windows,
  activeWindowId,
  onOpenApp,
  onToggleMinimize,
  onOpenSettings
}: UbuntuShellProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

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
        return <FileText className="h-5 w-5 text-orange-400" />;
      case "projects":
        return <FolderGit2 className="h-5 w-5 text-amber-400" />;
      case "skills":
        return <Cpu className="h-5 w-5 text-emerald-400" />;
      case "resume":
        return <GraduationCap className="h-5 w-5 text-purple-400" />;
      case "contact":
        return <Mail className="h-5 w-5 text-sky-400" />;
      case "terminal":
        return <Terminal className="h-5 w-5 text-emerald-400" />;
      case "youtube":
        return <PlaySquare className="h-5 w-5 text-rose-500" />;
      case "settings":
        return <Settings className="h-5 w-5 text-slate-300" />;
      case "trash":
        return <Trash2 className="h-5 w-5 text-rose-400" />;
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
      <header className="fixed top-0 left-0 right-0 z-30 flex h-7 items-center justify-between bg-[#110e14]/95 px-3 text-xs text-slate-200 border-b border-orange-950/40 select-none">
        {/* Left: Activities */}
        <button
          onClick={() => onOpenApp("projects")}
          className="font-medium text-white hover:text-orange-400 transition"
        >
          Activities
        </button>

        {/* Center: Clock */}
        <button
          onClick={onOpenSettings}
          className="font-semibold text-slate-200 hover:text-white"
        >
          {currentTime || "Sep 2 12:00 PM"}
        </button>

        {/* Right: Quick Settings Pill */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-slate-300 hover:bg-white/10"
        >
          <Wifi className="h-3 w-3" />
          <Volume2 className="h-3 w-3" />
          <Battery className="h-3 w-3" />
        </button>
      </header>

      {/* Ubuntu Left Dock */}
      <aside className="fixed top-7 bottom-0 left-0 z-30 flex w-14 flex-col items-center justify-between bg-[#130f17]/95 py-3 border-r border-orange-950/40 select-none">
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
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition ${isActive
                  ? "bg-white/15"
                  : isRunning
                    ? "bg-white/5 hover:bg-white/10"
                    : "hover:bg-white/5"
                  }`}
                title={app.name}
              >
                {getAppIcon(app.id)}

                {/* Ubuntu Left Indicator Dot */}
                {isRunning && (
                  <span
                    className={`absolute -left-1 h-1.5 w-1.5 rounded-full ${isActive ? "bg-orange-500 ring-2 ring-orange-400/40" : "bg-slate-400"
                      }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Show Apps (Grid Icon at bottom) */}
        <button
          onClick={() => onOpenApp("settings")}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition"
          title="Show Applications"
        >
          <Grid className="h-5 w-5 text-orange-400" />
        </button>
      </aside>
    </>
  );
}

