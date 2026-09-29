import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 border-2 border-[#d94826] bg-[#fdfdfd] flex items-center justify-center font-mono text-2xl font-bold text-[#d94826] mb-4 shadow-[2px_2px_0px_#d94826]">
        !
      </div>
      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#d94826] mb-2">
        ANALYSIS FAILED
      </h3>
      <div className="bg-[#fdfdfd] border border-[#d94826] p-3 max-w-md w-full mb-4 text-left font-mono text-xs text-[#d94826] break-words shadow-[2px_2px_0px_#111111]">
        {error || "An unknown error occurred during code evaluation."}
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 border-2 border-[#111111] bg-[#d94826] text-[#fdfdfd] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#111111] active:translate-x-0.5 active:translate-y-0.5 transition-none shadow-[2px_2px_0px_#111111]"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
