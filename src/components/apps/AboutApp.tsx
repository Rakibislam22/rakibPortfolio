"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useOS } from "@/context/OSContext";
import { portfolioData } from "@/data/portfolioData";
import {
  FileText,
  MapPin,
  Mail,
  Briefcase,
  CheckCircle2,
  Phone,
  Trophy,
  ExternalLink,
  Quote
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon
} from "../common/BrandIcons";

export function AboutApp() {
  const { themeMode } = useOS();
  const isLight = themeMode === "light";

  const [activeTab, setActiveTab] = useState<"personal" | "professional" | "approach">("personal");

  const storyTabs = {
    personal: portfolioData.bio[0],
    professional: portfolioData.bio[1],
    approach: portfolioData.bio[2]
  };

  return (
    <div className={`flex h-full flex-col selection:bg-cyan-500/30 ${isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
      }`}>
      {/* Top Notepad Bar */}
      <div className={`flex items-center justify-between px-4 py-2.5 backdrop-blur-md border-b ${isLight ? "border-slate-200 bg-white/80" : "border-white/10 bg-slate-900/80"
        }`}>
        <div className="flex items-center gap-2 text-xs">
          <FileText className="h-4 w-4 text-cyan-600" />
          <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
            About_Md_Rakib_Ali.txt
          </span>
          <span className="text-[11px] text-slate-400">— Notepad &amp; Profile</span>
        </div>
        <div className={`flex items-center gap-2 text-[11px] px-2.5 py-0.5 rounded-full border ${isLight
            ? "text-emerald-700 bg-emerald-50 border-emerald-200"
            : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
          }`}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {portfolioData.status}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Profile Card Banner */}
        <div className={`relative overflow-hidden rounded-2xl p-6 shadow-xl border ${isLight
            ? "border-cyan-200 bg-gradient-to-br from-white via-cyan-50/50 to-sky-50 shadow-slate-200/50"
            : "border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40"
          }`}>
          <div className="absolute right-0 top-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar Photo */}
            <div className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 shadow-xl ${isLight
                ? "border-cyan-400 bg-white shadow-cyan-500/10"
                : "border-cyan-400/40 bg-slate-900 shadow-cyan-500/20"
              }`}>
              <Image
                src="/profile-logo.jpg"
                alt="Md Rakib Ali"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
            </div>

            <div className="space-y-1">
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"
                }`}>
                {portfolioData.name}
              </h1>
              <p className={`text-xs sm:text-sm font-semibold ${isLight ? "text-cyan-700" : "text-cyan-300"}`}>
                {portfolioData.title}
              </p>
              <div className={`flex flex-wrap items-center gap-4 text-xs pt-1 ${isLight ? "text-slate-600" : "text-slate-400"
                }`}>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {portfolioData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {portfolioData.email}
                </span>
                {portfolioData.socials.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {portfolioData.socials.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className={`mt-4 text-xs sm:text-sm leading-relaxed border-t pt-4 ${isLight ? "border-slate-200 text-slate-700" : "border-white/10 text-slate-300"
            }`}>
            {portfolioData.tagline}
          </p>

          {/* Social Links Bar */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isLight
                  ? "bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <GithubIcon className="h-3.5 w-3.5" /> GitHub
            </a>

            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isLight
                  ? "bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <LinkedinIcon className="h-3.5 w-3.5 text-sky-500" /> LinkedIn
            </a>

            <a
              href={portfolioData.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isLight
                  ? "bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <TwitterIcon className="h-3.5 w-3.5 text-sky-400" /> Twitter
            </a>

            <a
              href={portfolioData.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isLight
                  ? "bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <FacebookIcon className="h-3.5 w-3.5 text-blue-500" /> Facebook
            </a>

            <a
              href={portfolioData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${isLight
                  ? "bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 shadow-xs"
                  : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
            >
              <InstagramIcon className="h-3.5 w-3.5 text-pink-500" /> Instagram
            </a>
          </div>
        </div>

        {/* Story & Background Notepad View */}
        <div className={`rounded-2xl p-5 backdrop-blur-sm space-y-4 border ${isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/60"
          }`}>
          {/* Tab Selector */}
          <div className={`flex items-center gap-2 border-b pb-2 ${isLight ? "border-slate-200" : "border-white/10"
            }`}>
            {(["personal", "professional", "approach"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition ${activeTab === tab
                    ? isLight
                      ? "bg-cyan-500 text-white shadow-xs"
                      : "bg-cyan-500 text-slate-950 shadow-md font-bold"
                    : isLight
                      ? "text-slate-600 hover:bg-slate-100"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {tab} Overview
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-3 pt-1">
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"
              }`}>
              {storyTabs[activeTab]}
            </p>
          </div>
        </div>

        {/* Competitive Programming Showcase */}
        {portfolioData.competitiveProgramming && (
          <div className={`rounded-2xl p-5 space-y-4 backdrop-blur-sm border ${isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/40"
            }`}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5" /> Competitive Programming &amp; Problem Solving
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {portfolioData.competitiveProgramming.map((cp) => (
                <div
                  key={cp.id}
                  className={`rounded-xl p-3.5 space-y-2 border ${isLight
                      ? "border-slate-200 bg-slate-50 shadow-xs"
                      : "border-white/5 bg-slate-950/60"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`text-xs font-bold flex items-center gap-1.5 ${isLight ? "text-slate-900" : "text-white"
                        }`}>
                        {cp.name}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-normal ${isLight
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          }`}>
                          {cp.rank}
                        </span>
                      </h4>
                      <p className={`text-[11px] font-mono ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                        @{cp.username} • {cp.problemsSolved}+ Solved
                      </p>
                    </div>
                    <a
                      href={cp.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`rounded-lg p-1 transition ${isLight ? "text-slate-500 hover:bg-slate-200 hover:text-cyan-700" : "text-slate-400 hover:bg-white/10 hover:text-cyan-300"
                        }`}
                      title={`Visit ${cp.name} Profile`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <ul className={`space-y-0.5 text-[11px] ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    {cp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-cyan-500" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Experience Timeline */}
        <div className={`rounded-2xl p-5 space-y-4 backdrop-blur-sm border ${isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/40"
          }`}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" /> Practical Experience
          </h3>

          <div className="space-y-4">
            {portfolioData.experience.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-6 border-l-2 border-cyan-500/40 space-y-1.5"
              >
                <div className={`absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-cyan-500 ring-4 ${isLight ? "ring-white" : "ring-slate-950"
                  }`} />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                    {exp.role} · <span className={isLight ? "text-cyan-700" : "text-cyan-300"}>{exp.company}</span>
                  </h4>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${isLight ? "bg-slate-100 text-slate-700" : "bg-white/5 text-slate-400"
                    }`}>
                    {exp.period}
                  </span>
                </div>
                <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  {exp.location} • {exp.type}
                </p>
                <ul className={`mt-2 space-y-1 text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {portfolioData.testimonials && (
          <div className={`rounded-2xl p-5 space-y-4 backdrop-blur-sm border ${isLight ? "border-slate-200 bg-white/80 shadow-sm" : "border-white/10 bg-slate-900/40"
            }`}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-600 flex items-center gap-1.5">
              <Quote className="h-3.5 w-3.5" /> Client &amp; Colleague Feedback
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              {portfolioData.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 space-y-2.5 flex flex-col justify-between border ${isLight
                      ? "border-slate-200 bg-slate-50 shadow-xs"
                      : "border-white/5 bg-slate-950/60"
                    }`}
                >
                  <p className={`text-xs italic leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className={`border-t pt-2 ${isLight ? "border-slate-200" : "border-white/5"}`}>
                    <p className={`text-xs font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{t.name}</p>
                    <p className={`text-[10px] ${isLight ? "text-cyan-700" : "text-cyan-400"}`}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
