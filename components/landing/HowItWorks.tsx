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
    <section
      id="how-it-works"
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Three steps to a great first impression.
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No prompting required. Just fill in the details and let the tool
            do the writing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: "rgba(13,148,136,0.1)",
                    color: "var(--color-accent)",
                  }}
                >
                  {step.number}
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className="hidden md:block flex-1 h-px"
                    style={{ backgroundColor: "var(--color-border)" }}
                    aria-hidden
                  />
                )}
              </div>
              <div>
                <h3
                  className="text-base font-semibold mb-2"
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
          ))}
        </div>
      </div>
    </section>
  );
}
