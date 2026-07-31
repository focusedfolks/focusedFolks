export const CONTACT_EMAIL = "info.focusedfolks@gmail.com";

export const contactPhones = [
  {
    region: "India",
    display: "+91-6353904865",
    href: "tel:+916353904865",
  },
  {
    region: "UAE",
    display: "+971-56-932-1060",
    href: "tel:+971569321060",
  },
] as const;

export type OfficeLocation = {
  city: string;
  country: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  mapQuery: string;
};

export function googleMapsEmbedUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps?q=${q}&hl=en&z=16&output=embed`;
}

export const officeLocations: OfficeLocation[] = [
  {
    city: "Ahmedabad",
    country: "India",
    address: "236, Seventh Heaven, Ahmedabad 380055",
    phone: contactPhones[0].display,
    phoneHref: contactPhones[0].href,
    email: CONTACT_EMAIL,
    mapQuery: "236, Seventh Heaven, Ahmedabad 380055, India",
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "A-14, Goldensands 20, Burjuman, UAE",
    phone: contactPhones[1].display,
    phoneHref: contactPhones[1].href,
    email: CONTACT_EMAIL,
    mapQuery: "A-14, Goldensands 20, Burjuman, Dubai, UAE",
  },
];

export const contactSummary = {
  email: CONTACT_EMAIL,
  phones: contactPhones,
  addressLine: "Ahmedabad, India · Dubai, UAE",
};

export const contactFaqs = [
  {
    question: "How do I get in touch with FocusFolks?",
    answer:
      "Use the contact form on this page, email info.focusedfolks@gmail.com, or call our India (+91-6353904865) or UAE (+971-56-932-1060) numbers. We route every inquiry to the right delivery lead and reply within one business day.",
  },
  {
    question: "What should I include in my message for a productive first conversation?",
    answer:
      "Share your company context, the problem you want to solve, desired outcomes, timeline, and any technical constraints (stack, compliance, integrations). Even a short brief helps us prepare relevant questions and suggest a sensible next step—discovery call, workshop, or scoped proposal.",
  },
  {
    question: "Can we discuss an idea before it is fully defined?",
    answer:
      "Yes. Many engagements start as an idea discussion—we help clarify scope, risks, and delivery options without committing to a full build upfront. We can run a lightweight discovery session to turn concepts into milestones, architecture options, and ballpark effort.",
  },
  {
    question: "Do you offer consultations for existing products or only greenfield builds?",
    answer:
      "Both. We modernize legacy platforms, extend existing products, and build net-new systems. Tell us what you have today (codebase, cloud, team size) and what “good” looks like; we’ll propose an approach that fits your runway and risk tolerance.",
  },
  {
    question: "Which office should I contact—Ahmedabad or Dubai?",
    answer:
      "Either office can initiate your engagement. Ahmedabad (India) and Dubai (UAE) operate as one delivery organization—choose the region closest to your working hours. Maps and addresses for both locations are listed under Our offices on this page.",
  },
  {
    question: "What happens after I submit the contact form?",
    answer:
      "You’ll receive a confirmation in the UI when the message is sent. Our team reviews your note, may reply by email for clarifications, and typically schedules a video call to align on scope, stakeholders, and timeline. Sensitive details can be shared under NDA when required.",
  },
  {
    question: "Can we talk about pricing and engagement models on the first call?",
    answer:
      "Absolutely. We discuss fixed-scope delivery, time-and-materials, and retainer-style partnerships. Pricing depends on scope, team composition, and compliance needs—we share transparent estimates after understanding your goals, not before.",
  },
  {
    question: "Do you sign NDAs and work with enterprise procurement?",
    answer:
      "Yes. We routinely work with enterprise security reviews, vendor onboarding, and MSAs/NDAs. Mention procurement or legal requirements in your message so we can involve the right contacts early.",
  },
] as const;
