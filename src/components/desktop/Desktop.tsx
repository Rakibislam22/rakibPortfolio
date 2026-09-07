"use client";

import React, { useState } from "react";
import { useOS } from "@/context/OSContext";
import { defaultDesktopItems } from "@/data/portfolioData";
import { AppId } from "@/types/os";
import { DesktopIcon } from "./DesktopIcon";
import { WindowFrame } from "./WindowFrame";
import { ContextMenu } from "./ContextMenu";
import { WindowsShell } from "../shells/WindowsShell";
import { MacOSShell } from "../shells/MacOSShell";
import { IOSShell } from "../shells/IOSShell";
import { AndroidShell } from "../shells/AndroidShell";
import { UbuntuShell } from "../shells/UbuntuShell";
import { ProjectsApp } from "../apps/ProjectsApp";
import { SkillsApp } from "../apps/SkillsApp";
import { AboutApp } from "../apps/AboutApp";
import { ResumeApp } from "../apps/ResumeApp";
import { ContactApp } from "../apps/ContactApp";
import { TerminalApp } from "../apps/TerminalApp";
import { YouTubeApp } from "../apps/YouTubeApp";
import { SettingsApp } from "../apps/SettingsApp";
import { RecycleBinApp } from "../apps/RecycleBinApp";
import { ChevronLeft } from "lucide-react";

export function Desktop() {
  const {
    currentOS,
    setOS,
    themeMode,
    setThemeMode,
    toggleThemeMode,
    wallpaper,
    setWallpaper,
    windows,
    activeWindowId,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    toggleMinimize,
    updatePosition,
    updateSize,
    resetDesktop
  } = useOS();

  const [selectedIconId, setSelectedIconId] = useState<AppId | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({ isOpen: false, x: 0, y: 0 });

  // Handle Desktop Right-Click
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  // Close context menu on click anywhere
  const handleDesktopClick = () => {
    if (contextMenu.isOpen) {
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    }
    setSelectedIconId(null);
  };

  // Render App Contents dynamically
  const renderAppContent = (id: AppId) => {
    switch (id) {
      case "projects":
        return <ProjectsApp />;
      case "skills":
        return <SkillsApp />;
      case "about":
        return <AboutApp />;
      case "resume":
        return <ResumeApp />;
      case "contact":
        return <ContactApp />;
      case "terminal":
        return <TerminalApp onSwitchOS={setOS} />;
      case "youtube":
        return <YouTubeApp />;
      case "settings":
        return (
          <SettingsApp
            currentOS={currentOS}
            onSelectOS={setOS}
            currentTheme={themeMode}
            onSelectTheme={setThemeMode}
            currentWallpaper={wallpaper}
            onSelectWallpaper={setWallpaper}
          />
        );
      case "trash":
        return <RecycleBinApp />;
    }
  };

  const isMobileOS = currentOS === "ios" || currentOS === "android";
  const activeApp = activeWindowId && windows[activeWindowId]?.isOpen ? windows[activeWindowId] : null;
  const isLight = themeMode === "light";

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
      className={`relative h-screen w-screen overflow-hidden ${wallpaper} transition-colors duration-500 font-sans select-none`}
    >
      {/* Background Noise & Lighting */}
      <div className={`absolute inset-0 pointer-events-none ${isLight
          ? "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]"
          : "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_45%)]"
        }`} />
      <div className={`absolute inset-0 pointer-events-none [background-size:16px_16px] ${isLight
          ? "opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)]"
          : "opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)]"
        }`} />

      {/* Desktop Icons (for desktop OS modes) */}
      {!isMobileOS && (
        <main
          className={`relative z-10 flex h-full flex-col flex-wrap items-start content-start gap-3 overflow-hidden ${currentOS === "macos"
              ? "pt-12 pb-24 px-4 sm:px-6"
              : currentOS === "ubuntu"
                ? "pt-10 pb-6 pl-20 pr-4 sm:pl-24 sm:pr-6"
                : "pt-6 pb-16 px-4 sm:px-6"
            }`}
        >
          {defaultDesktopItems.map((item) => (
            <DesktopIcon
              key={item.id}
              item={item}
              isSelected={selectedIconId === item.id}
              onSelect={(id) => setSelectedIconId(id)}
              onOpen={(id) => openApp(id)}
            />
          ))}
        </main>
      )}

      {/* Multi-Window System Layer (for Desktop OSs: Windows, macOS, Ubuntu) */}
      {!isMobileOS && (
        <section aria-label="Open Applications">
          {(Object.keys(windows) as AppId[]).map((appId) => {
            const win = windows[appId];
            return (
              <WindowFrame
                key={appId}
                win={win}
                currentOS={currentOS}
                themeMode={themeMode}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onMaximize={maximizeWindow}
                onFocus={focusWindow}
                onMove={updatePosition}
                onResize={updateSize}
              >
                {renderAppContent(appId)}
              </WindowFrame>
            );
          })}
        </section>
      )}

      {/* Mobile Full-Screen App Sheet Layer (for iOS and Android) */}
      {isMobileOS && activeApp && (
        <div className="fixed inset-0 z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
          <div className={`flex flex-col h-full w-full overflow-hidden ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"
            }`}>
            {/* Mobile Header */}
            <div className={`flex items-center justify-between px-4 py-3 border-b backdrop-blur-xl ${isLight ? "border-slate-200 bg-white/95 text-slate-950" : "border-white/10 bg-slate-900/90 text-white"
              }`}>
              <button
                onClick={() => closeWindow(activeApp.id)}
                className={`flex items-center gap-1 text-xs font-bold active:opacity-60 ${isLight ? "text-cyan-700 hover:text-cyan-800" : "text-cyan-400 hover:text-cyan-300"
                  }`}
              >
                <ChevronLeft className="h-4 w-4" /> Home
              </button>
              <span className={`text-xs font-bold truncate max-w-[200px] ${isLight ? "text-slate-950" : "text-white"
                }`}>
                {activeApp.title}
              </span>
              <button
                onClick={() => closeWindow(activeApp.id)}
                className={`text-xs font-bold active:opacity-60 ${isLight ? "text-cyan-700 hover:text-cyan-800" : "text-cyan-400 hover:text-cyan-300"
                  }`}
              >
                Done
              </button>
            </div>

            {/* App Body */}
            <div className={`flex-1 overflow-hidden ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-white"}`}>
              {renderAppContent(activeApp.id)}
            </div>

            {/* Bottom Swipe Bar */}
            <div
              onClick={() => closeWindow(activeApp.id)}
              className={`h-6 flex items-center justify-center cursor-pointer ${isLight ? "bg-slate-50" : "bg-slate-950"
                }`}
            >
              <div className={`h-1 w-32 rounded-full ${isLight ? "bg-slate-400 hover:bg-slate-600" : "bg-white/60 hover:bg-white"
                }`} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop OS Shells */}
      {currentOS === "windows" && (
        <WindowsShell
          windows={windows}
          activeWindowId={activeWindowId}
          themeMode={themeMode}
          onToggleTheme={toggleThemeMode}
          onOpenApp={openApp}
          onToggleMinimize={toggleMinimize}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {currentOS === "macos" && (
        <MacOSShell
          windows={windows}
          activeWindowId={activeWindowId}
          themeMode={themeMode}
          onToggleTheme={toggleThemeMode}
          onOpenApp={openApp}
          onToggleMinimize={toggleMinimize}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {currentOS === "ubuntu" && (
        <UbuntuShell
          windows={windows}
          activeWindowId={activeWindowId}
          themeMode={themeMode}
          onToggleTheme={toggleThemeMode}
          onOpenApp={openApp}
          onToggleMinimize={toggleMinimize}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {/* Mobile Homescreens (when no full app is open) */}
      {currentOS === "ios" && !activeApp && (
        <IOSShell
          windows={windows}
          activeWindowId={activeWindowId}
          themeMode={themeMode}
          onToggleTheme={toggleThemeMode}
          onOpenApp={openApp}
          onCloseApp={closeWindow}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {currentOS === "android" && !activeApp && (
        <AndroidShell
          windows={windows}
          activeWindowId={activeWindowId}
          themeMode={themeMode}
          onToggleTheme={toggleThemeMode}
          onOpenApp={openApp}
          onCloseApp={closeWindow}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {/* Desktop Right-Click Context Menu */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        currentOS={currentOS}
        themeMode={themeMode}
        onToggleTheme={toggleThemeMode}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onRefresh={resetDesktop}
        onOpenSettings={() => openApp("settings")}
        onOpenTerminal={() => openApp("terminal")}
        onOpenAbout={() => openApp("about")}
        onSwitchOS={setOS}
      />
    </div>
  );
}
