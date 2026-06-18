export interface EmailExample {
  framework: string;
  tone: string;
  subject: string;
  body: string;
}

// Swipe file: add strong real-world examples here to raise output quality.
// More examples = better pattern matching. Keep each under 125 words.
export const emailExamples: EmailExample[] = [
  {
    framework: "PAS",
    tone: "direct",
    subject: "Quick question about online orders at [Restaurant]",
    body: "Hi [Name], a lot of restaurants near [Area] that left Foodpanda are now stuck paying high commissions on every order or quietly losing those customers. It usually shows up as a slow month nobody can fully explain. We build commission-free ordering sites for local spots, your menu, your customers, your data, usually live within a week. Worth a quick 10-minute call to see if it fits [Restaurant]?",
  },
];

export function buildFewShotBlock(): string {
  const formatted = emailExamples.map(
    (ex) =>
      `--- EXAMPLE (${ex.framework}, ${ex.tone} tone) ---\nSubject: ${ex.subject}\n\n${ex.body}\n--- END EXAMPLE ---`
  );
  return `TARGET QUALITY AND VOICE — study these examples and match them:\n\n${formatted.join("\n\n")}`;
}
