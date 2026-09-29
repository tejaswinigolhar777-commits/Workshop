import React from "react";
import { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityConfig: Record<
  Severity,
  { label: string; badgeClasses: string; stripeClasses: string }
> = {
  "FATAL BUG": {
    label: "[CRITICAL]",
    badgeClasses: "bg-[#d94826]/10 text-[#d94826] border-[#d94826]",
    stripeClasses: "border-l-4 border-l-[#d94826]",
  },
  "CODE SMELL": {
    label: "[WARN]",
    badgeClasses: "bg-[#d97706]/10 text-[#d97706] border-[#d97706]",
    stripeClasses: "border-l-4 border-l-[#d97706]",
  },
  OPTIMIZATION: {
    label: "[PERF]",
    badgeClasses: "bg-[#059669]/10 text-[#059669] border-[#059669]",
    stripeClasses: "border-l-4 border-l-[#059669]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const config = severityConfig[issue.severity] || severityConfig["FATAL BUG"];

  return (
    <div className="border border-[#111111] bg-[#fdfdfd] p-3 shadow-[2px_2px_0px_#111111] flex flex-col gap-2">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
        <div className="flex items-center gap-2">
          <span className="bg-[#111111] text-[#fdfdfd] px-1.5 py-0.5 font-mono text-[10px] font-bold">
            #{paddedIndex}
          </span>
          <span className="font-mono font-bold text-[#111111]">
            LINE {issue.line}
          </span>
          <span
            className={`border px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase ${config.badgeClasses}`}
          >
            {config.label} {issue.severity}
          </span>
        </div>
        <span className="text-[#666666] font-mono text-xs text-right break-words flex-1 min-w-[120px]">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet Box */}
      <div className={`bg-[#f4f4f2] border border-[#e6e6e2] p-2 text-xs font-mono overflow-x-auto ${config.stripeClasses}`}>
        <pre className="whitespace-pre m-0 text-[#111111]">
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>

      {/* Diagnosis & Expected */}
      <div className="flex flex-col gap-1 text-xs font-mono mt-1">
        <div className="text-[#d94826] leading-relaxed">
          <span className="font-bold mr-1.5">✕ Diagnosis:</span>
          <span className="text-[#333333]">{issue.diagnosis}</span>
        </div>
        <div className="text-[#059669] leading-relaxed">
          <span className="font-bold mr-1.5">✓ Expected:</span>
          <span className="text-[#333333]">{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
