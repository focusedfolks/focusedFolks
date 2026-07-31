import type { LegalDocument, LegalSection } from "@/types/legal";
import {
  LEGAL_EFFECTIVE_DATE,
  LEGAL_ENTITY,
  LEGAL_LAST_UPDATED,
} from "@/constants/legal/meta";
import { privacyFoundation } from "@/constants/legal/privacy-foundation";
import { termsFoundation } from "@/constants/legal/terms-foundation";
import { privacySections as privacyExtended } from "@/constants/legal/privacy-sections";
import { termsSections as termsExtended } from "@/constants/legal/terms-sections";

function renumberSections(sections: LegalSection[]): LegalSection[] {
  return sections.map((section, index) => ({
    ...section,
    title: `${index + 1}. ${section.title.replace(/^\d+\.\s*/, "")}`,
  }));
}

function mergeSections(foundation: LegalSection[], extended: LegalSection[]): LegalSection[] {
  const foundationIds = new Set(foundation.map((section) => section.id));
  const uniqueExtended = extended.filter((section) => !foundationIds.has(section.id));
  return renumberSections([...foundation, ...uniqueExtended]);
}

export const privacySections = mergeSections(privacyFoundation, privacyExtended);
export const termsSections = mergeSections(termsFoundation, termsExtended);

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  badge: "Legal",
  description:
    "Comprehensive Privacy Policy of Focused Folks Solutions LLP describing how we collect, use, disclose, retain, secure, and govern personal and business information across our website, sales operations, and IT service delivery in India, the UAE, and internationally.",
  lastUpdated: LEGAL_LAST_UPDATED,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  entityName: LEGAL_ENTITY,
  sections: privacySections,
};

export const termsAndConditions: LegalDocument = {
  title: "Terms & Conditions",
  badge: "Legal",
  description:
    "Comprehensive Terms and Conditions governing access to the FocusFolks website and the provision of enterprise business and IT services by Focused Folks Solutions LLP, including intellectual property, commercial terms, liability, compliance, and dispute resolution.",
  lastUpdated: LEGAL_LAST_UPDATED,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  entityName: LEGAL_ENTITY,
  sections: termsSections,
};
