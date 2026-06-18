export class LLMError extends Error {
  readonly provider: string;

  constructor(message: string, provider: string) {
    super(message);
    this.name = "LLMError";
    this.provider = provider;
  }
}

// Thrown when the provider returns HTTP 429. The UI can show a "retry shortly"
// message rather than treating it as a hard failure.
export class LLMRateLimitError extends LLMError {
  constructor(provider: string) {
    super(`Rate limited by provider. Retry shortly.`, provider);
    this.name = "LLMRateLimitError";
  }
}
