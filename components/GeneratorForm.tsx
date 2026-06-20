"use client";

import { useState } from "react";
import type {
  BusinessInfo,
  Framework,
  Tone,
  OutputMode,
  EmailStreamState,
} from "@/lib/types";
import { BusinessInfoFields } from "./BusinessInfoFields";
import { OutputControls } from "./OutputControls";
import { EmailResult } from "./EmailResult";
import { ProposalResult } from "./ProposalResult";

const EMPTY_BUSINESS_INFO: BusinessInfo = {
  service: "",
  targetCompany: "",
  targetIndustry: "",
  painPoint: "",
  keyBenefit: "",
  personalizationHook: "",
};

const IDLE_STATE: EmailStreamState = { status: "idle", text: "" };

export function GeneratorForm() {
  const [businessInfo, setBusinessInfo] =
    useState<BusinessInfo>(EMPTY_BUSINESS_INFO);
  const [framework, setFramework] = useState<Framework>("pas");
  const [tone, setTone] = useState<Tone>("direct");
  const [outputMode, setOutputMode] = useState<OutputMode>("email");
  const [emailState, setEmailState] = useState<EmailStreamState>(IDLE_STATE);

  const isReady =
    businessInfo.service.trim() !== "" &&
    businessInfo.targetCompany.trim() !== "" &&
    businessInfo.targetIndustry.trim() !== "" &&
    businessInfo.painPoint.trim() !== "" &&
    businessInfo.keyBenefit.trim() !== "";

  const isGenerating =
    emailState.status === "streaming" || emailState.status === "retrying";

  function patchBusinessInfo(patch: Partial<BusinessInfo>) {
    setBusinessInfo((prev) => ({ ...prev, ...patch }));
  }

  function handleOutputModeChange(mode: OutputMode) {
    setOutputMode(mode);
    setEmailState(IDLE_STATE);
  }

  async function runEmailGeneration() {
    setEmailState({ status: "streaming", text: "" });

    let response: Response;
    try {
      response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessInfo, framework, tone, outputMode }),
      });
    } catch {
      setEmailState({
        status: "error",
        text: "",
        error: "Network error. Check your connection and try again.",
      });
      return;
    }

    if (!response.ok || !response.body) {
      setEmailState({
        status: "error",
        text: "",
        error: "Request failed. Please try again.",
      });
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          let event: { type: string; content?: string; message?: string };
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.type === "token") {
            setEmailState((prev) => ({
              ...prev,
              text: prev.text + (event.content ?? ""),
            }));
          } else if (event.type === "retrying") {
            setEmailState((prev) => ({ ...prev, status: "retrying" }));
          } else if (event.type === "done") {
            setEmailState((prev) => ({ ...prev, status: "done" }));
          } else if (event.type === "error") {
            setEmailState({
              status: "error",
              text: "",
              error: event.message ?? "Generation failed.",
            });
          }
        }
      }
    } catch {
      setEmailState((prev) => ({
        ...prev,
        status: "error",
        error: "Connection lost during generation. Please try again.",
      }));
    }
  }

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    if (!isReady || isGenerating) return;
    await runEmailGeneration();
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
        <BusinessInfoFields value={businessInfo} onChange={patchBusinessInfo} />

        <div
          className="h-px"
          style={{ backgroundColor: "var(--color-border)" }}
        />

        <OutputControls
          framework={framework}
          tone={tone}
          outputMode={outputMode}
          onFrameworkChange={setFramework}
          onToneChange={setTone}
          onOutputModeChange={handleOutputModeChange}
        />

        <button
          type="submit"
          disabled={!isReady || isGenerating}
          className="w-full rounded-lg py-3 px-4 text-sm font-semibold transition-colors"
          style={{
            backgroundColor:
              isReady && !isGenerating
                ? "var(--color-accent)"
                : "var(--color-border)",
            color:
              isReady && !isGenerating
                ? "var(--color-accent-foreground)"
                : "var(--color-text-secondary)",
            cursor: isReady && !isGenerating ? "pointer" : "not-allowed",
          }}
        >
          {isGenerating ? "Generating..." : "Generate"}
        </button>
      </form>

      {emailState.status !== "idle" && outputMode === "email" && (
        <EmailResult state={emailState} onRegenerate={runEmailGeneration} />
      )}
      {emailState.status !== "idle" && outputMode === "proposal" && (
        <ProposalResult
          state={emailState}
          onRegenerate={runEmailGeneration}
          targetCompany={businessInfo.targetCompany}
        />
      )}
    </div>
  );
}
