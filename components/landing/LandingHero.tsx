import Link from "next/link";

function FrameworkPill({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) {
  return (
    <span
      className="rounded-md border px-2.5 py-1 text-xs font-medium"
      style={
        active
          ? {
              borderColor: "var(--color-accent)",
              backgroundColor: "rgba(13,148,136,0.1)",
              color: "var(--color-accent)",
            }
          : {
              borderColor: "var(--color-border)",
              color: "var(--color-text-secondary)",
            }
      }
    >
      {label}
    </span>
  );
}

function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="mb-1 text-xs"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {label}
      </p>
      <div
        className="rounded-lg border px-3 py-2 text-sm"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-text-primary)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function HeroPreviewCard() {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl border bg-white"
      style={{
        borderColor: "var(--color-border)",
        boxShadow:
          "0 24px 60px rgba(0,0,0,0.10), 0 4px 18px rgba(13,148,136,0.07)",
        animation: "floatY 6s ease-in-out infinite",
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 border-b px-4 py-3"
        style={{ backgroundColor: "#f5f5f4", borderColor: "var(--color-border)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
        <span
          className="ml-3 text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          outreach-ai.vercel.app
        </span>
      </div>

      {/* Input fields */}
      <div
        className="space-y-3 border-b px-5 py-4"
        style={{ borderColor: "var(--color-border)" }}
      >
        <MockField label="Prospect company" value="Maple & Co" />
        <MockField label="What you offer" value="Product design audit" />
        <div className="flex gap-2 pt-0.5">
          <FrameworkPill label="AIDA" active />
          <FrameworkPill label="PAS" active={false} />
          <FrameworkPill label="BAB" active={false} />
        </div>
      </div>

      {/* Generated output */}
      <div className="px-5 py-4">
        <div className="mb-3 flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: "var(--color-accent)",
              animation: "pulseDot 2s ease-in-out infinite",
            }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-accent)" }}
          >
            Generated in 3 seconds
          </span>
        </div>
        <p
          className="mb-1.5 text-xs font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Re: Quick question about Maple & Co&apos;s onboarding
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Hi Sarah, I was looking at your website and noticed a few things in
          your onboarding flow that could be impacting activation rates. I&apos;m a
          freelance designer who&hellip;
        </p>
      </div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 60% 70% at 72% 5%, rgba(13,148,136,0.13) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 50% at 10% 90%, rgba(13,148,136,0.07) 0%, transparent 55%)",
            "linear-gradient(to bottom, white 0%, rgba(250,250,249,0.6) 100%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text column */}
          <div className="text-center lg:text-left">
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
              style={{
                borderColor: "rgba(13,148,136,0.25)",
                backgroundColor: "rgba(13,148,136,0.06)",
                color: "var(--color-accent)",
                animation: "fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-accent)",
                  animation: "pulseDot 2s ease-in-out infinite",
                }}
              />
              Free to use, no account required
            </div>

            <h1
              className="mb-5 text-5xl font-bold leading-tight tracking-tight lg:text-6xl"
              style={{
                color: "var(--color-text-primary)",
                animation: "fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) 80ms both",
              }}
            >
              Cold outreach that
              <br />
              <span style={{ color: "var(--color-accent)" }}>
                actually gets replies.
              </span>
            </h1>

            <p
              className="mb-8 text-lg leading-relaxed lg:text-xl"
              style={{
                color: "var(--color-text-secondary)",
                animation: "fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) 160ms both",
              }}
            >
              Write tailored cold emails and structured proposals in seconds.
              Built for freelancers and small sales teams who want to sound
              human, not automated.
            </p>

            <div
              className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
              style={{
                animation: "fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) 230ms both",
              }}
            >
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

          {/* App preview card column */}
          <div
            className="mx-auto w-full max-w-[360px] lg:max-w-none"
            style={{
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 300ms both",
            }}
          >
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
