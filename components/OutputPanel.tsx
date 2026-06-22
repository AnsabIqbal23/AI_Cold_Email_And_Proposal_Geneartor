"use client";

import { useEffect, useRef } from "react";
import type { EmailStreamState, OutputMode } from "@/lib/types";
import { EmailResult } from "./EmailResult";
import { ProposalResult } from "./ProposalResult";

interface Props {
  emailState: EmailStreamState;
  outputMode: OutputMode;
  targetCompany: string;
  isReady: boolean;
  onRegenerate: () => void;
}

function EmptyState({
  outputMode,
  isReady,
}: {
  outputMode: OutputMode;
  isReady: boolean;
}) {
  return (
    <div
      className="h-full min-h-[480px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-16 px-8 text-center"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: "rgba(13,148,136,0.08)" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
          stroke="currentColor"
          style={{ color: "var(--color-accent)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
          />
        </svg>
      </div>

      <p
        className="mb-1.5 text-sm font-semibold"
        style={{ color: "var(--color-text-primary)" }}
      >
        Your {outputMode === "email" ? "email" : "proposal"} will appear here
      </p>
      <p
        className="text-xs leading-relaxed max-w-[220px]"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {isReady
          ? "Click Generate to create your outreach"
          : "Fill in the required fields to get started"}
      </p>

      {/* Subtle decorative lines suggesting content */}
      <div className="mt-8 w-full max-w-[260px] flex flex-col gap-2.5">
        {[70, 90, 55, 80, 45].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded-full"
            style={{
              width: `${w}%`,
              backgroundColor: "var(--color-border)",
              opacity: 0.6 - i * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function OutputPanel({
  emailState,
  outputMode,
  targetCompany,
  isReady,
  onRegenerate,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // On mobile: when generation starts, scroll the output panel into view
  useEffect(() => {
    if (emailState.status !== "streaming") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [emailState.status]);

  return (
    <div ref={panelRef} className="h-full overflow-y-auto workspace-col">
      {emailState.status === "idle" ? (
        <EmptyState outputMode={outputMode} isReady={isReady} />
      ) : outputMode === "email" ? (
        <EmailResult state={emailState} onRegenerate={onRegenerate} />
      ) : (
        <ProposalResult
          state={emailState}
          onRegenerate={onRegenerate}
          targetCompany={targetCompany}
        />
      )}
    </div>
  );
}
