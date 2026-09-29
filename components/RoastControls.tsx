"use client";

import React from "react";
import { LANGUAGES, ROAST_LEVELS } from "@/config/app.config";
import { LanguageId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* 1. Roast Level Radio Group */}
      <div className="flex items-center gap-1">
        <span className="text-[#666666] font-mono text-xs hidden lg:inline mr-1">
          Roast Level:
        </span>
        <div className="flex items-center border border-[#111111] bg-[#fdfdfd] p-0.5">
          {ROAST_LEVELS.map((level) => {
            const isSelected = roastLevel === level.id;
            return (
              <label
                key={level.id}
                title={level.description}
                className={`cursor-pointer px-2 py-1 font-mono text-[11px] uppercase transition-none flex items-center gap-1.5 select-none ${
                  isSelected
                    ? "bg-[#111111] text-[#fdfdfd] font-bold"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                <input
                  type="radio"
                  name="roastLevel"
                  value={level.id}
                  checked={isSelected}
                  onChange={() => onRoastLevelChange(level.id)}
                  className="sr-only"
                />
                <span
                  className={`w-2 h-2 rounded-full border border-current flex items-center justify-center ${
                    isSelected ? "bg-[#d94826] border-[#d94826]" : ""
                  }`}
                />
                <span>{level.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Language Selector */}
      <div className="flex items-center gap-1">
        <span className="text-[#666666] font-mono text-xs hidden lg:inline mr-1">
          Language:
        </span>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-[#fdfdfd] border border-[#111111] font-mono text-xs py-1.5 pl-2.5 pr-6 uppercase tracking-wider text-[#111111] focus:outline-none cursor-pointer rounded-none"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1.5 font-mono text-xs text-[#111111]">
            ▾
          </span>
        </div>
      </div>

      {/* 3. Error Drawer Toggle Button */}
      <button
        type="button"
        onClick={onToggleErrorDrawer}
        className={`border border-dashed border-[#111111] px-2.5 py-1.5 font-mono text-xs uppercase cursor-pointer transition-none ${
          errorDrawerOpen
            ? "bg-[#111111] text-[#fdfdfd] font-bold"
            : "bg-transparent text-[#111111] hover:bg-[#e6e6e2]"
        }`}
      >
        {errorDrawerOpen ? "− ERROR MESSAGE" : "+ ERROR MESSAGE"}
      </button>

      {/* 4. Primary CTA Button */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className={`px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#111111] transition-none flex items-center gap-2 cursor-pointer shadow-[3px_3px_0px_#111111] active:translate-x-0.5 active:translate-y-0.5 ${
            isRoasting
              ? "bg-[#666666] text-[#ffffff] cursor-not-allowed animate-pulse"
              : "bg-[#111111] text-[#ffffff] hover:bg-[#d94826] hover:border-[#d94826]"
          }`}
        >
          {isRoasting ? (
            <span>ANALYZING...</span>
          ) : (
            <>
              <span className="w-2 h-2 bg-[#d94826] inline-block" />
              <span>ROAST MY CODE</span>
            </>
          )}
        </button>
        <span className="hidden xl:inline-block border border-[#111111] px-1.5 py-1 font-mono text-[10px] bg-[#f4f4f2] text-[#666666] select-none">
          Ctrl ⏎
        </span>
      </div>
    </div>
  );
}
