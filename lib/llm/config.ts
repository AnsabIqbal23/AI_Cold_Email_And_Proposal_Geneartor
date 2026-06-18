export interface ProviderConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

function readConfig(
  baseUrlKey: string,
  apiKeyKey: string,
  modelKey: string
): ProviderConfig | null {
  const baseUrl = process.env[baseUrlKey];
  const apiKey = process.env[apiKeyKey];
  const model = process.env[modelKey];

  if (!baseUrl || !apiKey || !model) return null;

  return { baseUrl, apiKey, model };
}

export function getPrimaryConfig(): ProviderConfig {
  const config = readConfig("LLM_BASE_URL", "LLM_API_KEY", "LLM_MODEL");
  if (!config) {
    throw new Error(
      "Primary LLM provider not configured. Set LLM_BASE_URL, LLM_API_KEY, and LLM_MODEL."
    );
  }
  return config;
}

export function getFallbackConfig(): ProviderConfig | null {
  return readConfig(
    "LLM_FALLBACK_BASE_URL",
    "LLM_FALLBACK_API_KEY",
    "LLM_FALLBACK_MODEL"
  );
}
