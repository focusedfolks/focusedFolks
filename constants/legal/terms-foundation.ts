import type { LegalSection } from "@/types/legal";
import { LEGAL_EMAIL } from "@/constants/legal/meta";

/** Core Terms & Conditions sections — detailed legal baseline */
export const termsFoundation: LegalSection[] = [
  {
    id: "agreement-core",
    title: "Agreement to Terms",
    paragraphs: [
      `These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Focused Folks Solutions LLP, a limited liability partnership organized under the laws of India ("Focused Folks," "Company," "we," "us," or "our"), governing your access to and use of the Website and related online properties.`,
      `By accessing or using the Website, submitting an inquiry, downloading materials, or engaging our services, you agree to be bound by these Terms and our Privacy Policy. If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have authority to bind that entity. If you do not agree, you must not use the Website or our services.`,
      `For commissioned work, a separate Master Services Agreement (MSA), Statement of Work (SOW), proposal, or purchase order may apply and will prevail over these Terms to the extent of any conflict regarding paid services.`,
    ],
  },
  {
    id: "company-info-core",
    title: "Company Information",
    list: [
      "Legal name: Focused Folks Solutions LLP",
      "Brand name: FocusFolks / Focused Folks IT Services",
      "India office: 236, Seventh Heaven, Ahmedabad 380055, Gujarat, India",
      "UAE office: A-14, Goldensands 20, Burjuman, Dubai, United Arab Emirates",
      `Contact email: ${LEGAL_EMAIL}`,
      "India phone: +91-6353904865",
      "UAE phone: +971-56-932-1060",
    ],
  },
  {
    id: "services-core",
    title: "Description of Services",
    paragraphs: [
      "Focused Folks Solutions LLP provides enterprise-grade business and information technology services, including but not limited to custom software development, web application development, mobile application development, UI/UX design, cloud architecture and migration, DevOps and platform engineering, AI and machine learning integration, quality assurance, staff augmentation, and IT consulting.",
      "Service descriptions, deliverables, timelines, acceptance criteria, and fees are defined in mutually executed commercial documents. Information on the Website is for general marketing and informational purposes and does not constitute a binding offer unless expressly stated in a signed agreement.",
    ],
  },
  {
    id: "eligibility-core",
    title: "Eligibility and Account Registration",
    paragraphs: [
      "The Website is intended for business and professional users. You must be at least eighteen (18) years of age and capable of forming a binding contract under applicable law.",
      "Where we provide portals, repositories, or collaboration environments, you are responsible for safeguarding login credentials and for all activities under your account. Notify us immediately of unauthorized use. We may suspend accounts that pose security risks or violate these Terms.",
    ],
  },
  {
    id: "acceptable-use-core",
    title: "Acceptable Use Policy",
    paragraphs: ["You agree not to misuse the Website or our services. Prohibited conduct includes:"],
    list: [
      "Violating any applicable law, regulation, or third-party rights",
      "Transmitting malware, conducting denial-of-service attacks, or attempting unauthorized access to systems",
      "Scraping, crawling, or harvesting data from the Website without our prior written consent",
      "Reverse engineering, decompiling, or attempting to extract source code except as permitted by law",
      "Using the Website to send spam, phishing, or fraudulent communications",
      "Impersonating Focused Folks Solutions LLP, our personnel, or other persons or entities",
      "Uploading content that is defamatory, obscene, discriminatory, or infringes intellectual property",
      "Interfering with the integrity or performance of the Website or connected infrastructure",
    ],
    subsections: [
      {
        title: "Enforcement",
        paragraphs: [
          "We reserve the right to investigate violations and cooperate with law enforcement. Violations may result in termination of access and legal action.",
        ],
      },
    ],
  },
  {
    id: "intellectual-property-core",
    title: "Intellectual Property Rights",
    subsections: [
      {
        title: "Our intellectual property",
        paragraphs: [
          "The Website, including its design, layout, text, graphics, logos, trademarks, service marks, software, documentation, methodologies, and all related intellectual property, is owned by Focused Folks Solutions LLP or its licensors and is protected by copyright, trademark, and other laws.",
          "You may view and download Website content solely for personal, non-commercial, informational purposes. You may not reproduce, distribute, modify, create derivative works, publicly display, or exploit our content without prior written permission.",
        ],
      },
      {
        title: "Client deliverables and pre-existing IP",
        paragraphs: [
          "Ownership of work product, source code, designs, and deliverables is governed by the applicable MSA or SOW. Unless otherwise agreed in writing, upon full payment of applicable fees, Clients receive the rights specified in their contract—typically a license or assignment of custom deliverables, excluding our pre-existing tools, frameworks, libraries, and general know-how ('Background IP'), which remain our property.",
          "We grant Clients a non-exclusive license to Background IP embedded in deliverables to the extent necessary to use the deliverables for their intended business purpose.",
        ],
      },
      {
        title: "Client materials and feedback",
        paragraphs: [
          "You retain ownership of materials, data, and content you provide to us ('Client Materials'). You grant us a worldwide, non-exclusive license to use Client Materials solely to perform services and as otherwise permitted by contract.",
          "Feedback, suggestions, or ideas you provide may be used by us without obligation or compensation, unless restricted by a signed NDA or agreement.",
        ],
      },
    ],
  },
  {
    id: "confidentiality-core",
    title: "Confidentiality",
    paragraphs: [
      "Each party may receive confidential information from the other. 'Confidential Information' means non-public business, technical, financial, or personal information disclosed in connection with evaluations or services, marked confidential or reasonably understood to be confidential.",
      "The receiving party will: (a) use Confidential Information only for permitted purposes; (b) protect it with at least reasonable care; (c) disclose it only to personnel and subcontractors with a need to know and bound by confidentiality obligations; and (d) not disclose it to third parties except as required by law (with notice where permitted).",
      "Confidentiality obligations do not apply to information that is publicly available without breach, independently developed, rightfully received from a third party, or required to be disclosed by law. Upon request or termination, confidential materials will be returned or destroyed, subject to backup and legal retention requirements.",
      "Mutual NDAs or confidentiality clauses in MSAs supersede this section for covered engagements.",
    ],
  },
  {
    id: "proposals-sow-core",
    title: "Proposals, Statements of Work, and Change Control",
    paragraphs: [
      "Quotes, proposals, and estimates are valid for the period stated therein and are non-binding until accepted in writing. Scope, milestones, dependencies, assumptions, and exclusions must be documented in an SOW or equivalent order document.",
      "Changes to scope, timeline, or deliverables require a written change request approved by both parties. We are not obligated to perform out-of-scope work without agreed adjustments to fees and schedule.",
      "Client cooperation—including timely access to stakeholders, environments, content, approvals, and third-party systems—is essential. Delays caused by Client dependencies may adjust timelines and costs.",
    ],
  },
  {
    id: "fees-payment-core",
    title: "Fees, Invoicing, and Payment",
    paragraphs: [
      "Fees are as specified in the applicable commercial agreement. Unless stated otherwise:",
      "All payments must be made in the currency specified on the invoice via approved methods. Client is responsible for bank charges on wire transfers unless otherwise agreed.",
    ],
    list: [
      "Invoices are due within fifteen (15) to thirty (30) days of invoice date",
      "Late payments may accrue interest at the rate permitted by law or one and one-half percent (1.5%) per month, whichever is lower",
      "We may suspend services for overdue accounts after reasonable notice",
      "Fees are exclusive of applicable taxes, duties, and withholdings, which are Client's responsibility unless we are required to collect them",
      "Travel and approved out-of-pocket expenses are billed at cost or per contract",
      "Fixed-price engagements may include milestone-based billing; time-and-materials engagements are billed per agreed rates and utilization",
    ],
  },
  {
    id: "warranties-core",
    title: "Warranties and Disclaimers",
    subsections: [
      {
        title: "Service warranties",
        paragraphs: [
          "For paid deliverables, we warrant that services will be performed in a professional and workmanlike manner consistent with industry standards. Specific defect remediation periods, service levels, and acceptance procedures are defined in the governing SOW or SLA.",
        ],
      },
      {
        title: "Website disclaimer",
        paragraphs: [
          `THE WEBSITE AND ALL INFORMATION, CONTENT, AND MATERIALS ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.`,
          "We do not warrant that the Website will be uninterrupted, error-free, secure, or free of viruses. Case studies, testimonials, and metrics illustrate past experience and do not guarantee future results.",
        ],
      },
    ],
  },
  {
    id: "limitation-liability-core",
    title: "Limitation of Liability",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, FOCUSED FOLKS SOLUTIONS LLP AND ITS PARTNERS, MEMBERS, OFFICERS, EMPLOYEES, AGENTS, AND SUBCONTRACTORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO THESE TERMS, THE WEBSITE, OR SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
      "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR SERVICES SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS PAID BY YOU TO US FOR THE SPECIFIC SERVICES GIVING RISE TO THE CLAIM IN THE TWELVE (12) MONTHS PRECEDING THE EVENT, OR (B) INR 100,000 (ONE LAKH INDIAN RUPEES) OR USD/EQUIVALENT 5,000 FOR WEBSITE-ONLY CLAIMS NOT TIED TO A PAID ENGAGEMENT.",
      "Some jurisdictions do not allow certain limitations; in such cases, our liability is limited to the fullest extent permitted by law. Nothing in these Terms limits liability for fraud, wilful misconduct, death or personal injury caused by negligence, or other liability that cannot be excluded by law.",
    ],
  },
  {
    id: "indemnification-core",
    title: "Indemnification",
    paragraphs: [
      "You agree to indemnify, defend, and hold harmless Focused Folks Solutions LLP and its personnel from claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from: (a) your use of the Website in violation of these Terms; (b) Client Materials or instructions that infringe third-party rights; (c) your breach of applicable law; or (d) misuse of deliverables beyond granted rights.",
      "For paid services, IP infringement indemnity obligations for deliverables, if any, are as specified in the governing MSA. This section does not expand or reduce contractual IP indemnities agreed in writing.",
    ],
  },
  {
    id: "force-majeure-core",
    title: "Force Majeure",
    paragraphs: [
      "Neither party shall be liable for failure or delay in performance due to events beyond reasonable control, including natural disasters, war, terrorism, civil unrest, government actions, epidemics, internet or utility failures, strikes, or cloud provider outages, provided the affected party notifies the other promptly and uses reasonable efforts to mitigate impact.",
    ],
  },
  {
    id: "termination-core",
    title: "Termination and Suspension",
    paragraphs: [
      "We may suspend or terminate Website access immediately for conduct that violates these Terms, poses security risks, or harms our reputation or systems.",
      "Service engagements terminate per the applicable MSA or SOW, including provisions for termination for convenience, cause, transition assistance, and payment for work performed through the effective termination date.",
      "Upon termination, sections intended to survive—including intellectual property, confidentiality, payment obligations, disclaimers, limitation of liability, indemnification, and governing law—shall survive.",
    ],
  },
  {
    id: "governing-law-core",
    title: "Governing Law and Jurisdiction",
    subsections: [
      {
        title: "India-based clients and general Website use",
        paragraphs: [
          "Unless otherwise agreed in writing, these Terms are governed by the laws of India. Courts in Ahmedabad, Gujarat, India shall have exclusive jurisdiction, subject to mandatory consumer protections that cannot be waived.",
        ],
      },
      {
        title: "UAE-based clients",
        paragraphs: [
          "For Clients domiciled in the United Arab Emirates where a separate governing law clause is not executed, disputes may alternatively be subject to the laws and courts of Dubai, UAE, as mutually agreed in the commercial contract.",
        ],
      },
      {
        title: "International arbitration",
        paragraphs: [
          "Enterprise clients may negotiate arbitration under ICC, DIAC, or SIAC rules in their MSA. Absent such agreement, the courts specified above apply.",
        ],
      },
    ],
  },
  {
    id: "dispute-resolution-core",
    title: "Dispute Resolution Process",
    paragraphs: [
      "Before initiating formal proceedings, the parties agree to attempt good-faith resolution by escalating the dispute to operational leads and then senior management within thirty (30) days of written notice.",
      "If unresolved, either party may pursue remedies available under the governing law section or the governing MSA.",
    ],
  },
  {
    id: "compliance-core",
    title: "Export Control, Anti-Corruption, and Sanctions",
    paragraphs: [
      "You represent that you are not located in, under control of, or a national of any country subject to comprehensive embargoes or sanctions prohibiting receipt of services, and that you will not use deliverables in violation of export control laws.",
      "Both parties shall comply with applicable anti-bribery and anti-corruption laws, including the Indian Prevention of Corruption Act and the UAE Federal Decree-Law No. 20 of 2018 on Anti-Money Laundering, and shall not offer or accept improper payments in connection with our relationship.",
    ],
  },
  {
    id: "subcontracting-core",
    title: "Subcontracting and Staff Augmentation",
    paragraphs: [
      "We may engage qualified subcontractors and affiliated personnel to perform services, remaining responsible for their work unless the contract provides otherwise. For staff augmentation, Client may have direct day-to-day direction over augmented personnel while Focused Folks Solutions LLP remains the employer or contracting party as specified in the SOW.",
    ],
  },
  {
    id: "data-protection-core",
    title: "Data Protection",
    paragraphs: [
      "Each party will comply with applicable data protection laws. Our Privacy Policy describes Website data practices. For processing personal data on behalf of Clients, we enter into data processing agreements where required. Client is responsible for lawful collection and instructions regarding end-user data processed in custom solutions.",
    ],
  },
  {
    id: "miscellaneous-core",
    title: "Miscellaneous",
    list: [
      "Entire agreement: These Terms, together with the Privacy Policy and executed commercial agreements, constitute the entire agreement regarding Website use",
      "Severability: If any provision is invalid, the remainder remains in effect",
      "Waiver: Failure to enforce a provision is not a waiver of future enforcement",
      "Assignment: You may not assign these Terms without our consent; we may assign in connection with a merger or sale of business",
      "Notices: Legal notices to us must be sent to our registered office and email; we may provide notice via email or Website posting",
      "Language: These Terms are drafted in English; translations are for convenience only",
      "Third-party rights: No third party has rights under these Terms except permitted assignees",
    ],
  },
  {
    id: "contact-terms-core",
    title: "Contact Information",
    paragraphs: [
      `For questions regarding these Terms and Conditions, contact Focused Folks Solutions LLP at ${LEGAL_EMAIL}, call +91-6353904865 (India) or +971-56-932-1060 (UAE), or write to our offices listed in the Company Information section.`,
      "We welcome the opportunity to clarify our commercial and legal terms before you engage our services.",
    ],
  },
];
