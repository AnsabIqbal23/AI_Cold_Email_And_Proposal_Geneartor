// All shared TypeScript types live here. Import from this file only — do not
// redeclare types elsewhere in the codebase.

export type OutputMode = "email" | "proposal";

export type Tone = "professional" | "friendly" | "direct" | "consultative" | "formal";

export type Framework = "pas" | "aida" | "bab";

/** The prospect and offer details the user provides. */
export interface BusinessInfo {
  service: string;
  targetCompany: string;
  targetIndustry: string;
  painPoint: string;
  keyBenefit: string;
  personalizationHook?: string;
}

/** Parsed proposal JSON returned when outputMode is "proposal". */
export interface ProposalContent {
  intro: string;
  problem: string;
  proposed_solution: string;
  deliverables: string;
  timeline: string;
  pricing_note: string;
  call_to_action: string;
}

/** Raw input the user submits through the generator form. */
export interface GeneratorInput {
  businessInfo: BusinessInfo;
  framework: Framework;
  tone: Tone;
  outputMode: OutputMode;
}

/** The result returned from the generation API route. */
export interface GeneratorResult {
  content: string;
  outputMode: OutputMode;
}

/** Options passed to generateCompletion in lib/llm/. */
export interface CompletionOptions {
  systemPrompt: string;
  userPrompt: string;
  stream?: boolean;
}
