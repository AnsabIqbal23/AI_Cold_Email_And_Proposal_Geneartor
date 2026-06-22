"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { parseProposalResponse } from "@/lib/prompt-engine";
import { formatProposalAsText } from "@/lib/proposal-formatter";
import { ProposalDocument } from "./ProposalDocument";
import { LoadingSkeleton } from "./LoadingSkeleton";
import type { EmailStreamState, ProposalContent } from "@/lib/types";

const DownloadProposalPdf = dynamic(
  () =>
    import("./DownloadProposalPdf").then((m) => m.DownloadProposalPdf),
  { ssr: false, loading: () => null }
);

const EMPTY_SECTIONS: ProposalContent = {
  intro: "",
  problem: "",
  proposed_solution: "",
  deliverables: "",
  timeline: "",
  pricing_note: "",
  call_to_action: "",
};

interface Props {
  state: EmailStreamState;
  onRegenerate: () => void;
  targetCompany: string;
}

export function ProposalResult({ state, onRegenerate, targetCompany }: Props) {
  const [sections, setSections] = useState<ProposalContent>(EMPTY_SECTIONS);
  const [parseError, setParseError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<Date | null>(null);

  const isActive = state.status === "streaming" || state.status === "retrying";
  const isDone = state.status === "done";
  const canCopy = isDone && !parseError;

  useEffect(() => {
    if (state.status !== "streaming") return;
    setSections(EMPTY_SECTIONS);
    setParseError(false);
    setGeneratedAt(null);
  }, [state.status]);

  useEffect(() => {
    if (!isDone) return;
    const parsed = parseProposalResponse(state.text);
    if (parsed) {
      setSections(parsed);
      setGeneratedAt((prev) => prev ?? new Date());
    } else {
      setParseError(true);
    }
  }, [isDone, state.text]);

  function patchSection(key: keyof ProposalContent, value: string) {
    setSections((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(formatProposalAsText(sections));
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
            Unable to generate your proposal
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
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b flex-wrap gap-3"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Generated proposal
        </span>

        <div className="flex items-center gap-2">
          {canCopy && generatedAt && (
            <DownloadProposalPdf
              sections={sections}
              targetCompany={targetCompany}
              generatedAt={generatedAt}
            />
          )}

          <button
            onClick={handleCopy}
            disabled={!canCopy}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors"
            style={{
              borderColor: "var(--color-border)",
              color: canCopy
                ? "var(--color-text-primary)"
                : "var(--color-text-secondary)",
              cursor: canCopy ? "pointer" : "not-allowed",
              opacity: canCopy ? 1 : 0.5,
            }}
          >
            {copied ? "Copied" : "Copy as text"}
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

      {isActive && (
        <LoadingSkeleton
          mode="proposal"
          status={state.status === "retrying" ? "retrying" : "streaming"}
        />
      )}

      {isDone && parseError && (
        <div className="p-5 flex flex-col items-center gap-3 text-center">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Could not parse the proposal
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
            The AI returned an unexpected format. Please try regenerating.
          </p>
          <button
            onClick={onRegenerate}
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "rgba(13,148,136,0.08)",
              color: "var(--color-accent)",
            }}
          >
            Regenerate
          </button>
        </div>
      )}

      {isDone && !parseError && (
        <ProposalDocument
          sections={sections}
          targetCompany={targetCompany}
          generatedAt={generatedAt ?? new Date()}
          onPatchSection={patchSection}
        />
      )}
    </div>
  );
}
