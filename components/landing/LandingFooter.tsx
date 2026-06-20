import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--color-header-bg)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <div
              className="mb-1 text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Outreach AI
            </div>
            <div
              className="text-xs"
              style={{ color: "rgba(250,250,249,0.4)" }}
            >
              Cold outreach that sounds human.
            </div>
          </div>

          <Link
            href="/generate"
            className="btn-accent inline-flex items-center justify-center rounded-lg px-6 py-2.5 text-sm font-semibold"
          >
            Try it free
          </Link>
        </div>

        <div
          className="mt-10 border-t pt-8 text-xs"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            color: "rgba(250,250,249,0.28)",
          }}
        >
          Built for freelancers and small sales teams. Free tier only.
        </div>
      </div>
    </footer>
  );
}
