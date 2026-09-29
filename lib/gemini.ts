import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const rawMsg = error instanceof Error ? error.message : String(error);

  if (status === 400 || rawMsg.includes("400")) {
    return "Invalid request to AI model. Please verify prompt inputs.";
  }
  if (status === 403 || rawMsg.includes("403") || rawMsg.includes("API_KEY_INVALID")) {
    return "Gemini API key is invalid or unauthorized. Please verify your GEMINI_API_KEY in .env.local.";
  }
  if (status === 404 || rawMsg.includes("404")) {
    return `Model "${AI.model}" not found or unsupported. Check AI.model in config/app.config.ts.`;
  }
  if (status === 429 || rawMsg.includes("429") || rawMsg.includes("RESOURCE_EXHAUSTED")) {
    return "Gemini rate limit exceeded. Please wait a few moments and try again.";
  }
  if (status === 503 || rawMsg.includes("503") || rawMsg.includes("UNAVAILABLE")) {
    return "Gemini AI servers are temporarily overloaded. Please retry in a few seconds.";
  }

  return `Failed to analyze code: ${rawMsg}`;
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const text = response.text;
      if (!text || text.trim().length === 0) {
        throw new Error("Received empty response from Gemini API.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(`Failed to parse AI response as JSON: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`);
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || (typeof err?.message === "string" && err.message.includes("503") ? 503 : undefined);

      if (status === 503 && attempt < AI.maxAttempts) {
        const delayMs = attempt * 1000;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      throw new Error(friendlyErrorMessage(status, err));
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
