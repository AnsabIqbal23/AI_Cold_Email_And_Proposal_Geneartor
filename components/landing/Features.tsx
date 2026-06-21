import AnimateIn from "@/components/landing/AnimateIn";

const FEATURES = [
  {
    label: "Frameworks",
    title: "Proven structures, not generic prompts",
    description:
      "Choose from AIDA, PAS, BAB, and other tested copywriting frameworks. Each one shapes your message to move the reader toward a response.",
  },
  {
    label: "Voice",
    title: "Sounds like a person, not a robot",
    description:
      "Output is tuned to avoid stiff AI language and filler phrases. Your prospects read it and think a thoughtful person wrote it.",
  },
  {
    label: "Export",
    title: "Proposals with one-click PDF export",
    description:
      "Go from a structured proposal to a formatted PDF document in one click. Ready to attach and send, no extra tools needed.",
  },
  {
    label: "Providers",
    title: "Works with any AI provider",
    description:
      "Powered by Google Gemini Flash with Groq as a fallback. All calls happen server-side and nothing is stored. Free to use.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="mb-12">
          <h2
            className="text-3xl font-bold tracking-tight lg:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Everything you need to write better outreach.
          </h2>
        </AnimateIn>

        {/* 2-column newspaper grid — lines only, no card backgrounds */}
        <div className="border-t border-stone-200">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {FEATURES.map((feature, i) => (
              <AnimateIn key={feature.title} delay={(i % 2) * 80 + Math.floor(i / 2) * 50}>
                <div
                  className={[
                    "h-full p-8 lg:p-10",
                    "border-b border-stone-200",
                    "transition-colors duration-200 hover:bg-stone-50",
                    i % 2 === 0 ? "md:border-r md:border-stone-200" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Small uppercase label — replaces the icon */}
                  <span
                    className="mb-5 block text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {feature.label}
                  </span>

                  <h3
                    className="mb-3 text-lg font-bold leading-snug"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
