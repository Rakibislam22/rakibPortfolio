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
import { UbuntuShell } from "../shells/UbuntuShell";
import { IOSShell } from "../shells/IOSShell";
import { AndroidShell } from "../shells/AndroidShell";

// Import Applications
import { ProjectsApp } from "../apps/ProjectsApp";
import { SkillsApp } from "../apps/SkillsApp";
import { AboutApp } from "../apps/AboutApp";
import { ResumeApp } from "../apps/ResumeApp";
import { ContactApp } from "../apps/ContactApp";
import { TerminalApp } from "../apps/TerminalApp";
import { YouTubeApp } from "../apps/YouTubeApp";
import { SettingsApp } from "../apps/SettingsApp";
import { RecycleBinApp } from "../apps/RecycleBinApp";

export function Desktop() {
  const {
    currentOS,
    setOS,
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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    if (contextMenu.isOpen) {
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    }
  };

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

  return (
    <div
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
      className={`relative h-screen w-screen overflow-hidden ${wallpaper} transition-colors duration-500 font-sans select-none`}
    >
      {/* Background Noise & Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.08),_transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Desktop Desktop Icons (for desktop OS modes) */}
      {!isMobileOS && (
        <main
          className={`relative z-10 flex h-full flex-col flex-wrap items-start content-start gap-3 p-4 sm:p-6 overflow-hidden ${currentOS === "macos"
            ? "pt-12 pb-24"
            : currentOS === "ubuntu"
              ? "pt-10 pl-20 pb-6"
              : "pt-6 pb-16"
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
                key={win.id}
                win={win}
                currentOS={currentOS}
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

      {/* Mobile Fullscreen App Content Rendering (for iOS & Android) */}
      {isMobileOS && activeApp && (
        <div className="fixed inset-0 z-50 pointer-events-auto">
          {currentOS === "ios" ? (
            <IOSShell
              windows={windows}
              activeWindowId={activeWindowId}
              onOpenApp={openApp}
              onCloseApp={closeWindow}
              onOpenSettings={() => openApp("settings")}
            />
          ) : (
            <AndroidShell
              windows={windows}
              activeWindowId={activeWindowId}
              onOpenApp={openApp}
              onCloseApp={closeWindow}
              onOpenSettings={() => openApp("settings")}
            />
          )}

          {/* Render Active Application inside Mobile Shell */}
          <div className="fixed inset-x-0 bottom-0 top-11 z-50 bg-slate-950 flex flex-col">
            {/* Mobile Top App Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-4 py-3 backdrop-blur-xl">
              <button
                onClick={() => closeWindow(activeApp.id)}
                className={`flex items-center gap-1 text-xs font-semibold ${currentOS === "ios" ? "text-cyan-400" : "text-teal-300"
                  }`}
              >
                ← {currentOS === "ios" ? "Home" : "Back"}
              </button>

              <span className="text-xs font-bold text-white truncate max-w-[200px]">
                {activeApp.title}
              </span>

              <button
                onClick={() => closeWindow(activeApp.id)}
                className="text-xs font-bold text-slate-400 hover:text-white"
              >
                {currentOS === "ios" ? "Done" : "✕"}
              </button>
            </div>

            {/* App Body */}
            <div className="flex-1 overflow-hidden bg-slate-950">
              {renderAppContent(activeApp.id)}
            </div>

            {/* Bottom Swipe Bar */}
            <div
              onClick={() => closeWindow(activeApp.id)}
              className="h-6 flex items-center justify-center bg-slate-950 cursor-pointer"
            >
              <div className="h-1 w-32 rounded-full bg-white/60 hover:bg-white" />
            </div>
          </div>
        </div>
      )}

      {/* Desktop OS Shells */}
      {currentOS === "windows" && (
        <WindowsShell
          windows={windows}
          activeWindowId={activeWindowId}
          onOpenApp={openApp}
          onToggleMinimize={toggleMinimize}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {currentOS === "macos" && (
        <MacOSShell
          windows={windows}
          activeWindowId={activeWindowId}
          onOpenApp={openApp}
          onToggleMinimize={toggleMinimize}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {currentOS === "ubuntu" && (
        <UbuntuShell
          windows={windows}
          activeWindowId={activeWindowId}
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
          onOpenApp={openApp}
          onCloseApp={closeWindow}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {currentOS === "android" && !activeApp && (
        <AndroidShell
          windows={windows}
          activeWindowId={activeWindowId}
          onOpenApp={openApp}
          onCloseApp={closeWindow}
          onOpenSettings={() => openApp("settings")}
        />
      )}

      {/* Right-Click Context Menu */}
      <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        isOpen={contextMenu.isOpen}
        currentOS={currentOS}
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
