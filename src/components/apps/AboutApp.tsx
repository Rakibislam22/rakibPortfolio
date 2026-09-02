"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import {
  FileText,
  MapPin,
  Mail,
  Briefcase,
  Terminal,
  CheckCircle2,
  Code2,
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
  const [activeTab, setActiveTab] = useState<"personal" | "professional" | "approach">("personal");

  const storyTabs = {
    personal: portfolioData.bio[0],
    professional: portfolioData.bio[1],
    approach: portfolioData.bio[2]
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top Notepad Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <FileText className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">About_Md_Rakib_Ali.txt</span>
          <span className="text-[11px] text-slate-500">— Notepad & Profile</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {portfolioData.status}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Profile Card Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 p-6 shadow-xl">
          <div className="absolute right-0 top-0 -mr-8 -mt-8 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar Photo */}
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-400/40 bg-slate-900 shadow-xl shadow-cyan-500/20">
              <Image
                src="/profile-logo.jpg"
                alt="Md Rakib Ali"
                fill
                className="object-cover"
                sizes="80px"
                priority
              />
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {portfolioData.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-cyan-300">
                {portfolioData.title}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {portfolioData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  {portfolioData.email}
                </span>
                {portfolioData.socials.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5 text-slate-500" />
                    {portfolioData.socials.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-4">
            {portfolioData.tagline}
          </p>

          {/* Social Links Row */}
          <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400/50 hover:text-white transition"
            >
              <GithubIcon className="h-3.5 w-3.5" /> GitHub
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400/50 hover:text-white transition"
            >
              <LinkedinIcon className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <a
              href={portfolioData.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:border-cyan-400/50 hover:text-white transition"
            >
              <TwitterIcon className="h-3.5 w-3.5" /> X / Twitter
            </a>
            {portfolioData.socials.leetcode && (
              <a
                href={portfolioData.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs text-amber-300 hover:bg-amber-500/20 transition"
              >
                <Code2 className="h-3.5 w-3.5" /> LeetCode
              </a>
            )}
            {portfolioData.socials.facebook && (
              <a
                href={portfolioData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs text-blue-300 hover:bg-blue-500/20 transition"
              >
                <FacebookIcon className="h-3.5 w-3.5" /> Facebook
              </a>
            )}
            {portfolioData.socials.instagram && (
              <a
                href={portfolioData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-pink-500/20 bg-pink-500/10 px-2.5 py-1 text-xs text-pink-300 hover:bg-pink-500/20 transition"
              >
                <InstagramIcon className="h-3.5 w-3.5" /> Instagram
              </a>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {portfolioData.stats.map((st) => (
            <div
              key={st.label}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-3.5 text-center backdrop-blur-sm"
            >
              <div className="text-xl font-bold text-cyan-300 font-mono">
                {st.value}
              </div>
              <div className="mt-1 text-[11px] text-slate-400">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Bio Tabs (Personal, Professional, Philosophy) */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-4 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5" /> Developer Story & Mindset
            </h3>
            <div className="flex items-center gap-1">
              {(["personal", "professional", "approach"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition ${
                    activeTab === tab
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[60px]">
            {storyTabs[activeTab]}
          </p>
        </div>

        {/* Competitive Programming Showcase */}
        {/* {portfolioData.competitiveProgramming && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-4 backdrop-blur-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Trophy className="h-3.5 w-3.5" /> Competitive Programming & Problem Solving
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {portfolioData.competitiveProgramming.map((cp) => (
                <div
                  key={cp.id}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        {cp.name}
                        <span className="text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-normal">
                          {cp.rank}
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        @{cp.username} • {cp.problemsSolved}+ Solved
                      </p>
                    </div>
                    <a
                      href={cp.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-cyan-300 transition"
                      title={`Visit ${cp.name} Profile`}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <ul className="space-y-0.5 text-[11px] text-slate-300">
                    {cp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-cyan-400" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Career Experience Timeline */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-4 backdrop-blur-sm">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" /> Practical Experience
          </h3>

          <div className="space-y-4">
            {portfolioData.experience.map((exp, idx) => (
              <div
                key={idx}
                className="relative pl-6 border-l-2 border-cyan-500/30 space-y-1.5"
              >
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white">
                    {exp.role} · <span className="text-cyan-300">{exp.company}</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {exp.location} • {exp.type}
                </p>
                <ul className="mt-2 space-y-1 text-xs text-slate-300">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        {/* {portfolioData.testimonials && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-4 backdrop-blur-sm">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Quote className="h-3.5 w-3.5" /> Client & Colleague Feedback
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              {portfolioData.testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-4 space-y-2.5 flex flex-col justify-between"
                >
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t border-white/5 pt-2">
                    <p className="text-xs font-bold text-white">{t.name}</p>
                    <p className="text-[10px] text-cyan-400">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
