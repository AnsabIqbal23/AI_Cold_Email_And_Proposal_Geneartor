"use client";

import { useState } from "react";

type Result = { ok: boolean; mode: string; content?: string; error?: string; rateLimit?: boolean };

export default function TestLLMPage() {
  const [primary, setPrimary] = useState<Result | null>(null);
  const [fallback, setFallback] = useState<Result | null>(null);
  const [stream, setStream] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function testPrimary() {
    setLoading("primary");
    setPrimary(null);
    const res = await fetch("/api/test-llm?mode=primary");
    setPrimary(await res.json());
    setLoading(null);
  }

  async function testFallback() {
    setLoading("fallback");
    setFallback(null);
    const res = await fetch("/api/test-llm?mode=fallback");
    setFallback(await res.json());
    setLoading(null);
  }

  async function testStream() {
    setLoading("stream");
    setStream("");

    const res = await fetch("/api/test-llm?mode=stream");
    if (!res.ok || !res.body) {
      setStream("Error: " + res.statusText);
      setLoading(null);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // Each SSE chunk is one or more "data: {...}\n\n" lines.
      for (const line of chunk.split("\n")) {
        const data = line.replace(/^data:\s*/, "").trim();
        if (!data || data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          const delta: string = parsed?.choices?.[0]?.delta?.content ?? "";
          accumulated += delta;
          setStream(accumulated);
        } catch {
          // skip non-JSON lines (comment lines, etc.)
        }
      }
    }

    setLoading(null);
  }

  return (
    <div className="flex flex-col gap-8 py-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight mb-1">LLM Layer Test</h1>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Verify that prompts round-trip through the primary provider and the fallback.
        </p>
      </div>

      <Section
        title="Primary provider"
        description="Calls LLM_BASE_URL with LLM_API_KEY and LLM_MODEL."
        buttonLabel={loading === "primary" ? "Testing..." : "Test primary"}
        onClick={testPrimary}
        disabled={loading !== null}
        result={primary}
      />

      <Section
        title="Fallback provider"
        description="Calls LLM_FALLBACK_BASE_URL directly — no primary involved. Requires LLM_FALLBACK_API_KEY to be set."
        buttonLabel={loading === "fallback" ? "Testing..." : "Test fallback"}
        onClick={testFallback}
        disabled={loading !== null}
        result={fallback}
      />

      <div
        className="rounded-xl border p-6 flex flex-col gap-4"
        style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
      >
        <div>
          <h2 className="font-semibold text-base">Streaming</h2>
          <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
            Streams a response from the primary provider using SSE.
          </p>
        </div>
        <button
          onClick={testStream}
          disabled={loading !== null}
          className="self-start rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
          style={{ backgroundColor: "var(--color-header-bg)", color: "var(--color-text-inverse)" }}
        >
          {loading === "stream" ? "Streaming..." : "Test streaming"}
        </button>
        {stream !== null && (
          <pre className="text-sm whitespace-pre-wrap break-words rounded-lg p-3"
            style={{ backgroundColor: "var(--color-border)", color: "var(--color-text-primary)" }}>
            {stream || "(waiting for tokens…)"}
          </pre>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  buttonLabel,
  onClick,
  disabled,
  result,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  disabled: boolean;
  result: Result | null;
}) {
  return (
    <div
      className="rounded-xl border p-6 flex flex-col gap-4"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
    >
      <div>
        <h2 className="font-semibold text-base">{title}</h2>
        <p className="text-sm mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
          {description}
        </p>
      </div>
      <button
        onClick={onClick}
        disabled={disabled}
        className="self-start rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-50"
        style={{ backgroundColor: "var(--color-header-bg)", color: "var(--color-text-inverse)" }}
      >
        {buttonLabel}
      </button>
      {result && (
        <pre
          className="text-sm whitespace-pre-wrap break-words rounded-lg p-3"
          style={{
            backgroundColor: result.ok ? "var(--color-border)" : "#3b1010",
            color: result.ok ? "var(--color-text-primary)" : "#f87171",
          }}
        >
          {result.ok ? result.content : `Error: ${result.error}${result.rateLimit ? " (rate limited)" : ""}`}
        </pre>
      )}
    </div>
  );
}
