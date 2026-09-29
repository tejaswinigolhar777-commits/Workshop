import React from "react";
import { AI, APP } from "@/config/app.config";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-[#111111] bg-[#f4f4f2] px-4 py-2 flex flex-col gap-1 select-none font-mono text-xs">
      {/* Primary Status Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-[#666666]">
        <div className="flex items-center gap-2">
          <span>STATUS:</span>
          {isRoasting ? (
            <span className="text-[#d97706] font-bold animate-pulse">
              ● PROCESSING...
            </span>
          ) : (
            <span className="text-[#059669] font-bold">
              ● ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}
          <span className="hidden sm:inline text-[#999999]">|</span>
          <span className="hidden sm:inline text-[#666666]">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="text-[#111111] font-bold uppercase tracking-wider">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Sub-status Workshop attribution */}
      <div className="text-center text-[10px] text-[#888888] pt-0.5 border-t border-[#e6e6e2] mt-0.5">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
