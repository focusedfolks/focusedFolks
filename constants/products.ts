import type { Product } from "@/types";

/** Product catalog — live and upcoming FocusFolks SaaS tools */
export const products: Product[] = [
  {
    id: "client-credit-tracker",
    name: "Client Credit Tracker",
    tagline: "Transaction & bookkeeping for Angadiya firms",
    description:
      "Purpose-built SaaS for Angadiya accounting firms—manage client credit, hawala entries, inward and outward bookings, balance sheets, and ledger reports from one real-time dashboard.",
    thumbnail: "/images/products/product-1.png",
    status: "live",
    category: "Accounting SaaS",
    href: "https://client-credit-tracker.in/login",
    features: ["Hawala & transactions", "Client ledgers", "Balance sheet", "Daily reports"],
  },
  {
    id: "insightdesk",
    name: "InsightDesk",
    tagline: "Unified analytics for engineering leaders",
    description:
      "Connect repos, CI/CD, and cloud spend into executive dashboards with actionable delivery insights.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    status: "coming-soon",
    category: "SaaS",
    features: ["DORA metrics", "Cost visibility", "Team health"],
  },
  {
    id: "securevault",
    name: "SecureVault IAM",
    tagline: "Identity & access for distributed teams",
    description:
      "Role-based access, SSO, and audit trails designed for agencies managing multiple client environments.",
    thumbnail:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    status: "coming-soon",
    category: "Security",
    features: ["SSO / SAML", "RBAC", "Audit logs"],
  },
  {
    id: "teampulse",
    name: "TeamPulse",
    tagline: "HR ops & onboarding automation",
    description:
      "Streamline contractor onboarding, compliance docs, and pulse surveys for growing delivery organizations.",
    thumbnail:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    status: "coming-soon",
    category: "HR Tech",
    features: ["Onboarding flows", "e-Sign", "Pulse surveys"],
  },
];

export const liveProducts = products.filter((p) => p.status === "live");
export const comingSoonProducts = products.filter((p) => p.status === "coming-soon");
