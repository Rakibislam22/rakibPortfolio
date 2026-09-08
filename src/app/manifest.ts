import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Md Rakib Ali - MERN Stack & Full-Stack Developer",
    short_name: "Rakib Portfolio",
    description: "Interactive Multi-OS Desktop Portfolio of Md Rakib Ali featuring Windows 11, macOS, and Mobile shells.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b14",
    theme_color: "#06b6d4",
    icons: [
      {
        src: "/profile-logo.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
