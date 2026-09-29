import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 border-2 border-[#111111] bg-[#fdfdfd] flex items-center justify-center font-mono text-xl font-bold text-[#d94826] mb-4 shadow-[2px_2px_0px_#111111]">
        <span className="inline-block animate-spin font-mono">/</span>
      </div>
      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#d94826] mb-2 animate-pulse">
        ANALYZING CODE
      </h3>
      <p className="font-mono text-xs text-[#666666] max-w-sm leading-relaxed">
        Evaluating computational complexity and architectural purity...
      </p>
    </div>
  );
}
