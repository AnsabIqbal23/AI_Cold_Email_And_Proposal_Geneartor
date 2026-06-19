export function proposalModeInstructions(): string {
  return `OUTPUT FORMAT:
Return a single valid JSON object and nothing else.
No markdown code fences. No preamble. No trailing explanation.
The JSON must have exactly these keys:
{
  "intro": "1-2 sentences introducing yourself and the purpose of this proposal",
  "problem": "1-3 sentences describing the specific problem or gap you identified",
  "proposed_solution": "2-3 sentences describing your solution and approach",
  "deliverables": "1-3 sentences listing concrete deliverables",
  "timeline": "1-2 sentences on expected timeframe",
  "pricing_note": "1-2 sentences on pricing or how to discuss investment",
  "call_to_action": "1-2 sentences with a clear, low-friction next step"
}
Each value must be a plain string. No nested objects or arrays.`;
}