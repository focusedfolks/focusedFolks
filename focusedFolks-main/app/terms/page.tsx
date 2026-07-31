import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { termsAndConditions } from "@/constants/legal";
import { SectionHeader } from "@/components/shared/section-header";
import { LegalDocument } from "@/components/shared/legal-document";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Terms & Conditions",
    description:
      "Terms and Conditions of Focused Folks Solutions LLP governing website use, service delivery, intellectual property, payment, liability, and dispute resolution.",
    keywords: [
      "terms and conditions",
      "terms of service",
      "Focused Folks Solutions LLP",
      "IT services agreement",
      "legal",
      "enterprise software development",
    ],
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <section className="relative pt-24 pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="galaxy-glass-panel overflow-visible rounded-3xl p-6 md:p-10 lg:p-12">
          <SectionHeader
            badge={termsAndConditions.badge}
            title={termsAndConditions.title}
            description={termsAndConditions.description}
            align="left"
            immediate
            className="mb-8 md:mb-10"
          />
          <LegalDocument document={termsAndConditions} />
        </div>
      </div>
    </section>
  );
}
