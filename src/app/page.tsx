"use client";

import { OSProvider } from "@/context/OSContext";
import { Desktop } from "@/components/desktop/Desktop";
import { SEOContent } from "@/components/common/SEOContent";

export default function Home() {
  return (
    <OSProvider>
      <SEOContent />
      <Desktop />
    </OSProvider>
  );
}
