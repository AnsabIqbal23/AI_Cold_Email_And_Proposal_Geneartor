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
    <section
      id="how-it-works"
      className="py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="mb-16 text-center">
          <h2
            className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Three steps to a great first impression.
          </h2>
          <p
            className="mx-auto max-w-md text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            No prompting required. Just fill in the details and let the tool
            do the writing.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-14">
          {STEPS.map((step, index) => (
            <AnimateIn key={step.number} delay={index * 100}>
              <div className="flex items-start gap-4 md:flex-col md:gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{
                    backgroundColor: "rgba(13,148,136,0.1)",
                    color: "var(--color-accent)",
                  }}
                >
                  {step.number}
                </div>
                <div>
                  <h3
                    className="mb-2 text-base font-semibold"
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
