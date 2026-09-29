"use client";

import React from "react";
import { ReportState, RoastLevel, LanguageId, RoastResult } from "@/types/roast";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  return (
    <div className="w-full lg:w-[46%] flex flex-col bg-[#fdfdfd] border-t-2 lg:border-t-0 border-[#111111]">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-[#111111] bg-[#f4f4f2] px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#d94826] inline-block" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#666666]">
            AUDIT // REPORT
          </span>
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
          Roast Report
        </span>
        <div className="w-16" />
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}
        {state === "results" && result && (
          <div className="p-4 flex flex-col gap-6">
            {/* Section 1: Roast */}
            <div className="flex flex-col">
              <SectionHeader number={1} title="Roast">
                <span className="font-mono text-xs text-[#666666] uppercase">
                  STYLE: {roastLevel}
                </span>
              </SectionHeader>
              <blockquote className="m-0 p-3 bg-[#f5f5f3] border-l-4 border-l-[#d94826] font-mono text-xs sm:text-sm text-[#111111] leading-relaxed italic">
                &ldquo;{result.roast}&rdquo;
              </blockquote>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="flex flex-col">
              <SectionHeader number={2} title="What's Wrong">
                <span className="font-mono text-xs text-[#666666] uppercase">
                  {result.issues.length}{" "}
                  {result.issues.length === 1 ? "ISSUE" : "ISSUES"}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="p-3 bg-[#059669]/10 border border-[#059669] font-mono text-xs text-[#059669] font-bold">
                  ✓ No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix */}
            {result.correctedCode && result.correctedCode.trim().length > 0 && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Dynamic Section: Takeaway */}
            {result.takeaway && result.takeaway.trim().length > 0 && (
              <div className="flex flex-col">
                <SectionHeader
                  number={
                    result.correctedCode &&
                    result.correctedCode.trim().length > 0
                      ? 4
                      : 3
                  }
                  title="Takeaway"
                />
                <p className="font-mono text-xs sm:text-sm text-[#111111] leading-relaxed bg-[#f4f4f2] border border-[#e6e6e2] p-3 m-0">
                  {result.takeaway}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
