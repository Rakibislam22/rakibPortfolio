"use client";

import React, { useState, useRef } from "react";
import { OSType, WindowInstance } from "@/types/os";
import {
  Minus,
  Square,
  X,
  Maximize2,
  Minimize2,
  Folder,
  FileText,
  Terminal,
  Cpu,
  GraduationCap,
  Mail,
  Settings,
  Trash2
} from "lucide-react";

interface WindowFrameProps {
  win: WindowInstance;
  currentOS: OSType;
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
    const newX = Math.max(0, Math.min(window.innerWidth - 100, dragStartRef.current.startX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.startY + deltaY));

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

    const newW = Math.max(320, Math.min(window.innerWidth - win.position.x, resizeStartRef.current.startW + deltaW));
    const newH = Math.max(260, Math.min(window.innerHeight - win.position.y - 40, resizeStartRef.current.startH + deltaH));

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

  // App Icon Renderer
  const renderIcon = (id: string) => {
    switch (id) {
      case "about":
        return <FileText className="h-3.5 w-3.5 text-cyan-400" />;
      case "projects":
        return <Folder className="h-3.5 w-3.5 text-amber-400" />;
      case "skills":
        return <Cpu className="h-3.5 w-3.5 text-emerald-400" />;
      case "resume":
        return <GraduationCap className="h-3.5 w-3.5 text-purple-400" />;
      case "contact":
        return <Mail className="h-3.5 w-3.5 text-sky-400" />;
      case "terminal":
        return <Terminal className="h-3.5 w-3.5 text-emerald-400" />;
      case "settings":
        return <Settings className="h-3.5 w-3.5 text-slate-300" />;
      case "trash":
        return <Trash2 className="h-3.5 w-3.5 text-rose-400" />;
      default:
        return <Square className="h-3.5 w-3.5 text-cyan-400" />;
    }
  };

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const isMax = win.isMaximized;

  return (
    <div
      onPointerDown={() => onFocus(win.id)}
      style={{
        zIndex: win.zIndex,
        transform: isMax
          ? "none"
          : `translate3d(${win.position.x}px, ${win.position.y}px, 0)`,
        height: isMax
          ? currentOS === "macos"
            ? "calc(100% - 30px)"
            : currentOS === "windows"
              ? "calc(100% - 48px)"
              : "calc(100% - 32px)"
          : `${win.size.height}px`,
        top: isMax ? (currentOS === "macos" || currentOS === "ubuntu" ? "30px" : "0") : "0",
        left: isMax ? (currentOS === "ubuntu" ? "56px" : "0") : "0",
        width: isMax && currentOS === "ubuntu" ? "calc(100% - 56px)" : isMax ? "100%" : `${win.size.width}px`
      }}
      className={`absolute flex flex-col overflow-hidden transition-shadow select-none ${isMax
          ? "rounded-none shadow-none"
          : currentOS === "macos"
            ? "rounded-xl shadow-2xl border border-white/15"
            : currentOS === "ubuntu"
              ? "rounded-lg shadow-2xl border border-orange-500/30"
              : "rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/15"
        }`}
    >
      {/* Title Bar - Adapt to OS */}
      <div
        onPointerDown={handlePointerDownDrag}
        onPointerMove={handlePointerMoveDrag}
        onPointerUp={handlePointerUpDrag}
        onDoubleClick={() => onMaximize(win.id)}
        className={`flex items-center justify-between px-3 py-2 cursor-move transition-colors backdrop-blur-xl ${currentOS === "macos"
            ? "bg-slate-900/85 border-b border-white/10 h-8"
            : currentOS === "ubuntu"
              ? "bg-[#2c1d27]/90 border-b border-orange-950/40 h-8"
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
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium pl-2">
              {renderIcon(win.id)}
              <span className="truncate max-w-[200px]">{win.title}</span>
            </div>
          </div>
        ) : (
          /* Windows & Ubuntu: Icon and Title on Left */
          <div className="flex items-center gap-2 text-xs text-slate-200 font-medium overflow-hidden">
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
              className="flex h-9 w-11 items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition"
              title="Minimize"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(win.id);
              }}
              className="flex h-9 w-11 items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition"
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
              className="flex h-9 w-11 items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition"
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
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 transition text-[10px]"
              title="Minimize"
            >
              <Minus className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMaximize(win.id);
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 transition text-[10px]"
              title="Maximize"
            >
              <Square className="h-2.5 w-2.5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(win.id);
              }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600/80 text-white hover:bg-orange-600 transition text-[10px]"
              title="Close"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* Window Body */}
      <div className="relative flex-1 overflow-hidden bg-slate-950/95 backdrop-blur-md">
        {children}
      </div>

      {/* Resize Handle (Bottom Right) */}
      {!isMax && (
        <div
          onPointerDown={handlePointerDownResize}
          onPointerMove={handlePointerMoveResize}
          onPointerUp={handlePointerUpResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-se-resize flex items-end justify-end p-0.5 text-slate-500 hover:text-cyan-400"
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
