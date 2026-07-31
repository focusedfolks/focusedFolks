import type { LegalSection } from "@/types/legal";
import { LEGAL_EMAIL } from "@/constants/legal/meta";

/** Core Privacy Policy sections — detailed legal baseline */
export const privacyFoundation: LegalSection[] = [
  {
    id: "introduction-core",
    title: "Introduction",
    paragraphs: [
      `Focused Folks Solutions LLP ("Focused Folks," "we," "us," or "our") is committed to protecting the privacy and security of personal data entrusted to us. This Privacy Policy explains how we collect, use, disclose, retain, and safeguard information when you visit our website at focusfolks.com and related domains (collectively, the "Website"), submit inquiries, request proposals, enter into service agreements, or otherwise interact with our business and IT services.`,
      `This Policy applies to visitors, prospective clients, current clients, vendors, partners, job applicants, and any individual whose personal data we process in connection with our software development, web and mobile engineering, cloud, DevOps, AI integration, UI/UX, and enterprise consulting services delivered from Ahmedabad, India and Dubai, United Arab Emirates.`,
      `By accessing the Website or providing information to us, you acknowledge that you have read and understood this Privacy Policy. Where required by applicable law, we will seek your consent before processing personal data for specific purposes. If you do not agree with this Policy, please discontinue use of the Website and contact us regarding any ongoing relationship.`,
    ],
  },
  {
    id: "definitions-core",
    title: "Definitions",
    list: [
      `"Personal Data" means any information relating to an identified or identifiable natural person, including name, email address, phone number, IP address, device identifiers, and online identifiers.`,
      `"Business Contact Data" means professional contact details of representatives of corporate clients, such as work email, job title, and company name.`,
      `"Processing" means any operation performed on Personal Data, including collection, storage, use, disclosure, and deletion.`,
      `"Data Subject" means the individual to whom Personal Data relates.`,
      `"Client" means an organization or individual that engages Focused Folks Solutions LLP under a contract, statement of work, or purchase order.`,
      `"Sub-processor" means a third party engaged by us to process Personal Data on our behalf.`,
      `"Applicable Law" includes the Information Technology Act, 2000 and SPDI Rules (India), the Digital Personal Data Protection Act, 2023 (India, as enacted), the UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection, and the EU General Data Protection Regulation (GDPR) where applicable to our processing activities.`,
    ],
  },
  {
    id: "data-controller-core",
    title: "Data Controller and Contact Details",
    paragraphs: [
      `For the purposes of Applicable Law, Focused Folks Solutions LLP acts as the data controller (or data fiduciary, where that term applies) for Personal Data collected through the Website and for business development activities, unless otherwise specified in a written data processing agreement with a Client.`,
    ],
    subsections: [
      {
        title: "Registered and operating addresses",
        list: [
          "India: 236, Seventh Heaven, Ahmedabad 380055, Gujarat, India",
          "United Arab Emirates: A-14, Goldensands 20, Burjuman, Dubai, UAE",
        ],
      },
      {
        title: "Privacy inquiries",
        paragraphs: [
          `For privacy-related questions, data subject requests, or complaints, contact us at ${LEGAL_EMAIL}. We will respond within the timeframes required by Applicable Law, typically within thirty (30) days unless an extension is permitted.`,
        ],
      },
    ],
  },
  {
    id: "information-collected-core",
    title: "Information We Collect",
    subsections: [
      {
        title: "Information you provide directly",
        list: [
          "Identity and contact details: full name, email address, phone number, company name, job title, and country of residence",
          "Project and inquiry information: project scope, budget range, timelines, technical requirements, RFP responses, and attachments you upload",
          "Account and authentication data: usernames, credentials, and profile preferences where portals or collaboration tools are provided",
          "Billing and procurement data: billing address, tax identifiers, purchase order numbers, and payment-related metadata",
          "Communications: content of emails, calls, meeting notes, support tickets, and chat messages with our teams",
          "Recruitment data: résumé/CV, employment history, skills, references, and interview notes when you apply for a role",
        ],
      },
      {
        title: "Information collected automatically",
        list: [
          "Device and browser data: IP address, browser type and version, operating system, device type, and language settings",
          "Usage data: pages viewed, time spent, referral URLs, click paths, and interaction with forms and CTAs",
          "Log and security data: access timestamps, error logs, and signals used for fraud prevention and infrastructure monitoring",
          "Cookie and similar technologies data: as described in the Cookies section of this Policy",
        ],
      },
      {
        title: "Information from third parties",
        list: [
          "Business referrals and partner introductions",
          "Publicly available professional profiles (e.g., LinkedIn) where relevant to B2B outreach",
          "Vendor due diligence and identity verification services where legally required",
          "Client-provided data where we act as a processor under a Client agreement",
        ],
      },
    ],
  },
  {
    id: "purposes-core",
    title: "Purposes and Legal Bases for Processing",
    paragraphs: [
      "We process Personal Data only where we have a lawful basis under Applicable Law. Depending on your jurisdiction, lawful bases may include consent, contractual necessity, legitimate interests, legal obligation, or vital interests.",
    ],
    list: [
      "Responding to inquiries, scheduling consultations, and preparing proposals (contractual steps / legitimate interests)",
      "Delivering software development, consulting, and managed services under executed agreements (contractual necessity)",
      "Managing client relationships, account administration, and project collaboration (contractual necessity / legitimate interests)",
      "Processing invoices, payments, and tax compliance (legal obligation / contractual necessity)",
      "Improving Website performance, security, and user experience (legitimate interests)",
      "Marketing our services to business contacts with appropriate opt-out mechanisms (consent or legitimate interests, as applicable)",
      "Complying with court orders, regulatory requests, and applicable laws (legal obligation)",
      "Protecting our rights, preventing fraud, and ensuring network and information security (legitimate interests / legal obligation)",
      "Recruitment and talent acquisition (consent / pre-contractual steps / legitimate interests)",
    ],
  },
  {
    id: "sharing-core",
    title: "How We Share and Disclose Information",
    paragraphs: [
      "We do not sell Personal Data. We may disclose Personal Data only in the circumstances described below and subject to appropriate safeguards.",
    ],
    subsections: [
      {
        title: "Service providers and sub-processors",
        paragraphs: [
          "We engage trusted third parties for hosting, cloud infrastructure, email delivery, CRM, analytics, payment processing, background checks, and professional advisory services. These parties process data only on our documented instructions and under confidentiality and security obligations.",
        ],
        list: [
          "Cloud hosting and infrastructure providers (e.g., AWS, Azure, Google Cloud, or equivalent)",
          "Collaboration and productivity tools used for project delivery",
          "Email, calendar, and customer communication platforms",
          "Accounting, audit, and legal advisors bound by professional confidentiality",
        ],
      },
      {
        title: "Clients and project teams",
        paragraphs: [
          "Where you interact with us on behalf of a Client organization, we may share relevant contact and project information with authorized Client personnel. Where we process end-user data on a Client's behalf, the Client's privacy policy and data processing agreement govern that processing.",
        ],
      },
      {
        title: "Legal and regulatory disclosures",
        paragraphs: [
          "We may disclose information when required by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect the rights, property, or safety of Focused Folks Solutions LLP, our clients, or others.",
        ],
      },
      {
        title: "Business transfers",
        paragraphs: [
          "In connection with a merger, acquisition, reorganization, or sale of assets, Personal Data may be transferred subject to confidentiality and continued protection consistent with this Policy. We will provide notice where required by law.",
        ],
      },
    ],
  },
  {
    id: "international-transfers-core",
    title: "International Data Transfers",
    paragraphs: [
      "Focused Folks Solutions LLP operates across India and the UAE and may use service providers in other countries. When Personal Data is transferred across borders, we implement appropriate safeguards such as standard contractual clauses, intra-group agreements, adequacy decisions where recognized, and technical measures including encryption in transit and at rest.",
      "Clients engaging us for regulated workloads (healthcare, finance, government, or cross-border EU data) should disclose transfer requirements during contracting so we can implement jurisdiction-specific mechanisms.",
    ],
  },
  {
    id: "retention-core",
    title: "Data Retention",
    paragraphs: [
      "We retain Personal Data only for as long as necessary to fulfill the purposes described in this Policy, unless a longer retention period is required or permitted by law.",
      "Upon expiry of retention periods, we securely delete or anonymize Personal Data. Anonymized data used for analytics may be retained indefinitely in non-identifiable form.",
    ],
    list: [
      "Sales inquiries and marketing leads: typically up to thirty-six (36) months from last meaningful contact, unless you request earlier deletion",
      "Active client project data: for the duration of the engagement plus the period required by contract, statute of limitations, or audit requirements",
      "Financial and tax records: as required under Indian, UAE, or other applicable tax and commercial laws (often five to eight years or longer)",
      "Website logs and security records: typically twelve (12) to twenty-four (24) months unless needed for incident investigation",
      "Recruitment records: up to twenty-four (24) months for unsuccessful candidates unless you consent to longer talent-pool retention",
    ],
  },
  {
    id: "security-core",
    title: "Security Measures",
    paragraphs: [
      "We implement administrative, technical, and organizational measures designed to protect Personal Data against unauthorized access, alteration, disclosure, or destruction. Measures include role-based access controls, secure development practices, encrypted communications (TLS), secrets management, vulnerability management, backup and recovery procedures, and security awareness training for personnel with data access.",
      "No method of transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of credentials issued to you and for notifying us promptly of any suspected unauthorized access.",
    ],
  },
  {
    id: "rights-core",
    title: "Your Rights and Choices",
    paragraphs: [
      "Depending on your location and Applicable Law, you may have the following rights regarding your Personal Data, subject to certain exceptions:",
    ],
    list: [
      "Right of access: obtain confirmation and a copy of Personal Data we hold about you",
      "Right to rectification: request correction of inaccurate or incomplete data",
      "Right to erasure ('right to be forgotten'): request deletion where legally applicable",
      "Right to restrict or object to processing in certain circumstances",
      "Right to data portability: receive data in a structured, machine-readable format where technically feasible",
      "Right to withdraw consent at any time where processing is consent-based, without affecting prior lawful processing",
      "Right to lodge a complaint with a supervisory authority in your jurisdiction",
    ],
    subsections: [
      {
        title: "How to exercise your rights",
        paragraphs: [
          `To exercise your rights, email ${LEGAL_EMAIL} with sufficient detail to verify your identity and specify your request. We may need additional information to prevent unauthorized disclosure. We do not discriminate against individuals who exercise privacy rights.`,
          "Business contacts may opt out of marketing emails using the unsubscribe link in our messages or by contacting us directly.",
        ],
      },
    ],
  },
  {
    id: "cookies-core",
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "Our Website may use cookies, local storage, pixels, and similar technologies to enable core functionality, remember preferences, measure traffic, and improve performance.",
    ],
    subsections: [
      {
        title: "Types of cookies we may use",
        list: [
          "Strictly necessary cookies: required for security, load balancing, and form submission",
          "Functional cookies: remember language, region, or UI preferences",
          "Analytics cookies: help us understand aggregated usage patterns (we configure analytics to minimize identification where possible)",
          "Marketing cookies: used only where enabled and subject to consent requirements in your region",
        ],
      },
      {
        title: "Managing cookies",
        paragraphs: [
          "You can control cookies through your browser settings. Disabling certain cookies may affect Website functionality. Where required, we will present a cookie consent mechanism aligned with applicable regulations.",
        ],
      },
    ],
  },
  {
    id: "children-core",
    title: "Children's Privacy",
    paragraphs: [
      "Our Website and services are directed at businesses and professionals. We do not knowingly collect Personal Data from children under the age of sixteen (16) (or the applicable age of digital consent in your jurisdiction). If you believe we have collected data from a child, contact us immediately and we will take steps to delete such information.",
    ],
  },
  {
    id: "third-party-links-core",
    title: "Third-Party Websites and Services",
    paragraphs: [
      "The Website may contain links to third-party sites, repositories, documentation, or social platforms. We are not responsible for the privacy practices of third parties. We encourage you to review their privacy policies before providing personal information.",
    ],
  },
  {
    id: "india-core",
    title: "India-Specific Provisions",
    paragraphs: [
      "For data subjects in India, we process Personal Data in accordance with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and evolving requirements under the Digital Personal Data Protection Act, 2023, as implemented.",
      "Sensitive personal data or information (SPDI), where applicable, is collected only for lawful purposes with your consent or other permitted grounds, and is shared only with your consent or as required by law. You may review information provided to us and withdraw consent by contacting us, subject to contractual and legal retention obligations.",
    ],
  },
  {
    id: "uae-core",
    title: "UAE-Specific Provisions",
    paragraphs: [
      "For data subjects in the United Arab Emirates, we comply with Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data and related executive regulations where applicable to our processing activities.",
      "Where required, we will obtain explicit consent for processing sensitive categories of data, honor data subject rights within statutory timelines, and implement cross-border transfer mechanisms approved under UAE law.",
    ],
  },
  {
    id: "gdpr-core",
    title: "European Economic Area (EEA), UK, and Switzerland",
    paragraphs: [
      "Where we process Personal Data of individuals in the EEA, UK, or Switzerland, we act as controller or processor as described in our client agreements. Our lawful bases include those listed in the Purposes section. Data subjects may contact us to exercise GDPR/UK GDPR rights and may lodge complaints with their local supervisory authority.",
      "For processor engagements, we assist Clients in fulfilling data subject requests and implement Article 28-style data processing terms upon request.",
    ],
  },
  {
    id: "automated-decision-core",
    title: "Automated Decision-Making and Profiling",
    paragraphs: [
      "We do not make decisions based solely on automated processing, including profiling, that produce legal or similarly significant effects concerning data subjects without human review, except where permitted by law and disclosed to you.",
    ],
  },
  {
    id: "changes-core",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal requirements, or business operations. The 'Last updated' date at the top indicates the latest revision. Material changes will be communicated via the Website or direct notice where appropriate. Continued use after changes constitutes acknowledgment of the updated Policy, except where further consent is required.",
    ],
  },
  {
    id: "contact-core",
    title: "Contact Us",
    paragraphs: [
      `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, contact Focused Folks Solutions LLP at ${LEGAL_EMAIL} or write to our registered office at 236, Seventh Heaven, Ahmedabad 380055, Gujarat, India, or our UAE office at A-14, Goldensands 20, Burjuman, Dubai, UAE.`,
      "We are committed to resolving privacy complaints fairly and promptly.",
    ],
  },
];
