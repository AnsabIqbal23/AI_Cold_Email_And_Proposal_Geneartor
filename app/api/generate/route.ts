import { NextRequest } from "next/server";
import { assemblePrompt } from "@/lib/prompt-engine";
import { generateStreamWithFallback, LLMError } from "@/lib/llm";
import { parseSSETokens } from "@/lib/llm/stream-parser";
import type { GeneratorInput } from "@/lib/types";

function encodeSSE(data: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`);
}

export async function POST(req: NextRequest) {
  let input: GeneratorInput;
  try {
    input = await req.json();
  } catch {
    return new Response("Bad request", { status: 400 });
  }

  const { systemPrompt, userPrompt } = assemblePrompt(input);

  const responseStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llmStream = await generateStreamWithFallback(
          { systemPrompt, userPrompt },
          () => controller.enqueue(encodeSSE({ type: "retrying" }))
        );

        for await (const token of parseSSETokens(llmStream)) {
          controller.enqueue(encodeSSE({ type: "token", content: token }));
        }

        controller.enqueue(encodeSSE({ type: "done" }));
      } catch (err) {
        const message =
          err instanceof LLMError
            ? err.message
            : err instanceof Error
            ? err.message
            : "Generation failed. Please try again.";
        controller.enqueue(encodeSSE({ type: "error", message }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
