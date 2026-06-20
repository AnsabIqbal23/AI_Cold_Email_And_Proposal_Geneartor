import type { Metadata } from "next";
import Link from "next/link";
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
          className="sticky top-0 z-50 border-b border-stone-800"
          style={{ backgroundColor: "var(--color-header-bg)" }}
        >
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-75"
                style={{ color: "var(--color-text-inverse)" }}
              >
                Outreach AI
              </Link>
              <Link
                href="/generate"
                className="btn-accent rounded-md px-4 py-2 text-sm font-semibold"
              >
                Try it free
              </Link>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
