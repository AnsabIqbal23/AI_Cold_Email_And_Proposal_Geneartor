export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1
          style={{ color: "var(--color-text-primary)" }}
          className="text-3xl font-bold tracking-tight"
        >
          Generate your outreach
        </h1>
        <p
          style={{ color: "var(--color-text-secondary)" }}
          className="mt-2 text-base"
        >
          Enter a few details about your prospect and we will write a tailored
          cold email or proposal. No em-dashes, no fluff, no stiff openers.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
        className="rounded-xl border p-8 text-center"
      >
        <p style={{ color: "var(--color-text-secondary)" }} className="text-sm">
          Generator form coming in the next phase.
        </p>
      </div>
    </div>
  );
}
