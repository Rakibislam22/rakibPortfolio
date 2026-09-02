"use client";

import React from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  GraduationCap,
  Download,
  Award,
  MapPin
} from "lucide-react";

export function ResumeApp() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top PDF Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <GraduationCap className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">
            Md_Rakib_Ali_Resume_&_Credentials.pdf
          </span>
          <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-400 border border-rose-500/20">
            PDF
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/Md_Rakib_Ali_Resume.pdf"
            download="Md_Rakib_Ali_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-300 transition shadow-sm"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF Resume
          </a>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
          >
            Print
          </button>
        </div>
      </div>

      {/* Main Resume Document View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-slate-950/90">
        <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900/90 p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                  {portfolioData.name}
                </h1>
                <p className="text-sm font-medium text-cyan-400 mt-0.5">
                  {portfolioData.title}
                </p>
              </div>
              <div className="text-right text-xs text-slate-400 space-y-0.5">
                <p>{portfolioData.email}</p>
                <p>{portfolioData.location}</p>
                {portfolioData.socials.phone && <p>{portfolioData.socials.phone}</p>}
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Academic Background
            </h3>

            <div className="space-y-4">
              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-slate-950/50 p-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {edu.duration}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="font-medium text-slate-300">{edu.institution}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {edu.location}
                    </span>
                    {edu.gpa && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">
                          Grade: {edu.gpa}
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {edu.description}
                  </p>

                  {edu.courses && (
                    <div className="pt-2">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                        Key Study Areas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className="rounded bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] text-slate-300"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          {portfolioData.certifications && (
            <div className="space-y-4 border-t border-white/10 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Award className="h-4 w-4" /> Certifications & Credentials
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {portfolioData.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/5 bg-slate-950/50 p-3.5 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white">
                        {cert.title}
                      </h4>
                      <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-1.5 py-0.5 rounded">
                        {cert.date}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-cyan-300">
                      {cert.issuer}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
