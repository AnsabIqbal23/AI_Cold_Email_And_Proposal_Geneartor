"use client";

import { useState } from "react";
import { parseEmailOutput, countWords } from "@/lib/email-parser";
import type { EmailStreamState } from "@/lib/types";

const WORD_LIMIT = 125;

interface Props {
  state: EmailStreamState;
  onRegenerate: () => void;
}

export function EmailResult({ state, onRegenerate }: Props) {
  const [copied, setCopied] = useState(false);

  const { subject, body } = parseEmailOutput(state.text);
  const wordCount = countWords(body);
  const overLimit = wordCount > WORD_LIMIT;
  const isActive = state.status === "streaming" || state.status === "retrying";
  const hasContent = state.text.length > 0;

  async function handleCopy() {
    await navigator.clipboard.writeText(state.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (state.status === "error") {
    return (
      <div
        className="rounded-xl border p-5 flex flex-col gap-3"
        style={{ borderColor: "#fca5a5", backgroundColor: "#fef2f2" }}
      >
        <p className="text-sm" style={{ color: "#991b1b" }}>
          {state.error ?? "Something went wrong. Please try again."}
        </p>
        <button
          onClick={onRegenerate}
          className="self-start text-sm font-semibold underline underline-offset-2"
          style={{ color: "#dc2626" }}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border flex flex-col"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b flex-wrap gap-3"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Generated email
          </span>
          {state.status === "retrying" && (
            <span className="text-xs" style={{ color: "var(--color-accent)" }}>
              High demand, retrying...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {wordCount > 0 && (
            <span
              className="text-xs tabular-nums mr-1"
              style={{ color: overLimit ? "#dc2626" : "var(--color-text-secondary)" }}
            >
              {wordCount} {overLimit ? "/ 125 words — too long" : "words"}
            </span>
          )}

          <button
            onClick={handleCopy}
            disabled={!hasContent || isActive}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color:
                hasContent && !isActive
                  ? "var(--color-text-primary)"
                  : "var(--color-text-secondary)",
              cursor: hasContent && !isActive ? "pointer" : "not-allowed",
              opacity: hasContent && !isActive ? 1 : 0.5,
            }}
          >
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={onRegenerate}
            disabled={isActive}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{
              borderColor: isActive ? "var(--color-border)" : "var(--color-accent)",
              color: isActive ? "var(--color-text-secondary)" : "var(--color-accent)",
              cursor: isActive ? "not-allowed" : "pointer",
              opacity: isActive ? 0.5 : 1,
            }}
          >
            Regenerate
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-5">
        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Subject
          </span>
          <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
            {subject || (
              <span style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}>
                {isActive ? "Writing..." : ""}
              </span>
            )}
          </p>
        </div>

        {/* Body */}
        {(body || isActive) && (
          <>
            <div className="h-px" style={{ backgroundColor: "var(--color-border)" }} />
            <div className="flex flex-col gap-1.5">
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Body
              </span>
              <p
                className="text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: "var(--color-text-primary)" }}
              >
                {body}
                {isActive && (
                  <span
                    className="inline-block w-px h-[1.1em] ml-px align-text-bottom animate-pulse"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  />
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
