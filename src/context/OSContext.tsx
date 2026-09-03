"use client";

import React, { createContext, useContext, useState } from "react";
import { AppId, OSType, ThemeMode, WindowInstance } from "@/types/os";
import { portfolioData } from "@/data/portfolioData";
import { useOSDetection } from "@/hooks/useOSDetection";

interface OSContextType {
  currentOS: OSType;
  setOS: (os: OSType) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  wallpaper: string;
  setWallpaper: (wp: string) => void;
  windows: Record<AppId, WindowInstance>;
  activeWindowId: AppId | null;
  openApp: (id: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  toggleMinimize: (id: AppId) => void;
  updatePosition: (id: string, pos: { x: number; y: number }) => void;
  updateSize: (id: string, size: { width: number; height: number }) => void;
  resetDesktop: () => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

const initialWindows: Record<AppId, WindowInstance> = {
  about: {
    id: "about",
    title: "About Md Rakib Ali",
    icon: "FileText",
    isOpen: true, // Opened by default as a welcome window!
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 80, y: 50 },
    size: { width: 720, height: 500 },
    component: null
  },
  projects: {
    id: "projects",
    title: "Projects Explorer",
    icon: "FolderGit2",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 120, y: 70 },
    size: { width: 780, height: 520 },
    component: null
  },
  skills: {
    id: "skills",
    title: "Skills & Tech Stack Dashboard",
    icon: "Cpu",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 140, y: 80 },
    size: { width: 740, height: 500 },
    component: null
  },
  resume: {
    id: "resume",
    title: "Education & Credentials",
    icon: "GraduationCap",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 160, y: 60 },
    size: { width: 720, height: 540 },
    component: null
  },
  contact: {
    id: "contact",
    title: "Mail & Contact Client",
    icon: "Mail",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 180, y: 90 },
    size: { width: 700, height: 480 },
    component: null
  },
  terminal: {
    id: "terminal",
    title: "Terminal.exe",
    icon: "Terminal",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 100, y: 110 },
    size: { width: 660, height: 420 },
    component: null
  },
  youtube: {
    id: "youtube",
    title: "YouTube Studio & Media Player",
    icon: "PlaySquare",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 140, y: 70 },
    size: { width: 780, height: 500 },
    component: null
  },
  settings: {
    id: "settings",
    title: "System Settings",
    icon: "Settings",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 100 },
    size: { width: 680, height: 480 },
    component: null
  },
  trash: {
    id: "trash",
    title: "Recycle Bin",
    icon: "Trash2",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 220, y: 120 },
    size: { width: 560, height: 400 },
    component: null
  }
};

export function OSProvider({ children }: { children: React.ReactNode }) {
  const { detectedOS } = useOSDetection();
  const [userOSOverride, setUserOSOverride] = useState<OSType | null>(null);
  const currentOS = userOSOverride ?? detectedOS;

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedTheme = localStorage.getItem("rakib_portfolio_theme") as ThemeMode | null;
        if (savedTheme === "light" || savedTheme === "dark") {
          return savedTheme;
        }
      } catch { }
    }
    return "dark";
  });

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem("rakib_portfolio_theme", mode);
    } catch { }

    // Automatically switch wallpaper to matching theme wallpaper if available
    const matchingWp = portfolioData.wallpapers.find(
      (w) => w.osTarget === currentOS && w.mode === mode
    ) || portfolioData.wallpapers.find((w) => w.mode === mode);
    if (matchingWp) {
      setWallpaperOverride(matchingWp.bgClass);
    }
  };

  const toggleThemeMode = () => {
    const nextMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextMode);
  };

  const defaultWallpaper =
    portfolioData.wallpapers.find((w) => w.osTarget === currentOS && (!w.mode || w.mode === themeMode))?.bgClass ||
    portfolioData.wallpapers[0].bgClass;
  const [wallpaperOverride, setWallpaperOverride] = useState<string | null>(null);
  const wallpaper = wallpaperOverride ?? defaultWallpaper;

  const [windows, setWindows] = useState<Record<AppId, WindowInstance>>(initialWindows);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>("about");
  const [topZ, setTopZ] = useState(20);

  const setOS = (os: OSType) => {
    setUserOSOverride(os);
    try {
      localStorage.setItem("rakib_portfolio_os", os);
    } catch { }
    const matchingWp = portfolioData.wallpapers.find(
      (w) => w.osTarget === os && (!w.mode || w.mode === themeMode)
    ) || portfolioData.wallpapers.find((w) => w.osTarget === os);
    if (matchingWp) {
      setWallpaperOverride(matchingWp.bgClass);
    }
  };

  const setWallpaper = (wp: string) => {
    setWallpaperOverride(wp);
  };

  const openApp = (id: AppId) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveWindowId(id);

    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ
      }
    }));
  };

  const closeWindow = (id: string) => {
    const appId = id as AppId;
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isOpen: false
      }
    }));
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    const appId = id as AppId;
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: true
      }
    }));
    if (activeWindowId === appId) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: string) => {
    const appId = id as AppId;
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMaximized: !prev[appId].isMaximized
      }
    }));
    setActiveWindowId(appId);
  };

  const focusWindow = (id: string) => {
    const appId = id as AppId;
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveWindowId(appId);

    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        isMinimized: false,
        zIndex: nextZ
      }
    }));
  };

  const toggleMinimize = (id: AppId) => {
    const win = windows[id];
    if (!win.isOpen) {
      openApp(id);
    } else if (win.isMinimized) {
      focusWindow(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const updatePosition = (id: string, pos: { x: number; y: number }) => {
    const appId = id as AppId;
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        position: pos
      }
    }));
  };

  const updateSize = (id: string, size: { width: number; height: number }) => {
    const appId = id as AppId;
    setWindows((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        size: size
      }
    }));
  };

  const resetDesktop = () => {
    setWindows(initialWindows);
    setActiveWindowId("about");
  };

  return (
    <OSContext.Provider
      value={{
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
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used within an OSProvider");
  }
  return context;
}
