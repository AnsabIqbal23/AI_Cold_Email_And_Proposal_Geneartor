import { ProviderConfig } from "./config";
import { LLMError, LLMRateLimitError } from "./errors";

interface CallOptions {
  systemPrompt: string;
  userPrompt: string;
  stream: boolean;
}

export async function callProvider(
  config: ProviderConfig,
  options: CallOptions & { stream: true }
): Promise<ReadableStream<Uint8Array>>;

export async function callProvider(
  config: ProviderConfig,
  options: CallOptions & { stream: false }
): Promise<string>;

export async function callProvider(
  config: ProviderConfig,
  options: CallOptions
): Promise<string | ReadableStream<Uint8Array>> {
  const messages = [
    { role: "system", content: options.systemPrompt },
    { role: "user", content: options.userPrompt },
  ];

  let response: Response;
  try {
    response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        stream: options.stream,
      }),
      cache: "no-store",
    });
  } catch (err) {
    throw new LLMError(
      `Network error: ${err instanceof Error ? err.message : "unknown"}`,
      config.model
    );
  }

  if (response.status === 429) {
    throw new LLMRateLimitError(config.model);
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "(unreadable)");
    throw new LLMError(
      `Provider returned ${response.status}: ${body}`,
      config.model
    );
  }

  if (options.stream) {
    if (!response.body) {
      throw new LLMError("Provider returned empty stream body", config.model);
    }
    return response.body;
  }

  const data = await response.json().catch(() => null);
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new LLMError(
      "Unexpected response shape from provider",
      config.model
    );
  }

  return content;
}
