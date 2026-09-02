"use client";

import React from "react";
import { OSType } from "@/types/os";
import { portfolioData } from "@/data/portfolioData";
import {
  Settings,
  Image as ImageIcon,
  Check,
  Info,
  Monitor,
  ShieldCheck
} from "lucide-react";

interface SettingsAppProps {
  currentOS: OSType;
  onSelectOS?: (os: OSType) => void;
  currentWallpaper: string;
  onSelectWallpaper: (bgClass: string) => void;
}

export function SettingsApp({
  currentOS,
  currentWallpaper,
  onSelectWallpaper
}: SettingsAppProps) {
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
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <Settings className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">System Preferences & Settings</span>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Active Device OS Card */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-cyan-950/30 p-5 backdrop-blur-sm space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
              <Monitor className="h-4 w-4" /> Detected Device Environment
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
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
              <h3 className="text-base font-bold text-white">
                {getOSDisplayName(currentOS)}
              </h3>
              <p className="text-xs text-slate-400">
                Native shell adapted automatically to your operating system.
              </p>
            </div>
          </div>
        </div>

        {/* Wallpaper Picker Section */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            <ImageIcon className="h-4 w-4" /> Desktop Wallpaper & Background
          </div>
          <p className="text-xs text-slate-400">
            Personalize your workspace background gradient.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {portfolioData.wallpapers.map((wp) => (
              <button
                key={wp.id}
                onClick={() => onSelectWallpaper(wp.bgClass)}
                className={`group relative overflow-hidden rounded-xl border p-2 text-left transition ${currentWallpaper === wp.bgClass
                    ? "border-cyan-400/60 ring-2 ring-cyan-500/20"
                    : "border-white/10 hover:border-white/20"
                  }`}
              >
                <div
                  className={`h-20 w-full rounded-lg ${wp.thumbnail} flex items-center justify-center`}
                >
                  {currentWallpaper === wp.bgClass && (
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-md">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs font-medium text-slate-200 truncate">
                  {wp.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* System Info */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
            <Info className="h-4 w-4" /> System Specifications
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div>
              <span className="text-slate-500 block text-[11px]">Developer</span>
              <span className="font-semibold text-white">{portfolioData.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Architecture</span>
              <span>Next.js 16 + React 19 + Tailwind v4</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">OS Engine</span>
              <span>Hardware-Accelerated Window Manager</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Active Profile</span>
              <span className="text-cyan-300 font-semibold">{getOSDisplayName(currentOS)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
