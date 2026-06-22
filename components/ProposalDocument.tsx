"use client";

import { useRef, useLayoutEffect, Fragment } from "react";
import { SECTION_KEYS, SECTION_LABELS } from "@/lib/proposal-formatter";
import type { ProposalContent } from "@/lib/types";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
}

function AutoGrowTextarea({ value, onChange }: TextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="prose-field"
    />
  );
}

interface Props {
  sections: ProposalContent;
  targetCompany: string;
  generatedAt: Date;
  onPatchSection: (key: keyof ProposalContent, value: string) => void;
}

export function ProposalDocument({
  sections,
  targetCompany,
  generatedAt,
  onPatchSection,
}: Props) {
  const companyDisplay = targetCompany.trim() || "the client";

  return (
    <div
      className="px-5 sm:px-8 pt-7 pb-12 flex flex-col"
      style={{ animation: "fadeIn 400ms ease" }}
    >
      {/* Document header */}
      <div
        className="pb-6 mb-8 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h1
          className="text-2xl font-bold leading-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Prepared for {companyDisplay}
        </h1>
        <p
          className="text-sm mt-1.5"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {formatDate(generatedAt)}
        </p>
      </div>

      {/* Sections */}
      <div className="flex flex-col">
        {SECTION_KEYS.map((key, i) => (
          <Fragment key={key}>
            {i > 0 && (
              <div
                className="h-px my-8"
                style={{ backgroundColor: "var(--color-border)" }}
              />
            )}
            <div className="flex flex-col gap-2.5">
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: "var(--color-accent)" }}
              >
                {SECTION_LABELS[key]}
              </span>
              <div className="prose-wrapper">
                <svg
                  aria-hidden="true"
                  className="prose-pencil"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                <AutoGrowTextarea
                  value={sections[key]}
                  onChange={(v) => onPatchSection(key, v)}
                />
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
