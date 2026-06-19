import { GeneratorForm } from "@/components/GeneratorForm";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          Generate your outreach
        </h1>
        <p
          className="mt-2 text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Enter a few details about your prospect and we will write a tailored
          cold email or proposal. No em-dashes, no fluff, no stiff openers.
        </p>
      </div>

      <div
        className="rounded-xl border p-6 sm:p-8"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <GeneratorForm />
      </div>
    </div>
  );
}
