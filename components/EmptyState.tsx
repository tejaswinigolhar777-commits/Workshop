import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 border-2 border-dashed border-[#111111] bg-[#fdfdfd] flex items-center justify-center font-mono text-2xl font-bold text-[#666666] mb-4 shadow-[2px_2px_0px_#111111]">
        {"{}"}
      </div>
      <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-[#111111] mb-2">
        AWAITING CODE SUBMISSION
      </h3>
      <p className="font-mono text-xs text-[#666666] max-w-sm leading-relaxed">
        Paste your code on the left, then click &quot;ROAST MY CODE&quot; or press Ctrl+Enter (⌘+Enter on Mac).
      </p>
    </div>
  );
}
