"use client";

import React, { useEffect, useRef } from "react";
import { OSType, ThemeMode } from "@/types/os";
import {
  RefreshCw,
  Image as ImageIcon,
  Terminal,
  Info,
  Sun,
  Moon
} from "lucide-react";
import { GithubIcon } from "../common/BrandIcons";

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  currentOS: OSType;
  themeMode?: ThemeMode;
  onToggleTheme?: () => void;
  onClose: () => void;
  onRefresh: () => void;
  onOpenSettings: () => void;
  onOpenTerminal: () => void;
  onOpenAbout: () => void;
  onSwitchOS?: (os: OSType) => void;
}

export function ContextMenu({
  x,
  y,
  isOpen,
  themeMode = "dark",
  onToggleTheme,
  onClose,
  onRefresh,
  onOpenSettings,
  onOpenTerminal,
  onOpenAbout
}: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Ensure menu doesn't overflow viewport boundaries
  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 240);

  const isLight = themeMode === "light";

  return (
    <div
      ref={menuRef}
      style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
      className={`fixed z-50 w-52 rounded-xl p-1.5 shadow-2xl backdrop-blur-2xl text-xs space-y-0.5 animate-in fade-in duration-100 select-none ${
        isLight
          ? "border border-slate-300/80 bg-white/90 text-slate-800 shadow-slate-900/10"
          : "border border-white/15 bg-slate-900/90 text-slate-200 shadow-black/50"
      }`}
    >
      {onToggleTheme && (
        <button
          onClick={() => {
            onToggleTheme();
            onClose();
          }}
          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left font-medium transition ${
            isLight
              ? "text-slate-800 hover:bg-cyan-500 hover:text-white"
              : "text-slate-200 hover:bg-cyan-500 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2.5">
            {isLight ? (
              <Moon className="h-3.5 w-3.5 text-indigo-500" />
            ) : (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            )}
            <span>{isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}</span>
          </span>
          <span className="text-[10px] opacity-60 font-mono">
            {isLight ? "🌙" : "☀️"}
          </span>
        </button>
      )}

      <button
        onClick={() => {
          onRefresh();
          onClose();
        }}
        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition ${
          isLight
            ? "text-slate-800 hover:bg-cyan-500 hover:text-white"
            : "text-slate-200 hover:bg-cyan-500 hover:text-white"
        }`}
      >
        <RefreshCw className="h-3.5 w-3.5" /> Refresh Desktop
      </button>

      <button
        onClick={() => {
          onOpenTerminal();
          onClose();
        }}
        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition ${
          isLight
            ? "text-slate-800 hover:bg-cyan-500 hover:text-white"
            : "text-slate-200 hover:bg-cyan-500 hover:text-white"
        }`}
      >
        <Terminal className="h-3.5 w-3.5" /> Open in Terminal
      </button>

      <div className={`border-t my-1 ${isLight ? "border-slate-200" : "border-white/10"}`} />

      <button
        onClick={() => {
          onOpenSettings();
          onClose();
        }}
        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition ${
          isLight
            ? "text-slate-800 hover:bg-cyan-500 hover:text-white"
            : "text-slate-200 hover:bg-cyan-500 hover:text-white"
        }`}
      >
        <ImageIcon className="h-3.5 w-3.5" /> Personalize Wallpaper...
      </button>

      <button
        onClick={() => {
          onOpenAbout();
          onClose();
        }}
        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition ${
          isLight
            ? "text-slate-800 hover:bg-cyan-500 hover:text-white"
            : "text-slate-200 hover:bg-cyan-500 hover:text-white"
        }`}
      >
        <Info className="h-3.5 w-3.5" /> About Portfolio
      </button>

      <a
        href="https://github.com/Rakibislam22"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition ${
          isLight
            ? "text-slate-800 hover:bg-cyan-500 hover:text-white"
            : "text-slate-200 hover:bg-cyan-500 hover:text-white"
        }`}
      >
        <GithubIcon className="h-3.5 w-3.5" /> Source Code
      </a>
    </div>
  );
}
