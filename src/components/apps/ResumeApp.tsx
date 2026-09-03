"use client";

import React from "react";
import { useOS } from "@/context/OSContext";
import { portfolioData } from "@/data/portfolioData";
import {
  GraduationCap,
  Download,
  Award,
  MapPin,
  Printer
} from "lucide-react";

export function ResumeApp() {
  const { themeMode } = useOS();
  const isLight = themeMode === "light";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`flex h-full flex-col selection:bg-cyan-500/30 ${
      isLight ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-slate-100"
    }`}>
      {/* Top PDF Toolbar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2.5 backdrop-blur-md ${
        isLight ? "border-slate-300 bg-white/90" : "border-white/10 bg-slate-900/80"
      }`}>
        <div className="flex items-center gap-2 text-xs">
          <GraduationCap className="h-4 w-4 text-cyan-600" />
          <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
            Md_Rakib_Ali_Resume_&amp;_Credentials.pdf
          </span>
          <span className={`rounded px-2 py-0.5 text-[10px] font-semibold border ${
            isLight
              ? "bg-rose-50 text-rose-700 border-rose-200"
              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
          }`}>
            PDF
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/Md_Rakib_Ali_Resume.pdf"
            download="Md_Rakib_Ali_Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-cyan-600 transition shadow-xs"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF Resume
          </a>
          <button
            onClick={handlePrint}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              isLight
                ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Main Resume Document View */}
      <div className={`flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center ${
        isLight ? "bg-slate-200/60" : "bg-slate-950/90"
      }`}>
        <div className={`w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 border ${
          isLight
            ? "border-slate-300 bg-white text-slate-900 shadow-slate-300/60"
            : "border-white/10 bg-slate-900/90 text-slate-100"
        }`}>
          {/* Header */}
          <div className={`border-b pb-6 ${isLight ? "border-slate-200" : "border-white/10"}`}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className={`text-2xl font-bold tracking-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                  {portfolioData.name}
                </h1>
                <p className={`text-sm font-medium mt-0.5 ${isLight ? "text-cyan-700" : "text-cyan-400"}`}>
                  {portfolioData.title}
                </p>
              </div>
              <div className={`text-right text-xs space-y-0.5 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                <p>{portfolioData.email}</p>
                <p>{portfolioData.location}</p>
                {portfolioData.socials.phone && <p>{portfolioData.socials.phone}</p>}
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" /> Academic Background
            </h3>

            <div className="space-y-4">
              {portfolioData.education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-4 space-y-2 border ${
                    isLight
                      ? "border-slate-200 bg-slate-50/70"
                      : "border-white/5 bg-slate-950/50"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
                      {edu.degree}
                    </h4>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                      isLight
                        ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                        : "text-cyan-300 bg-cyan-500/10 border-cyan-500/20"
                    }`}>
                      {edu.duration}
                    </span>
                  </div>

                  <div className={`flex flex-wrap items-center gap-3 text-xs ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                    <span className={`font-medium ${isLight ? "text-slate-800" : "text-slate-300"}`}>{edu.institution}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {edu.location}
                    </span>
                    {edu.gpa && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 font-semibold">
                          Grade: {edu.gpa}
                        </span>
                      </>
                    )}
                  </div>

                  <p className={`text-xs leading-relaxed ${isLight ? "text-slate-700" : "text-slate-300"}`}>
                    {edu.description}
                  </p>

                  {edu.courses && (
                    <div className="pt-2">
                      <span className={`text-[11px] font-semibold block mb-1.5 ${isLight ? "text-slate-700" : "text-slate-400"}`}>
                        Key Study Areas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course, cIdx) => (
                          <span
                            key={cIdx}
                            className={`rounded px-2 py-0.5 text-[10px] border ${
                              isLight
                                ? "bg-white border-slate-200 text-slate-700"
                                : "bg-white/5 border-white/5 text-slate-300"
                            }`}
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
            <div className={`space-y-4 border-t pt-6 ${isLight ? "border-slate-200" : "border-white/10"}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-600 flex items-center gap-2">
                <Award className="h-4 w-4" /> Certifications &amp; Credentials
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {portfolioData.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl p-3.5 space-y-1.5 border ${
                      isLight
                        ? "border-slate-200 bg-slate-50/70"
                        : "border-white/5 bg-slate-950/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-xs font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                        {cert.title}
                      </h4>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isLight
                          ? "bg-cyan-50 text-cyan-800"
                          : "text-cyan-400 bg-cyan-500/10"
                      }`}>
                        {cert.date}
                      </span>
                    </div>
                    <p className={`text-[11px] font-semibold ${isLight ? "text-cyan-700" : "text-cyan-300"}`}>
                      {cert.issuer}
                    </p>
                    <p className={`text-[11px] leading-relaxed ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {cert.skills.map((s) => (
                        <span
                          key={s}
                          className={`rounded px-1.5 py-0.5 text-[9px] ${
                            isLight
                              ? "bg-slate-200/80 text-slate-700"
                              : "bg-white/5 text-slate-300"
                          }`}
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
