"use client";

import React, { useState, useRef, useEffect } from "react";
import { useOS } from "@/context/OSContext";
import { portfolioData } from "@/data/portfolioData";
import { OSType } from "@/types/os";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "ascii";
  text?: string;
  content?: React.ReactNode;
}

interface TerminalAppProps {
  onSwitchOS?: (os: OSType) => void;
}

export function TerminalApp({ onSwitchOS }: TerminalAppProps) {
  const { themeMode, setThemeMode } = useOS();
  const isLight = themeMode === "light";

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "output",
      text: "⚡ RakibOS Terminal v3.2.0 [x86_64-portfolio-kernel]"
    },
    {
      id: "init-2",
      type: "output",
      text: "Type 'help' to see all available commands or 'neofetch' for system overview.\n"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newLines: TerminalLine[] = [
      ...lines,
      {
        id: Math.random().toString(),
        type: "input",
        text: `rakib@portfolio:~$ ${trimmed}`
      }
    ];

    setHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case "help":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-1">
              <p className="text-cyan-500 font-bold">Available Commands:</p>
              <div className="grid grid-cols-[140px_1fr] gap-1 text-xs">
                <span className="text-emerald-500 font-semibold">neofetch</span>
                <span>Display system specs &amp; developer info</span>
                <span className="text-emerald-500 font-semibold">about</span>
                <span>Display bio and engineer summary</span>
                <span className="text-emerald-500 font-semibold">skills</span>
                <span>List technical competencies and levels</span>
                <span className="text-emerald-500 font-semibold">projects</span>
                <span>List featured software projects</span>
                <span className="text-emerald-500 font-semibold">education</span>
                <span>Show degrees, universities &amp; GPA</span>
                <span className="text-emerald-500 font-semibold">contact</span>
                <span>Display email and social channels</span>
                <span className="text-emerald-500 font-semibold">youtube / lofi</span>
                <span>Open video player / Lo-Fi coding beats</span>
                <span className="text-emerald-500 font-semibold">theme &lt;mode/os&gt;</span>
                <span>Switch theme: dark | light | windows | macos | ios | android | ubuntu</span>
                <span className="text-emerald-500 font-semibold">clear</span>
                <span>Clear the terminal screen</span>
                <span className="text-emerald-500 font-semibold">date</span>
                <span>Display current date and time</span>
                <span className="text-emerald-500 font-semibold">whoami</span>
                <span>Display active user info</span>
                <span className="text-emerald-500 font-semibold">sudo</span>
                <span>Execute command with superuser privileges</span>
              </div>
            </div>
          )
        });
        break;

      case "neofetch":
      case "portfolio-fetch":
        newLines.push({
          id: Math.random().toString(),
          type: "ascii",
          content: (
            <div className="grid sm:grid-cols-[200px_1fr] gap-4 my-2 text-xs">
              <pre className="text-cyan-500 text-[10px] leading-tight font-mono select-none">
                {`
   ██████╗  █████╗ ██╗  ██╗██╗██████╗ 
   ██╔══██╗██╔══██╗██║ ██╔╝██║██╔══██╗
   ██████╔╝███████║█████╔╝ ██║██████╔╝
   ██╔══██╗██╔══██║██╔═██╗ ██║██╔══██╗
   ██║  ██║██║  ██║██║  ██╗██║██████╔╝
   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═════╝ 
`}
              </pre>
              <div className="space-y-1">
                <p className="text-white font-bold">{portfolioData.name}</p>
                <p className="text-slate-400">--------------------------</p>
                <p><span className="text-cyan-400 font-semibold">OS:</span> RakibOS v3.2 (x86_64 Multi-OS Kernel)</p>
                <p><span className="text-cyan-400 font-semibold">Host:</span> {portfolioData.location}</p>
                <p><span className="text-cyan-400 font-semibold">Kernel:</span> Next.js 16 (App Router) + React 19</p>
                <p><span className="text-cyan-400 font-semibold">Uptime:</span> 5+ Years Full Stack Experience</p>
                <p><span className="text-cyan-400 font-semibold">Shell:</span> TypeScript 5.8 + Tailwind CSS v4</p>
                <p><span className="text-cyan-400 font-semibold">Theme:</span> {themeMode.toUpperCase()} Mode</p>
                <p><span className="text-cyan-400 font-semibold">Status:</span> {portfolioData.status}</p>
                <div className="flex gap-1.5 pt-2">
                  <span className="h-3 w-3 rounded-full bg-cyan-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-purple-400" />
                  <span className="h-3 w-3 rounded-full bg-rose-400" />
                </div>
              </div>
            </div>
          )
        });
        break;

      case "about":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-2">
              <p className="text-cyan-400 font-bold">{portfolioData.name} — {portfolioData.title}</p>
              <p className="text-slate-300 leading-relaxed">{portfolioData.tagline}</p>
              <p className="text-slate-400 text-xs">{portfolioData.bio[0]}</p>
            </div>
          )
        });
        break;

      case "skills":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-2">
              <p className="text-cyan-400 font-bold">Skills &amp; Tech Stack:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {portfolioData.skillCategories.map((cat) => (
                  <div key={cat.category} className="rounded border border-white/10 p-2 bg-black/30">
                    <p className="text-emerald-400 font-semibold text-xs mb-1">{cat.category}</p>
                    <p className="text-slate-300 text-[11px]">
                      {cat.skills.map((s) => s.name).join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        });
        break;

      case "projects":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-2">
              <p className="text-cyan-400 font-bold">Featured Projects:</p>
              <div className="space-y-1.5">
                {portfolioData.projects.map((p) => (
                  <div key={p.id} className="text-xs">
                    <span className="text-emerald-400 font-semibold">• {p.title}</span>: {p.description} (
                    <span className="text-cyan-300">{p.tags.slice(0, 3).join(", ")}</span>)
                  </div>
                ))}
              </div>
            </div>
          )
        });
        break;

      case "youtube":
      case "lofi":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: "▶ Launching YouTube Studio & Lo-Fi Coding Player... Enjoy the beats!"
        });
        break;

      case "education":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-2">
              <p className="text-cyan-400 font-bold">Education Credentials:</p>
              {portfolioData.education.map((edu, idx) => (
                <div key={idx} className="text-xs">
                  <p className="font-semibold text-white">{edu.degree} — {edu.institution}</p>
                  <p className="text-slate-400">{edu.duration} • Grade: {edu.gpa}</p>
                </div>
              ))}
            </div>
          )
        });
        break;

      case "contact":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-1 text-xs">
              <p className="text-cyan-400 font-bold">Contact Channels:</p>
              <p>Email: <a href={`mailto:${portfolioData.email}`} className="text-cyan-300 underline">{portfolioData.email}</a></p>
              <p>GitHub: <a href={portfolioData.socials.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{portfolioData.socials.github}</a></p>
              <p>LinkedIn: <a href={portfolioData.socials.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{portfolioData.socials.linkedin}</a></p>
            </div>
          )
        });
        break;

      case "theme":
        const target = args[0]?.toLowerCase();
        if (target === "light" || target === "dark") {
          setThemeMode(target);
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: `✓ Switched appearance theme to ${target.toUpperCase()} MODE.`
          });
        } else if (
          target === "windows" ||
          target === "macos" ||
          target === "ios" ||
          target === "android" ||
          target === "ubuntu"
        ) {
          onSwitchOS?.(target as OSType);
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: `✓ Switched desktop environment to ${target}.`
          });
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: "error",
            text: "Usage: theme [light | dark | windows | macos | ios | android | ubuntu]"
          });
        }
        break;

      case "clear":
        setLines([]);
        return;

      case "date":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: new Date().toString()
        });
        break;

      case "whoami":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: "guest@rakib-portfolio (Role: Recruiter / Developer / Collaborator)"
        });
        break;

      case "sudo":
        newLines.push({
          id: Math.random().toString(),
          type: "error",
          text: "Permission denied: You are already a guest VIP with maximum access!"
        });
        break;

      case "matrix":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          text: "Wake up, Neo... Follow the white rabbit 🐇"
        });
        break;

      default:
        newLines.push({
          id: Math.random().toString(),
          type: "error",
          text: `Command not found: ${command}. Type 'help' for a list of commands.`
        });
        break;
    }

    setLines(newLines);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`flex h-full flex-col font-mono text-xs p-4 overflow-y-auto cursor-text ${isLight
          ? "bg-slate-900 text-slate-100 selection:bg-emerald-500/40"
          : "bg-slate-950/95 text-slate-200 selection:bg-emerald-500/40"
        }`}
    >
      <div className="space-y-2">
        {lines.map((line) => (
          <div key={line.id}>
            {line.type === "input" && (
              <p className="text-cyan-400 font-semibold">{line.text}</p>
            )}
            {line.type === "output" && (
              <div className="text-slate-300 leading-relaxed">
                {line.content || line.text}
              </div>
            )}
            {line.type === "error" && (
              <p className="text-rose-400">{line.text}</p>
            )}
            {line.type === "ascii" && line.content}
          </div>
        ))}
      </div>

      {/* Active Prompt Line */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-emerald-400 font-bold shrink-0">
          rakib@portfolio:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-transparent text-slate-100 outline-none border-none caret-emerald-400 font-mono text-xs"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
