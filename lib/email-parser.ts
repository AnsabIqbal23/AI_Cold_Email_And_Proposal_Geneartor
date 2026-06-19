import type { ParsedEmail } from "./types";

export function parseEmailOutput(raw: string): ParsedEmail {
  const text = raw.replace(/\r\n/g, "\n");
  const separatorIndex = text.indexOf("\n\n");

  if (separatorIndex === -1) {
    const subjectMatch = text.match(/^Subject:\s*(.*)/);
    return {
      subject: subjectMatch ? subjectMatch[1] : text,
      body: "",
    };
  }

  const firstLine = text.slice(0, separatorIndex);
  const subjectMatch = firstLine.match(/^Subject:\s*(.*)/);
  return {
    subject: subjectMatch ? subjectMatch[1].trim() : firstLine.trim(),
    body: text.slice(separatorIndex + 2),
  };
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}
