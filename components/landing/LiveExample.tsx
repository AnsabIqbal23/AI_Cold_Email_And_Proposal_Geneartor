const SAMPLE = {
  from: "Alex Chen",
  to: "Sarah Williams, Maple & Co",
  subject: "Quick question about Maple & Co's client onboarding",
  body: `Hi Sarah,

I was looking at Maple & Co's website and noticed you have a self-serve onboarding flow. A few things stood out to me as friction points that could be pulling down your trial-to-paid numbers.

I'm a freelance product designer who has worked with SaaS teams to reduce onboarding drop-off. One client saw a 34% lift in conversions after targeted changes we made together.

If you're open to it, I'd love to share what I noticed. Would a 20-minute call this week work for you? No pitch, just a look at the specifics.

Best,
Alex`,
  framework: "AIDA framework",
  time: "about 3 seconds",
};

export default function LiveExample() {
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            See what it actually produces.
          </h2>
          <p
            className="text-base max-w-md mx-auto"
            style={{ color: "var(--color-text-secondary)" }}
          >
            A real example from a freelance designer reaching out to a SaaS
            company. Nothing was edited after generation.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div
            className="overflow-hidden rounded-2xl border shadow-sm"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div
              className="flex items-center gap-2 border-b px-4 py-3"
              style={{
                backgroundColor: "var(--color-header-bg)",
                borderColor: "rgba(255,255,255,0.07)",
              }}
            >
              <span className="h-3 w-3 rounded-full bg-stone-700" />
              <span className="h-3 w-3 rounded-full bg-stone-700" />
              <span className="h-3 w-3 rounded-full bg-stone-700" />
              <span
                className="ml-2 text-xs"
                style={{ color: "rgba(250,250,249,0.4)" }}
              >
                Generated email
              </span>
            </div>

            <div
              className="space-y-1 border-b px-6 py-4 text-sm"
              style={{
                backgroundColor: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex gap-3">
                <span
                  className="w-14 shrink-0 text-right"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  From
                </span>
                <span style={{ color: "var(--color-text-primary)" }}>
                  {SAMPLE.from}
                </span>
              </div>
              <div className="flex gap-3">
                <span
                  className="w-14 shrink-0 text-right"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  To
                </span>
                <span style={{ color: "var(--color-text-primary)" }}>
                  {SAMPLE.to}
                </span>
              </div>
              <div className="flex gap-3">
                <span
                  className="w-14 shrink-0 text-right"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Subject
                </span>
                <span
                  className="font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {SAMPLE.subject}
                </span>
              </div>
            </div>

            <div
              className="px-6 py-6"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <p
                className="whitespace-pre-line text-sm leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                {SAMPLE.body}
              </p>
            </div>

            <div
              className="flex items-center gap-2 border-t px-6 py-3 text-xs"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "rgba(13,148,136,0.04)",
                color: "var(--color-text-secondary)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-accent)" }}
              />
              Generated with {SAMPLE.framework} in {SAMPLE.time}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
