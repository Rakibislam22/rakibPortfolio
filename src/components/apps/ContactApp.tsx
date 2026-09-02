"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import {
  Mail,
  Send,
  Copy,
  Check,
  MapPin,
  Sparkles,
  Phone,
  Code2
} from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon
} from "../common/BrandIcons";

export function ContactApp() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate sending / opening mail client
    const mailto = `mailto:${portfolioData.email}?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;
    window.location.href = mailto;
    setIsSubmitted(true);
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top Mail App Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <Mail className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">Mail & Contact Client</span>
          <span className="text-[11px] text-slate-500">— New Message</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Online & Responsive</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: Contact Form */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-sm">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="h-4 w-4 text-cyan-400" /> Send a Message
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Have an idea, project inquiry, or just want to connect? Fill out this
              card or shoot me an email directly.
            </p>

            {isSubmitted ? (
              <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-6 text-center space-y-2">
                <Sparkles className="h-8 w-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-semibold text-white">Message Prepared!</h4>
                <p className="text-xs text-slate-300">
                  Your default mail client has opened. If it didn&apos;t open automatically,
                  copy the email below.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 rounded-lg bg-emerald-500/20 px-4 py-1.5 text-xs text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                >
                  Write Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-8 w-full rounded-lg border border-white/10 bg-black/40 px-3 text-xs text-white placeholder-slate-600 focus:border-cyan-400/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-8 w-full rounded-lg border border-white/10 bg-black/40 px-3 text-xs text-white placeholder-slate-600 focus:border-cyan-400/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="h-8 w-full rounded-lg border border-white/10 bg-black/40 px-3 text-xs text-white placeholder-slate-600 focus:border-cyan-400/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-cyan-400/60 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 py-2.5 text-xs font-bold text-slate-950 hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
                >
                  <Send className="h-3.5 w-3.5" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Direct Channels & Socials */}
        <div className="space-y-4">
          {/* Quick Copy Email Card */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Direct Contact
            </h4>

            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950 p-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-slate-200 truncate">
                  {portfolioData.email}
                </span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="ml-2 flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1 text-xs text-slate-200 hover:bg-white/20 transition shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </>
                )}
              </button>
            </div>

            {portfolioData.socials.phone && (
              <div className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-slate-950 p-3 text-xs text-slate-200 font-mono">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{portfolioData.socials.phone}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="h-3.5 w-3.5 text-slate-500" />
              <span>{portfolioData.location}</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-sm">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3">
              Connect Across the Web
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs text-slate-300 hover:border-cyan-400/40 hover:text-white transition"
              >
                <GithubIcon className="h-4 w-4 text-white" />
                <span>GitHub</span>
              </a>

              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs text-slate-300 hover:border-cyan-400/40 hover:text-white transition"
              >
                <LinkedinIcon className="h-4 w-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={portfolioData.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs text-slate-300 hover:border-cyan-400/40 hover:text-white transition"
              >
                <TwitterIcon className="h-4 w-4 text-cyan-400" />
                <span>Twitter / X</span>
              </a>

              {portfolioData.socials.leetcode && (
                <a
                  href={portfolioData.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-300 hover:bg-amber-500/20 transition"
                >
                  <Code2 className="h-4 w-4 text-amber-400" />
                  <span>LeetCode</span>
                </a>
              )}

              {portfolioData.socials.facebook && (
                <a
                  href={portfolioData.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-xs text-blue-300 hover:bg-blue-500/20 transition"
                >
                  <FacebookIcon className="h-4 w-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
              )}

              {portfolioData.socials.instagram && (
                <a
                  href={portfolioData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-pink-500/20 bg-pink-500/10 p-3 text-xs text-pink-300 hover:bg-pink-500/20 transition"
                >
                  <InstagramIcon className="h-4 w-4 text-pink-400" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
