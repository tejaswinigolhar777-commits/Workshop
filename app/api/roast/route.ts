import { NextRequest, NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel } from "@/types/roast";

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request body." },
      { status: 400 }
    );
  }

  const rawCode = typeof body?.code === "string" ? body.code : "";
  const rawErrorMessage = typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validation in order
  if (!rawCode || rawCode.trim().length === 0) {
    return NextResponse.json(
      { error: "No code provided." },
      { status: 400 }
    );
  }

  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallback language & roastLevel to DEFAULTS if invalid
  const validLanguageIds = LANGUAGES.map((l) => l.id);
  const language: LanguageId = validLanguageIds.includes(body?.language)
    ? body.language
    : DEFAULTS.language;

  const validRoastLevels = ROAST_LEVELS.map((r) => r.id);
  const roastLevel: RoastLevel = validRoastLevels.includes(body?.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      code: rawCode,
      errorMessage: rawErrorMessage || undefined,
      language,
      roastLevel,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("[API_ROAST_ERROR]", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error while analyzing code." },
      { status: 500 }
    );
  }
}
