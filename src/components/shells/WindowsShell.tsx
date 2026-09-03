"use client";

import React, { useState, useEffect } from "react";
import { AppId, ThemeMode, WindowInstance } from "@/types/os";
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
  Sun,
  Calendar as CalendarIcon
} from "lucide-react";

interface WindowsShellProps {
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenApp: (id: AppId) => void;
  onToggleMinimize: (id: AppId) => void;
  onOpenSettings: () => void;
}

export function WindowsShell({
  windows,
  activeWindowId,
  themeMode = "dark",
  onToggleTheme,
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
  const [volume, setVolume] = useState(85);

  const isLight = themeMode === "light";

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
        return <FileText className="h-5 w-5 text-cyan-500" />;
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
        return <Settings className="h-5 w-5 text-slate-500" />;
      case "trash":
        return <Trash2 className="h-5 w-5 text-rose-500" />;
    }
  };

  const pinnedApps: { id: AppId; name: string; icon: React.ReactNode }[] = [
    { id: "about", name: "About Me", icon: <FileText className="h-6 w-6 text-cyan-500" /> },
    { id: "projects", name: "Projects", icon: <FolderGit2 className="h-6 w-6 text-amber-500" /> },
    { id: "skills", name: "Skills", icon: <Cpu className="h-6 w-6 text-emerald-500" /> },
    { id: "resume", name: "Resume", icon: <GraduationCap className="h-6 w-6 text-purple-500" /> },
    { id: "youtube", name: "YouTube", icon: <PlaySquare className="h-6 w-6 text-rose-500" /> },
    { id: "terminal", name: "Terminal", icon: <Terminal className="h-6 w-6 text-emerald-500" /> },
    { id: "contact", name: "Contact", icon: <Mail className="h-6 w-6 text-sky-500" /> },
    { id: "settings", name: "Settings", icon: <Settings className="h-6 w-6 text-slate-500" /> },
    { id: "trash", name: "Recycle Bin", icon: <Trash2 className="h-6 w-6 text-rose-500" /> }
  ];

  const filteredPinned = pinnedApps.filter((app) =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Windows 11 Start Menu Popover */}
      {startOpen && (
        <div
          onClick={() => setStartOpen(false)}
          className="fixed inset-0 z-40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`absolute bottom-14 left-1/2 -translate-x-1/2 w-[92vw] max-w-lg rounded-2xl p-5 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-4 duration-200 ${
              isLight
                ? "border border-slate-300/80 bg-white/90 text-slate-800 shadow-slate-900/15"
                : "border border-white/15 bg-slate-900/95 text-white shadow-black/60"
            }`}
          >
            {/* Search Bar */}
            <div className="relative mb-5">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search for apps, settings, and documents"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-full border pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500/60 ${
                  isLight
                    ? "border-slate-300 bg-slate-100 text-slate-900 placeholder-slate-400"
                    : "border-white/10 bg-black/40 text-white placeholder-slate-400"
                }`}
                autoFocus
              />
            </div>

            {/* Pinned Apps Header */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className={`text-xs font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>
                Pinned Apps
              </span>
              <button
                onClick={onToggleTheme}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-medium transition ${
                  isLight
                    ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    : "bg-white/10 text-slate-300 hover:bg-white/15"
                }`}
              >
                {isLight ? <Moon className="h-3 w-3 text-indigo-500" /> : <Sun className="h-3 w-3 text-amber-400" />}
                <span>{isLight ? "Dark Mode" : "Light Mode"}</span>
              </button>
            </div>

            {/* Pinned Apps Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mb-6">
              {filteredPinned.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    onOpenApp(app.id);
                    setStartOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center rounded-xl p-3 transition group ${
                    isLight ? "hover:bg-slate-100" : "hover:bg-white/10"
                  }`}
                >
                  <div className="mb-1.5 group-hover:scale-110 transition duration-150">
                    {app.icon}
                  </div>
                  <span className={`text-[11px] font-medium text-center truncate w-full ${
                    isLight ? "text-slate-700" : "text-slate-200"
                  }`}>
                    {app.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Recommended / Highlights */}
            <div className="mb-5 px-1">
              <span className={`text-xs font-semibold block mb-2.5 ${isLight ? "text-slate-800" : "text-white"}`}>
                Quick Shortcuts
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenApp("projects");
                    setStartOpen(false);
                  }}
                  className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition ${
                    isLight ? "bg-slate-100 hover:bg-slate-200" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <FolderGit2 className="h-4 w-4 text-amber-500" />
                  <div className="overflow-hidden">
                    <p className={`text-xs font-medium truncate ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                      6 Real Projects
                    </p>
                    <p className="text-[10px] text-slate-400">ConvoX, ScholarStream...</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onOpenApp("resume");
                    setStartOpen(false);
                  }}
                  className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition ${
                    isLight ? "bg-slate-100 hover:bg-slate-200" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <GraduationCap className="h-4 w-4 text-purple-500" />
                  <div className="overflow-hidden">
                    <p className={`text-xs font-medium truncate ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                      Resume &amp; PDF
                    </p>
                    <p className="text-[10px] text-slate-400">Download CV</p>
                  </div>
                </button>
              </div>
            </div>

            {/* User Profile Bar at Bottom */}
            <div className={`flex items-center justify-between border-t pt-3 px-1 ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}>
              <div
                onClick={() => {
                  onOpenApp("about");
                  setStartOpen(false);
                }}
                className={`flex items-center gap-2.5 rounded-xl p-1.5 transition cursor-pointer ${
                  isLight ? "hover:bg-slate-100" : "hover:bg-white/10"
                }`}
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
                  RA
                </div>
                <div>
                  <p className={`text-xs font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>
                    {portfolioData.name}
                  </p>
                  <p className="text-[10px] text-slate-400">{portfolioData.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    onOpenSettings();
                    setStartOpen(false);
                  }}
                  className={`rounded-lg p-2 transition ${
                    isLight ? "text-slate-600 hover:bg-slate-100" : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-500 transition"
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
            className={`absolute bottom-14 right-3 w-80 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-4 animate-in slide-in-from-bottom-3 duration-150 ${
              isLight
                ? "border border-slate-300/80 bg-white/95 text-slate-800 shadow-slate-900/20"
                : "border border-white/15 bg-slate-900/95 text-white shadow-black/60"
            }`}
          >
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setWifiEnabled(!wifiEnabled)}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition ${
                  wifiEnabled
                    ? "bg-cyan-500 text-slate-950 font-semibold"
                    : isLight
                      ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                <Wifi className="h-5 w-5 mb-1" />
                <span className="text-[10px]">Wi-Fi</span>
              </button>

              <button
                onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition ${
                  bluetoothEnabled
                    ? "bg-cyan-500 text-slate-950 font-semibold"
                    : isLight
                      ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                }`}
              >
                <Bluetooth className="h-5 w-5 mb-1" />
                <span className="text-[10px]">Bluetooth</span>
              </button>

              <button
                onClick={() => onToggleTheme?.()}
                className={`flex flex-col items-center justify-center rounded-xl p-3 text-center transition ${
                  isLight
                    ? "bg-amber-400 text-slate-950 font-semibold shadow-sm"
                    : "bg-indigo-600 text-white font-semibold"
                }`}
              >
                {isLight ? <Sun className="h-5 w-5 mb-1" /> : <Moon className="h-5 w-5 mb-1" />}
                <span className="text-[10px]">{isLight ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>

            {/* Volume Slider */}
            <div className="space-y-1.5 pt-1">
              <div className={`flex items-center justify-between text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                <span className="flex items-center gap-1.5">
                  <Volume2 className="h-3.5 w-3.5 text-cyan-500" /> Volume
                </span>
                <span className="font-mono text-[11px]">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-cyan-500 ${
                  isLight ? "bg-slate-200" : "bg-slate-700"
                }`}
              />
            </div>

            {/* Bottom Status & Settings Link */}
            <div className={`flex items-center justify-between border-t pt-2.5 text-xs ${
              isLight ? "border-slate-200 text-slate-500" : "border-white/10 text-slate-400"
            }`}>
              <span className="flex items-center gap-1">
                <Battery className="h-3.5 w-3.5 text-emerald-500" /> 100% Battery
              </span>
              <button
                onClick={() => {
                  onOpenSettings();
                  setQuickSettingsOpen(false);
                }}
                className="text-cyan-500 hover:underline text-[11px] font-medium"
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
            className={`absolute bottom-14 right-3 w-72 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl space-y-3 animate-in slide-in-from-bottom-3 duration-150 ${
              isLight
                ? "border border-slate-300/80 bg-white/95 text-slate-800 shadow-slate-900/20"
                : "border border-white/15 bg-slate-900/95 text-white shadow-black/60"
            }`}
          >
            <div className={`border-b pb-2 flex items-center justify-between ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}>
              <span className={`text-sm font-bold ${isLight ? "text-slate-800" : "text-white"}`}>{currentTime}</span>
              <span className="text-xs text-cyan-500 font-semibold">{currentDate}</span>
            </div>
            <div className="text-xs space-y-1">
              <p className={`font-semibold flex items-center gap-1.5 ${isLight ? "text-slate-800" : "text-white"}`}>
                <CalendarIcon className="h-3.5 w-3.5 text-cyan-500" /> Today&apos;s Focus
              </p>
              <p className={`text-[11px] ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                • Reviewing full stack opportunities &amp; portfolio projects.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Windows 11 Taskbar */}
      <footer className={`fixed bottom-0 left-0 right-0 z-30 flex h-12 items-center justify-between px-3 backdrop-blur-2xl select-none ${
        isLight
          ? "border-t border-slate-200/90 bg-white/80 text-slate-800 shadow-lg"
          : "border-t border-white/10 bg-slate-950/80 text-slate-200 shadow-2xl"
      }`}>
        {/* Left Spacer / OS Badge */}
        <div className={`hidden sm:flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs border ${
          isLight
            ? "bg-slate-100 border-slate-200 text-slate-700"
            : "bg-white/5 border-white/5 text-slate-300"
        }`}>
          <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
          <span className="text-[11px] font-medium">Windows 11 Pro</span>
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
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              startOpen
                ? "bg-cyan-500/20 text-cyan-500 border border-cyan-500/40"
                : isLight
                  ? "hover:bg-slate-200/70 text-cyan-600"
                  : "hover:bg-white/10 text-cyan-400"
            }`}
            title="Start"
          >
            {/* Windows 11 4-square logo */}
            <div className="grid grid-cols-2 gap-0.5">
              <div className="h-2 w-2 rounded-[1px] bg-cyan-500" />
              <div className="h-2 w-2 rounded-[1px] bg-cyan-500" />
              <div className="h-2 w-2 rounded-[1px] bg-cyan-500" />
              <div className="h-2 w-2 rounded-[1px] bg-cyan-500" />
            </div>
          </button>

          {/* Search Button */}
          <button
            onClick={() => setStartOpen(true)}
            className={`hidden sm:flex h-9 w-9 items-center justify-center rounded-lg transition ${
              isLight
                ? "text-slate-600 hover:bg-slate-200/70"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
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
                className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition ${
                  isActive
                    ? isLight
                      ? "bg-slate-200 text-slate-900 shadow-xs"
                      : "bg-white/15 text-white"
                    : isRunning
                      ? isLight
                        ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                      : isLight
                        ? "text-slate-600 hover:bg-slate-100"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
                title={win.title}
              >
                {getAppIcon(appId)}
                {/* Windows 11 Running Underline Pill */}
                {isRunning && (
                  <span
                    className={`absolute bottom-0.5 h-0.5 rounded-full transition-all ${
                      isActive ? "w-4 bg-cyan-500" : isLight ? "w-1.5 bg-slate-400" : "w-1.5 bg-slate-500"
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
            className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition ${
              isLight ? "hover:bg-slate-200/70 text-slate-700" : "hover:bg-white/10 text-slate-300"
            }`}
            title="Quick Settings"
          >
            <Wifi className="h-3.5 w-3.5" />
            <Volume2 className="h-3.5 w-3.5" />
            <Battery className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => {
              setCalendarOpen(!calendarOpen);
              setQuickSettingsOpen(false);
              setStartOpen(false);
            }}
            className={`flex flex-col items-end rounded-lg px-2 py-1 text-right text-xs transition ${
              isLight ? "hover:bg-slate-200/70" : "hover:bg-white/10"
            }`}
          >
            <span className={`font-semibold text-[11px] leading-tight font-mono ${
              isLight ? "text-slate-800" : "text-slate-200"
            }`}>
              {currentTime || "12:00 PM"}
            </span>
            <span className={`text-[10px] leading-tight ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              {currentDate || "9/3/2026"}
            </span>
          </button>
        </div>
      </footer>
    </>
  );
}
