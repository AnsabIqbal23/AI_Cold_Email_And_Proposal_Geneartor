export interface EmailExample {
  framework: string;
  tone: string;
  subject: string;
  body: string;
}

// Swipe file: add strong real-world examples here to raise output quality.
// Keep examples in clearly distinct industries so topic-similarity doesn't bleed into the model's output.
export const emailExamples: EmailExample[] = [
  {
    framework: "PAS",
    tone: "direct",
    subject: "Quick question about online orders at [Restaurant]",
    body: "Hi [Name], a lot of restaurants near [Area] that left Foodpanda are now stuck paying high commissions on every order or quietly losing those customers. It usually shows up as a slow month nobody can fully explain. We build commission-free ordering sites for local spots, your menu, your customers, your data, usually live within a week. Worth a quick 10-minute call to see if it fits [Restaurant]?",
  },
  {
    framework: "AIDA",
    tone: "conversational",
    subject: "Cutting [E-commerce Brand]'s return rate",
    body: "Hi [Name], return rates above 25% quietly erase margin on every high-volume SKU, and most brands don't catch it until end-of-quarter. We run a two-week fit-accuracy audit that pinpoints the size or description gaps driving the bulk of returns. For one apparel client, that audit cut their return rate from 31% to 18% in six weeks. Happy to share what we found if you'd like a quick look at how [Brand] compares?",
  },
];

export function buildFewShotBlock(): string {
  const formatted = emailExamples.map(
    (ex) =>
      `--- EXAMPLE (${ex.framework}, ${ex.tone} tone) ---\nSubject: ${ex.subject}\n\n${ex.body}\n--- END EXAMPLE ---`
  );
  return (
    `STUDY THESE EXAMPLES FOR VOICE, RHYTHM, AND STRUCTURE ONLY.\n` +
    `Do not borrow any details, industry terms, or narrative from them.\n` +
    `Every detail in your output must come from the user's input or be a reasonable inference for their specific industry.\n\n` +
    formatted.join("\n\n")
  );
}
