import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Cold Email & Proposal Generator",
  description:
    "Generate tailored cold sales emails and structured proposals using AI. Built for freelancers and small sales teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{ backgroundColor: "var(--color-header-bg)" }}
          className="border-b border-stone-800"
        >
          <div className="mx-auto max-w-4xl px-6 py-4">
            <span
              style={{ color: "var(--color-text-inverse)" }}
              className="text-sm font-semibold tracking-widest uppercase"
            >
              Outreach AI
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
