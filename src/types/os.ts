import { ReactNode } from "react";

export type OSType = "windows" | "macos" | "ios" | "android" | "ubuntu";

export type AppId =
  | "projects"
  | "skills"
  | "about"
  | "resume"
  | "contact"
  | "terminal"
  | "youtube"
  | "settings"
  | "trash";

export interface WindowPosition {
  x: number;
  y: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

export interface WindowInstance {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: WindowPosition;
  size: WindowSize;
  minSize?: WindowSize;
  component: ReactNode;
}

export interface DesktopItem {
  id: AppId;
  title: string;
  iconName: string;
  isFolder?: boolean;
  fileExt?: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: "Full Stack" | "Frontend" | "Backend / AI" | "Mobile / App";
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: string;
  highlights?: string[];
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    years?: string;
    highlight?: boolean;
  }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  gpa?: string;
  description: string;
  courses?: string[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  highlights: string[];
}

export interface PortfolioData {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  status: string;
  bio: string[];
  stats: { label: string; value: string }[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
    phone?: string;
    facebook?: string;
    instagram?: string;
    leetcode?: string;
    discord?: string;
  };
  projects: ProjectItem[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications?: {
    title: string;
    issuer: string;
    date: string;
    credentialId?: string;
    credentialUrl?: string;
    description: string;
    skills: string[];
  }[];
  competitiveProgramming?: {
    id: string;
    name: string;
    username: string;
    profileUrl: string;
    problemsSolved: number;
    rank: string;
    badge: string;
    achievements: string[];
  }[];
  testimonials?: {
    quote: string;
    name: string;
    role: string;
  }[];
  wallpapers: {
    id: string;
    name: string;
    thumbnail: string;
    bgClass: string;
    osTarget?: OSType;
  }[];
}
