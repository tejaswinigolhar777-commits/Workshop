import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="w-full border-b-2 border-[#111111] bg-[#f4f4f2] p-3 font-mono text-xs">
      <div className="flex items-center justify-between mb-1.5 text-[#111111]">
        <span className="font-bold uppercase tracking-wider text-[11px] text-[#666666]">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#666666] hover:text-[#d94826] cursor-pointer uppercase text-[11px] font-bold"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder={`Traceback (most recent call last):
  File "solution.py", line 5, in calculate_average
TypeError: unsupported operand type(s) for +=: 'int' and 'list'`}
        className="w-full bg-[#fdfdfd] border border-[#111111] p-2 font-mono text-xs text-[#111111] focus:outline-none resize-none placeholder:text-[#999999]"
      />
    </div>
  );
}
