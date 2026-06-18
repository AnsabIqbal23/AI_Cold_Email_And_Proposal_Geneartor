import {
  generateCompletion,
  generateCompletionFromFallback,
  LLMRateLimitError,
} from "@/lib/llm";

const TEST_SYSTEM = "You are a helpful assistant. Be brief.";
const TEST_USER = 'Reply with exactly: "LLM layer working."';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") ?? "primary";

  if (mode === "stream") {
    return handleStream();
  }

  if (mode === "fallback") {
    return handleFallbackDirect();
  }

  return handlePrimary();
}

async function handlePrimary() {
  try {
    const content = await generateCompletion({
      systemPrompt: TEST_SYSTEM,
      userPrompt: TEST_USER,
    });
    return Response.json({ ok: true, mode: "primary", content });
  } catch (err) {
    return errorResponse(err, "primary");
  }
}

async function handleFallbackDirect() {
  try {
    const content = await generateCompletionFromFallback({
      systemPrompt: TEST_SYSTEM,
      userPrompt: TEST_USER,
    });
    return Response.json({ ok: true, mode: "fallback", content });
  } catch (err) {
    return errorResponse(err, "fallback");
  }
}

async function handleStream() {
  try {
    const stream = await generateCompletion({
      systemPrompt: TEST_SYSTEM,
      userPrompt: "Write a two-sentence description of why streaming matters for UX.",
      stream: true,
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    return errorResponse(err, "stream");
  }
}

function errorResponse(err: unknown, mode: string) {
  const isRateLimit = err instanceof LLMRateLimitError;
  const message = err instanceof Error ? err.message : "Unknown error";
  return Response.json(
    { ok: false, mode, error: message, rateLimit: isRateLimit },
    { status: isRateLimit ? 429 : 500 }
  );
}
