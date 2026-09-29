"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const langInfo = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langInfo?.label ?? "Plain Text";

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const pos = target.selectionStart || 0;
    const textBefore = target.value.slice(0, pos);
    const subLines = textBefore.split("\n");
    const currentLine = subLines.length;
    const currentCol = (subLines[subLines.length - 1]?.length || 0) + 1;
    setCursor({ line: currentLine, col: currentCol });
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.setRangeText("    ", start, end, "end");
      onChange(textarea.value);

      // Recompute cursor
      const textBefore = textarea.value.slice(0, start + 4);
      const subLines = textBefore.split("\n");
      setCursor({
        line: subLines.length,
        col: (subLines[subLines.length - 1]?.length || 0) + 1,
      });
    }
  };

  const handleClear = () => {
    onChange("");
    setCursor({ line: 1, col: 1 });
  };

  return (
    <div className="w-full lg:w-[54%] border-r-0 lg:border-r-2 border-[#111111] flex flex-col bg-[#fdfdfd] relative min-h-[420px] lg:min-h-[580px]">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-[#111111] bg-[#f4f4f2] px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#111111] inline-block" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#666666]">
            INPUT // SRC
          </span>
        </div>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
          Your Code
        </span>
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-[#d94826] font-bold hover:underline cursor-pointer"
          >
            [SAMPLE BUG]
          </button>
          <span className="text-[#cccccc]">|</span>
          <button
            type="button"
            onClick={handleClear}
            className="text-[#666666] hover:text-[#111111] cursor-pointer"
          >
            [CLEAR]
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 flex relative overflow-hidden bg-[#fdfdfd]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="w-12 bg-[#f4f4f2] border-r border-[#e6e6e2] py-3 pr-2 text-right select-none font-mono text-xs text-[#999999] overflow-hidden leading-6 flex flex-col"
        >
          {lineNumbers.map((num) => {
            const isError = errorLine === num;
            return (
              <span
                key={num}
                className={
                  isError
                    ? "text-[#d94826] font-bold bg-[#d94826]/20 block -mr-2 pr-2"
                    : "block"
                }
              >
                {String(num).padStart(2, "0")}
              </span>
            );
          })}
        </div>

        {/* Textarea Area */}
        <div className="flex-1 relative h-full">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleSelect}
            onKeyUp={handleSelect}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            placeholder="// Paste your code here..."
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="w-full h-full p-3 font-mono text-xs leading-6 resize-none focus:outline-none bg-transparent text-[#111111] whitespace-pre overflow-auto"
            style={{
              tabSize: 4,
            }}
          />
        </div>
      </div>

      {/* Bottom Status Strip Overlay */}
      <div className="hidden sm:flex h-8 border-t border-[#111111] bg-[#f4f4f2] px-3 items-center justify-between font-mono text-[11px] text-[#666666] select-none">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </div>
        <div>UTF-8 · Tab Size: 4</div>
      </div>
    </div>
  );
}
