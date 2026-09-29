import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "Witty Hinglish roast commentary with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "List of code issues identified.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number in submitted code.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity of the issue.",
          },
          title: {
            type: Type.STRING,
            description: "Concise title describing the issue in Hinglish with emoji.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Exact line or snippet of problematic code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Why this code is broken or smells, in Hinglish.",
          },
          expected: {
            type: Type.STRING,
            description: "What the code should have done, in Hinglish.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete corrected code without markdown code blocks.",
    },
    takeaway: {
      type: Type.STRING,
      description: "Short closing advice/takeaway in Hinglish with emoji.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
