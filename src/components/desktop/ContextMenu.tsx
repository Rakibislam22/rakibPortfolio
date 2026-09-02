"use client";

import React, { useEffect, useRef } from "react";
import { OSType } from "@/types/os";
import {
  RefreshCw,
  Image as ImageIcon,
  Terminal,
  Info
} from "lucide-react";
import { GithubIcon } from "../common/BrandIcons";

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  currentOS: OSType;
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
  const adjustedY = Math.min(y, window.innerHeight - 220);

  return (
    <div
      ref={menuRef}
      style={{ top: `${adjustedY}px`, left: `${adjustedX}px` }}
      className="fixed z-50 w-48 rounded-xl border border-white/15 bg-slate-900/90 p-1.5 shadow-2xl backdrop-blur-2xl text-xs space-y-0.5 animate-in fade-in duration-100 select-none"
    >
      <button
        onClick={() => {
          onRefresh();
          onClose();
        }}
        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white transition"
      >
        <RefreshCw className="h-3.5 w-3.5" /> Refresh Desktop
      </button>

      <button
        onClick={() => {
          onOpenTerminal();
          onClose();
        }}
        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white transition"
      >
        <Terminal className="h-3.5 w-3.5" /> Open in Terminal
      </button>

      <div className="border-t border-white/10 my-1" />

      <button
        onClick={() => {
          onOpenSettings();
          onClose();
        }}
        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white transition"
      >
        <ImageIcon className="h-3.5 w-3.5" /> Change Wallpaper...
      </button>

      <button
        onClick={() => {
          onOpenAbout();
          onClose();
        }}
        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white transition"
      >
        <Info className="h-3.5 w-3.5" /> About Portfolio
      </button>

      <a
        href="https://github.com/Rakibislam22"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-slate-200 hover:bg-cyan-500 hover:text-white transition"
      >
        <GithubIcon className="h-3.5 w-3.5" /> View on GitHub
      </a>
    </div>
  );
}
