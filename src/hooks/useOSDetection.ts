"use client";

import { useSyncExternalStore } from "react";
import { OSType } from "@/types/os";

function getClientOS(): { detectedOS: OSType; platformName: string } {
  if (typeof window === "undefined" || !navigator) {
    return { detectedOS: "windows", platformName: "Windows 11" };
  }

  const userAgent = navigator.userAgent || "";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userAgentData = (navigator as any).userAgentData;
  const platform = (userAgentData?.platform || navigator.platform || "").toLowerCase();

  // 1. Check Apple iOS (iPhone, iPad, iPod, iPadOS in Safari Desktop mode)
  const isIOS =
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /Macintosh/i.test(userAgent));

  // 2. Check Android Mobile / Tablet
  const isAndroid = /Android/i.test(userAgent);

  // 3. Check macOS Desktop (Mac without touch points)
  const isMac =
    (platform.includes("mac") || /Macintosh|Mac OS X|MacIntel/i.test(userAgent)) &&
    !isIOS;

  // 4. Check Linux / Ubuntu
  const isLinux =
    (platform.includes("linux") || /Linux|Ubuntu|Debian|X11/i.test(userAgent)) &&
    !isAndroid;

  // 5. Check Windows
  const isWindows =
    platform.includes("win") || /Windows NT|Win64|Win32|Windows/i.test(userAgent);

  if (isIOS) {
    return { detectedOS: "ios", platformName: "Apple iOS" };
  } else if (isAndroid) {
    return { detectedOS: "android", platformName: "Android 15" };
  } else if (isMac) {
    return { detectedOS: "macos", platformName: "macOS Sequoia" };
  } else if (isLinux) {
    return { detectedOS: "ubuntu", platformName: "Ubuntu 24.04 LTS" };
  } else if (isWindows) {
    return { detectedOS: "windows", platformName: "Windows 11" };
  } else {
    // Default fallback
    return { detectedOS: "windows", platformName: "Windows 11" };
  }
}

const emptySubscribe = () => () => {};

export function useOSDetection(): {
  detectedOS: OSType;
  isClient: boolean;
  platformName: string;
} {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { detectedOS, platformName } = isClient
    ? getClientOS()
    : { detectedOS: "windows" as OSType, platformName: "Windows 11" };

  return { detectedOS, isClient, platformName };
}
