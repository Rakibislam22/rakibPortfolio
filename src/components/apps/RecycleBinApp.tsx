"use client";

import React, { useState } from "react";
import { useOS } from "@/context/OSContext";
import { Trash2, AlertTriangle, Bug, Coffee, Sparkles } from "lucide-react";

export function RecycleBinApp() {
  const { themeMode } = useOS();
  const isLight = themeMode === "light";

  const [items, setItems] = useState([
    {
      id: "bug-1",
      name: "undefined_is_not_a_function.bug",
      size: "0 KB",
      deletedDate: "Just now",
      icon: "bug"
    },
    {
      id: "coffee-1",
      name: "midnight_coffee_cup_#42.caffeine",
      size: "500 ml",
      deletedDate: "3:00 AM",
      icon: "coffee"
    },
    {
      id: "loop-1",
      name: "while(true)_infinite_loop.ts",
      size: "∞ MB",
      deletedDate: "Yesterday",
      icon: "alert"
    },
    {
      id: "legacy-1",
      name: "jquery_1.4.2.min.js",
      size: "24 KB",
      deletedDate: "2018",
      icon: "bug"
    }
  ]);

  const [message, setMessage] = useState<string | null>(null);

  const handleEmpty = () => {
    setItems([]);
    setMessage("✨ Recycle bin emptied! Your portfolio is 100% bug-free!");
    setTimeout(() => setMessage(null), 4000);
  };

  const handleRestore = (name: string) => {
    setMessage(`Cannot restore "${name}": Rakib already fixed this bug! 😉`);
    setTimeout(() => setMessage(null), 4000);
  };

  return (
    <div className={`flex h-full flex-col selection:bg-cyan-500/30 ${
      isLight ? "bg-slate-50 text-slate-900" : "bg-slate-950 text-slate-100"
    }`}>
      {/* Top Bar */}
      <div className={`flex items-center justify-between border-b px-4 py-2.5 backdrop-blur-md ${
        isLight ? "border-slate-200 bg-white/80" : "border-white/10 bg-slate-900/80"
      }`}>
        <div className="flex items-center gap-2 text-xs">
          <Trash2 className="h-4 w-4 text-cyan-600" />
          <span className={`font-semibold ${isLight ? "text-slate-800" : "text-slate-200"}`}>
            Recycle Bin
          </span>
          <span className="opacity-60">({items.length} items)</span>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleEmpty}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-semibold border transition ${
              isLight
                ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                : "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20"
            }`}
          >
            <Trash2 className="h-3.5 w-3.5" /> Empty Recycle Bin
          </button>
        )}
      </div>

      {message && (
        <div className={`border-b px-4 py-2 text-xs flex items-center gap-2 animate-in fade-in ${
          isLight
            ? "border-cyan-200 bg-cyan-50 text-cyan-900"
            : "border-cyan-500/20 bg-cyan-950/40 text-cyan-300"
        }`}>
          <Sparkles className="h-4 w-4 text-cyan-500 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
            <Trash2 className="h-12 w-12 text-slate-400 mb-2" />
            <p className={`text-sm font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
              Recycle Bin is Empty
            </p>
            <p className="text-xs opacity-60">
              Zero bugs found. The code is running smoothly!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded-xl p-3 border transition ${
                  isLight
                    ? "border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:bg-slate-50"
                    : "border-white/5 bg-slate-900/50 hover:border-white/10 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    isLight ? "bg-slate-100" : "bg-white/5 text-slate-300"
                  }`}>
                    {item.icon === "bug" ? (
                      <Bug className="h-4 w-4 text-rose-500" />
                    ) : item.icon === "coffee" ? (
                      <Coffee className="h-4 w-4 text-amber-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                  </span>
                  <div>
                    <p className={`text-xs font-medium ${isLight ? "text-slate-900" : "text-slate-200"}`}>
                      {item.name}
                    </p>
                    <p className="text-[10px] opacity-60">
                      {item.size} • Deleted {item.deletedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRestore(item.name)}
                  className={`rounded-lg px-2.5 py-1 text-xs transition border ${
                    isLight
                      ? "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                      : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
