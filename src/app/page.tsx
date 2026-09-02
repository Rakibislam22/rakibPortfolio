"use client";

import { OSProvider } from "@/context/OSContext";
import { Desktop } from "@/components/desktop/Desktop";

export default function Home() {
  return (
    <OSProvider>
      <Desktop />
    </OSProvider>
  );
}
