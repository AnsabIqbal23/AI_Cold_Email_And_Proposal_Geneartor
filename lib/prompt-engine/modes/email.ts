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
- Generic equals failure. If it could have been sent to anyone, rewrite it.`;
}
