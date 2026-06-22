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

const TONES: { value: Tone; label: string; description: string }[] = [
  { value: "direct", label: "Direct", description: "Straight to the point" },
  { value: "friendly", label: "Friendly", description: "Warm and conversational" },
  { value: "formal", label: "Formal", description: "Professional and polished" },
];

const OUTPUT_MODES: { value: OutputMode; label: string; description: string }[] = [
  { value: "email", label: "Cold Email", description: "Short & scannable" },
  { value: "proposal", label: "Proposal", description: "Structured & exportable" },
];

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string; title?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="flex rounded-lg overflow-hidden border"
      style={{ borderColor: "var(--color-border)" }}
    >
      {options.map((opt, i) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            title={opt.title}
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2.5 text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
              active ? "" : "seg-btn-inactive"
            }`}
            style={{
              borderRight:
                i < options.length - 1
                  ? "1px solid var(--color-border)"
                  : "none",
              backgroundColor: active ? "var(--color-accent)" : undefined,
              color: active ? "white" : "var(--color-text-primary)",
              // focus ring color
              "--tw-ring-color": "var(--color-accent)",
            } as React.CSSProperties}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

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
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          3
        </span>
        <h2
          className="text-sm font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Output options
        </h2>
      </div>

      {/* Output type */}
      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Output type
        </p>
        <div className="grid grid-cols-2 gap-2">
          {OUTPUT_MODES.map((mode) => {
            const active = outputMode === mode.value;
            return (
              <button
                key={mode.value}
                type="button"
                onClick={() => onOutputModeChange(mode.value)}
                className="flex flex-col items-start rounded-xl border px-3.5 py-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2"
                style={
                  {
                    borderColor: active
                      ? "var(--color-accent)"
                      : "var(--color-border)",
                    backgroundColor: active
                      ? "rgba(13,148,136,0.06)"
                      : "var(--color-surface)",
                    boxShadow: active ? "0 0 0 1px var(--color-accent)" : "none",
                    "--tw-ring-color": "var(--color-accent)",
                  } as React.CSSProperties
                }
              >
                <span
                  className="text-sm font-semibold"
                  style={{
                    color: active
                      ? "var(--color-accent)"
                      : "var(--color-text-primary)",
                  }}
                >
                  {mode.label}
                </span>
                <span
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {mode.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Framework */}
      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Framework
        </p>
        <SegmentedControl
          options={FRAMEWORKS}
          value={framework}
          onChange={onFrameworkChange}
        />
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {FRAMEWORKS.find((f) => f.value === framework)?.title}
        </p>
      </div>

      {/* Tone */}
      <div className="flex flex-col gap-2">
        <p
          className="text-xs font-medium uppercase tracking-wide"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Tone
        </p>
        <SegmentedControl
          options={TONES}
          value={tone}
          onChange={onToneChange}
        />
        <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
          {TONES.find((t) => t.value === tone)?.description}
        </p>
      </div>
    </section>
  );
}
