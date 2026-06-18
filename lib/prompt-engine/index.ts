import type { GeneratorInput, CompletionOptions, ProposalContent } from "../types";
import { frameworkFragments } from "./frameworks";
import { toneModifiers } from "./tones";
import { buildFewShotBlock } from "./examples/email-examples";
import { emailModeInstructions } from "./modes/email";
import { proposalModeInstructions } from "./modes/proposal";

export function assemblePrompt(input: GeneratorInput): CompletionOptions {
  const { businessInfo, framework, tone, outputMode } = input;

  const role =
    outputMode === "email"
      ? "You are an expert direct-response copywriter specializing in cold email outreach for freelancers and small sales teams."
      : "You are an expert business writer specializing in concise, persuasive project proposals.";

  const parts: string[] = [
    role,
    "",
    frameworkFragments[framework](),
    "",
    toneModifiers[tone],
    "",
    outputMode === "email" ? emailModeInstructions() : proposalModeInstructions(),
  ];

  if (outputMode === "email") {
    parts.push("", buildFewShotBlock());
  }

  const systemPrompt = parts.join("\n").trimEnd();

  const hookLine = businessInfo.personalizationHook
    ? `\nPersonalization hook (use this to make the opening feel specific to this prospect): ${businessInfo.personalizationHook}`
    : "";

  const outputLabel = outputMode === "email" ? "cold email" : "proposal";

  const userPrompt =
    `Write a ${outputLabel} using the following details:\n\n` +
    `My service or offer: ${businessInfo.service}\n` +
    `Target company: ${businessInfo.targetCompany}\n` +
    `Target industry: ${businessInfo.targetIndustry}\n` +
    `Pain point I am addressing: ${businessInfo.painPoint}\n` +
    `Key benefit or result I deliver: ${businessInfo.keyBenefit}` +
    hookLine;

  return { systemPrompt, userPrompt };
}

// Strips markdown fences the model may add despite instructions, then parses.
export function parseProposalResponse(raw: string): ProposalContent | null {
  const cleaned = raw
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null) return null;

  const required: (keyof ProposalContent)[] = [
    "intro",
    "problem",
    "proposed_solution",
    "deliverables",
    "timeline",
    "pricing_note",
    "call_to_action",
  ];

  for (const key of required) {
    if (typeof (parsed as Record<string, unknown>)[key] !== "string") return null;
  }

  return parsed as ProposalContent;
}
