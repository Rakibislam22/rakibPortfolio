"use client";

import React, { useState } from "react";
import { Trash2, RotateCcw, AlertTriangle, Bug, Coffee, Sparkles } from "lucide-react";

export function RecycleBinApp() {
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
    <div className="flex h-full flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs">
          <Trash2 className="h-4 w-4 text-cyan-400" />
          <span className="font-semibold text-slate-200">Recycle Bin</span>
          <span className="text-slate-500">({items.length} items)</span>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleEmpty}
            className="flex items-center gap-1.5 rounded-lg bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition"
          >
            <Trash2 className="h-3.5 w-3.5" /> Empty Recycle Bin
          </button>
        )}
      </div>

      {message && (
        <div className="border-b border-cyan-500/20 bg-cyan-950/40 px-4 py-2 text-xs text-cyan-300 flex items-center gap-2 animate-in fade-in">
          <Sparkles className="h-4 w-4 text-cyan-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 space-y-2">
            <Trash2 className="h-12 w-12 text-slate-600 mb-2" />
            <p className="text-sm font-semibold text-white">Recycle Bin is Empty</p>
            <p className="text-xs text-slate-500">
              Zero bugs found. The code is running smoothly!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/50 p-3 hover:border-white/10 hover:bg-slate-900 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-300">
                    {item.icon === "bug" ? (
                      <Bug className="h-4 w-4 text-rose-400" />
                    ) : item.icon === "coffee" ? (
                      <Coffee className="h-4 w-4 text-amber-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Deleted: {item.deletedDate} • Size: {item.size}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRestore(item.name)}
                  className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/10 hover:text-white transition"
                >
                  <RotateCcw className="h-3 w-3" /> Restore
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

