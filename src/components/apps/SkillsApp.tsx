"use client";

import React, { useState } from "react";
import { useOS } from "@/context/OSContext";
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
  const { themeMode } = useOS();
  const isLight = themeMode === "light";

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend Engineering":
        return <Code2 className="h-4 w-4 text-cyan-500" />;
      case "Backend & Systems":
        return <Server className="h-4 w-4 text-emerald-500" />;
      case "DevOps & Infrastructure":
        return <Cloud className="h-4 w-4 text-amber-500" />;
      case "UI/UX & Creative Tools":
        return <Palette className="h-4 w-4 text-purple-500" />;
      default:
        return <Cpu className="h-4 w-4 text-cyan-500" />;
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
    <div className={`flex h-full flex-col selection:bg-cyan-500/30 ${
      isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
    }`}>
      {/* Top Header / Control Panel Ribbon */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 backdrop-blur-md ${
        isLight ? "border-slate-200 bg-white/80" : "border-white/10 bg-slate-900/80"
      }`}>
        <div className="flex items-center gap-2 text-xs">
          <Cpu className="h-4 w-4 text-cyan-600" />
          <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
            Skills &amp; Tech Stack Dashboard
          </span>
          <span className={`rounded px-2 py-0.5 text-[11px] font-medium border ${
            isLight
              ? "bg-cyan-50 text-cyan-800 border-cyan-200"
              : "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
          }`}>
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
            className={`h-7 w-52 sm:w-64 rounded-md border pl-8 pr-3 text-xs focus:outline-none focus:border-cyan-500/60 ${
              isLight
                ? "border-slate-300 bg-white text-slate-900 placeholder-slate-400"
                : "border-white/10 bg-black/40 text-white placeholder-slate-500"
            }`}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className={`flex items-center gap-1.5 border-b px-4 py-2 overflow-x-auto ${
        isLight ? "border-slate-200 bg-slate-100/70" : "border-white/5 bg-slate-900/40"
      }`}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${
              selectedCat === cat
                ? isLight
                  ? "bg-cyan-500 text-white shadow-xs"
                  : "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                : isLight
                  ? "text-slate-600 hover:bg-slate-200/80"
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
          <div className={`rounded-xl p-3.5 border ${
            isLight
              ? "border-cyan-200 bg-cyan-50/50 text-cyan-900"
              : "border-cyan-500/20 bg-cyan-950/20 text-cyan-300"
          }`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Sparkles className="h-4 w-4" /> Core Focus
            </div>
            <p className={`mt-1 text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
              Modern Next.js 16, TypeScript, React 19 &amp; High-Performance UI.
            </p>
          </div>

          <div className={`rounded-xl p-3.5 border ${
            isLight
              ? "border-emerald-200 bg-emerald-50/50 text-emerald-900"
              : "border-emerald-500/20 bg-emerald-950/20 text-emerald-300"
          }`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Layers className="h-4 w-4" /> Architecture
            </div>
            <p className={`mt-1 text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
              Scalable REST/GraphQL APIs, Server Actions, Clean Code &amp; Design Systems.
            </p>
          </div>

          <div className={`rounded-xl p-3.5 border ${
            isLight
              ? "border-amber-200 bg-amber-50/50 text-amber-900"
              : "border-amber-500/20 bg-amber-950/20 text-amber-300"
          }`}>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Quality
            </div>
            <p className={`mt-1 text-xs ${isLight ? "text-slate-700" : "text-slate-300"}`}>
              Responsive perfection, sub-second load times, and cross-browser resilience.
            </p>
          </div>
        </div>

        {filteredCategories.map((catGroup) => (
          <div
            key={catGroup.category}
            className={`rounded-2xl p-5 backdrop-blur-sm shadow-lg border ${
              isLight
                ? "border-slate-200 bg-white/90 shadow-slate-200/50"
                : "border-white/10 bg-slate-900/60"
            }`}
          >
            <div className={`flex items-center gap-2.5 border-b pb-3 ${
              isLight ? "border-slate-200" : "border-white/5"
            }`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg border ${
                isLight ? "bg-slate-100 border-slate-200" : "bg-white/5 border-white/10"
              }`}>
                {getCategoryIcon(catGroup.category)}
              </span>
              <h3 className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                {catGroup.category}
              </h3>
              <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${
                isLight ? "bg-slate-100 text-slate-600" : "bg-white/5 text-slate-400"
              }`}>
                {catGroup.skills.length} skills
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {catGroup.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`group rounded-xl p-3.5 transition border ${
                    isLight
                      ? "border-slate-200 bg-slate-50/70 hover:border-cyan-400 hover:bg-white hover:shadow-xs"
                      : "border-white/5 bg-slate-950/60 hover:border-cyan-400/30 hover:bg-slate-950"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium transition ${
                        isLight ? "text-slate-800 group-hover:text-cyan-700" : "text-slate-200 group-hover:text-cyan-300"
                      }`}>
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className={`rounded px-1.5 py-0.2 text-[9px] font-semibold ${
                          isLight ? "bg-cyan-100 text-cyan-800" : "bg-cyan-500/10 text-cyan-300"
                        }`}>
                          PRO
                        </span>
                      )}
                    </div>
                    {skill.years && (
                      <span className={`text-[10px] font-mono ${isLight ? "text-slate-500" : "text-slate-500"}`}>
                        {skill.years}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2.5 flex items-center gap-2.5">
                    <div className={`h-1.5 flex-1 overflow-hidden rounded-full ${
                      isLight ? "bg-slate-200" : "bg-slate-800"
                    }`}>
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-mono ${isLight ? "text-slate-600" : "text-slate-400"}`}>
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
