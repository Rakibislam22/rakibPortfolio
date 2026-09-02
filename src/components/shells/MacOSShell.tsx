"use client";

import React, { useState, useEffect } from "react";
import { AppId, WindowInstance } from "@/types/os";
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
  Bluetooth,
  Sun,
  Volume2
} from "lucide-react";

interface MacOSShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onOpenSettings: () => void;
}

export function MacOSShell({
  windows,
  activeWindowId,
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
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [brightness, setBrightness] = useState(90);
  const [volume, setVolume] = useState(80);

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
        return <FileText className="h-6 w-6 text-cyan-300" />;
      case "projects":
        return <FolderGit2 className="h-6 w-6 text-amber-300" />;
      case "skills":
        return <Cpu className="h-6 w-6 text-emerald-300" />;
      case "resume":
        return <GraduationCap className="h-6 w-6 text-purple-300" />;
      case "contact":
        return <Mail className="h-6 w-6 text-sky-300" />;
      case "terminal":
        return <Terminal className="h-6 w-6 text-emerald-300" />;
      case "youtube":
        return <PlaySquare className="h-6 w-6 text-rose-400" />;
      case "settings":
        return <Settings className="h-6 w-6 text-slate-300" />;
      case "trash":
        return <Trash2 className="h-6 w-6 text-rose-300" />;
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
      <header className="fixed top-0 left-0 right-0 z-30 flex h-7.5 items-center justify-between bg-slate-900/70 px-3 text-xs text-slate-200 backdrop-blur-2xl border-b border-white/10 select-none">
        {/* Left Side: Apple Logo & App Menus */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => {
                setAppleMenuOpen(!appleMenuOpen);
                setControlCenterOpen(false);
                setSpotlightOpen(false);
              }}
              className="flex items-center text-white hover:text-cyan-300 transition"
              title="Apple Menu"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.66-7.79-11.88-14.24-5.65-8.68-10.15-18.77-13.5-30.28-3.36-11.5-5.04-22.78-5.04-33.82 0-14.13 3.5-26.04 10.5-35.74 7-9.7 15.82-14.65 26.47-14.86 4.98.11 10.18 1.41 15.6 3.91 5.43 2.5 9.07 3.86 10.94 4.07 2.07-.21 6-1.63 11.8-4.27 5.8-2.63 11.08-3.87 15.86-3.71 8.8.43 16.32 3.69 22.56 9.78 6.23 6.09 10.42 13.58 12.56 22.48-7.93 4.89-12 11.74-12.21 20.55-.21 8.26 3.15 15.32 10.08 21.18 4.67 3.91 9.99 6.3 15.96 7.17-2.07 6.19-4.89 12.59-8.48 19.2zm-28.02-108.6c.11 3.59-1.09 7.39-3.6 11.41-2.51 4.02-6.08 7.33-10.72 9.94-1.3-4.35-1.42-8.58-.33-12.71 1.09-4.13 3.58-8.09 7.49-11.89 2.28-2.28 4.88-3.96 7.8-5.05 2.93-1.09 5.64-1.57 8.14-1.46.22 3.26-.04 6.52-.78 9.76z" />
              </svg>
            </button>

            {/* Apple Dropdown */}
            {appleMenuOpen && (
              <div onClick={() => setAppleMenuOpen(false)} className="fixed inset-0 z-50">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-7.5 left-2 w-56 rounded-xl border border-white/15 bg-slate-900/90 p-1.5 shadow-2xl backdrop-blur-2xl text-xs space-y-0.5 animate-in fade-in duration-100"
                >
                  <button
                    onClick={() => {
                      onOpenApp("about");
                      setAppleMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white"
                  >
                    <Info className="h-3.5 w-3.5" /> About This Portfolio
                  </button>
                  <button
                    onClick={() => {
                      onOpenSettings();
                      setAppleMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white"
                  >
                    <Settings className="h-3.5 w-3.5" /> System Settings...
                  </button>
                  <div className="border-t border-white/10 my-1" />
                  <button
                    onClick={() => {
                      onOpenApp("terminal");
                      setAppleMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white"
                  >
                    <Terminal className="h-3.5 w-3.5" /> Open Terminal
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-rose-300 hover:bg-rose-500 hover:text-white"
                  >
                    Restart Portfolio...
                  </button>
                </div>
              </div>
            )}
          </div>

          <span className="font-bold text-white text-xs">{getActiveTitle()}</span>

          <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-300">
            <button onClick={() => onOpenApp("projects")} className="hover:text-white transition">
              Projects
            </button>
            <button onClick={() => onOpenApp("skills")} className="hover:text-white transition">
              Skills
            </button>
            <button onClick={() => onOpenApp("resume")} className="hover:text-white transition">
              Resume
            </button>
            <button onClick={() => onOpenApp("contact")} className="hover:text-white transition">
              Contact
            </button>
          </div>
        </div>

        {/* Right Side: Status Items & Clock */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => {
              setSpotlightOpen(!spotlightOpen);
              setControlCenterOpen(false);
              setAppleMenuOpen(false);
            }}
            className="flex items-center text-slate-300 hover:text-white transition"
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
            className="flex items-center text-slate-300 hover:text-white transition"
            title="Control Center"
          >
            <Sliders className="h-3.5 w-3.5" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <Wifi className="h-3.5 w-3.5 text-slate-300" />
            <Battery className="h-3.5 w-3.5 text-slate-300" />
          </div>

          <span className="font-medium text-slate-200 text-[11px]">
            {currentTime || "Wed Sep 2 12:00 PM"}
          </span>
        </div>
      </header>

      {/* Spotlight Search Modal */}
      {spotlightOpen && (
        <div onClick={() => setSpotlightOpen(false)} className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30 backdrop-blur-xs">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[90%] max-w-lg rounded-2xl border border-white/20 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-150"
          >
            <div className="flex items-center gap-3 px-3 py-1.5 border-b border-white/10">
              <Search className="h-5 w-5 text-cyan-400" />
              <input
                type="text"
                placeholder="Spotlight Search (e.g., Projects, Resume, Terminal)..."
                value={spotlightQuery}
                onChange={(e) => setSpotlightQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none"
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
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs text-slate-200 hover:bg-cyan-500 hover:text-white transition"
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
            className="absolute top-9 right-3 w-80 rounded-2xl border border-white/15 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl space-y-3 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold text-white">Control Center</span>
              <button onClick={onOpenSettings} className="text-[11px] text-cyan-400 hover:underline">
                Preferences
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={`flex items-center gap-2.5 rounded-xl p-2.5 border transition ${wifiEnabled
                  ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                  : "bg-white/5 border-white/5 text-slate-400"
                  }`}
              >
                <Wifi className="h-4 w-4" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Wi-Fi</p>
                  <p className="text-[10px] text-slate-400">Rakib-5G</p>
                </div>
              </button>

              <button
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                className={`flex items-center gap-2.5 rounded-xl p-2.5 border transition ${bluetoothEnabled
                  ? "bg-cyan-500/20 border-cyan-400/40 text-cyan-300"
                  : "bg-white/5 border-white/5 text-slate-400"
                  }`}
              >
                <Bluetooth className="h-4 w-4" />
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Bluetooth</p>
                  <p className="text-[10px] text-slate-400">Connected</p>
                </div>
              </button>
            </div>

            {/* Display Brightness Slider */}
            <div className="rounded-xl bg-white/5 p-2.5 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Sun className="h-3.5 w-3.5 text-amber-300" /> Display
                </span>
                <span className="font-mono text-[11px]">{brightness}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Sound Volume Slider */}
            <div className="rounded-xl bg-white/5 p-2.5 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5 text-cyan-400" /> Sound
                </span>
                <span className="font-mono text-[11px]">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* macOS Floating Magnifying Bottom Dock */}
      <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-900/70 p-2 shadow-2xl backdrop-blur-2xl">
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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 shadow-md">
                  {getDockIcon(app.id)}
                </div>

                {isRunning && (
                  <span
                    className={`absolute -bottom-1 h-1 w-1 rounded-full ${isActive ? "bg-white shadow-[0_0_6px_#fff]" : "bg-slate-400"
                      }`}
                  />
                )}
              </button>
            );
          })}

          {/* Dock Separator */}
          <div className="h-8 w-px bg-white/20 mx-1" />

          {secondaryDockApps.map((app) => {
            const win = windows[app.id];
            const isRunning = win?.isOpen;

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
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 shadow-md">
                  {getDockIcon(app.id)}
                </div>

                {isRunning && (
                  <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-slate-400" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
