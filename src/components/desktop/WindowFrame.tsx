"use client";

import React, { useState, useRef } from "react";
import { OSType, ThemeMode, WindowInstance } from "@/types/os";
import {
  Minus,
  Square,
  X,
  Maximize2,
  Minimize2,
  FolderGit2,
  FileText,
  Terminal,
  Cpu,
  GraduationCap,
  Mail,
  Settings,
  Trash2,
  PlaySquare
} from "lucide-react";

interface WindowFrameProps {
  win: WindowInstance;
  currentOS: OSType;
  themeMode?: ThemeMode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, pos: { x: number; y: number }) => void;
  onResize: (id: string, size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export function WindowFrame({
  win,
  currentOS,
  themeMode = "dark",
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
  children
}: WindowFrameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; startX: number; startY: number }>({
    mouseX: 0,
    mouseY: 0,
    startX: win.position.x,
    startY: win.position.y
  });
  const resizeStartRef = useRef<{
    mouseX: number;
    mouseY: number;
    startW: number;
    startH: number;
  }>({ mouseX: 0, mouseY: 0, startW: win.size.width, startH: win.size.height });

  // Handle Dragging
  const handlePointerDownDrag = (e: React.PointerEvent) => {
    if (win.isMaximized) return;
    onFocus(win.id);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startX: win.position.x,
      startY: win.position.y
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveDrag = (e: React.PointerEvent) => {
    if (!isDragging || win.isMaximized) return;
    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const deltaY = e.clientY - dragStartRef.current.mouseY;

    // Boundary constraints
    const minX = currentOS === "ubuntu" ? 64 : 0;
    const minY = currentOS === "ubuntu" ? 32 : currentOS === "macos" ? 30 : 0;
    const newX = Math.max(minX, Math.min(window.innerWidth - 100, dragStartRef.current.startX + deltaX));
    const newY = Math.max(minY, Math.min(window.innerHeight - 80, dragStartRef.current.startY + deltaY));

    onMove(win.id, { x: newX, y: newY });
  };

  const handlePointerUpDrag = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch { }
    }
  };

  // Handle Resizing
  const handlePointerDownResize = (e: React.PointerEvent) => {
    if (win.isMaximized) return;
    e.stopPropagation();
    onFocus(win.id);
    setIsResizing(true);
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      startW: win.size.width,
      startH: win.size.height
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveResize = (e: React.PointerEvent) => {
    if (!isResizing || win.isMaximized) return;
    const deltaW = e.clientX - resizeStartRef.current.mouseX;
    const deltaH = e.clientY - resizeStartRef.current.mouseY;

    const newW = Math.max(win.minSize?.width || 380, resizeStartRef.current.startW + deltaW);
    const newH = Math.max(win.minSize?.height || 260, resizeStartRef.current.startH + deltaH);

    onResize(win.id, { width: newW, height: newH });
  };

  const handlePointerUpResize = (e: React.PointerEvent) => {
    if (isResizing) {
      setIsResizing(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch { }
    }
  };

  if (!win.isOpen || win.isMinimized) return null;

  const isMax = win.isMaximized;
  const isLight = themeMode === "light";

  const renderIcon = (id: string) => {
    switch (id) {
      case "about":
        return <FileText className="h-4 w-4 text-cyan-500" />;
      case "projects":
        return <FolderGit2 className="h-4 w-4 text-amber-500" />;
      case "skills":
        return <Cpu className="h-4 w-4 text-emerald-500" />;
      case "resume":
        return <GraduationCap className="h-4 w-4 text-purple-500" />;
      case "contact":
        return <Mail className="h-4 w-4 text-sky-500" />;
      case "terminal":
        return <Terminal className="h-4 w-4 text-emerald-500" />;
      case "youtube":
        return <PlaySquare className="h-4 w-4 text-rose-500" />;
      case "settings":
        return <Settings className="h-4 w-4 text-slate-400" />;
      case "trash":
        return <Trash2 className="h-4 w-4 text-rose-500" />;
      default:
        return <FileText className="h-4 w-4 text-slate-400" />;
    }
  };

  const posX = currentOS === "ubuntu" ? Math.max(68, win.position.x) : win.position.x;
  const posY = currentOS === "ubuntu" ? Math.max(34, win.position.y) : currentOS === "macos" ? Math.max(30, win.position.y) : win.position.y;

  return (
    <div
      onPointerDown={() => onFocus(win.id)}
      style={{
        zIndex: win.zIndex,
        transform: isMax
          ? "none"
          : `translate3d(${posX}px, ${posY}px, 0)`,
        height: isMax
          ? currentOS === "macos"
            ? "calc(100% - 30px)"
            : currentOS === "windows"
              ? "calc(100% - 48px)"
              : currentOS === "ubuntu"
                ? "calc(100% - 28px)"
                : "calc(100% - 32px)"
          : `${win.size.height}px`,
        top: isMax ? (currentOS === "macos" ? "30px" : currentOS === "ubuntu" ? "28px" : "0") : "0",
        left: isMax ? (currentOS === "ubuntu" ? "56px" : "0") : "0",
        width: isMax && currentOS === "ubuntu" ? "calc(100% - 56px)" : isMax ? "100%" : `${win.size.width}px`
      }}
      className={`absolute flex flex-col overflow-hidden transition-shadow select-none ${isMax
        ? "rounded-none shadow-none"
        : currentOS === "macos"
          ? isLight
            ? "rounded-xl shadow-2xl border border-slate-300/80 bg-white/95"
            : "rounded-xl shadow-2xl border border-white/15 bg-slate-900/90"
          : currentOS === "ubuntu"
            ? isLight
              ? "rounded-lg shadow-2xl border border-orange-300 bg-[#faf6f2]"
              : "rounded-lg shadow-2xl border border-orange-500/30 bg-[#2c1d27]"
            : isLight
              ? "rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-slate-300/90 bg-white"
              : "rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/15 bg-slate-900"
        }`}
    >
      {/* Title Bar - Adapt to OS & Theme */}
      <div
        onPointerDown={handlePointerDownDrag}
        onPointerMove={handlePointerMoveDrag}
        onPointerUp={handlePointerUpDrag}
        onDoubleClick={() => onMaximize(win.id)}
        className={`flex items-center justify-between px-3 py-2 cursor-move transition-colors backdrop-blur-xl ${currentOS === "macos"
            ? isLight
              ? "bg-[#edeef1]/95 border-b border-slate-200 h-8"
              : "bg-slate-900/85 border-b border-white/10 h-8"
            : currentOS === "ubuntu"
              ? isLight
                ? "bg-[#f5ece6]/95 border-b border-orange-200 h-8"
                : "bg-[#2c1d27]/90 border-b border-orange-950/40 h-8"
              : isLight
                ? "bg-[#f3f4f6]/95 border-b border-slate-200 h-9"
                : "bg-slate-900/90 border-b border-white/10 h-9"
          }`}
      >
        {/* macOS Traffic Lights on Left */}
        {currentOS === "macos" ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 group">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(win.id);
                }}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] border border-[#e0443e] text-[8px] text-black font-bold opacity-90 group-hover:opacity-100"
                title="Close"
              >
                <span className="opacity-0 group-hover:opacity-100">✕</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize(win.id);
                }}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] border border-[#dea123] text-[8px] text-black font-bold opacity-90 group-hover:opacity-100"
                title="Minimize"
              >
                <span className="opacity-0 group-hover:opacity-100">−</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMaximize(win.id);
                }}
                className="flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] border border-[#1aab29] text-[8px] text-black font-bold opacity-90 group-hover:opacity-100"
                title="Zoom"
              >
                <span className="opacity-0 group-hover:opacity-100">+</span>
              </button>
            </div>
            <div className={`flex items-center gap-1.5 text-xs font-medium pl-2 ${isLight ? "text-slate-700" : "text-slate-300"
              }`}>
              {renderIcon(win.id)}
              <span className="truncate max-w-[200px]">{win.title}</span>
            </div>
          </div>
        ) : (
          /* Windows & Ubuntu: Icon and Title on Left */
          <div className={`flex items-center gap-2 text-xs font-medium overflow-hidden ${isLight ? "text-slate-800" : "text-slate-200"
            }`}>
            {renderIcon(win.id)}
            <span className="truncate max-w-[220px]">{win.title}</span>
          </div>
        )}

        {/* Windows 11 Controls on Right */}
        {currentOS === "windows" && (
          <div className="flex items-center -mr-3 -my-2 h-9">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(win.id);
              }}
              className={`flex h-9 w-11 items-center justify-center transition ${isLight
                  ? "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              title="Minimize"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(win.id);
              }}
              className={`flex h-9 w-11 items-center justify-center transition ${isLight
                  ? "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              title={isMax ? "Restore" : "Maximize"}
            >
              {isMax ? (
                <Minimize2 className="h-3.5 w-3.5" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(win.id);
              }}
              className={`flex h-9 w-11 items-center justify-center transition ${isLight
                  ? "text-slate-600 hover:bg-red-600 hover:text-white"
                  : "text-slate-400 hover:bg-red-600 hover:text-white"
                }`}
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Ubuntu Controls on Right */}
        {currentOS === "ubuntu" && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMinimize(win.id);
              }}
              className={`flex h-5 w-5 items-center justify-center rounded-full transition text-[10px] ${isLight
                  ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              title="Minimize"
            >
              <Minus className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(win.id);
              }}
              className={`flex h-5 w-5 items-center justify-center rounded-full transition text-[10px] ${isLight
                  ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
                }`}
              title="Maximize"
            >
              <Square className="h-2.5 w-2.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(win.id);
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600/90 text-white hover:bg-orange-600 transition text-[10px]"
              title="Close"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Window Body */}
      <div className={`relative flex-1 overflow-hidden backdrop-blur-md ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950/95 text-slate-100"
        }`}>
        {children}
      </div>

      {/* Resize Handle (Bottom Right) */}
      {!isMax && (
        <div
          onPointerDown={handlePointerDownResize}
          onPointerMove={handlePointerMoveResize}
          onPointerUp={handlePointerUpResize}
          className={`absolute bottom-0 right-0 h-4 w-4 cursor-se-resize flex items-end justify-end p-0.5 transition ${isLight
              ? "text-slate-400 hover:text-cyan-600"
              : "text-slate-500 hover:text-cyan-400"
            }`}
        >
          <svg className="h-2.5 w-2.5" viewBox="0 0 6 6" fill="currentColor">
            <circle cx="5" cy="5" r="0.8" />
            <circle cx="3" cy="5" r="0.8" />
            <circle cx="5" cy="3" r="0.8" />
          </svg>
        </div>
      )}
    </div>
  );
}
