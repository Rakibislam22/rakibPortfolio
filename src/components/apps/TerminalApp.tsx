"use client";

import React, { useState, useRef, useEffect } from "react";
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
            <div className="space-y-1 text-slate-300">
              <p className="text-cyan-300 font-bold">Available Commands:</p>
              <div className="grid grid-cols-[140px_1fr] gap-1 text-xs">
                <span className="text-emerald-400">neofetch</span>
                <span>Display system specs & developer info</span>
                <span className="text-emerald-400">about</span>
                <span>Display bio and engineer summary</span>
                <span className="text-emerald-400">skills</span>
                <span>List technical competencies and levels</span>
                <span className="text-emerald-400">projects</span>
                <span>List featured software projects</span>
                <span className="text-emerald-400">education</span>
                <span>Show degrees, universities & GPA</span>
                <span className="text-emerald-400">contact</span>
                <span>Display email and social channels</span>
                <span className="text-emerald-400">theme &lt;os&gt;</span>
                <span>Switch OS theme (windows | macos | ios | android | ubuntu)</span>
                <span className="text-emerald-400">clear</span>
                <span>Clear the terminal screen</span>
                <span className="text-emerald-400">date</span>
                <span>Display current date and time</span>
                <span className="text-emerald-400">whoami</span>
                <span>Display active user info</span>
                <span className="text-emerald-400">sudo</span>
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
            <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs my-2">
              <pre className="text-cyan-400 leading-tight select-none">
                {`   _____       _    _ _     
  |  __ \\     | |  (_) |    
  | |__) |__ _| | ___| |__  
  |  _  // _\` | |/ / | '_ \\ 
  | | \\ \\ (_| |   <| | |_) |
  |_|  \\_\\__,_|_|\\_\\_|_.__/ `}
              </pre>
              <div className="space-y-0.5 text-slate-300">
                <p className="text-cyan-300 font-bold">{portfolioData.name} @ Portfolio</p>
                <p className="text-slate-500">-------------------------------</p>
                <p><span className="text-emerald-400">Role:</span> {portfolioData.title}</p>
                <p><span className="text-emerald-400">Stack:</span> React 19 / Next.js 16 / Node.js / MongoDB</p>
                <p><span className="text-emerald-400">Location:</span> {portfolioData.location}</p>
                <p><span className="text-emerald-400">LeetCode:</span> 150+ Problems Solved</p>
                <p><span className="text-emerald-400">Status:</span> {portfolioData.status}</p>
                <div className="flex gap-1 pt-1">
                  <span className="h-3 w-3 bg-red-500 rounded-sm" />
                  <span className="h-3 w-3 bg-green-500 rounded-sm" />
                  <span className="h-3 w-3 bg-yellow-500 rounded-sm" />
                  <span className="h-3 w-3 bg-blue-500 rounded-sm" />
                  <span className="h-3 w-3 bg-purple-500 rounded-sm" />
                  <span className="h-3 w-3 bg-cyan-500 rounded-sm" />
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
            <div className="space-y-2 text-slate-300">
              <p className="text-cyan-300 font-semibold">{portfolioData.name} - {portfolioData.title}</p>
              {portfolioData.bio.map((p, i) => (
                <p key={i} className="text-xs">{p}</p>
              ))}
            </div>
          )
        });
        break;

      case "skills":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-2 text-slate-300">
              <p className="text-cyan-300 font-semibold">Technical Stack:</p>
              <div className="space-y-1 text-xs">
                {portfolioData.skillCategories.map((c) => (
                  <p key={c.category}>
                    <span className="text-emerald-400">{c.category}:</span>{" "}
                    {c.skills.map((s) => s.name).join(", ")}
                  </p>
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
            <div className="space-y-2 text-slate-300">
              <p className="text-cyan-300 font-semibold">Featured Projects:</p>
              <div className="space-y-1.5 text-xs">
                {portfolioData.projects.map((p) => (
                  <div key={p.id}>
                    <p className="text-white font-medium">⚡ {p.title} [{p.category}]</p>
                    <p className="text-slate-400 pl-4">{p.description}</p>
                    <p className="text-cyan-400/80 pl-4">Stack: {p.tags.join(" • ")}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        });
        break;

      case "education":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-2 text-slate-300 text-xs">
              <p className="text-cyan-300 font-semibold">Academic History:</p>
              {portfolioData.education.map((e, idx) => (
                <div key={idx}>
                  <p className="text-white font-medium">{e.degree} ({e.duration})</p>
                  <p className="text-slate-400">{e.institution} - GPA: {e.gpa}</p>
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
            <div className="space-y-1 text-slate-300 text-xs">
              <p className="text-cyan-300 font-semibold">Contact Coordinates:</p>
              <p><span className="text-emerald-400">Email:</span> {portfolioData.email}</p>
              {portfolioData.socials.phone && (
                <p><span className="text-emerald-400">Phone:</span> {portfolioData.socials.phone}</p>
              )}
              <p><span className="text-emerald-400">GitHub:</span> {portfolioData.socials.github}</p>
              <p><span className="text-emerald-400">LinkedIn:</span> {portfolioData.socials.linkedin}</p>
              <p><span className="text-emerald-400">Twitter:</span> {portfolioData.socials.twitter}</p>
              {portfolioData.socials.leetcode && (
                <p><span className="text-emerald-400">LeetCode:</span> {portfolioData.socials.leetcode}</p>
              )}
              {portfolioData.socials.facebook && (
                <p><span className="text-emerald-400">Facebook:</span> {portfolioData.socials.facebook}</p>
              )}
            </div>
          )
        });
        break;

      case "youtube":
      case "lofi":
      case "media":
        newLines.push({
          id: Math.random().toString(),
          type: "output",
          content: (
            <div className="space-y-1 text-slate-300 text-xs">
              <p className="text-rose-400 font-semibold">▶ YouTube DevStudio & Lo-Fi Beats:</p>
              <p>• Launch the YouTube app from desktop or dock to listen to live Lo-Fi Beats and watch ConvoX demos.</p>
              <p className="text-slate-400 font-mono">Stream: Lofi Hip Hop Radio 📚 Beats to Relax / Study / Code to</p>
            </div>
          )
        });
        break;

      case "theme":
        const targetOS = args[0]?.toLowerCase() as OSType;
        if (
          targetOS === "windows" ||
          targetOS === "macos" ||
          targetOS === "ios" ||
          targetOS === "android" ||
          targetOS === "ubuntu"
        ) {
          onSwitchOS?.(targetOS);
          newLines.push({
            id: Math.random().toString(),
            type: "output",
            text: `✓ Switched desktop theme to ${targetOS}.`
          });
        } else {
          newLines.push({
            id: Math.random().toString(),
            type: "error",
            text: "Usage: theme [windows | macos | ios | android | ubuntu]"
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
      className="flex h-full flex-col bg-slate-950/95 font-mono text-xs text-slate-200 selection:bg-emerald-500/40 p-4 overflow-y-auto cursor-text"
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
