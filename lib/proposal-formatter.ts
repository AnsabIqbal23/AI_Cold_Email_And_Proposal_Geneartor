import type { ProposalContent } from "./types";

export const SECTION_KEYS: (keyof ProposalContent)[] = [
  "intro",
  "problem",
  "proposed_solution",
  "deliverables",
  "timeline",
  "pricing_note",
  "call_to_action",
];

export const SECTION_LABELS: Record<keyof ProposalContent, string> = {
  intro: "Introduction",
  problem: "Problem",
  proposed_solution: "Proposed Solution",
  deliverables: "Deliverables",
  timeline: "Timeline",
  pricing_note: "Pricing",
  call_to_action: "Call to Action",
};

export function formatProposalAsText(sections: ProposalContent): string {
  return SECTION_KEYS.map(
    (key) => `## ${SECTION_LABELS[key]}\n${sections[key]}`
  ).join("\n\n");
}
