import AnimateIn from "@/components/landing/AnimateIn";

const STEPS = [
  {
    number: "01",
    title: "Enter client details",
    description:
      "Paste the prospect's business name, industry, and a quick note about what you offer them. Takes under a minute.",
  },
  {
    number: "02",
    title: "Pick a framework and tone",
    description:
      "Choose from proven copywriting frameworks and set the tone to match how you want to come across.",
  },
  {
    number: "03",
    title: "Get your email or proposal",
    description:
      "Receive a polished, human-sounding draft ready to send, or export it as a formatted PDF proposal.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="mb-12">
          <h2
            className="text-3xl font-bold tracking-tight lg:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Three steps to a great first impression.
          </h2>
        </AnimateIn>

        <div className="border-t border-stone-200">
          {STEPS.map((step, index) => (
            <AnimateIn key={step.number} delay={index * 80}>
              <div className="flex gap-5 border-b border-stone-200 py-9 transition-colors duration-200 hover:bg-white/70 sm:gap-8">
                {/* Step number — plain mono text, no box */}
                <span
                  className="w-10 shrink-0 pt-0.5 font-mono text-lg font-bold tabular-nums"
                  style={{ color: "var(--color-accent)" }}
                >
                  {step.number}
                </span>

                {/* Title + description — stacked on mobile, side-by-side on md+ */}
                <div className="flex flex-1 flex-col gap-2 md:flex-row md:gap-10 lg:gap-16">
                  <h3
                    className="shrink-0 text-base font-semibold leading-snug md:w-52 lg:w-60"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
