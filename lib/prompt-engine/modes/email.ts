export function emailModeInstructions(): string {
  return `OUTPUT FORMAT:
Plain text only. No HTML, no markdown.
First line must be: Subject: [your subject line]
Then one blank line, then the email body.
50 to 125 words maximum for the body. Aim under 90. Every word must earn its place.
End with one low-friction call to action — a question or a short ask, not a command.

Rules that are absolute:
- No em-dashes (use a comma or a short sentence break instead).
- No emojis.
- Never open with "I hope this email finds you well" or any variation.
- No stiff corporate language.
- No vague claims. Be specific.
- Generic equals failure. If it could have been sent to anyone, rewrite it.

Specificity rules — these override everything else:
- Never echo the exact wording from the input fields. Always rephrase and sharpen every detail.
- If the pain point is vague or generic (e.g. "their support sucks", "bad customer service", "slow processes"), infer one concrete, realistic detail a company in this industry would actually face, and use that professional framing instead. For example, "their support sucks" becomes "slow ticket resolution stretching past 48 hours and hurting client retention".
- If the benefit is vague (e.g. "we make it better", "faster results", "saves time"), translate it into a specific, measurable outcome appropriate for the industry. For example, "faster support" becomes "cutting average response time from days to under two hours".
- Every email must contain at least one concrete, specific detail — a number, a timeframe, or a named outcome — even if it has to be a reasonable inference for the industry. Vague input is not an excuse for vague output.`;
}
