import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { privacyPolicy } from "@/constants/legal";
import { SectionHeader } from "@/components/shared/section-header";
import { LegalDocument } from "@/components/shared/legal-document";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Privacy Policy",
    description:
      "Privacy Policy of Focused Folks Solutions LLP. Learn how we collect, use, protect, and retain personal data for our IT services in India and the UAE.",
    keywords: [
      "privacy policy",
      "Focused Folks Solutions LLP",
      "data protection",
      "GDPR",
      "India DPDP",
      "UAE data protection",
      "enterprise IT services",
    ],
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <section className="relative pt-24 pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="galaxy-glass-panel overflow-visible rounded-3xl p-6 md:p-10 lg:p-12">
          <SectionHeader
            badge={privacyPolicy.badge}
            title={privacyPolicy.title}
            description={privacyPolicy.description}
            align="left"
            immediate
            className="mb-8 md:mb-10"
          />
          <LegalDocument document={privacyPolicy} />
        </div>
      </div>
    </section>
  );
}
