import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[CHECK] Testing Gemini API integration with model: ${AI.model}`);
  console.log(`[CHECK] Submitting sample Python snippet...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n================ ROAST SUCCESS ================");
    console.log(`Roast:\n${result.roast}\n`);
    console.log(`Issues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  [#${idx + 1}] Line ${issue.line} [${issue.severity}]: ${issue.title}`);
      console.log(`      Diagnosis: ${issue.diagnosis}`);
      console.log(`      Expected:  ${issue.expected}`);
    });
    console.log(`\nTakeaway:\n${result.takeaway}`);
    console.log("================================================\n");
    console.log("API check passed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n[ERROR] API check failed:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
