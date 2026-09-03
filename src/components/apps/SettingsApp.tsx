"use client";

import React from "react";
import { OSType, ThemeMode } from "@/types/os";
import { portfolioData } from "@/data/portfolioData";
import {
  Settings,
  Image as ImageIcon,
  Check,
  Info,
  Monitor,
  ShieldCheck,
  Sun,
  Moon
} from "lucide-react";

interface SettingsAppProps {
  currentOS: OSType;
  onSelectOS?: (os: OSType) => void;
  currentTheme?: ThemeMode;
  onSelectTheme?: (theme: ThemeMode) => void;
  currentWallpaper: string;
  onSelectWallpaper: (bgClass: string) => void;
}

export function SettingsApp({
  currentOS,
  currentTheme = "dark",
  onSelectTheme,
  currentWallpaper,
  onSelectWallpaper
}: SettingsAppProps) {
  const isLight = currentTheme === "light";

  const getOSDisplayName = (os: OSType) => {
    switch (os) {
      case "windows":
        return "Windows 11 Pro";
      case "macos":
        return "macOS Sequoia";
      case "ios":
        return "Apple iOS 18 (Mobile)";
      case "android":
        return "Android 15 Material You";
      case "ubuntu":
        return "Ubuntu 24.04 LTS";
    }
  };

  return (
    <div className={`flex h-full flex-col selection:bg-cyan-500/30 ${
      isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
    }`}>
      {/* Top Header */}
      <div className={`flex items-center justify-between px-4 py-2.5 backdrop-blur-md border-b ${
        isLight ? "border-slate-200 bg-white/80" : "border-white/10 bg-slate-900/80"
      }`}>
        <div className="flex items-center gap-2 text-xs">
          <Settings className="h-4 w-4 text-cyan-500" />
          <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
            System Preferences & Settings
          </span>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Active Device OS Card */}
        <div className={`rounded-2xl p-5 backdrop-blur-sm space-y-3 shadow-lg border ${
          isLight
            ? "border-cyan-200 bg-gradient-to-r from-white via-cyan-50/40 to-sky-50/60"
            : "border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/30"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600">
              <Monitor className="h-4 w-4" /> Detected Device Environment
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 border border-emerald-500/20">
              <ShieldCheck className="h-3 w-3" /> Auto-Detected
            </span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <span className="text-3xl">
              {currentOS === "windows"
                ? "🪟"
                : currentOS === "macos"
                  ? "🍎"
                  : currentOS === "ios"
                    ? "📱"
                    : currentOS === "android"
                      ? "🤖"
                      : "🐧"}
            </span>
            <div>
              <h3 className={`text-base font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                {getOSDisplayName(currentOS)}
              </h3>
              <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Native shell adapted automatically to your operating system.
              </p>
            </div>
          </div>
        </div>

        {/* Theme Mode Selector Card */}
        <div className={`rounded-2xl p-5 backdrop-blur-sm space-y-4 border ${
          isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/60"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600">
              <Sun className="h-4 w-4" /> Appearance Theme
            </div>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isLight ? "bg-amber-100 text-amber-800" : "bg-indigo-950 text-indigo-300"
            }`}>
              Active: {currentTheme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </div>
          <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Choose your preferred interface theme across all windows and controls.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {/* Dark Theme Option */}
            <button
              onClick={() => onSelectTheme?.("dark")}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 border transition text-left ${
                currentTheme === "dark"
                  ? "border-cyan-400 bg-cyan-500/10 ring-2 ring-cyan-500/30"
                  : isLight
                    ? "border-slate-200 bg-slate-100 hover:border-slate-300"
                    : "border-white/10 bg-slate-950/60 hover:border-white/20"
              }`}
            >
              <div className="w-full h-16 rounded-lg bg-gradient-to-tr from-slate-900 via-slate-950 to-black border border-white/10 flex items-center justify-center">
                <Moon className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="w-full flex items-center justify-between">
                <span className={`text-xs font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>
                  Dark Mode
                </span>
                {currentTheme === "dark" && (
                  <Check className="h-4 w-4 text-cyan-400 stroke-[3]" />
                )}
              </div>
            </button>

            {/* Light Theme Option */}
            <button
              onClick={() => onSelectTheme?.("light")}
              className={`flex flex-col items-center gap-2 rounded-xl p-3 border transition text-left ${
                currentTheme === "light"
                  ? "border-cyan-500 bg-cyan-500/10 ring-2 ring-cyan-500/30"
                  : isLight
                    ? "border-slate-200 bg-slate-100 hover:border-slate-300"
                    : "border-white/10 bg-slate-950/60 hover:border-white/20"
              }`}
            >
              <div className="w-full h-16 rounded-lg bg-gradient-to-tr from-sky-100 via-slate-100 to-amber-50 border border-slate-300 flex items-center justify-center">
                <Sun className="h-6 w-6 text-amber-500" />
              </div>
              <div className="w-full flex items-center justify-between">
                <span className={`text-xs font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>
                  Light Mode
                </span>
                {currentTheme === "light" && (
                  <Check className="h-4 w-4 text-cyan-600 stroke-[3]" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Wallpaper Picker Section */}
        <div className={`rounded-2xl p-5 backdrop-blur-sm space-y-4 border ${
          isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/60"
        }`}>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600">
            <ImageIcon className="h-4 w-4" /> Desktop Wallpaper &amp; Background
          </div>
          <p className={`text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Personalize your workspace background gradient.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {portfolioData.wallpapers.map((wp) => (
              <button
                key={wp.id}
                onClick={() => onSelectWallpaper(wp.bgClass)}
                className={`group relative overflow-hidden rounded-xl border p-2 text-left transition ${
                  currentWallpaper === wp.bgClass
                    ? "border-cyan-500/80 ring-2 ring-cyan-500/20 shadow-md"
                    : isLight
                      ? "border-slate-200 bg-slate-50/50 hover:border-slate-300"
                      : "border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className={`h-20 w-full rounded-lg ${wp.thumbnail} flex items-center justify-center border ${
                    isLight ? "border-slate-300" : "border-white/10"
                  }`}
                >
                  {currentWallpaper === wp.bgClass && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-md">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <p className={`text-xs font-medium truncate ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                    {wp.name}
                  </p>
                  {wp.mode && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      wp.mode === "light"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-slate-800 text-slate-300"
                    }`}>
                      {wp.mode}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className={`rounded-2xl p-5 backdrop-blur-sm border ${
          isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/60"
        }`}>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-600 mb-3">
            <Info className="h-4 w-4" /> System Specifications
          </div>
          <div className={`grid grid-cols-2 gap-3 text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
            <div>
              <span className="text-slate-400 block text-[11px]">Developer</span>
              <span className={`font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                {portfolioData.name}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Architecture</span>
              <span>Next.js 16 + React 19 + Tailwind v4</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Theme Engine</span>
              <span>Dynamic Light &amp; Dark Multi-OS Shells</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Status</span>
              <span className="text-emerald-500 font-semibold">Production Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
