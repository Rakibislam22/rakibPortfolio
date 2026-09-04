import { PortfolioData, DesktopItem } from "@/types/os";

export const portfolioData: PortfolioData = {
  name: "Md Rakib Ali",
  title: "MERN Stack & Full-Stack Developer",
  tagline: "Building digital experiences with innovation, performance, and elegance.",
  location: "Dhaka, Bangladesh",
  email: "mdrakibali.kcn@gmail.com",
  status: "Available for Projects & Full-time Roles",
  bio: [
    "I’m a mindset-driven developer who enjoys building impactful digital experiences. Outside of coding, I actively explore emerging technologies, contribute to open-source communities, and help fellow learners grow in their tech journey.",
    "With hands-on experience in MERN-stack development, I've built and deployed multiple full-stack applications using modern frameworks. My strengths include crafting scalable architectures, optimizing performance, and developing clean, maintainable solutions.",
    "I follow a clean-code philosophy grounded in clarity, testing, and user-focused design. My workflow embraces collaboration, agile practices, and continuous iteration to deliver reliable and high-quality software."
  ],
  stats: [
    { label: "MERN Stack Projects", value: "6+" },
    { label: "LeetCode Solved", value: "150+" },
    { label: "Codeforces Solved", value: "200+" },
    { label: "Client Satisfaction", value: "99%" }
  ],
  socials: {
    github: "https://github.com/Rakibislam22",
    linkedin: "https://www.linkedin.com/in/md-rakib-ali-383947218/",
    twitter: "https://x.com/rakibislam44",
    facebook: "https://www.facebook.com/rakibislam.KCN",
    instagram: "https://www.instagram.com/rakibislam789/",
    leetcode: "https://leetcode.com/u/rakibislam22/",
    email: "mailto:mdrakibali.kcn@gmail.com",
    phone: "+8801786935744"
  },
  projects: [
    {
      id: "convox",
      title: "ConvoX - Real-Time Platform",
      category: "Full Stack",
      featured: true,
      image: "/convox.png",
      description: "A full-stack real-time collaboration and messaging platform with a Next.js frontend and a production-grade Node.js backend.",
      detailedDescription: "ConvoX is an end-to-end real-time collaboration ecosystem featuring direct messaging, channels, audio/video rooms powered by LiveKit, and low-latency message streaming using Socket.IO and Redis pub/sub. Includes protected routes, JWT authorization, and MongoDB clustering.",
      tags: ["Next.js", "TailwindCSS", "Node.js", "Express.js", "Socket.IO", "MongoDB", "Redis", "LiveKit", "JWT", "Axios"],
      demoUrl: "https://convox-chat.vercel.app",
      githubUrl: "https://github.com/the-team-undefined",
      metrics: "Sub-millisecond WebSocket delivery • Audio/Video channels",
      highlights: [
        "Next.js client with protected routes, Auth/Socket context, and real-time chat UI",
        "Direct messaging and group chat with live online status indicators",
        "Workspaces, channels, and social feed with multimedia attachments"
      ]
    },
    {
      id: "scholarstream",
      title: "ScholarStream Client",
      category: "Full Stack",
      featured: true,
      image: "/scholarstream-client.png",
      description: "A React-based frontend for discovering and applying to curated scholarship opportunities worldwide.",
      detailedDescription: "Empowers students around the globe to discover, track, and apply for fully-funded and partial scholarship opportunities. Features instant category filtering, secure Firebase user authentication, application deadline management, and interactive animation with Framer Motion.",
      tags: ["React", "React Router", "TailwindCSS", "DaisyUI", "Axios", "Firebase Auth", "React Hook Form", "Framer Motion"],
      demoUrl: "https://scholarstream-1.web.app/",
      githubUrl: "https://github.com/Rakibislam22/ScholarStream-Client",
      metrics: "Global scholarship database • Fast responsive search",
      highlights: [
        "Scholarship discovery by category, country, subject, and deadline",
        "Application workflow with multi-step submission management",
        "User dashboard to bookmark, manage, and review application statuses"
      ]
    },
    {
      id: "nextlevel-shop",
      title: "NextLevel Shop",
      category: "Full Stack",
      featured: true,
      image: "/a.png",
      description: "A modern full-stack Next.js + Express.js + MongoDB application for managing products with secure authentication, product creation, deletion.",
      detailedDescription: "High-performance e-commerce inventory and storefront solution with Next.js App Router, Express REST APIs, MongoDB data layer, NextAuth role-based sessions, and dynamic cart operations.",
      tags: ["Next.js", "TypeScript", "Express.js", "MongoDB", "NextAuth", "TailwindCSS", "Axios"],
      demoUrl: "https://first-next-app-ten-lac.vercel.app",
      githubUrl: "https://github.com/Rakibislam22/first-next-app",
      metrics: "Full-stack App Router • Secure JWT & NextAuth session management",
      highlights: [
        "Full-stack Next.js (App Router) frontend with an Express.js backend",
        "MongoDB for high-throughput product catalog and user orders",
        "Authentication via NextAuth with secure role-based permissions"
      ]
    },
    {
      id: "movie-master",
      title: "Movie Master Pro",
      category: "Frontend",
      featured: false,
      image: "/b.png",
      description: "Movie Master Pro is a modern, animated, and responsive movie discovery web application built using React + Vite.",
      detailedDescription: "An interactive movie explorer showcasing trending releases, trailers, cast lists, and user ratings with smooth fluid carousels and dark mode cinematic styling.",
      tags: ["React", "Vite", "JavaScript", "Firebase Auth", "TailwindCSS", "DaisyUI", "Swiper"],
      demoUrl: "https://movie-master-pro-8f1b1.web.app/",
      githubUrl: "https://github.com/Rakibislam22/MovieMasterPro-Client",
      metrics: "60 FPS carousel animation • Instant live query search",
      highlights: [
        "Movie discovery UI with animated/responsive card interactions",
        "Firebase Authentication integration for personal watchlists",
        "Carousel and slider functionality via Swiper with touch gestures"
      ]
    },
    {
      id: "green-nest",
      title: "Green Nest",
      category: "Frontend",
      featured: false,
      image: "/c.png",
      description: "A modern React + Firebase web app for plant lovers and botanical enthusiasts.",
      detailedDescription: "Designed for plant care and eco-lifestyle enthusiasts to discover indoor plants, care guides, sunlight requirements, and watering schedules with unified Context API state management.",
      tags: ["React", "JavaScript", "Firebase Auth", "Context API", "Node.js", "React Router"],
      demoUrl: "https://green-nest-2025.web.app/",
      githubUrl: "https://github.com/Rakibislam22/Green-Nest",
      metrics: "Context API global store • Real-time Firebase sync",
      highlights: [
        "Plant-focused web app built with React and custom styling",
        "User authentication and profile management using Firebase Auth",
        "State management and shopping cart flows with Context API"
      ]
    },
    {
      id: "green-earth",
      title: "GreenEarth",
      category: "Frontend",
      featured: false,
      image: "/d.png",
      description: "GreenEarth is a modern, eco-themed landing page designed to spread awareness about environmental protection.",
      detailedDescription: "A high-conversion environmental advocacy platform with clean aesthetic layouts, engaging call-to-action sections, and interactive DaisyUI components.",
      tags: ["HTML5", "CSS3", "JavaScript", "TailwindCSS", "DaisyUI"],
      demoUrl: "https://greeenearth.netlify.app/",
      githubUrl: "https://github.com/Rakibislam22/GreenEarth",
      metrics: "100/100 Lighthouse Performance • Fully Accessible Semantics",
      highlights: [
        "Eco-themed landing page to promote environmental awareness",
        "Built with semantic HTML5, modern JavaScript, and TailwindCSS",
        "UI components styled with DaisyUI theme primitives"
      ]
    }
  ],
  skillCategories: [
    {
      category: "Frontend Development",
      icon: "Layout",
      skills: [
        { name: "React", level: 90, years: "3+ yrs", highlight: true },
        { name: "Next.js", level: 75, years: "2+ yrs", highlight: true },
        { name: "JavaScript (ES6+)", level: 90, years: "3+ yrs", highlight: true },
        { name: "TypeScript", level: 75, years: "2+ yrs", highlight: true },
        { name: "HTML5", level: 95, years: "4+ yrs" },
        { name: "CSS3 / Tailwind CSS", level: 90, years: "3+ yrs", highlight: true }
      ]
    },
    {
      category: "Backend & Databases",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 90, years: "3+ yrs", highlight: true },
        { name: "Express.js", level: 85, years: "3+ yrs", highlight: true },
        { name: "MongoDB / Mongoose", level: 90, years: "3+ yrs", highlight: true },
        { name: "MySQL", level: 90, years: "2+ yrs" },
        { name: "REST APIs & Socket.IO", level: 88, years: "2+ yrs", highlight: true },
        { name: "Python", level: 60, years: "1+ yr" }
      ]
    },
    {
      category: "Tools & Deployment",
      icon: "Cloud",
      skills: [
        { name: "Git & GitHub", level: 90, years: "3+ yrs", highlight: true },
        { name: "VS Code", level: 95, years: "4+ yrs" },
        { name: "Firebase Auth & Firestore", level: 80, years: "2+ yrs", highlight: true },
        { name: "Vercel / Netlify", level: 92, years: "3+ yrs" },
        { name: "Postman & Axios", level: 90, years: "3+ yrs" }
      ]
    }
  ],
   
  education: [
    {
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Bangladesh University of Business and Technology",
      duration: "Undergraduate Program",
      location: "Dhaka, Bangladesh",
      gpa: "First Class Distinction",
      description: "Focused on Data Structures, Algorithms, Software Engineering, Database Systems, Web Technologies, and Computer Networks.",
      courses: [
        "Data Structures & Algorithms",
        "Object Oriented Programming (OOP)",
        "Database Management Systems (DBMS)",
        "Web Technologies & Cloud Computing",
        "Software Engineering & Architecture",
        "Computer Networks & Security"
      ]
    },
    {
      degree: "Higher Secondary Certificate (Science)",
      institution: "Padma College",
      duration: "Completed",
      location: "Rajshahi, Bangladesh",
      gpa: "4.58 / 5.00",
      description: "Majored in Physics, Chemistry, Higher Mathematics, and ICT with distinction."
    }
  ],
  experience: [
    {
      role: "MERN Stack & Full-Stack Developer",
      company: "Independent / Open Source Projects",
      period: "2025 - Present",
      location: "Dhaka, Bangladesh / Remote",
      type: "Full-time & Freelance",
      highlights: [
        "Built and deployed high-performance full-stack web applications (ConvoX, ScholarStream, NextLevel Shop) using Next.js, React, Node.js, Express, and MongoDB.",
        "Engineered real-time messaging, WebSockets, LiveKit audio/video rooms, and Redis caching layers.",
        "Designed accessible, mobile-first, and responsive user interfaces with Tailwind CSS, DaisyUI, and Framer Motion."
      ]
    }
  ],
  wallpapers: [
    {
      id: "win-bloom",
      name: "Windows 11 Bloom Dark",
      thumbnail: "bg-gradient-to-tr from-sky-950 via-slate-900 to-blue-900",
      bgClass: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900 via-slate-950 to-black",
      osTarget: "windows"
    },
    {
      id: "mac-sonoma",
      name: "macOS Sequoia Glow",
      thumbnail: "bg-gradient-to-tr from-orange-900 via-purple-950 to-indigo-950",
      bgClass: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-950 via-slate-950 to-orange-950/40",
      osTarget: "macos"
    },
    {
      id: "ubuntu-noble",
      name: "Ubuntu 24.04 Yaru Aubergine",
      thumbnail: "bg-gradient-to-tr from-orange-950 via-purple-950 to-stone-950",
      bgClass: "bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-950/60 via-purple-950 to-stone-950",
      osTarget: "ubuntu"
    },
    {
      id: "ios-ribbon",
      name: "Apple iOS 18 Nebula",
      thumbnail: "bg-gradient-to-tr from-blue-900 via-indigo-950 to-purple-950",
      bgClass: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-indigo-950 to-[#04060d]",
      osTarget: "ios"
    },
    {
      id: "android-dunes",
      name: "Android 15 Material Dunes",
      thumbnail: "bg-gradient-to-tr from-teal-900 via-slate-950 to-emerald-950",
      bgClass: "bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-teal-950/80 via-slate-950 to-[#04090f]",
      osTarget: "android"
    },
    {
      id: "cyber-matrix",
      name: "Cyberpunk Grid",
      thumbnail: "bg-gradient-to-tr from-cyan-950 via-slate-950 to-emerald-950",
      bgClass: "bg-[#060c18]"
    },
    {
      id: "deep-space",
      name: "Deep Space Aurora",
      thumbnail: "bg-gradient-to-tr from-indigo-950 via-slate-950 to-teal-950",
      bgClass: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-[#050b14]"
    }
  ]
};

export const defaultDesktopItems: DesktopItem[] = [
  {
    id: "about",
    title: "About Md Rakib Ali.txt",
    iconName: "FileText",
    fileExt: ".txt"
  },
  {
    id: "projects",
    title: "Projects",
    iconName: "FolderGit2",
    isFolder: true,
    badge: "6"
  },
  {
    id: "skills",
    title: "Skills & Stack",
    iconName: "Cpu",
    badge: "15+"
  },
  {
    id: "resume",
    title: "Resume & Credentials.pdf",
    iconName: "GraduationCap",
    fileExt: ".pdf"
  },
  {
    id: "terminal",
    title: "Terminal.exe",
    iconName: "Terminal"
  },
  {
    id: "youtube",
    title: "YouTube Player",
    iconName: "PlaySquare",
    badge: "Live"
  },
  {
    id: "contact",
    title: "Contact & Mail",
    iconName: "Mail"
  },
  {
    id: "settings",
    title: "Settings",
    iconName: "Settings"
  },
  {
    id: "trash",
    title: "Recycle Bin",
    iconName: "Trash2"
  }
];
