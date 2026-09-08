import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050b14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dev.mdrakibali.me"),
  title: {
    default: "Md Rakib Ali | MERN Stack & Full-Stack Developer",
    template: "%s | Md Rakib Ali",
  },
  description:
    "Portfolio of Md Rakib Ali, a MERN stack and full-stack developer building React, Next.js, Node.js, Express, MongoDB, and real-time interactive web applications with native-mirroring OS experiences.",
  applicationName: "Md Rakib Ali OS Portfolio",
  keywords: [
    "Md Rakib Ali",
    "MERN Stack Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "Frontend Engineer",
    "Web Developer Bangladesh",
    "Software Engineer",
    "Interactive Portfolio",
    "OS Portfolio",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
    "Socket.IO",
    "Redis",
    "LiveKit",
  ],
  authors: [{ name: "Md Rakib Ali", url: "https://dev.mdrakibali.me" }],
  creator: "Md Rakib Ali",
  publisher: "Md Rakib Ali",
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://dev.mdrakibali.me",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dev.mdrakibali.me",
    siteName: "Md Rakib Ali Portfolio",
    title: "Md Rakib Ali | MERN Stack & Full-Stack Developer",
    description:
      "Explore Md Rakib Ali's full-stack projects, MERN stack skills, resume, competitive programming achievements, and interactive OS experiences.",
    images: [
      {
        url: "/profile-logo.jpg",
        width: 800,
        height: 800,
        alt: "Md Rakib Ali - MERN Stack & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md Rakib Ali | MERN Stack & Full-Stack Developer",
    description:
      "Explore Md Rakib Ali's full-stack projects, MERN stack skills, resume, and interactive OS desktop experience.",
    creator: "@rakibislam44",
    site: "@rakibislam44",
    images: ["/profile-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "_31EmG7s3Ny4wQRejrI0tA0gnQomOpU2R9L_T2dL7bQ",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/profile-logo.jpg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dev.mdrakibali.me/#person",
      name: "Md Rakib Ali",
      url: "https://dev.mdrakibali.me/",
      image: "https://dev.mdrakibali.me/profile-logo.jpg",
      jobTitle: "MERN Stack & Full-Stack Developer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance / Available for Hire",
      },
      description:
        "Mindset-driven MERN stack and full-stack developer with hands-on experience building high-performance web applications with React, Next.js, Node.js, Express, and MongoDB.",
      email: "mailto:mdrakibali.kcn@gmail.com",
      telephone: "+8801786935744",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dhaka",
        addressCountry: "BD",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "Socket.IO",
        "Redis",
        "Full-Stack Web Development",
        "REST APIs",
        "UI/UX Design Systems",
      ],
      sameAs: [
        "https://github.com/Rakibislam22",
        "https://www.linkedin.com/in/md-rakib-ali-383947218/",
        "https://x.com/rakibislam44",
        "https://www.facebook.com/rakibislam.KCN",
        "https://www.instagram.com/rakibislam789/",
        "https://leetcode.com/u/rakibislam22/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dev.mdrakibali.me/#website",
      url: "https://dev.mdrakibali.me/",
      name: "Md Rakib Ali Portfolio",
      description: "Interactive Multi-OS Desktop Portfolio of Md Rakib Ali",
      publisher: {
        "@id": "https://dev.mdrakibali.me/#person",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://dev.mdrakibali.me/#profile",
      url: "https://dev.mdrakibali.me/",
      name: "Md Rakib Ali - MERN Stack Developer Portfolio",
      about: {
        "@id": "https://dev.mdrakibali.me/#person",
      },
      isPartOf: {
        "@id": "https://dev.mdrakibali.me/#website",
      },
      mainEntity: {
        "@id": "https://dev.mdrakibali.me/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full w-full overflow-hidden">{children}</body>
    </html>
  );
}
