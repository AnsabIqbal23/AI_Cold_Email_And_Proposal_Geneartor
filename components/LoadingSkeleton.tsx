"use client";

import { useEffect, useState } from "react";
import type { OutputMode } from "@/lib/types";

const STATUS_MESSAGES = [
  "Analyzing your prospect",
  "Writing your copy",
  "Polishing the draft",
];

const FALLBACK_MESSAGE = "Almost there";

const EMAIL_BODY_LINES = [88, 100, 72, 95, 60, 82];

const PROPOSAL_SECTIONS = [
  { labelWidth: 40, lines: [90, 70] },
  { labelWidth: 32, lines: [85, 65, 78] },
  { labelWidth: 52, lines: [75, 92] },
  { labelWidth: 48, lines: [68, 82, 58] },
  { labelWidth: 36, lines: [78, 55] },
  { labelWidth: 44, lines: [85, 70] },
  { labelWidth: 38, lines: [62, 80] },
];

const SHIMMER = {
  background:
    "linear-gradient(90deg, var(--color-border) 25%, #f5f5f4 50%, var(--color-border) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.8s ease-in-out infinite",
} as const;

function Bar({ widthPct, tall = false }: { widthPct: number; tall?: boolean }) {
  return (
    <div
      className={`rounded-full ${tall ? "h-3.5" : "h-2.5"}`}
      style={{ width: `${widthPct}%`, ...SHIMMER }}
    />
  );
}

function EmailSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Bar widthPct={18} />
        <Bar widthPct={52} tall />
      </div>
      <div className="h-px" style={{ backgroundColor: "var(--color-border)" }} />
      <div className="flex flex-col gap-2.5">
        <Bar widthPct={14} />
        <div className="flex flex-col gap-2 mt-0.5">
          {EMAIL_BODY_LINES.map((w, i) => (
            <Bar key={i} widthPct={w} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProposalSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {PROPOSAL_SECTIONS.map((section, si) => (
        <div key={si}>
          {si > 0 && (
            <div
              className="h-px mb-5"
              style={{ backgroundColor: "var(--color-border)" }}
            />
          )}
          <div className="flex flex-col gap-2.5">
            <Bar widthPct={section.labelWidth} />
            <div className="flex flex-col gap-2 mt-0.5">
              {section.lines.map((w, li) => (
                <Bar key={li} widthPct={w} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface Props {
  mode: OutputMode;
  status: "streaming" | "retrying";
}

export function LoadingSkeleton({ mode, status }: Props) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);

  useEffect(() => {
    if (status === "retrying") {
      setMsgVisible(true);
      return;
    }
    let swapTimer: ReturnType<typeof setTimeout> | null = null;
    const intervalTimer = setInterval(() => {
      setMsgVisible(false);
      swapTimer = setTimeout(() => {
        setMsgIndex((i) => (i + 1) % STATUS_MESSAGES.length);
        setMsgVisible(true);
      }, 280);
    }, 2600);
    return () => {
      clearInterval(intervalTimer);
      if (swapTimer) clearTimeout(swapTimer);
    };
  }, [status]);

  const message = status === "retrying" ? FALLBACK_MESSAGE : STATUS_MESSAGES[msgIndex];

  return (
    <div className="p-5 flex flex-col gap-5">
      {mode === "email" ? <EmailSkeleton /> : <ProposalSkeleton />}
      <div className="flex items-center gap-2 pt-1">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
          style={{
            backgroundColor: "var(--color-accent)",
            animation: "pulseDot 1.2s ease-in-out infinite",
          }}
        />
        <span
          className="text-xs"
          style={{
            color: "var(--color-text-secondary)",
            opacity: msgVisible ? 1 : 0,
            transition: "opacity 280ms ease",
          }}
        >
          {message}
        </span>
      </div>
    </div>
  );
}
