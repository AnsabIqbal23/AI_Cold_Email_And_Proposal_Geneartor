"use client";

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { SECTION_KEYS, SECTION_LABELS } from "@/lib/proposal-formatter";
import type { ProposalContent } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 52,
    paddingBottom: 52,
    paddingHorizontal: 56,
    color: "#111827",
  },
  header: {
    marginBottom: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 6,
  },
  headerDate: {
    fontSize: 10,
    color: "#6b7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#111827",
    marginBottom: 6,
  },
  sectionBody: {
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.6,
  },
});

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface Props {
  sections: ProposalContent;
  targetCompany: string;
  generatedAt: Date;
}

export function ProposalPdf({ sections, targetCompany, generatedAt }: Props) {
  const companyDisplay = targetCompany.trim() || "the client";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Proposal prepared for {companyDisplay}
          </Text>
          <Text style={styles.headerDate}>{formatDate(generatedAt)}</Text>
        </View>

        {SECTION_KEYS.map((key, i) => (
          <View key={key} wrap={false}>
            {i > 0 && <View style={styles.divider} />}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionHeading}>{SECTION_LABELS[key]}</Text>
              <Text style={styles.sectionBody}>{sections[key]}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
