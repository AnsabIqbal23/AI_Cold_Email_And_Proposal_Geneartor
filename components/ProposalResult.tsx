"use client";

import { useState, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import { parseProposalResponse } from "@/lib/prompt-engine";
import {
  SECTION_KEYS,
  SECTION_LABELS,
  formatProposalAsText,
} from "@/lib/proposal-formatter";
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

  const isActive = state.status === "streaming" || state.status === "retrying";
  const isDone = state.status === "done";
  const canCopy = isDone && !parseError;

  useEffect(() => {
    if (state.status !== "streaming") return;
    setSections(EMPTY_SECTIONS);
    setParseError(false);
  }, [state.status]);

  useEffect(() => {
    if (!isDone) return;
    const parsed = parseProposalResponse(state.text);
    if (parsed) {
      setSections(parsed);
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
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b flex-wrap gap-3"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex flex-col gap-0.5">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Generated proposal
          </span>
          {state.status === "retrying" && (
            <span className="text-xs" style={{ color: "var(--color-accent)" }}>
              High demand, retrying...
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {canCopy && (
            <DownloadProposalPdf sections={sections} targetCompany={targetCompany} />
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

      <div className="p-5 flex flex-col gap-5">
        {isActive && (
          <div className="flex flex-col items-center justify-center gap-4 py-14">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="inline-block h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: "var(--color-accent)",
                    animation: `pulseDot 1.4s ease-in-out ${i * 200}ms infinite`,
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
              {state.status === "retrying"
                ? "High demand — switching providers..."
                : "Writing your proposal..."}
            </span>
          </div>
        )}

        {isDone && parseError && (
          <div className="flex flex-col gap-2">
            <p className="text-sm" style={{ color: "#991b1b" }}>
              Could not parse the proposal. Please regenerate.
            </p>
            <pre
              className="text-xs whitespace-pre-wrap p-3 rounded-lg overflow-x-auto"
              style={{
                backgroundColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >
              {state.text}
            </pre>
          </div>
        )}

        {isDone &&
          !parseError &&
          SECTION_KEYS.map((key, i) => (
            <Fragment key={key}>
              {i > 0 && (
                <div
                  className="h-px"
                  style={{ backgroundColor: "var(--color-border)" }}
                />
              )}
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {SECTION_LABELS[key]}
                </label>
                <textarea
                  rows={3}
                  className="form-input resize-y"
                  value={sections[key]}
                  onChange={(e) => patchSection(key, e.target.value)}
                />
              </div>
            </Fragment>
          ))}
      </div>
    </div>
  );
}
