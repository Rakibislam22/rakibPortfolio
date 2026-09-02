"use client";

import React, { useState } from "react";
import { AppId, DesktopItem } from "@/types/os";
import {
  FolderGit2,
  FileText,
  Cpu,
  GraduationCap,
  Mail,
  Settings,
  Trash2
} from "lucide-react";

interface DesktopIconProps {
  item: DesktopItem;
  isSelected: boolean;
  onSelect: (id: AppId) => void;
  onOpen: (id: AppId) => void;
}

export function DesktopIcon({
  item,
  isSelected,
  onSelect,
  onOpen
}: DesktopIconProps) {
  const [clickCount, setClickCount] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(item.id);

    // Support single click for touch/mobile and double click for desktop
    if (window.innerWidth < 768) {
      onOpen(item.id);
      return;
    }

    setClickCount((prev) => prev + 1);
    setTimeout(() => setClickCount(0), 350);

    if (clickCount >= 1) {
      onOpen(item.id);
      setClickCount(0);
    }
  };

  const renderIcon = () => {
    switch (item.id) {
      case "about":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 shadow-lg group-hover:scale-105 transition">
            <FileText className="h-6 w-6" />
          </div>
        );
      case "projects":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400 shadow-lg group-hover:scale-105 transition">
            <FolderGit2 className="h-6 w-6" />
          </div>
        );
      case "skills":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shadow-lg group-hover:scale-105 transition">
            <Cpu className="h-6 w-6" />
          </div>
        );
      case "resume":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400 shadow-lg group-hover:scale-105 transition">
            <GraduationCap className="h-6 w-6" />
          </div>
        );
      case "terminal":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 shadow-lg group-hover:scale-105 transition font-mono font-bold">
            &gt;_
          </div>
        );
      case "contact":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400 shadow-lg group-hover:scale-105 transition">
            <Mail className="h-6 w-6" />
          </div>
        );
      case "youtube":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-500 shadow-lg group-hover:scale-105 transition">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        );
      case "settings":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-white/20 text-slate-200 shadow-lg group-hover:scale-105 transition">
            <Settings className="h-6 w-6" />
          </div>
        );
      case "trash":
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400 shadow-lg group-hover:scale-105 transition">
            <Trash2 className="h-6 w-6" />
          </div>
        );
    }
  };

  return (
    <button
      onClick={handleClick}
      onDoubleClick={() => onOpen(item.id)}
      className={`group relative flex flex-col items-center justify-center rounded-xl p-2.5 transition select-none w-24 focus:outline-none ${isSelected
        ? "bg-cyan-500/20 border border-cyan-400/50 shadow-md backdrop-blur-sm"
        : "hover:bg-white/10 hover:backdrop-blur-xs border border-transparent"
        }`}
    >
      <div className="relative">
        {renderIcon()}
        {item.badge && (
          <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[9px] font-bold text-slate-950 shadow-md">
            {item.badge}
          </span>
        )}
      </div>

      <span className="mt-1.5 text-center text-xs font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] line-clamp-2 leading-tight">
        {item.title}
      </span>
    </button>
  );
}
