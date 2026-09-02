"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Cpu,
  Search,
  CheckCircle2,
  Code2,
  Server,
  Cloud,
  Palette,
  Sparkles,
  Layers
} from "lucide-react";

export function SkillsApp() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend Engineering":
        return <Code2 className="h-4 w-4 text-cyan-400" />;
      case "Backend & Systems":
        return <Server className="h-4 w-4 text-emerald-400" />;
      case "DevOps & Infrastructure":
        return <Cloud className="h-4 w-4 text-amber-400" />;
      case "UI/UX & Creative Tools":
        return <Palette className="h-4 w-4 text-purple-400" />;
      default:
        return <Cpu className="h-4 w-4 text-cyan-400" />;
    }
  };

  const categories = ["All", ...portfolioData.skillCategories.map((c) => c.category)];

  const filteredCategories = portfolioData.skillCategories
    .filter((cat) => selectedCat === "All" || cat.category === selectedCat)
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter((skill) =>
        skill.name.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top Header / Control Panel Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <Cpu className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">Skills & Tech Stack Dashboard</span>
          <span className="rounded bg-cyan-500/10 px-2 py-0.5 text-[11px] text-cyan-300 border border-cyan-500/20">
            Control Panel
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter skills (e.g., React, TypeScript)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-7 w-52 rounded-md border border-white/10 bg-black/40 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none sm:w-64"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-slate-900/40 px-4 py-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${selectedCat === cat
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Quick Highlights Strip */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3.5">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
              <Sparkles className="h-4 w-4" /> Core Focus
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Modern Next.js 16, TypeScript, React 19 & High-Performance UI.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
              <Layers className="h-4 w-4" /> Architecture
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Scalable REST/GraphQL APIs, Server Actions, Clean Code & Design Systems.
            </p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3.5">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Quality
            </div>
            <p className="mt-1 text-xs text-slate-300">
              Responsive perfection, sub-second load times, and cross-browser resilience.
            </p>
          </div>
        </div>

        {filteredCategories.map((catGroup) => (
          <div
            key={catGroup.category}
            className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm shadow-lg"
          >
            <div className="flex items-center gap-2.5 border-b border-white/5 pb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                {getCategoryIcon(catGroup.category)}
              </span>
              <h3 className="text-sm font-semibold text-white">
                {catGroup.category}
              </h3>
              <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                {catGroup.skills.length} skills
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {catGroup.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group rounded-xl border border-white/5 bg-slate-950/60 p-3.5 transition hover:border-cyan-400/30 hover:bg-slate-950"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="rounded bg-cyan-500/10 px-1.5 py-0.2 text-[9px] font-semibold text-cyan-300">
                          PRO
                        </span>
                      )}
                    </div>
                    {skill.years && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        {skill.years}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

