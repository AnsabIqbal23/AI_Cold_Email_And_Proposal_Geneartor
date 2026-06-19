import type { CompletionOptions } from "../types";
import { callProvider } from "./client";
import { getPrimaryConfig, getFallbackConfig } from "./config";
import { LLMError } from "./errors";

export { LLMError, LLMRateLimitError } from "./errors";

export async function generateCompletion(
  options: CompletionOptions & { stream: true }
): Promise<ReadableStream<Uint8Array>>;

export async function generateCompletion(
  options: CompletionOptions & { stream?: false }
): Promise<string>;

export async function generateCompletion(
  options: CompletionOptions
): Promise<string | ReadableStream<Uint8Array>> {
  const primary = getPrimaryConfig();
  const fallback = getFallbackConfig();
  const { systemPrompt, userPrompt, stream = false } = options;

  try {
    if (stream) {
      return await callProvider(primary, { systemPrompt, userPrompt, stream: true });
    }
    return await callProvider(primary, { systemPrompt, userPrompt, stream: false });
  } catch (err) {
    if (err instanceof LLMError && fallback) {
      if (stream) {
        return await callProvider(fallback, { systemPrompt, userPrompt, stream: true });
      }
      return await callProvider(fallback, { systemPrompt, userPrompt, stream: false });
    }
    throw err;
  }
}

// Streams from the primary provider, falling back on any LLM error and calling
// onRetrying so the caller can signal the retry to the user before it starts.
export async function generateStreamWithFallback(
  options: Pick<CompletionOptions, "systemPrompt" | "userPrompt">,
  onRetrying: () => void
): Promise<ReadableStream<Uint8Array>> {
  const primary = getPrimaryConfig();
  const fallback = getFallbackConfig();
  const { systemPrompt, userPrompt } = options;

  try {
    return await callProvider(primary, { systemPrompt, userPrompt, stream: true });
  } catch (err) {
    if (err instanceof LLMError && fallback) {
      onRetrying();
      return await callProvider(fallback, { systemPrompt, userPrompt, stream: true });
    }
    throw err;
  }
}

// Calls the fallback provider directly — used only by the test harness.
export async function generateCompletionFromFallback(
  options: Omit<CompletionOptions, "stream">
): Promise<string> {
  const fallback = getFallbackConfig();
  if (!fallback) {
    throw new Error(
      "No fallback provider configured. Set LLM_FALLBACK_BASE_URL, LLM_FALLBACK_API_KEY, and LLM_FALLBACK_MODEL."
    );
  }
  return callProvider(fallback, { ...options, stream: false });
}
