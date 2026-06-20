const TESTIMONIALS = [
  {
    quote:
      "I used to spend 30 minutes on each cold email. Now I have a solid first draft in under a minute that I tweak slightly. My reply rate has gone up noticeably.",
    name: "Jordan T.",
    role: "Freelance Web Developer",
  },
  {
    quote:
      "The proposal output is genuinely impressive. It comes out structured and professional, and the PDF export means I can send it directly from my phone.",
    name: "Priya M.",
    role: "Brand Consultant",
  },
  {
    quote:
      "I was skeptical because AI writing tools all sound the same. This one actually adjusts the tone. My first batch of emails felt personal.",
    name: "Marcus L.",
    role: "Sales Advisor, small agency",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
          style={{ color: "var(--color-accent)" }}
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2
            className="text-3xl font-bold tracking-tight lg:text-4xl mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            What people are saying.
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Early users, real feedback. Placeholder names until we collect
            signed reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border p-6"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <StarRating />
              <p
                className="flex-1 text-sm leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
