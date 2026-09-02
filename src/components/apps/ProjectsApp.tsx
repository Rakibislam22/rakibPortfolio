"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { ProjectItem } from "@/types/os";
import {
  ExternalLink,
  Search,
  SlidersHorizontal,
  FolderGit2,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
  CheckCircle2
} from "lucide-react";
import { GithubIcon } from "../common/BrandIcons";

export function ProjectsApp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Full Stack", "Frontend"];

  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top File Explorer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <FolderGit2 className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">Projects Explorer</span>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="rounded bg-white/5 px-2 py-0.5 text-cyan-300">
            {selectedCategory}
          </span>
          <span className="text-slate-500">({filteredProjects.length} items)</span>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-7 w-48 rounded-md border border-white/10 bg-black/40 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400/50 focus:outline-none sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 border-b border-white/5 bg-slate-900/40 px-4 py-2 overflow-x-auto">
        <SlidersHorizontal className="mr-1 h-3.5 w-3.5 text-slate-500 shrink-0" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${
              selectedCategory === category
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content Area: Project Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 transition hover:border-cyan-400/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/5 backdrop-blur-sm overflow-hidden"
            >
              <div>
                {/* Project Screenshot Thumbnail */}
                {project.image && (
                  <div className="relative mb-4 h-36 w-full overflow-hidden rounded-lg border border-white/10 bg-slate-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {project.featured && (
                      <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold text-slate-950 shadow-md">
                        <Sparkles className="h-2.5 w-2.5" /> Featured
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {!project.image && (
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                        <Layers className="h-4 w-4" />
                      </span>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-cyan-200 transition">
                        {project.title}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  {!project.image && project.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium text-amber-300">
                      <Sparkles className="h-2.5 w-2.5" /> Featured
                    </span>
                  )}
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-300 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics Pill */}
                {project.metrics && (
                  <div className="mt-2.5 rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-mono text-cyan-300/90 border border-white/5">
                    ⚡ {project.metrics}
                  </div>
                )}

                {/* Tech Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-3">
                <button
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition"
                >
                  <Info className="h-3.5 w-3.5" /> Details
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-cyan-400/40 hover:bg-white/10 hover:text-white"
                      title="View Source Code"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 border border-cyan-400/40 px-3 py-1 text-xs font-semibold text-cyan-200 transition hover:bg-cyan-500/30"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-3 w-3" /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
            <FolderGit2 className="h-12 w-12 text-slate-600 mb-3" />
            <p className="text-sm font-medium">No projects found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search query or filter.
            </p>
          </div>
        )}
      </div>

      {/* Project Detail Modal Overlay */}
      {activeProject && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative max-h-[90%] w-full max-w-lg overflow-y-auto rounded-2xl border border-cyan-400/30 bg-slate-900 p-6 shadow-2xl">
            {activeProject.image && (
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            )}

            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400">
                  {activeProject.category}
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              {activeProject.detailedDescription || activeProject.description}
            </p>

            {activeProject.highlights && (
              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-semibold text-slate-200">Key Features:</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-1.5">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] text-cyan-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t border-white/10 pt-4">
              {activeProject.githubUrl && (
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> View Code
                </a>
              )}
              {activeProject.demoUrl && (
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-400 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-300"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Launch Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
