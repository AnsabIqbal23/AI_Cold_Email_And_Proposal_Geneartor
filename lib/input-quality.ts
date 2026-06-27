const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "can", "their", "they", "them",
  "we", "our", "us", "your", "you", "i", "my", "it", "its", "this",
  "that", "these", "those", "which", "who", "what", "how", "very",
  "more", "most", "also", "just", "not", "no", "so", "as", "if",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
  );
}

// Returns true when both fields are long enough to judge but share no meaningful keywords.
// A missing connection between service and pain point usually produces incoherent output.
export function serviceAndPainPointSeemDisconnected(
  service: string,
  painPoint: string
): boolean {
  if (service.trim().length < 15 || painPoint.trim().length < 15) return false;
  const serviceWords = tokenize(service);
  const painWords = tokenize(painPoint);
  return [...serviceWords].every((w) => !painWords.has(w));
}
