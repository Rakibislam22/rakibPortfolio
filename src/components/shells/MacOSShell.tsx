"use client";

import React, { useState, useEffect } from "react";
import { AppId, ThemeMode, WindowInstance } from "@/types/os";
import {
  Wifi,
  Battery,
  Search,
  Sliders,
  FolderGit2,
  Cpu,
  GraduationCap,
  FileText,
  Mail,
  Terminal,
  Settings,
  Trash2,
  PlaySquare,
  Info,
  Sun,
  Moon,
  Volume2
} from "lucide-react";

interface MacOSShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onOpenSettings: () => void;
}

export function MacOSShell({
  windows,
  activeWindowId,
  themeMode = "dark",
  onToggleTheme,
  onOpenApp,
  onToggleMinimize,
  onOpenSettings
}: MacOSShellProps) {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [controlCenterOpen, setControlCenterOpen] = useState(false);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");

  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [brightness, setBrightness] = useState(90);
  const [volume, setVolume] = useState(80);

  const isLight = themeMode === "light";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-US", {
          weekday: "short",
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

  const getActiveTitle = () => {
    if (!activeWindowId) return "Finder";
    return windows[activeWindowId]?.title || "Finder";
  };

  const getDockIcon = (id: AppId) => {
    switch (id) {
      case "about":
        return <FileText className="h-6 w-6 text-cyan-400" />;
      case "projects":
        return <FolderGit2 className="h-6 w-6 text-amber-400" />;
      case "skills":
        return <Cpu className="h-6 w-6 text-emerald-400" />;
      case "resume":
        return <GraduationCap className="h-6 w-6 text-purple-400" />;
      case "contact":
        return <Mail className="h-6 w-6 text-sky-400" />;
      case "terminal":
        return <Terminal className="h-6 w-6 text-emerald-400" />;
      case "youtube":
        return <PlaySquare className="h-6 w-6 text-rose-500" />;
      case "settings":
        return <Settings className="h-6 w-6 text-slate-400" />;
      case "trash":
        return <Trash2 className="h-6 w-6 text-rose-400" />;
    }
  };

  const dockApps: { id: AppId; name: string }[] = [
    { id: "about", name: "About Me" },
    { id: "projects", name: "Projects" },
    { id: "skills", name: "Skills" },
    { id: "resume", name: "Resume & Education" },
    { id: "youtube", name: "YouTube Player" },
    { id: "terminal", name: "Terminal" },
    { id: "contact", name: "Mail" }
  ];

  const secondaryDockApps: { id: AppId; name: string }[] = [
    { id: "settings", name: "System Settings" },
    { id: "trash", name: "Trash" }
  ];

  return (
    <>
      {/* macOS Top Menu Bar */}
      <header className={`fixed top-0 left-0 right-0 z-30 flex h-7.5 items-center justify-between px-3 text-xs backdrop-blur-2xl select-none ${isLight
          ? "bg-white/70 border-b border-black/10 text-slate-800 shadow-xs"
          : "bg-slate-900/70 border-b border-white/10 text-slate-200"
        }`}>
        {/* Left Side: Apple Logo & App Menus */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setAppleMenuOpen(!appleMenuOpen);
                setControlCenterOpen(false);
                setSpotlightOpen(false);
              }}
              className="flex items-center text-sm font-semibold opacity-90 hover:opacity-100 transition"
              title="Apple Menu"
            >
              
            </button>

            {/* Apple Dropdown Menu */}
            {appleMenuOpen && (
              <div
                onClick={() => setAppleMenuOpen(false)}
                className="fixed inset-0 z-50"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={`absolute top-7 left-2 w-56 rounded-xl p-1.5 shadow-2xl backdrop-blur-2xl text-xs space-y-0.5 animate-in fade-in duration-100 ${isLight
                      ? "border border-slate-300/80 bg-white/95 text-slate-800"
                      : "border border-white/15 bg-slate-900/95 text-slate-200"
                    }`}
                >
                  <button
                    onClick={() => {
                      onOpenApp("about");
                      setAppleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition ${isLight ? "hover:bg-cyan-500 hover:text-white" : "hover:bg-cyan-500 hover:text-white"
                      }`}
                  >
                    <Info className="h-3.5 w-3.5" /> About This Mac
                  </button>

                  <button
                    onClick={() => {
                      onToggleTheme?.();
                      setAppleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition ${isLight ? "hover:bg-cyan-500 hover:text-white" : "hover:bg-cyan-500 hover:text-white"
                      }`}
                  >
                    {isLight ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
                    <span>{isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
                  </button>

                  <button
                    onClick={() => {
                      onOpenSettings();
                      setAppleMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition ${isLight ? "hover:bg-cyan-500 hover:text-white" : "hover:bg-cyan-500 hover:text-white"
                      }`}
                  >
                    <Settings className="h-3.5 w-3.5" /> System Settings...
                  </button>

                  <div className={`border-t my-1 ${isLight ? "border-slate-200" : "border-white/10"}`} />

                  <button
                    onClick={() => window.location.reload()}
                    className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition ${isLight ? "hover:bg-red-500 hover:text-white" : "hover:bg-red-500 hover:text-white"
                      }`}
                  >
                    Restart Mac...
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="font-bold tracking-tight text-[13px]">{getActiveTitle()}</span>

          <div className="hidden sm:flex items-center gap-3 text-xs opacity-75">
            <button onClick={() => onOpenApp("projects")} className="hover:opacity-100 transition">
              File
            </button>
            <button onClick={() => onOpenApp("skills")} className="hover:opacity-100 transition">
              Edit
            </button>
            <button onClick={() => onOpenApp("resume")} className="hover:opacity-100 transition">
              View
            </button>
            <button onClick={() => onOpenApp("terminal")} className="hover:opacity-100 transition">
              Window
            </button>
            <button onClick={() => onOpenApp("about")} className="hover:opacity-100 transition">
              Help
            </button>
          </div>
        </div>

        {/* Right Side: Status Icons & Control Center */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => {
              setSpotlightOpen(!spotlightOpen);
              setControlCenterOpen(false);
              setAppleMenuOpen(false);
            }}
            className="flex items-center opacity-80 hover:opacity-100 transition"
            title="Spotlight Search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => {
              setControlCenterOpen(!controlCenterOpen);
              setSpotlightOpen(false);
              setAppleMenuOpen(false);
            }}
            className="flex items-center opacity-80 hover:opacity-100 transition"
            title="Control Center"
          >
            <Sliders className="h-3.5 w-3.5" />
          </button>

          <div className="hidden sm:flex items-center gap-2 opacity-80">
            <Wifi className="h-3.5 w-3.5" />
            <Battery className="h-3.5 w-3.5" />
          </div>

          <span className="font-medium text-[11px]">
            {currentTime || "Wed Sep 3 12:00 PM"}
          </span>
        </div>
      </header>

      {/* Spotlight Search Modal */}
      {spotlightOpen && (
        <div onClick={() => setSpotlightOpen(false)} className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30 backdrop-blur-xs">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-[90%] max-w-lg rounded-2xl p-3 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-150 ${isLight
                ? "border border-slate-300/80 bg-white/95 text-slate-800 shadow-slate-900/20"
                : "border border-white/20 bg-slate-900/95 text-white shadow-black/70"
              }`}
          >
            <div className={`flex items-center gap-3 px-3 py-1.5 border-b ${isLight ? "border-slate-200" : "border-white/10"}`}>
              <Search className="h-5 w-5 text-cyan-500" />
              <input
                type="text"
                placeholder="Spotlight Search (e.g., Projects, YouTube, Resume)..."
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                autoFocus
                className={`w-full bg-transparent text-sm outline-none ${isLight ? "text-slate-900 placeholder-slate-400" : "text-white placeholder-slate-500"
                  }`}
              />
            </div>
            <div className="py-2 space-y-1">
              {dockApps
                .filter((app) => app.name.toLowerCase().includes(spotlightQuery.toLowerCase()))
                .map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      setSpotlightOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs transition ${isLight ? "text-slate-800 hover:bg-cyan-500 hover:text-white" : "text-slate-200 hover:bg-cyan-500 hover:text-white"
                      }`}
                  >
                    {getDockIcon(app.id)}
                    <span className="font-medium">{app.name}</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Control Center Popover */}
      {controlCenterOpen && (
        <div onClick={() => setControlCenterOpen(false)} className="fixed inset-0 z-50">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute top-9 right-3 w-80 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-3 animate-in fade-in duration-150 ${isLight
                ? "border border-slate-300/80 bg-white/95 text-slate-800 shadow-slate-900/20"
                : "border border-white/15 bg-slate-900/95 text-white shadow-black/70"
              }`}
          >
            <div className={`flex items-center justify-between border-b pb-2 ${isLight ? "border-slate-200" : "border-white/10"}`}>
              <span className={`text-xs font-bold ${isLight ? "text-slate-800" : "text-white"}`}>Control Center</span>
              <button onClick={onOpenSettings} className="text-[11px] text-cyan-500 font-medium hover:underline">
                Preferences
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={`flex items-center gap-2.5 rounded-xl p-2.5 border transition ${wifiEnabled
                    ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-600 font-semibold"
                    : isLight
                      ? "bg-slate-100 border-slate-200 text-slate-500"
                      : "bg-white/5 border-white/5 text-slate-400"
                  }`}
              >
                <Wifi className="h-4 w-4" />
                <div className="text-left">
                  <p className={`text-xs font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>Wi-Fi</p>
                  <p className="text-[10px] text-slate-400">Rakib-5G</p>
                </div>
              </button>

              <button
                onClick={() => onToggleTheme?.()}
                className={`flex items-center gap-2.5 rounded-xl p-2.5 border transition ${isLight
                    ? "bg-amber-400/30 border-amber-400/50 text-amber-700 font-semibold"
                    : "bg-indigo-600/30 border-indigo-500/50 text-indigo-300 font-semibold"
                  }`}
              >
                {isLight ? <Sun className="h-4 w-4 text-amber-600" /> : <Moon className="h-4 w-4 text-indigo-400" />}
                <div className="text-left">
                  <p className={`text-xs font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>Appearance</p>
                  <p className="text-[10px] text-slate-400">{isLight ? "Light Mode" : "Dark Mode"}</p>
                </div>
              </button>
            </div>

            {/* Display Brightness Slider */}
            <div className={`rounded-xl p-2.5 border space-y-1.5 ${isLight ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/5"
              }`}>
              <div className={`flex items-center justify-between text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                <span className="flex items-center gap-1.5">
                  <Sun className="h-3.5 w-3.5 text-amber-500" /> Display
                </span>
                <span className="font-mono text-[11px]">{brightness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-amber-500 ${isLight ? "bg-slate-200" : "bg-slate-700"
                  }`}
              />
            </div>

            {/* Sound Volume Slider */}
            <div className={`rounded-xl p-2.5 border space-y-1.5 ${isLight ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/5"
              }`}>
              <div className={`flex items-center justify-between text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                <span className="flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5 text-cyan-500" /> Sound
                </span>
                <span className="font-mono text-[11px]">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${isLight ? "bg-slate-200" : "bg-slate-700"
                  }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* macOS Floating Magnifying Bottom Dock */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30">
        <div className={`flex items-center gap-2 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl ${isLight
            ? "border border-white/60 bg-white/40 shadow-slate-900/15"
            : "border border-white/20 bg-slate-900/70 shadow-black/60"
          }`}>
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
                className="group relative flex flex-col items-center justify-center rounded-xl p-2 transition-all duration-200 hover:-translate-y-2 hover:scale-115 active:scale-95"
                title={app.name}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-md border ${isLight
                    ? "bg-white/80 border-slate-200/80 shadow-slate-400/20"
                    : "bg-white/10 border-white/15 shadow-black/40"
                  }`}>
                  {getDockIcon(app.id)}
                </div>

                {/* macOS Running Dot */}
                {isRunning && (
                  <span
                    className={`absolute -bottom-1 h-1 w-1 rounded-full transition-all ${isActive ? "bg-cyan-500" : isLight ? "bg-slate-500" : "bg-white/70"
                      }`}
                  />
                )}
              </button>
            );
          })}

          <div className={`mx-1 h-8 w-[1px] ${isLight ? "bg-slate-300" : "bg-white/15"}`} />

          {secondaryDockApps.map((app) => {
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
                className="group relative flex flex-col items-center justify-center rounded-xl p-2 transition-all duration-200 hover:-translate-y-2 hover:scale-115 active:scale-95"
                title={app.name}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-md border ${isLight
                    ? "bg-white/80 border-slate-200/80 shadow-slate-400/20"
                    : "bg-white/10 border-white/15 shadow-black/40"
                  }`}>
                  {getDockIcon(app.id)}
                </div>

                {isRunning && (
                  <span
                    className={`absolute -bottom-1 h-1 w-1 rounded-full transition-all ${isActive ? "bg-cyan-500" : isLight ? "bg-slate-500" : "bg-white/70"
                      }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
