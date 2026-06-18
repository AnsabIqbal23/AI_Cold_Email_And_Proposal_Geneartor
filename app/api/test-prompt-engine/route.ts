import { generateCompletion } from "@/lib/llm";
import { assemblePrompt, parseProposalResponse } from "@/lib/prompt-engine";
import type { GeneratorInput, Framework, Tone, OutputMode } from "@/lib/types";

const SAMPLE_BUSINESS_INFO = {
  service: "commission-free online ordering websites for restaurants",
  targetCompany: "Mario's Pizzeria",
  targetIndustry: "food and beverage",
  painPoint: "paying high commissions on every order through third-party delivery platforms",
  keyBenefit: "own your ordering channel, keep 100% of each sale, usually live within a week",
  personalizationHook: "They recently left Foodpanda and are now taking orders by phone only",
};

const VALID_FRAMEWORKS: Framework[] = ["pas", "aida", "bab"];
const VALID_TONES: Tone[] = ["direct", "friendly", "formal", "professional", "consultative"];
const VALID_MODES: OutputMode[] = ["email", "proposal"];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const framework = (searchParams.get("framework") ?? "pas") as Framework;
  const tone = (searchParams.get("tone") ?? "direct") as Tone;
  const outputMode = (searchParams.get("outputMode") ?? "email") as OutputMode;

  if (!VALID_FRAMEWORKS.includes(framework)) {
    return Response.json({ ok: false, error: `Invalid framework. Use: ${VALID_FRAMEWORKS.join(", ")}` }, { status: 400 });
  }
  if (!VALID_TONES.includes(tone)) {
    return Response.json({ ok: false, error: `Invalid tone. Use: ${VALID_TONES.join(", ")}` }, { status: 400 });
  }
  if (!VALID_MODES.includes(outputMode)) {
    return Response.json({ ok: false, error: `Invalid outputMode. Use: ${VALID_MODES.join(", ")}` }, { status: 400 });
  }

  const input: GeneratorInput = {
    businessInfo: SAMPLE_BUSINESS_INFO,
    framework,
    tone,
    outputMode,
  };

  const { systemPrompt, userPrompt } = assemblePrompt(input);

  try {
    const raw = await generateCompletion({ systemPrompt, userPrompt });
    // Attach assembled prompts for debugging on success too

    if (outputMode === "proposal") {
      const parsed = parseProposalResponse(raw);
      return Response.json({
        ok: true,
        framework,
        tone,
        outputMode,
        raw,
        parsed,
        parseSuccess: parsed !== null,
        debug: { systemPrompt, userPrompt },
      });
    }

    return Response.json({ ok: true, framework, tone, outputMode, content: raw, debug: { systemPrompt, userPrompt } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ ok: false, error: message, debug: { systemPrompt, userPrompt } }, { status: 500 });
  }
}
