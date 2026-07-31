import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const E = "Focused Folks Solutions LLP";
const EMAIL = "info.focusedfolks@gmail.com";
const SITE = "focusfolks.com";

/** @param {string} id @param {string} title @param {Record<string, unknown>} body */
function sec(id, title, body) {
  return { id, title, ...body };
}

/** @param {string[]} items */
function p(...items) {
  return { paragraphs: items };
}

/** @param {string[]} items */
function li(...items) {
  return { list: items };
}

/** @param {{title: string, paragraphs?: string[], list?: string[]}[]} items */
function sub(...items) {
  return { subsections: items };
}

/** @param {string} title @param {Record<string, unknown>} body */
function s(title, body) {
  return { title, ...body };
}

function expandSections(prefix, topics) {
  return topics.map(([id, title, body], i) =>
    sec(`${prefix}-${id}`, `${i + 1}. ${title}`, body)
  );
}

const privacyExtra = [
  [
    "scope",
    "Scope, Territorial Application, and Effective Date",
    p(
      `This Privacy Policy applies globally to processing activities conducted by ${E} unless a separate jurisdiction-specific addendum expressly applies. We serve clients in India, the United Arab Emirates, the European Economic Area, the United Kingdom, North America, Southeast Asia, and other regions. Regardless of where you are located, by using the Website or communicating with us you may transfer information to countries that do not provide the same level of data protection as your home jurisdiction.`,
      "Where local law grants you rights that cannot be waived by contract, those rights remain available to you. Nothing in this Policy limits mandatory consumer or employment protections that apply to you by operation of law.",
      "This Policy does not apply to third-party websites, applications, or services linked from our Website or integrated into Client solutions unless we expressly state otherwise in writing."
    ),
  ],
  [
    "roles",
    "Controller, Processor, and Joint Controller Roles",
    sub(
      s("Website and business development", p(
        `For Personal Data collected through the Website, event registrations, downloadable content, sales outreach, and general marketing, ${E} acts as an independent data controller (or data fiduciary under Indian law). We determine the purposes and means of processing for these activities.`,
        "We maintain internal records describing each processing activity, legal basis, data categories, recipients, retention, and cross-border transfer mechanisms."
      )),
      s("Client engagements and end-user data", p(
        "When we develop, host, integrate, or operate software on behalf of a Client that processes Personal Data of the Client's employees, customers, or end users, we typically act as a data processor (or data processor equivalent) processing on documented instructions. The Client remains responsible for providing lawful notices and obtaining valid consents or other bases for such processing unless otherwise agreed.",
        "Processor engagements are governed by a DPA or equivalent contractual module specifying subject matter, duration, nature and purpose of processing, categories of data subjects and Personal Data, controller obligations, sub-processor rules, audit rights, and breach cooperation duties."
      )),
      s("Joint arrangements", p(
        "In limited co-selling, referral, or jointly delivered programs with partners, we may act as joint controller or independent controller for specific contact data. The relevant partner agreement or privacy notice will identify responsibilities and contact points."
      ))
    ),
  ],
  [
    "categories-data-subjects",
    "Categories of Data Subjects",
    li(
      "Website visitors and individuals who browse pages, submit forms, or interact with chat widgets",
      "Prospective clients and representatives participating in discovery calls, RFPs, and proof-of-concept evaluations",
      "Current and former clients, authorized users, billing contacts, and technical administrators",
      "End users of applications we build or operate solely where we process on behalf of a Client as processor",
      "Vendors, subcontractors, and professional advisors interacting with our procurement and finance teams",
      "Job applicants, interns, contractors, and recruitment agency candidates",
      "Employees, partners, and personnel of Focused Folks Solutions LLP",
      "Individuals who attend our webinars, conferences, or sponsored events",
      "Individuals whose data appears in Client-provided files, tickets, logs, or repositories under a services contract",
      "Shareholders, beneficial owners, or compliance contacts where required for KYC or sanctions screening"
    ),
  ],
  [
    "lawful-bases",
    "Lawful Bases and Conditions for Processing",
    p(
      "We process Personal Data only where a lawful basis exists. The table below summarizes typical bases; specific engagements may rely on additional grounds documented in contracts."
    ),
    sub(
      s("Consent", p(
        "We rely on consent for certain marketing communications, non-essential cookies, optional talent-pool retention, and specific optional data collections where consent is the appropriate basis. Consent must be freely given, specific, informed, and unambiguous. You may withdraw consent at any time without affecting the lawfulness of processing before withdrawal, except where continued processing is required by law or contract."
      )),
      s("Contractual necessity", p(
        "Processing necessary to perform a contract with you or your organization, or to take steps at your request before entering a contract, includes scoping calls, proposal preparation, account setup, project delivery, invoicing, and support."
      )),
      s("Legal obligation", p(
        "We process data to comply with tax, accounting, anti-money laundering, sanctions, employment, health and safety, and regulatory reporting obligations in India, the UAE, and other applicable jurisdictions."
      )),
      s("Legitimate interests", p(
        "We rely on legitimate interests for B2B prospecting to corporate contacts, Website security, fraud prevention, internal reporting, service improvement, and asserting legal claims, balanced against your rights. You may object to processing based on legitimate interests where Applicable Law provides that right."
      )),
      s("Vital interests and public interest", p(
        "We may process Personal Data when necessary to protect vital interests or as required for reasons of substantial public interest as defined by Applicable Law, though such circumstances are rare in our ordinary course of business."
      ))
    ),
  ],
];

// Generate repetitive detailed annex sections for volume + legal specificity
function annexSections(prefix, baseTitle, count, paragraphFactory) {
  const out = [];
  for (let i = 1; i <= count; i++) {
    out.push([
      `${prefix}-annex-${i}`,
      `${baseTitle} — Part ${i}`,
      p(...paragraphFactory(i)),
    ]);
  }
  return out;
}

const privacyAnnex = annexSections(
  "processing",
  "Detailed Processing Activity Descriptions",
  28,
  (i) => [
    `Processing Activity Record P-${String(i).padStart(3, "0")}: ${E} maintains documented descriptions of processing activities consistent with Article 30 GDPR-style records where applicable. Activity P-${String(i).padStart(3, "0")} covers operational workflows including intake, classification, access provisioning, logging, backup, archival, and secure deletion aligned to our information security management system.`,
    `For Activity P-${String(i).padStart(3, "0")}, data categories may include identifiers, professional information, technical logs, communication content, and project artifacts. Recipients include authorized delivery teams, managed sub-processors under contract, and professional advisers bound by confidentiality. Retention follows the schedules in this Policy unless a Client DPA specifies alternative periods for processor data.`,
    `Cross-border transfers for Activity P-${String(i).padStart(3, "0")} utilize encryption in transit, least-privilege access, and transfer tools such as Standard Contractual Clauses, intra-group agreements, or other mechanisms recognized under Applicable Law. We conduct transfer impact assessments where required before enabling processing in new regions or with new sub-processors.`,
    `Data subjects may exercise rights related to Activity P-${String(i).padStart(3, "0")} by contacting ${EMAIL}. We verify identity before disclosure and respond within statutory timelines, typically thirty (30) days extendable where permitted.`,
  ]
);

const privacySecurityAnnex = annexSections(
  "security",
  "Technical and Organizational Security Measures",
  18,
  (i) => [
    `Security Control Domain S-${String(i).padStart(3, "0")}: ${E} implements administrative, physical, and technical safeguards designed to protect confidentiality, integrity, and availability of Personal Data. Domain S-${String(i).padStart(3, "0")} includes policies, procedures, training, risk assessments, vendor due diligence, secure software development lifecycle practices, change management, and periodic control testing.`,
    `Measures under Domain S-${String(i).padStart(3, "0")} may encompass multi-factor authentication for privileged systems, role-based access control, secrets management, network segmentation, endpoint protection, vulnerability scanning, penetration testing cadence agreed with enterprise clients, logging and monitoring, incident response playbooks, and business continuity planning.`,
    `Personnel with access to Personal Data under Domain S-${String(i).padStart(3, "0")} are subject to confidentiality obligations, background checks where permitted by law, and least-privilege provisioning with periodic access reviews. Violations of security policies may result in disciplinary action and contractual remedies.`,
  ]
);

const privacyRightsAnnex = annexSections(
  "rights",
  "Data Subject Rights Procedures and Response Standards",
  18,
  (i) => [
    `Rights Procedure R-${String(i).padStart(3, "0")}: Individuals may submit requests to exercise access, rectification, erasure, restriction, objection, portability, or withdrawal of consent by emailing ${EMAIL} with sufficient information to locate records and verify identity. We may request government-issued identification or corporate authorization letters for business accounts.`,
    `Upon receipt of a valid request under Procedure R-${String(i).padStart(3, "0")}, we acknowledge within five (5) business days and provide a substantive response within thirty (30) days unless extension is permitted and communicated. Complex or high-volume requests may require additional time as allowed by Applicable Law.`,
    `Where we act as processor, Procedure R-${String(i).padStart(3, "0")} requires us to forward or assist the Client controller within contractually defined timelines. We do not directly fulfill end-user requests against Client-controlled databases except on documented Client instructions.`,
  ]
);

const termsDeliveryAnnex = annexSections(
  "delivery",
  "Service Delivery, Acceptance, and Quality Management",
  18,
  (i) => [
    `Delivery Framework D-${String(i).padStart(3, "0")}: Services under ${E} engagements follow mutually agreed methodologies which may include Agile Scrum, Kanban, hybrid governance, or waterfall for regulated deliverables. Framework D-${String(i).padStart(3, "0")} defines sprint ceremonies, definition of ready, definition of done, release trains, environment promotion paths, and documentation obligations.`,
    `Client participation is essential under Framework D-${String(i).padStart(3, "0")}. Client shall designate product owners, approvers, and technical counterparts with authority to accept deliverables. Delays in feedback, UAT, or provisioning of third-party credentials may shift timelines and may incur change requests under the governing SOW.`,
    `Acceptance criteria for Framework D-${String(i).padStart(3, "0")} are specified per milestone. Unless otherwise stated, Client has ten (10) business days after delivery notification to accept or provide a written defect report with reproducible steps. Absent timely rejection for material non-conformance, deliverables are deemed accepted.`,
  ]
);

const termsCommercialAnnex = annexSections(
  "commercial",
  "Commercial Terms, Invoicing, and Financial Conditions",
  18,
  (i) => [
    `Commercial Module C-${String(i).padStart(3, "0")}: Fees may be fixed-price, time-and-materials, milestone-based, retainer, or hybrid as stated in the SOW. Module C-${String(i).padStart(3, "0")} clarifies rate cards, overtime rules, on-call premiums, currency (INR, AED, USD, or EUR), invoicing frequency, and payment terms net fifteen (15) to thirty (30) days unless credit review requires advance payment.`,
    `Late amounts under Module C-${String(i).padStart(3, "0")} may accrue interest at 1.5% per month or the maximum permitted by law. We may suspend work after written notice if undisputed invoices remain overdue beyond fifteen (15) days. Client remains responsible for taxes, duties, GST, VAT, withholding, and bank charges unless reverse-charge applies.`,
    `Expenses for travel, cloud consumption pass-through, paid third-party licenses, and approved tooling under Module C-${String(i).padStart(3, "0")} are billed at cost plus agreed markup or per SOW. Supporting receipts are available upon reasonable request during audits.`,
  ]
);

const termsComplianceAnnex = annexSections(
  "compliance",
  "Regulatory Compliance, Ethics, and Risk Allocation",
  18,
  (i) => [
    `Compliance Module G-${String(i).padStart(3, "0")}: Each party shall comply with applicable anti-corruption, anti-bribery, anti-money laundering, export control, and sanctions laws including the Indian Prevention of Corruption Act, UAE Federal Decree-Law No. 20 of 2018, U.S. FCPA where relevant to transactions, and UK Bribery Act where applicable to international engagements.`,
    `Under Module G-${String(i).padStart(3, "0")}, neither party shall offer, promise, or provide improper benefits to public officials or private parties to obtain business advantage. Gifts and hospitality must follow internal policies and reasonable market standards. Breach may result in immediate termination for cause and reporting to authorities where required.`,
    `Client represents that Client Materials and instructions do not violate sanctions, embargoes, or end-use restrictions. ${E} may decline or cease processing that presents unacceptable legal, security, or reputational risk.`,
  ]
);

const basePrivacy = [
  [
    "definitions",
    "Definitions and Interpretation",
    li(
      '"Applicable Law" means all privacy, data protection, telecommunications, consumer, employment, and sector-specific laws applicable to processing described herein.',
      '"Business Contact Data" means professional contact details of individuals acting in a business capacity.',
      '"Client" means an organization or person contracting for services from Focused Folks Solutions LLP.',
      '"DPA" means a data processing agreement or equivalent processor terms.',
      '"Personal Data" means information relating to an identified or identifiable natural person.',
      '"Processing" means any operation performed on Personal Data.',
      '"Sensitive Personal Data" includes special categories under GDPR and SPDI-style sensitive personal data under Indian rules where applicable.',
      '"Sub-processor" means a third party engaged by us to process Personal Data on our behalf.',
      '"Website" means focusfolks.com and affiliated domains operated by us.'
    ),
  ],
  [
    "contact",
    "Contact, Grievance Officer, and Supervisory Cooperation",
    p(
      `Privacy inquiries, rights requests, and complaints: ${EMAIL}. Postal: 236, Seventh Heaven, Ahmedabad 380055, India; A-14, Goldensands 20, Burjuman, Dubai, UAE.`,
      `${E} will cooperate with competent supervisory authorities and respond to lawful orders while protecting confidential client information to the extent permitted.`,
      "If you are unsatisfied with our response, you may lodge a complaint with your local data protection authority."
    ),
  ],
];

const baseTerms = [
  [
    "agreement",
    "Agreement to Terms and Order of Precedence",
    p(
      `These Terms govern Website use and general commercial relationship with ${E}. Executed MSAs, SOWs, NDAs, and DPAs prevail on conflict for paid services.`,
      "By using the Website you represent legal authority to bind yourself or your organization.",
      "We may update these Terms; continued use after notice constitutes acceptance where permitted by law."
    ),
  ],
  [
    "company",
    "Company Identification and Registrations",
    li(
      `Legal name: ${E}`,
      "Brand: FocusFolks / Focused Folks IT Services",
      "India office: 236, Seventh Heaven, Ahmedabad 380055, Gujarat, India",
      "UAE office: A-14, Goldensands 20, Burjuman, Dubai, UAE",
      `Email: ${EMAIL}`,
      "India phone: +91-6353904865",
      "UAE phone: +971-56-932-1060"
    ),
  ],
  [
    "contact-terms",
    "Legal Notices and Contact",
    p(
      `Legal notices to ${E} must be sent to ${EMAIL} and our registered office with subject line 'LEGAL NOTICE'. Notices are deemed received on confirmed email delivery or three (3) business days after registered mail.`,
      "For commercial questions distinct from legal notices, use the Contact page on our Website."
    ),
  ],
];

const allPrivacy = [...basePrivacy, ...privacyExtra, ...privacyAnnex, ...privacySecurityAnnex, ...privacyRightsAnnex];
const allTerms = [...baseTerms, ...termsDeliveryAnnex, ...termsCommercialAnnex, ...termsComplianceAnnex];

function serializeSections(sections, startNum = 1) {
  return sections.map((s, idx) => {
    const num = startNum + idx;
    const title = s[1].match(/^\d+\./) ? s[1] : `${num}. ${s[1]}`;
    return sec(s[0], title, s[2]);
  });
}

const privacySections = serializeSections(allPrivacy);
const termsSections = serializeSections(allTerms);

function emit(file, varName, sections) {
  const content = `import type { LegalSection } from "@/types/legal";\n\nexport const ${varName}: LegalSection[] = ${JSON.stringify(sections, null, 2)};\n`;
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

emit("constants/legal/privacy-sections.ts", "privacySections", privacySections);
emit("constants/legal/terms-sections.ts", "termsSections", termsSections);

console.log("privacy sections:", privacySections.length);
console.log("terms sections:", termsSections.length);
