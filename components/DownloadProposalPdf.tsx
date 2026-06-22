"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { ProposalPdf } from "./ProposalPdf";
import type { ProposalContent } from "@/lib/types";

function buildFilename(targetCompany: string): string {
  const slug = targetCompany
    .trim()
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  return slug ? `Proposal-${slug}.pdf` : "Proposal.pdf";
}

interface Props {
  sections: ProposalContent;
  targetCompany: string;
  generatedAt: Date;
}

export function DownloadProposalPdf({ sections, targetCompany, generatedAt }: Props) {
  const filename = buildFilename(targetCompany);

  return (
    <PDFDownloadLink
      document={
        <ProposalPdf
          sections={sections}
          targetCompany={targetCompany}
          generatedAt={generatedAt}
        />
      }
      fileName={filename}
      style={{ textDecoration: "none" }}
    >
      {({ loading }) => (
        <span
          className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors inline-block"
          style={{
            borderColor: "var(--color-border)",
            color: loading
              ? "var(--color-text-secondary)"
              : "var(--color-text-primary)",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.5 : 1,
          }}
        >
          {loading ? "Preparing..." : "Download as PDF"}
        </span>
      )}
    </PDFDownloadLink>
  );
}
