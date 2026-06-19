import type { Framework, Tone, OutputMode } from "@/lib/types";

interface Props {
  framework: Framework;
  tone: Tone;
  outputMode: OutputMode;
  onFrameworkChange: (f: Framework) => void;
  onToneChange: (t: Tone) => void;
  onOutputModeChange: (m: OutputMode) => void;
}

const FRAMEWORKS: { value: Framework; label: string; title: string }[] = [
  { value: "pas", label: "PAS", title: "Problem, Agitate, Solution" },
  { value: "aida", label: "AIDA", title: "Attention, Interest, Desire, Action" },
  { value: "bab", label: "BAB", title: "Before, After, Bridge" },
];

const TONES: { value: Tone; label: string }[] = [
  { value: "direct", label: "Direct" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
];

export function OutputControls({
  framework,
  tone,
  outputMode,
  onFrameworkChange,
  onToneChange,
  onOutputModeChange,
}: Props) {
  return (
    <section className="flex flex-col gap-5">
      <h2
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-text-secondary)" }}
      >
        Output options
      </h2>

      <div className="flex flex-col gap-2">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Output type
        </p>
        <div className="flex gap-2 flex-wrap">
          {(["email", "proposal"] as OutputMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onOutputModeChange(mode)}
              className={`pill-btn ${
                outputMode === mode ? "pill-btn-active" : "pill-btn-inactive"
              }`}
            >
              {mode === "email" ? "Email" : "Proposal"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Framework
        </p>
        <div className="flex gap-2 flex-wrap">
          {FRAMEWORKS.map((f) => (
            <button
              key={f.value}
              type="button"
              title={f.title}
              onClick={() => onFrameworkChange(f.value)}
              className={`pill-btn ${
                framework === f.value ? "pill-btn-active" : "pill-btn-inactive"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {FRAMEWORKS.find((f) => f.value === framework)?.title}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <p
          className="text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          Tone
        </p>
        <div className="flex gap-2 flex-wrap">
          {TONES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => onToneChange(t.value)}
              className={`pill-btn ${
                tone === t.value ? "pill-btn-active" : "pill-btn-inactive"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
