import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    megaSummary: "Bespoke enterprise software built for your workflows, compliance, and scale.",
    description:
      "Bespoke enterprise applications, ERP extensions, and legacy modernization—discovery from $1,250, build programs from $7,500.",
    icon: "Code2",
    href: "/services/custom-software",
    features: ["Enterprise architecture", "Legacy modernization", "API-first design"],
  },
  {
    id: "web-development",
    title: "Web Development",
    megaSummary: "Fast Next.js sites that convert.",
    description:
      "Next.js and React web platforms with Core Web Vitals optimization, headless CMS, and WCAG 2.1 accessibility—from marketing sites ($875) to custom apps ($3,250).",
    icon: "Globe",
    href: "/services/web-development",
    features: ["Next.js & React", "Headless CMS", "E-commerce & SaaS"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    megaSummary: "Native and cross-platform mobile apps for iOS.",
    description:
      "React Native and native iOS/Android apps with offline-first sync, app store submission, and Fastlane CI/CD—MVPs from $2,500, full products from $6,250.",
    icon: "Smartphone",
    href: "/services/mobile",
    features: ["React Native & native", "App store launch", "Offline-first"],
  },
  {
    id: "design",
    title: "UI/UX Design",
    megaSummary: "Design systems that ship faster.",
    description:
      "Research-led product design with usability testing, design systems, and developer-ready Figma handoff—UX audits from $625, full product design from $2,000.",
    icon: "Palette",
    href: "/services/design",
    features: ["User research", "Design systems", "WCAG accessibility"],
  },
  {
    id: "cloud",
    title: "Cloud Solutions",
    megaSummary: "AWS, Azure, and GCP migration with FinOps, security, and uptime.",
    description:
      "AWS, Azure, and GCP landing zones, migration programs, and FinOps—assessments from $1,250, migration programs from $4,750 with typical 15–25% cost savings.",
    icon: "Cloud",
    href: "/services/cloud",
    features: ["AWS · Azure · GCP", "Migration & FinOps", "Compliance mapping"],
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    megaSummary: "CI/CD, Kubernetes, and production releases you trust.",
    description:
      "CI/CD pipelines, Kubernetes, GitOps, and SRE practices—foundation setups from $1,000, platform engineering from $3,000.",
    icon: "GitBranch",
    href: "/services/devops",
    features: ["CI/CD & GitOps", "Kubernetes", "SRE & observability"],
  },
  {
    id: "ai",
    title: "AI Integration",
    megaSummary: "LLM copilots that ship safely.",
    description:
      "Production LLM copilots, RAG systems, and intelligent automation with human-in-the-loop safeguards—PoC from $1,500, production features from $4,250.",
    icon: "Brain",
    href: "/services/ai",
    features: ["RAG & copilots", "Document intelligence", "Responsible AI"],
  },
  {
    id: "transformation",
    title: "Digital Transformation",
    megaSummary: "Modernize platforms, processes, and teams with one measurable transformation roadmap.",
    description:
      "Holistic modernization across process, platform, and people—assessments from $2,000, program delivery from $10,000 with KPI tracking.",
    icon: "Zap",
    href: "/services/transformation",
    features: ["Roadmapping", "Process automation", "Change management"],
  },
  {
    id: "consulting",
    title: "IT Consulting",
    megaSummary: "Architecture audits, roadmaps, and vendor decisions.",
    description:
      "Technology audits, architecture reviews, and vendor selection from principal architects—focused advisory from $1,000, retainer from $625/mo.",
    icon: "Briefcase",
    href: "/services/consulting",
    features: ["Architecture reviews", "Vendor selection", "Governance"],
  },
  {
    id: "staffing",
    title: "Staff Augmentation",
    megaSummary: "Senior engineers on your team.",
    description:
      "Senior engineers and designers embedded in your team—specialists from $1,000/mo, squads from $2,500/mo. Time-to-start avg. 10 days.",
    icon: "Users",
    href: "/services/staffing",
    features: ["Senior specialists", "10-day onboarding", "Flexible scale"],
  },
];

/** Shared hero dimensions — all service images are ~1536×1024 (3:2) */
export const serviceHeroImageSize = { width: 1536, height: 1024 } as const;

/** Hero images for service detail pages — public/images/services */
export const serviceHeroImages: Record<string, string> = {
  "custom-software": "/images/services/custom-software-development-services-5.png",
  "web-development": "/images/services/web-devlopment-services-1.png",
  mobile: "/images/services/mobile-app-development-services-9.png",
  design: "/images/services/ux-ui-services-2.png",
  cloud: "/images/services/cloud-solutions-services-10.png",
  devops: "/images/services/devops-services-6.png",
  ai: "/images/services/ai-Integration-services-4.png",
  staffing: "/images/services/staff-augmentation-services-7.png",
  consulting: "/images/services/it-consulting-services-3.png",
  transformation: "/images/services/digital-transformation-services-8.png",
};

/** Hero images that crop on stretched columns — keep fixed 3:2 frame */
export const serviceHeroFixedAspectIds = new Set([
  "custom-software",
  "web-development",
  "transformation",
]);

/** Mega menu column order — balances short/long summaries so all 10 cards fit */
export const megaMenuServiceOrder = [
  "custom-software",
  "web-development",
  "mobile",
  "design",
  "cloud",
  "devops",
  "ai",
  "staffing",
  "consulting",
  "transformation",
] as const;

/** All service detail page routes — single source for nav & sitemap */
export const servicePages = services.map((s) => ({
  id: s.id,
  title: s.title,
  href: s.href,
  megaSummary: s.megaSummary ?? s.description,
  highlights: s.features ?? [],
}));

/** Full IT stack — all practice areas (services page tech tabs) */
export const techStack = [
  /* Web & frontend */
  "Next.js",
  "React",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Tailwind CSS",
  "Headless CMS",
  "Shopify Plus",
  /* Mobile */
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  /* Backend & APIs */
  "Node.js",
  "Python",
  "Java",
  ".NET",
  "Go",
  "GraphQL",
  "REST APIs",
  "Microservices",
  /* Cloud & infra */
  "AWS",
  "Azure",
  "GCP",
  "Kubernetes",
  "Docker",
  "Terraform",
  "Serverless",
  "Vercel",
  /* DevOps & quality */
  "CI/CD",
  "GitHub Actions",
  "Jenkins",
  "Helm",
  "Ansible",
  /* Data & storage */
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "MySQL",
  "Elasticsearch",
  "Kafka",
  /* AI & automation */
  "OpenAI",
  "LangChain",
  "RAG",
  "TensorFlow",
  "LLM Copilots",
  /* Design & UX */
  "Figma",
  "Design Systems",
  "WCAG 2.1",
  /* Enterprise & integration */
  "SAP",
  "Salesforce",
  "Power BI",
  "OAuth / SAML",
  "FinOps",
];

export const industries = [
  {
    name: "Healthcare",
    icon: "HeartPulse",
    image: "/images/industry/health-ind-1.png",
    description: "HIPAA & ABDM-compliant portals, telemedicine, and patient management systems",
  },
  {
    name: "Fintech",
    icon: "Landmark",
    image: "/images/industry/fintech-ind-2.png",
    description: "PCI-DSS payments, remittance apps, and UAE Central Bank regulated platforms",
  },
  {
    name: "Retail & D2C",
    icon: "ShoppingBag",
    image: "/images/industry/retail-ind-3.png",
    description: "Shopify Plus headless, omnichannel inventory, and festival-scale traffic handling",
  },
  {
    name: "Logistics",
    icon: "Factory",
    image: "/images/industry/logistics-ind-4.png",
    description: "Fleet tracking, warehouse management, and supply chain visibility dashboards",
  },
  {
    name: "Education",
    icon: "GraduationCap",
    image: "/images/industry/study-ind-5.png",
    description: "LMS platforms, student portals, and EdTech mobile apps for K-12 and higher ed",
  },
  {
    name: "Real Estate",
    icon: "Building2",
    image: "/images/industry/real-ind-6.png",
    description: "Property listing portals, CRM integrations, and virtual tour platforms for MENA markets",
  },
];

export const processStepImages = [
  "/images/services-process/process-1.png",
  "/images/services-process/process-2.jpeg",
  "/images/services-process/process-3.png",
  "/images/services-process/process-4.jpeg",
  "/images/services-process/process-5.png",
  "/images/services-process/process-6.png",
] as const;

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description:
      "Stakeholder workshops, user interviews, and current-state assessment. We document requirements, constraints, compliance needs, and success metrics before writing a line of code.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "Solution architecture, technical roadmap, risk register, and fixed-price estimate. You receive an ADR-backed blueprint with sprint-level milestones and clear assumptions.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "Wireframes, interactive prototypes, and design system components validated through usability testing. Developers receive Figma specs with edge cases and accessibility annotations.",
  },
  {
    step: "04",
    title: "Develop",
    description:
      "Two-week agile sprints with code review, automated tests, and CI/CD on every merge. Weekly demos keep stakeholders aligned; scope changes go through a transparent change-request process.",
  },
  {
    step: "05",
    title: "Launch",
    description:
      "QA sign-off, performance testing, security scan, staging UAT, and production deployment with rollback plan. Go-live support includes monitoring setup and on-call coverage.",
  },
  {
    step: "06",
    title: "Scale",
    description:
      "Post-launch optimization, feature evolution, FinOps reviews, and SRE support. 68% of clients transition to a monthly retainer for ongoing product growth.",
  },
];

export const whyChooseUs = [
  {
    title: "Ahmedabad + Dubai Delivery",
    description:
      "45+ engineers and designers across India and UAE with follow-the-sun coverage for US, UK, and GCC clients. Real offices—not a virtual mailbox.",
    icon: "Award",
    highlights: [
      "Dual-shore delivery from Gujarat & UAE",
      "Follow-the-sun for US, UK & GCC",
      "127+ enterprise projects shipped",
    ],
  },
  {
    title: "Predictable Agile Delivery",
    description:
      "Two-week sprints, weekly demos, and 96% on-time milestone delivery across 127+ projects.",
    icon: "RefreshCw",
    highlights: ["96% on-time milestones", "Weekly stakeholder demos"],
  },
  {
    title: "Transparent Communication",
    description:
      "Dedicated Slack or Teams channel, written sprint reports, and direct access to tech leads—not account managers who can't answer technical questions.",
    icon: "MessageSquare",
    highlights: [
      "Direct access to tech leads",
      "Written sprint reports every week",
      "Shared burndown in your tools",
      "No black-box delivery",
    ],
  },
  {
    title: "Market-Aligned Pricing",
    description:
      "Indicative plans benchmarked against 2026 Clutch and GoodFirms rates. Fixed-scope proposals after discovery.",
    icon: "TrendingUp",
    highlights: ["Fixed scope after discovery", "2026 market benchmarks"],
  },
  {
    title: "Security & Compliance Built-In",
    description:
      "Threat modeling, encryption, RBAC, and audit logging are standard on every engagement.",
    icon: "Shield",
    highlights: [
      "HIPAA · PCI-DSS · SOC 2 mapping",
      "UAE PDPL & GDPR-ready controls",
      "Threat modeling in sprint zero",
    ],
  },
  {
    title: "Measurable Outcomes",
    description:
      "Every engagement defines KPIs upfront—uptime, conversion, cost reduction, cycle time.",
    icon: "Target",
    highlights: [
      "KPIs defined before build starts",
      "Monthly outcome reviews",
      "FinOps & performance tracking",
    ],
  },
];
