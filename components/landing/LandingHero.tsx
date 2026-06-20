import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(13,148,136,0.09) 0%, transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-36 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase mb-10"
          style={{
            borderColor: "rgba(13,148,136,0.25)",
            backgroundColor: "rgba(13,148,136,0.06)",
            color: "var(--color-accent)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
          Free to use, no account required
        </div>

        <h1
          className="text-5xl font-bold tracking-tight leading-tight lg:text-6xl mb-6"
          style={{ color: "var(--color-text-primary)" }}
        >
          Cold outreach that actually
          <br />
          <span style={{ color: "var(--color-accent)" }}>gets replies.</span>
        </h1>

        <p
          className="text-lg lg:text-xl max-w-xl mx-auto leading-relaxed mb-10"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Write tailored cold emails and structured proposals in seconds.
          Built for freelancers and small sales teams who want to sound human,
          not automated.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/generate"
            className="btn-accent inline-flex items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold"
          >
            Try it free
          </Link>
          <a
            href="#how-it-works"
            className="btn-outline inline-flex items-center justify-center rounded-lg px-8 py-3.5 text-sm font-semibold"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
