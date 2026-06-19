"use client";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-6 text-center">
      <div className="flex flex-col gap-2">
        <h2
          className="text-xl font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Something went wrong
        </h2>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          {error.message || "An unexpected error occurred."}
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors"
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-accent-foreground)",
        }}
      >
        Try again
      </button>
    </div>
  );
}
