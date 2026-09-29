"use client";

import React, { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langInfo = LANGUAGES.find((l) => l.id === language);
  const ext = langInfo?.extension ?? "txt";
  const fakeFilename = `solution.${ext}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const getCopyLabel = () => {
    switch (copyStatus) {
      case "copied":
        return "✓ COPIED TO CLIPBOARD";
      case "failed":
        return "✕ COPY BLOCKED, SELECT MANUALLY";
      default:
        return "📋 COPY FIXED CODE";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="font-mono text-xs font-bold text-[#059669]">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-[#111111] bg-[#fdfdfd] shadow-[2px_2px_0px_#111111]">
        {/* Filename Header Strip */}
        <div className="flex items-center justify-between border-b border-[#111111] bg-[#f4f4f2] px-3 py-1.5 font-mono text-xs">
          <span className="text-[#111111] font-semibold">{fakeFilename}</span>
          <span className="text-[#059669] font-bold text-[11px] tracking-wider">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <div className="p-3 bg-[#fdfdfd] overflow-x-auto text-xs font-mono leading-relaxed">
          <pre className="whitespace-pre m-0 text-[#111111]">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Buttons Action Strip */}
      <div className="flex flex-wrap gap-2 mt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="px-3 py-2 border-2 border-[#111111] bg-[#fdfdfd] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#111111] hover:text-[#fdfdfd] active:translate-x-0.5 active:translate-y-0.5 transition-none shadow-[2px_2px_0px_#111111]"
        >
          {getCopyLabel()}
        </button>
        <button
          type="button"
          onClick={() => onApply(code)}
          className="px-3 py-2 border-2 border-[#111111] bg-[#fdfdfd] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#111111] hover:text-[#fdfdfd] active:translate-x-0.5 active:translate-y-0.5 transition-none shadow-[2px_2px_0px_#111111]"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
