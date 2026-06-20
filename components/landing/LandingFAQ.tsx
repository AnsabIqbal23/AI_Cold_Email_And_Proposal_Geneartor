import AnimateIn from "@/components/landing/AnimateIn";

const FAQS = [
  {
    q: "Is it free to use?",
    a: "Yes. The tool runs on free-tier AI APIs and is hosted for free. You do not need an account, and there is nothing to pay.",
  },
  {
    q: "What AI does it use?",
    a: "Google Gemini Flash is the default model, with Groq as a fallback. Both run entirely server-side, so no API keys are ever exposed in your browser.",
  },
  {
    q: "Is my data safe?",
    a: "Your input is sent to the AI provider to generate a response and is not stored anywhere. Nothing persists beyond your browser session.",
  },
  {
    q: "Can I use it for proposals too?",
    a: "Yes. You can generate a full structured proposal and export it as a formatted PDF in one click, ready to attach and send.",
  },
  {
    q: "Do I need to write my own prompts?",
    a: "No. The tool handles all prompting behind the scenes. You fill in plain fields about your prospect, pick a framework, and the prompt is built for you.",
  },
];

export default function LandingFAQ() {
  return (
    <section
      className="py-20 lg:py-28"
    >
      <div className="mx-auto max-w-2xl px-6">
        <AnimateIn className="mb-14 text-center">
          <h2
            className="text-3xl font-bold tracking-tight lg:text-4xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            Common questions.
          </h2>
        </AnimateIn>

        <div
          className="divide-y"
          style={{ borderColor: "var(--color-border)" }}
        >
          {FAQS.map((faq, i) => (
            <AnimateIn key={faq.q} delay={i * 60}>
              <div className="py-6">
                <h3
                  className="mb-2 text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {faq.q}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {faq.a}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
