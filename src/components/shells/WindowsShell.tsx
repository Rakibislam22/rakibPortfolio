"use client";

import React, { useState, useEffect } from "react";
import { AppId, WindowInstance } from "@/types/os";
import { portfolioData } from "@/data/portfolioData";
import {
  Search,
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
  Power,
  Sparkles,
  Bluetooth,
  Moon,
  Calendar as CalendarIcon
} from "lucide-react";

interface WindowsShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onOpenSettings: () => void;
}

export function WindowsShell({
  windows,
  activeWindowId,
  onOpenApp,
  onToggleMinimize,
  onOpenSettings
}: WindowsShellProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [nightLightEnabled, setNightLightEnabled] = useState(false);
  const [volume, setVolume] = useState(85);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setCurrentDate(
        now.toLocaleDateString([], { month: "numeric", day: "numeric", year: "numeric" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAppIcon = (id: AppId) => {
    switch (id) {
      case "about":
        return <FileText className="h-5 w-5 text-cyan-400" />;
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

  const pinnedApps: { id: AppId; name: string; icon: React.ReactNode }[] = [
    { id: "about", name: "About Me", icon: <FileText className="h-6 w-6 text-cyan-400" /> },
    { id: "projects", name: "Projects", icon: <FolderGit2 className="h-6 w-6 text-amber-400" /> },
    { id: "skills", name: "Skills", icon: <Cpu className="h-6 w-6 text-emerald-400" /> },
    { id: "resume", name: "Resume", icon: <GraduationCap className="h-6 w-6 text-purple-400" /> },
    { id: "youtube", name: "YouTube", icon: <PlaySquare className="h-6 w-6 text-rose-500" /> },
    { id: "terminal", name: "Terminal", icon: <Terminal className="h-6 w-6 text-emerald-400" /> },
    { id: "contact", name: "Contact", icon: <Mail className="h-6 w-6 text-sky-400" /> },
    { id: "settings", name: "Settings", icon: <Settings className="h-6 w-6 text-slate-300" /> },
    { id: "trash", name: "Recycle Bin", icon: <Trash2 className="h-6 w-6 text-rose-400" /> }
  ];

  const filteredPinned = pinnedApps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Windows 11 Start Menu Modal */}
      {startOpen && (
        <div onClick={() => setStartOpen(false)} className="fixed inset-0 z-40">
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[92%] max-w-lg rounded-2xl border border-white/15 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-200"
          >
            {/* Search Box */}
            <div className="relative mb-5">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Type here to search apps and portfolio files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="h-10 w-full rounded-xl border border-white/10 bg-black/40 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none"
              />
            </div>

            {/* Pinned Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-white">Pinned Apps</span>
                <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                  All apps
                </span>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {filteredPinned.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => {
                      onOpenApp(app.id);
                      setStartOpen(false);
                    }}
                    className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition hover:bg-white/10"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm">
                      {app.icon}
                    </div>
                    <span className="text-[11px] font-medium text-slate-200 truncate w-full">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Section */}
            <div className="border-t border-white/10 pt-4 mb-4">
              <span className="text-xs font-semibold text-white block mb-2.5">
                Recommended / Quick Links
              </span>
              <div className="grid grid-cols-2 gap-2">
                {portfolioData.projects.slice(0, 2).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onOpenApp("projects");
                      setStartOpen(false);
                    }}
                    className="flex items-center gap-2.5 rounded-lg p-2 text-left hover:bg-white/5 transition"
                  >
                    <FolderGit2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-medium text-white truncate">{p.title}</p>
                      <p className="text-[10px] text-slate-400 truncate">{p.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* User Bar */}
            <div className="flex items-center justify-between border-t border-white/10 pt-3 -mb-2">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 text-slate-950 font-bold text-xs">
                  RI
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{portfolioData.name}</p>
                  <p className="text-[10px] text-emerald-400">● Administrator</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    onOpenSettings();
                    setStartOpen(false);
                  }}
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition"
                  title="Restart Session"
                >
                  <Power className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Windows 11 Quick Settings Flyout */}
      {quickSettingsOpen && (
        <div onClick={() => setQuickSettingsOpen(false)} className="fixed inset-0 z-40">
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-14 right-3 w-80 rounded-2xl border border-white/15 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl space-y-4 animate-in slide-in-from-bottom-3 duration-150"
          >
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition ${wifiEnabled
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
              >
                <Wifi className="h-5 w-5 mb-1" />
                <span className="text-[10px]">Wi-Fi</span>
              </button>

              <button
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition ${bluetoothEnabled
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
              >
                <Bluetooth className="h-5 w-5 mb-1" />
                <span className="text-[10px]">Bluetooth</span>
              </button>

              <button
                onClick={() => setNightLightEnabled(!nightLightEnabled)}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition ${nightLightEnabled
                  ? "bg-cyan-500 text-slate-950 font-semibold"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
              >
                <Moon className="h-5 w-5 mb-1" />
                <span className="text-[10px]">Night Light</span>
              </button>
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5 text-cyan-400" /> Volume
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

            {/* Bottom Status & Settings Link */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Battery className="h-3.5 w-3.5 text-emerald-400" /> 100% Available
              </span>
              <button
                onClick={() => {
                  onOpenSettings();
                  setQuickSettingsOpen(false);
                }}
                className="text-cyan-400 hover:underline text-[11px]"
              >
                All Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Windows 11 Calendar Flyout */}
      {calendarOpen && (
        <div onClick={() => setCalendarOpen(false)} className="fixed inset-0 z-40">
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-14 right-3 w-72 rounded-2xl border border-white/15 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl space-y-3 animate-in slide-in-from-bottom-3 duration-150"
          >
            <div className="border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-sm font-bold text-white">{currentTime}</span>
              <span className="text-xs text-cyan-400">{currentDate}</span>
            </div>
            <div className="text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5 text-cyan-400" /> Today&apos;s Focus
              </p>
              <p className="text-[11px] text-slate-400">
                • Reviewing full stack opportunities &amp; portfolio projects.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Windows 11 Taskbar */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 flex h-12 items-center justify-between border-t border-white/10 bg-slate-950/80 px-3 backdrop-blur-2xl select-none">
        {/* Left Spacer / Weather Widget */}
        <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-300 border border-white/5">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[11px]">RakibOS 11 Pro</span>
        </div>

        {/* Center: Start Button & App Icons */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          {/* Windows Start Button */}
          <button
            onClick={() => {
              setStartOpen(!startOpen);
              setQuickSettingsOpen(false);
              setCalendarOpen(false);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${startOpen
              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/40"
              : "hover:bg-white/10 text-cyan-400"
              }`}
            title="Start"
          >
            {/* Windows 11 4-square logo */}
            <div className="grid grid-cols-2 gap-0.5">
              <div className="h-2 w-2 rounded-[1px] bg-cyan-400" />
              <div className="h-2 w-2 rounded-[1px] bg-cyan-400" />
              <div className="h-2 w-2 rounded-[1px] bg-cyan-400" />
              <div className="h-2 w-2 rounded-[1px] bg-cyan-400" />
            </div>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setStartOpen(true)}
            className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition"
            title="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Running / Pinned App Buttons */}
          {(Object.keys(windows) as AppId[]).map((appId) => {
            const win = windows[appId];
            const isRunning = win.isOpen;
            const isActive = activeWindowId === appId && isRunning && !win.isMinimized;

            return (
              <button
                key={appId}
                onClick={() => {
                  if (!isRunning) {
                    onOpenApp(appId);
                  } else {
                    onToggleMinimize(appId);
                  }
                }}
                className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition ${isActive
                  ? "bg-white/15 text-white"
                  : isRunning
                    ? "bg-white/5 text-slate-300 hover:bg-white/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                title={win.title}
              >
                {getAppIcon(appId)}
                {/* Windows 11 Running Underline Pill */}
                {isRunning && (
                  <span
                    className={`absolute bottom-0.5 h-0.5 rounded-full transition-all ${isActive ? "w-4 bg-cyan-400" : "w-1.5 bg-slate-500"
                      }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: System Tray & Clock */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              setQuickSettingsOpen(!quickSettingsOpen);
              setCalendarOpen(false);
              setStartOpen(false);
            }}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 hover:bg-white/10 text-slate-300 transition"
            title="Quick Settings"
          >
            <Wifi className="h-3.5 w-3.5 text-slate-300" />
            <Volume2 className="h-3.5 w-3.5 text-slate-300" />
            <Battery className="h-3.5 w-3.5 text-slate-300" />
          </button>

          <button
            onClick={() => {
              setCalendarOpen(!calendarOpen);
              setQuickSettingsOpen(false);
              setStartOpen(false);
            }}
            className="flex flex-col items-end rounded-lg px-2 py-1 text-right text-xs hover:bg-white/10 transition"
          >
            <span className="font-semibold text-slate-200 text-[11px] leading-tight font-mono">
              {currentTime || "12:00 PM"}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">
              {currentDate || "9/2/2026"}
            </span>
          </button>
        </div>
      </footer>
    </>
  );
}
