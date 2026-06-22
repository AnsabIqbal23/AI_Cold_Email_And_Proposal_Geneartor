"use client";

import { useState } from "react";
import { parseEmailOutput, countWords } from "@/lib/email-parser";
import { LoadingSkeleton } from "./LoadingSkeleton";
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

  // Show skeleton until first token arrives; once content is visible keep the content panel.
  const showSkeleton = isActive && !hasContent;

  async function handleCopy() {
    await navigator.clipboard.writeText(state.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (state.status === "error") {
    return (
      <div
        className="rounded-xl border p-6 flex flex-col items-center gap-4 text-center"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(220,38,38,0.08)" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            stroke="currentColor"
            style={{ color: "#dc2626" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Unable to generate your email
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            Both AI providers are unavailable right now. Please try again in a
            moment.
          </p>
        </div>
        <button
          onClick={onRegenerate}
          className="text-sm font-semibold px-4 py-2 rounded-lg"
          style={{
            backgroundColor: "rgba(13,148,136,0.08)",
            color: "var(--color-accent)",
          }}
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
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Generated email
        </span>

        <div className="flex items-center gap-2">
          {wordCount > 0 && (
            <span
              className="text-xs tabular-nums mr-1"
              style={{
                color: overLimit ? "#dc2626" : "var(--color-text-secondary)",
              }}
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
              borderColor: isActive
                ? "var(--color-border)"
                : "var(--color-accent)",
              color: isActive
                ? "var(--color-text-secondary)"
                : "var(--color-accent)",
              cursor: isActive ? "not-allowed" : "pointer",
              opacity: isActive ? 0.5 : 1,
            }}
          >
            Regenerate
          </button>
        </div>
      </div>

      {/* Content area — skeleton while waiting for first token, then fade in live text */}
      {showSkeleton ? (
        <LoadingSkeleton
          mode="email"
          status={state.status === "retrying" ? "retrying" : "streaming"}
        />
      ) : (
        <div
          className="p-5 flex flex-col gap-5"
          style={{ animation: "fadeIn 400ms ease" }}
        >
          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Subject
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              {subject || (
                <span
                  style={{ color: "var(--color-text-secondary)", opacity: 0.5 }}
                >
                  {isActive ? "Writing..." : ""}
                </span>
              )}
            </p>
          </div>

          {/* Body */}
          {(body || isActive) && (
            <>
              <div
                className="h-px"
                style={{ backgroundColor: "var(--color-border)" }}
              />
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
      )}
    </div>
  );
}
