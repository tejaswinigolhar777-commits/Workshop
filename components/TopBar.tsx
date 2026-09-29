import React from "react";
import { APP } from "@/config/app.config";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-[#111111] bg-[#f4f4f2] px-4 py-2.5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      {/* Left: App Brand & Version */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#d94826] inline-block" />
          <h1 className="font-sans font-bold text-sm sm:text-base tracking-wider uppercase text-[#111111] m-0">
            {APP.name}
          </h1>
        </div>
        <span className="border border-[#111111] px-1.5 py-0.5 font-mono text-[10px] bg-[#fdfdfd] text-[#111111] tracking-widest font-semibold">
          [{APP.version.toUpperCase()}]
        </span>
      </div>

      {/* Right: Controls passed as children */}
      <div className="flex items-center justify-end font-mono text-xs">
        {children}
      </div>
    </header>
  );
}
