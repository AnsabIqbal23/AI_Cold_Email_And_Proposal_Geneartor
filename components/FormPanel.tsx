"use client";

import type { BusinessInfo, Framework, Tone, OutputMode } from "@/lib/types";
import { BusinessInfoFields } from "./BusinessInfoFields";
import { OutputControls } from "./OutputControls";

interface Props {
  businessInfo: BusinessInfo;
  framework: Framework;
  tone: Tone;
  outputMode: OutputMode;
  isReady: boolean;
  isGenerating: boolean;
  onBusinessInfoChange: (patch: Partial<BusinessInfo>) => void;
  onFrameworkChange: (f: Framework) => void;
  onToneChange: (t: Tone) => void;
  onOutputModeChange: (m: OutputMode) => void;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
}

export function FormPanel({
  businessInfo,
  framework,
  tone,
  outputMode,
  isReady,
  isGenerating,
  onBusinessInfoChange,
  onFrameworkChange,
  onToneChange,
  onOutputModeChange,
  onSubmit,
}: Props) {
  return (
    <div
      className="flex flex-col rounded-2xl border h-full"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Panel header */}
      <div
        className="flex-none px-6 py-4 border-b"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-sm font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Configure outreach
            </h1>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Fill in the details, then click Generate
            </p>
          </div>
          <div
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
            style={{
              borderColor: "rgba(13,148,136,0.25)",
              backgroundColor: "rgba(13,148,136,0.06)",
              color: "var(--color-accent)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "var(--color-accent)" }}
            />
            AI-powered
          </div>
        </div>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto workspace-col">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-0 p-6"
          noValidate
        >
          <BusinessInfoFields value={businessInfo} onChange={onBusinessInfoChange} />

          <div
            className="h-px my-7"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          <OutputControls
            framework={framework}
            tone={tone}
            outputMode={outputMode}
            onFrameworkChange={onFrameworkChange}
            onToneChange={onToneChange}
            onOutputModeChange={onOutputModeChange}
          />

          <div className="mt-7">
            <button
              type="submit"
              disabled={!isReady || isGenerating}
              className="w-full rounded-xl py-3.5 px-4 text-sm font-semibold transition-all duration-200"
              style={{
                background: isReady
                  ? "linear-gradient(135deg, var(--color-accent) 0%, #0b7b72 100%)"
                  : "var(--color-border)",
                color: isReady ? "white" : "var(--color-text-secondary)",
                cursor: isReady && !isGenerating ? "pointer" : "not-allowed",
                boxShadow: isReady
                  ? "0 4px 16px rgba(13,148,136,0.30), 0 1px 2px rgba(0,0,0,0.05)"
                  : "none",
                opacity: isGenerating ? 0.82 : 1,
              }}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Generating...
                </span>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
