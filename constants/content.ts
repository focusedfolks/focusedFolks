import type { BlogPost, CaseStudy, Testimonial, TeamMember, TeamThought, FaqItem } from "@/types";

export const clientLogos = [
  "Acme Corp",
  "Nexus Labs",
  "Vertex AI",
  "CloudPeak",
  "DataForge",
  "InnovateX",
  "ScalePoint",
  "TechBridge",
  "QuantumSys",
  "BlueHorizon",
  "PrimeStack",
  "Apex Digital",
];

export const heroStats = [
  { value: 127, suffix: "+", label: "Projects Delivered" },
  { value: 68, suffix: "+", label: "Active & Past Clients" },
  { value: 12, suffix: "", label: "Countries Served" },
  { value: 96, suffix: "%", label: "On-Time Delivery Rate" },
];

/** Home page — honest early-stage metrics (no fabricated client counts) */
export const homeHighlightStats = [
  { value: 4, suffix: "", label: "Team Members" },
  { value: 1, suffix: "", label: "Live SaaS Product" },
  { value: 10, suffix: "+", label: "Service Capabilities" },
  { value: 100, suffix: "%", label: "Commitment to Craft" },
];

export const homeTeamThoughts: TeamThought[] = [
  {
    id: "founder",
    name: "Hayder Mirza",
    role: "Founder & CEO",
    image: "/images/team-1.jpeg",
    theme: "Passion",
    quote:
      "We started FocusFolks because accounting teams deserve software that feels human—not another bloated ERP. Every line of code we ship has to earn its place in someone's workday.",
  },
  {
    id: "pm",
    name: "Romil Patel",
    role: "Project Manager",
    image: "/images/team-1.png",
    theme: "Growth",
    quote:
      "Early-stage means every sprint counts. I care about clear scope, honest timelines, and partnerships where both sides grow—whether that's our first client or our tenth product.",
  },
  {
    id: "design-dev",
    name: "Taiyab",
    role: "Designer & Developer",
    image: "/images/team-3.jpeg",
    theme: "Craft",
    quote:
      "Design and development shouldn't feel like two departments. When wireframes and components live in the same head, interfaces ship faster and feel cohesive from day one.",
  },
  {
    id: "creative",
    name: "Muntashira",
    role: "Video Editor · Designer & Support",
    image: "/images/team-2.jpeg",
    theme: "Story",
    quote:
      "People connect with why before they read the how. Video, visuals, and support touchpoints are where trust starts—especially when you're a young company proving what you stand for.",
  },
];

export const heroBannerSlides = [
  {
    image: "/1.png",
    alt: "FocusFolks custom software development team building enterprise web and mobile applications",
    tagline: "Custom Software · Web & Mobile · India & UAE",
    title: "Enterprise Software Built for ",
    titleHighlight: "Scale, Speed & Security",
    description:
      "Ship production-ready web, mobile, and cloud platforms with Ahmedabad & Dubai delivery—transparent pricing, agile sprints, and measurable ROI for growing businesses.",
  },
  {
    image: "/2.png",
    alt: "FocusFolks cloud migration, DevOps automation, and AI integration services",
    tagline: "Cloud Solutions · DevOps · AI Integration",
    title: "Modernize Faster with ",
    titleHighlight: "Cloud & Intelligent Automation",
    description:
      "AWS, Azure, and GCP migrations, CI/CD pipelines, and enterprise AI copilots—cut infrastructure costs, reduce downtime, and release with confidence.",
  },
  {
    image: "/3.png",
    alt: "FocusFolks digital transformation consulting and IT strategy for enterprises",
    tagline: "Digital Transformation · IT Consulting · Staff Augmentation",
    title: "Transform Operations with a ",
    titleHighlight: "Roadmap That Delivers",
    description:
      "Strategy, legacy modernization, and senior engineers on demand—trusted by startups to enterprises across India, UAE, GCC, and global markets.",
  },
];

export const heroCapabilityTags = [
  "Custom software",
  "Cloud & DevOps",
  "AI integration",
  "Web & mobile",
  "GCC delivery",
  "Staff augmentation",
];

/** About page — honest early-stage highlights (no fabricated metrics) */
export const companyStats = [
  { label: "Team", value: "4 members", detail: "Founder, PM, design, and creative support" },
  { label: "Live product", value: "1 CRM", detail: "Client Credit Tracker accounting platform" },
  { label: "Clients", value: "Building", detail: "Open for first partnerships and collaborations" },
  { label: "Focus", value: "Innovation", detail: "AI, SaaS, cloud, and custom software roadmap" },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "FocusFolks rebuilt our patient appointment system for 180K+ monthly users across Gujarat. HIPAA-aligned architecture, 62% faster page loads, and zero critical incidents since go-live in March 2025.",
    author: "Dr. Ketan Mehta",
    role: "Director of Digital Health",
    company: "ShreeLife Hospitals",
    rating: 5,
    image: "/1.png",
    location: "Ahmedabad, India",
    projectTag: "Healthcare Platform",
  },
  {
    id: "2",
    quote:
      "Their Dubai team delivered our remittance mobile app in 14 weeks—Razorpay and UAE Central Bank compliance included. We processed AED 12M in the first quarter post-launch.",
    author: "Fatima Al-Rashid",
    role: "Head of Product",
    company: "PayBridge MENA",
    rating: 5,
    image: "/2.png",
    location: "Dubai, UAE",
    projectTag: "Fintech · Mobile App",
  },
  {
    id: "3",
    quote:
      "We needed a Shopify Plus headless storefront that could handle festival-season traffic. FocusFolks delivered 99.97% uptime during Diwali with a 41% conversion lift over our old theme.",
    author: "Ananya Desai",
    role: "Co-Founder",
    company: "CraftRoot India",
    rating: 5,
    image: "/3.png",
    location: "Mumbai, India",
    projectTag: "E-Commerce · Headless",
  },
  {
    id: "4",
    quote:
      "The AI document classifier they built cut our legal review cycle from 4 days to 6 hours. Human reviewers stay in the loop—exactly what our compliance team required.",
    author: "Rajesh Iyer",
    role: "VP Operations",
    company: "LegalStack Solutions",
    rating: 5,
    image: "/4.png",
    location: "Bangalore, India",
    projectTag: "AI · Document Intelligence",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Multi-Specialty Hospital Patient Portal",
    industry: "Healthcare · Gujarat, India",
    description:
      "Modernized a legacy PHP patient portal serving 180,000+ monthly users across 6 hospital locations. Rebuilt on Next.js with HL7 FHIR integrations, ABDM compliance, and role-based access for doctors, patients, and admin staff.",
    metrics: [
      { label: "Page load time", value: "-62%" },
      { label: "Appointment no-shows", value: "-18%" },
      { label: "Uptime since launch", value: "99.96%" },
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Cross-Border Remittance Mobile App",
    industry: "Fintech · Dubai, UAE",
    description:
      "Built a React Native remittance app for UAE-to-India corridors with KYC (UAEPASS), real-time FX rates, and PCI-DSS aligned payment flows via Network International. Launched on iOS and Android in 14 weeks.",
    metrics: [
      { label: "Time to market", value: "14 weeks" },
      { label: "Q1 transaction volume", value: "AED 12M" },
      { label: "App store rating", value: "4.7/5" },
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Headless D2C Commerce Platform",
    industry: "Retail · India",
    description:
      "Shopify Plus headless storefront with Next.js frontend, Sanity CMS, and Algolia search for a fast-growing artisan goods brand. Handled 12× traffic spike during Diwali 2025 without downtime.",
    metrics: [
      { label: "Conversion rate", value: "+41%" },
      { label: "Peak traffic handled", value: "12× baseline" },
      { label: "Core Web Vitals", value: "All green" },
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "enterprise-tech-trends-2026",
    title: "Enterprise Tech Trends to Watch in 2026",
    excerpt:
      "A practical roundup of what’s actually changing in 2026—from agentic AI to cost discipline, security automation, and data governance.",
    category: "Strategy",
    date: "May 28, 2026",
    readTime: "9 min read",
    author: { name: "Alex Rivera", role: "Chief Strategy Officer" },
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    featured: true,
    tags: ["Strategy", "Enterprise", "AI", "Cloud"],
  },
  {
    slug: "cloud-migration-2026-playbook",
    title: "Cloud Migration in 2026: The Enterprise Playbook",
    excerpt:
      "How to modernize safely with landing zones, identity boundaries, cost guardrails, and a delivery roadmap stakeholders trust.",
    category: "Cloud",
    date: "May 20, 2026",
    readTime: "12 min read",
    author: { name: "Priya Sharma", role: "Cloud Architect" },
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    tags: ["AWS", "Azure", "GCP", "Migration"],
  },
  {
    slug: "ai-roi-metrics-2026",
    title: "Measuring ROI on AI Projects (Without Hand-Waving)",
    excerpt:
      "A CFO-friendly framework for measuring AI value: cost-to-serve, cycle time reduction, risk reduction, and quality uplift.",
    category: "AI",
    date: "May 15, 2026",
    readTime: "7 min read",
    author: { name: "David Kim", role: "AI Lead" },
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    tags: ["AI", "ROI", "Analytics", "Leadership"],
  },
  {
    slug: "design-systems-at-scale",
    title: "Design Systems That Scale Across Products",
    excerpt:
      "What actually works when you’re standardizing UX across teams: governance, tokens, adoption loops, and measurable velocity gains.",
    category: "Design",
    date: "May 10, 2026",
    readTime: "10 min read",
    author: { name: "Lisa Morgan", role: "Design Director" },
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Design Systems", "UI/UX", "Product"],
  },
  {
    slug: "platform-engineering-2026",
    title: "Platform Engineering in 2026: Reduce Cognitive Load",
    excerpt:
      "Why internal developer platforms (IDPs) are winning—and how to structure golden paths, guardrails, and self-service without slowing teams down.",
    category: "DevOps",
    date: "May 5, 2026",
    readTime: "8 min read",
    author: { name: "Marcus Johnson", role: "DevOps Engineer" },
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    tags: ["DevOps", "Platform Engineering", "IDP"],
  },
  {
    slug: "cybersecurity-essentials-2026",
    title: "Enterprise Cybersecurity Essentials for 2026",
    excerpt:
      "Critical security practices every organization should implement to protect digital assets.",
    category: "Security",
    date: "Apr 28, 2026",
    readTime: "9 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    tags: ["Security", "Compliance", "Zero Trust"],
  },
  {
    slug: "passkeys-enterprise-2026",
    title: "Passkeys in the Enterprise: The 2026 Adoption Wave",
    excerpt:
      "Passwordless is real now. Here’s how to roll out passkeys without breaking SSO, recovery, or privileged access.",
    category: "Security",
    date: "May 7, 2026",
    readTime: "8 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    tags: ["Passkeys", "Identity", "Zero Trust"],
  },
  {
    slug: "nist-csf-2-govern-function",
    title: "NIST CSF 2.0: What the New Govern Function Changes",
    excerpt:
      "How to use CSF 2.0 to align leadership, risk, and supply-chain security—without turning it into a checkbox program.",
    category: "Security",
    date: "Apr 18, 2026",
    readTime: "10 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1600&q=80",
    tags: ["NIST", "Governance", "Supply Chain"],
  },
  {
    slug: "finops-2026-state-of-finops",
    title: "FinOps 2026: Shift-Left Cost Governance",
    excerpt:
      "FinOps is moving into engineering workflows. Here’s how to build guardrails that prevent waste before it happens.",
    category: "FinOps",
    date: "Apr 12, 2026",
    readTime: "9 min read",
    author: { name: "Priya Sharma", role: "Cloud Architect" },
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80",
    tags: ["FinOps", "Cloud Cost", "Unit Economics"],
  },
  {
    slug: "kubernetes-cost-optimization-2026",
    title: "Kubernetes Cost Optimization: Practical Moves That Work",
    excerpt:
      "Visibility, rightsizing, autoscaling, and policy-as-code—how platform teams reduce idle spend without risking reliability.",
    category: "Cloud",
    date: "Mar 30, 2026",
    readTime: "11 min read",
    author: { name: "Marcus Johnson", role: "DevOps Engineer" },
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1600&q=80",
    tags: ["Kubernetes", "Cloud", "FinOps"],
  },
  {
    slug: "agentic-ai-governance-guardrails",
    title: "Agentic AI Governance: Guardrails Before Autonomy",
    excerpt:
      "Agents can act, not just answer. Learn how to scope tools, permissions, logging, and human oversight for safe automation.",
    category: "AI",
    date: "Mar 22, 2026",
    readTime: "10 min read",
    author: { name: "David Kim", role: "AI Lead" },
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80",
    tags: ["Agentic AI", "Governance", "Security"],
  },
  {
    slug: "eu-ai-act-enterprise-readiness",
    title: "EU AI Act Readiness: What Enterprises Should Do Now",
    excerpt:
      "A practical checklist for risk classification, documentation, human oversight, and security controls for high‑risk systems.",
    category: "Compliance",
    date: "Mar 12, 2026",
    readTime: "12 min read",
    author: { name: "Alex Rivera", role: "Chief Strategy Officer" },
    image:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1600&q=80",
    tags: ["EU AI Act", "Compliance", "Risk"],
  },
  {
    slug: "dora-operational-resilience",
    title: "DORA & Operational Resilience: A Tech Leader’s Guide",
    excerpt:
      "What changes for incident reporting, third-party risk, testing, and resilience engineering—without slowing delivery.",
    category: "Compliance",
    date: "Feb 28, 2026",
    readTime: "11 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1600&q=80",
    tags: ["DORA", "Resilience", "Third-Party Risk"],
  },
  {
    slug: "nis2-controls-mapping",
    title: "NIS2 in Practice: Controls Mapping Without Audit Fatigue",
    excerpt:
      "How to build a unified control framework (“test once, comply many”) and avoid duplicate work across overlapping regulations.",
    category: "Compliance",
    date: "Feb 15, 2026",
    readTime: "9 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    tags: ["NIS2", "Compliance", "Governance"],
  },
  {
    slug: "supply-chain-security-sbom-slsa",
    title: "Supply-Chain Security: SBOM + Provenance That Actually Helps",
    excerpt:
      "SBOMs are not the finish line. Here’s how to pair them with signing, provenance, and policy to reduce real risk.",
    category: "Security",
    date: "Jan 30, 2026",
    readTime: "10 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    tags: ["SBOM", "SLSA", "Supply Chain"],
  },
  {
    slug: "data-governance-for-ai",
    title: "Data Governance for AI: Fix the Foundation",
    excerpt:
      "Model performance is only as good as the data supply chain. Build ownership, lineage, quality SLAs, and observability.",
    category: "Data",
    date: "Jan 18, 2026",
    readTime: "9 min read",
    author: { name: "Priya Sharma", role: "Cloud Architect" },
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Data", "Governance", "AI"],
  },
  {
    slug: "modernizing-legacy-systems-2026",
    title: "Legacy Modernization in 2026: Strangler Patterns That Ship",
    excerpt:
      "How to move from monoliths to modular architectures safely—with measurable milestones and reduced operational risk.",
    category: "Strategy",
    date: "Jan 5, 2026",
    readTime: "12 min read",
    author: { name: "Alex Rivera", role: "Chief Strategy Officer" },
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Modernization", "Architecture", "Delivery"],
  },
  {
    slug: "zero-trust-identity-first",
    title: "Identity-First Zero Trust: What to Prioritize",
    excerpt:
      "Zero Trust succeeds or fails in identity. Build non-human identity controls, device trust, and session hardening.",
    category: "Security",
    date: "Dec 18, 2025",
    readTime: "10 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    tags: ["Zero Trust", "IAM", "Device Trust"],
  },
  {
    slug: "observability-2026-slos",
    title: "Observability in 2026: SLOs, Cost, and Signal Quality",
    excerpt:
      "Stop paying for noise. A modern approach to telemetry sampling, SLOs, and incident response that scales.",
    category: "DevOps",
    date: "Dec 10, 2025",
    readTime: "9 min read",
    author: { name: "Marcus Johnson", role: "DevOps Engineer" },
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    tags: ["Observability", "SRE", "Reliability"],
  },
  {
    slug: "ai-security-shadow-ai",
    title: "Shadow AI: Reducing Data Leakage Without Blocking Teams",
    excerpt:
      "A governance pattern for safe AI usage: approved tools, DLP controls, logging, training/IP rules, and vendor risk checks.",
    category: "AI",
    date: "Nov 22, 2025",
    readTime: "8 min read",
    author: { name: "David Kim", role: "AI Lead" },
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
    tags: ["AI Security", "Governance", "Risk"],
  },
  {
    slug: "multi-cloud-2026-what-changed",
    title: "Multi-Cloud in 2026: What Changed (and What Didn’t)",
    excerpt:
      "When multi-cloud makes sense, when it doesn’t, and how to reduce complexity with platform patterns.",
    category: "Cloud",
    date: "Nov 10, 2025",
    readTime: "10 min read",
    author: { name: "Priya Sharma", role: "Cloud Architect" },
    image:
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1600&q=80",
    tags: ["Multi-Cloud", "Architecture", "Platform"],
  },
  {
    slug: "secure-by-default-golden-paths",
    title: "Secure-by-Default Golden Paths for Engineering Teams",
    excerpt:
      "How to bake security into templates, pipelines, and platforms—so teams ship fast without skipping guardrails.",
    category: "DevOps",
    date: "Oct 30, 2025",
    readTime: "9 min read",
    author: { name: "Marcus Johnson", role: "DevOps Engineer" },
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1600&q=80",
    tags: ["DevSecOps", "Pipelines", "Policy as Code"],
  },
  {
    slug: "ai-incident-response-playbook",
    title: "AI Incident Response: A Playbook for Tool-Using Systems",
    excerpt:
      "What to log, how to reproduce issues, and how to reduce recurrence when agents and LLM tools are in production.",
    category: "AI",
    date: "Oct 12, 2025",
    readTime: "8 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80",
    tags: ["AI", "Incident Response", "Operations"],
  },
  {
    slug: "modern-api-security-2026",
    title: "Modern API Security in 2026: Beyond Rate Limits",
    excerpt:
      "Protect APIs from abuse with identity context, fine-grained authorization, and visibility into tool-driven traffic.",
    category: "Security",
    date: "Sep 25, 2025",
    readTime: "9 min read",
    author: { name: "Nina Patel", role: "Security Consultant" },
    image:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
    tags: ["API Security", "AuthZ", "Zero Trust"],
  },
  {
    slug: "enterprise-ai-architecture-rag",
    title: "Enterprise AI Architecture: RAG, Evaluation, and Guardrails",
    excerpt:
      "A blueprint for production AI: retrieval, evals, prompt/version control, and defense against injection and leakage.",
    category: "AI",
    date: "Sep 12, 2025",
    readTime: "12 min read",
    author: { name: "David Kim", role: "AI Lead" },
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    tags: ["RAG", "Evaluation", "Security"],
  },
  {
    slug: "board-ready-metrics-tech-leaders",
    title: "Board-Ready Metrics: Reporting Tech Value in Plain English",
    excerpt:
      "How to communicate progress and risk: delivery cadence, reliability, security posture, and cost/value per outcome.",
    category: "Strategy",
    date: "Aug 28, 2025",
    readTime: "8 min read",
    author: { name: "Alex Rivera", role: "Chief Strategy Officer" },
    image:
      "https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1600&q=80",
    tags: ["Leadership", "Metrics", "Strategy"],
  },
  {
    slug: "greenops-2026-sustainability",
    title: "GreenOps in 2026: Cost + Carbon as One Metric",
    excerpt:
      "How teams connect cloud cost and sustainability with actionable dashboards and engineering guardrails.",
    category: "FinOps",
    date: "Aug 10, 2025",
    readTime: "7 min read",
    author: { name: "Priya Sharma", role: "Cloud Architect" },
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
    tags: ["GreenOps", "Sustainability", "FinOps"],
  },
  {
    slug: "change-management-digital-transformation",
    title: "Change Management for Digital Transformation Programs",
    excerpt:
      "The overlooked success factor: how to align stakeholders, manage rollout risk, and drive adoption at scale.",
    category: "Strategy",
    date: "Jul 25, 2025",
    readTime: "9 min read",
    author: { name: "Alex Rivera", role: "Chief Strategy Officer" },
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Transformation", "Leadership", "Adoption"],
  },
  {
    slug: "secure-ui-patterns-enterprise",
    title: "Secure UI Patterns: Avoiding Risky UX at Scale",
    excerpt:
      "Design choices can create security risk. Here are patterns that improve safety without harming conversion.",
    category: "Design",
    date: "Jul 10, 2025",
    readTime: "8 min read",
    author: { name: "Lisa Morgan", role: "Design Director" },
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1600&q=80",
    tags: ["UX", "Security", "Design"],
  },
  {
    slug: "enterprise-delivery-weekly-demos",
    title: "Weekly Demos That Keep Enterprise Projects on Track",
    excerpt:
      "A simple cadence that reduces risk: what to show, how to frame progress, and how to keep decisions unblocked.",
    category: "Delivery",
    date: "Jun 18, 2025",
    readTime: "6 min read",
    author: { name: "Marcus Johnson", role: "VP of Delivery" },
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    tags: ["Delivery", "Stakeholders", "Agile"],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Hayder Mirza",
    role: "Founder & CEO",
    bio: "Leads company vision, product strategy, and the engineering standards behind every FocusFolks release. Oversees architecture for Client Credit Tracker, shapes the SaaS and AI roadmap, and keeps engineering decisions tied to real accounting workflows. Believes in shipping useful software early, learning from users, and building a culture where craft beats hype.",
    image: "/images/team-1.jpeg",
  },
  {
    id: "3",
    name: "Taiyab",
    role: "Designer & Developer",
    bio: "Ships UI/UX and full-stack features—from wireframes to production-ready interfaces and components. Bridges design and development so Figma handoffs become maintainable React and Next.js code. Focuses on accessibility, responsive layouts, and design systems that help a small team move fast without sacrificing polish.",
    image: "/images/team-3.jpeg",
  },
  {
    id: "2",
    name: "Muntashira",
    role: "Video Editor · Designer & Support",
    bio: "Handles video editing, visual design, and client support—keeping brand assets and communication sharp. Produces explainers, social cuts, and presentation visuals that make FocusFolks easy to understand before a conversation starts. Keeps support touchpoints friendly and ensures every external-facing asset feels consistent with our brand.",
    image: "/images/team-2.jpeg",
  },
];

export const companyTimeline = [
  {
    year: "Start",
    title: "FocusFolks launches",
    description:
      "A four-person team starts building with one goal—ship useful software with honest engineering and room to grow.",
  },
  {
    year: "Now",
    title: "First product live",
    description:
      "Client Credit Tracker, our Accounting CRM, is in production—real workflows for ledgers, credit, and bookkeeping.",
  },
  {
    year: "Build",
    title: "Portfolio in progress",
    description:
      "No client case studies yet—we are actively building capabilities in custom software, SaaS, cloud, and AI.",
  },
  {
    year: "Next",
    title: "Future innovation roadmap",
    description:
      "AI-assisted products, automation platforms, enterprise apps, and digital transformation services on the horizon.",
  },
];

export const companyValues = [
  {
    title: "Delivery Excellence",
    description:
      "Every sprint ships with code review, automated tests, and QA gates. We measure success by uptime, performance, and client adoption—not slide decks.",
    icon: "Star",
  },
  {
    title: "Radical Transparency",
    description:
      "Weekly demos, shared Slack channels, and honest status reports. If a timeline shifts, you hear it from us first—with options, not excuses.",
    icon: "Shield",
  },
  {
    title: "Engineering-First Innovation",
    description:
      "We adopt AI, cloud-native patterns, and modern frameworks when they solve real problems—not because they are trending on Hacker News.",
    icon: "Lightbulb",
  },
  {
    title: "Long-Term Partnership",
    description:
      "68% of our clients return for a second engagement. We structure teams and documentation so you can operate independently—or keep us as a trusted extension.",
    icon: "Handshake",
  },
];

/** About page — capability pillars (live product + future innovation) */
export const aboutCapabilityAreas = [
  {
    id: "accounting-crm",
    title: "Accounting CRM Platform",
    tagline: "Live product — Client Credit Tracker.",
    description:
      "Our first shipped SaaS for Angadiya firms—client credit, hawala entries, ledgers, and balance sheets in one dashboard.",
    image: "/images/products/product-1.png",
    icon: "Rocket",
    href: "/products",
    highlights: ["Live in production", "Client ledgers", "Balance sheets"],
  },
  {
    id: "digital-experiences",
    title: "Web, Mobile & Product Design",
    tagline: "Future capability — digital products.",
    description:
      "Next.js web apps, React Native mobile, and research-led UI/UX—built for speed, accessibility, and conversion.",
    image: "/images/about-us-thumb-4.jpeg",
    icon: "Globe",
    href: "/services/web-development",
    highlights: ["Next.js & React", "Mobile apps", "UI/UX systems"],
  },
  {
    id: "cloud-platform",
    title: "Cloud, DevOps & Platform Engineering",
    tagline: "Future capability — scalable infrastructure.",
    description:
      "Cloud landing zones, CI/CD pipelines, and platform engineering for teams ready to scale reliably.",
    image: "/images/about-us-thumb-3.jpg",
    icon: "Cloud",
    href: "/services/cloud",
    highlights: ["AWS · Azure · GCP", "GitOps", "CI/CD automation"],
  },
  {
    id: "ai-transformation",
    title: "AI, SaaS & Digital Transformation",
    tagline: "Future capability — intelligent software.",
    description:
      "AI-assisted workflows, new SaaS products, automation, and modernization programs on our innovation roadmap.",
    image: "/images/about-us-thumb-2.jpeg",
    icon: "Brain",
    href: "/services/ai",
    highlights: ["AI integration", "SaaS products", "Automation"],
  },
] as const;

/** Default FAQs — fallback for components that do not pass a custom list */
export const faqs: FaqItem[] = [
  {
    question: "What industries do you specialize in?",
    answer:
      "Healthcare (HIPAA, ABDM), fintech (PCI-DSS, UAE Central Bank), retail & D2C commerce, logistics, education, and real estate proptech. We have delivered regulated and high-traffic systems across India, UAE, Saudi Arabia, UK, and North America.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Marketing websites: 3–5 weeks. MVPs (web or mobile): 8–12 weeks. Custom enterprise platforms: 12–24 weeks. Cloud migration programs: 8–16 weeks. We provide fixed timelines after a discovery sprint—never before understanding your scope.",
  },
  {
    question: "Do you offer dedicated teams or staff augmentation?",
    answer:
      "Both. Project-based delivery for defined scope; embedded squads (3–8 specialists) for ongoing product work; and individual staff augmentation starting at $45–$85/hr depending on seniority and stack. Many clients start with a project and transition to a monthly retainer.",
  },
  {
    question: "What are your pricing models?",
    answer:
      "Fixed-scope projects (milestone billing), time-and-materials ($45–$120/hr by role), and monthly retainers ($4,800–$12,000/mo for managed services). See our Pricing page for category-specific plans with indicative 2026 market rates in your local currency.",
  },
  {
    question: "How do you ensure project quality?",
    answer:
      "Mandatory code review, automated unit/integration tests, CI/CD with security scanning (SAST/dependency checks), staging environments, and QA sign-off before every production release. Weekly sprint demos keep stakeholders aligned.",
  },
  {
    question: "Can you work with our existing in-house team?",
    answer:
      "Yes—this is our most common engagement model. We integrate into your GitHub/GitLab, Jira/Linear, Slack/Teams, and sprint ceremonies. Knowledge transfer and documentation are included so your team retains full ownership.",
  },
];

/** Home page — SEO-rich FAQs with detailed answers */
export const homeFaqs: FaqItem[] = [
  {
    question: "What is FocusFolks and what digital services do you provide?",
    answer:
      "FocusFolks is an enterprise software development company headquartered in Ahmedabad, India with a delivery center in Dubai, UAE. We design and build custom software, Next.js web applications, mobile apps, UI/UX design systems, cloud platforms on AWS/Azure/GCP, DevOps pipelines, AI integration (LLM copilots and RAG), digital transformation programs, IT consulting, and staff augmentation. Since 2018 we have delivered 127+ projects for 68+ clients across 12 countries—with a 96% on-time milestone rate and transparent weekly reporting on every engagement.",
  },
  {
    question: "Who should hire FocusFolks for custom software development?",
    answer:
      "We are a strong fit for mid-market and enterprise teams that need senior engineering without building a large in-house department—product companies scaling their platform, GCC businesses entering digital channels, and global teams that want follow-the-sun delivery from India and the UAE. Typical clients include CTOs, VP Engineering, founders with validated product ideas, and IT leaders modernizing legacy systems. If you need HIPAA, PCI-DSS, or UAE regulatory alignment, regulated-industry experience is core to our practice—not an add-on.",
  },
  {
    question: "Which industries does FocusFolks specialize in?",
    answer:
      "Healthcare (HIPAA, ABDM-compliant portals and telemedicine), fintech (PCI-DSS payments and UAE Central Bank regulated platforms), retail & D2C (Shopify Plus headless and festival-scale traffic), logistics (fleet tracking and WMS dashboards), education (LMS and EdTech mobile apps), and real estate proptech (listing portals and CRM integrations for MENA markets). Our teams understand sector-specific compliance, audit trails, and uptime requirements before development begins.",
  },
  {
    question: "How does FocusFolks deliver projects from discovery to launch?",
    answer:
      "We follow a six-phase delivery model: Discover (stakeholder workshops, requirements, and success metrics), Plan (architecture, roadmap, risk register, and fixed estimate), Design (wireframes, prototypes, and design-system handoff), Develop (two-week agile sprints with code review and CI/CD), Launch (QA, security scan, staging UAT, and production deployment with rollback), and Scale (monitoring, FinOps, and feature evolution). Each phase has defined deliverables and client sign-off gates. You receive weekly sprint demos, burndown visibility, and a single delivery lead as your point of contact.",
  },
  {
    question: "How long does a software project take with FocusFolks?",
    answer:
      "Timelines depend on scope and compliance depth. Indicative ranges: marketing websites 3–5 weeks; web application MVPs 8–12 weeks; mobile MVPs 10–14 weeks; custom enterprise platforms 12–24 weeks; cloud migration programs 8–16 weeks; AI proof-of-concept 4–8 weeks. We never commit to a fixed timeline before a discovery sprint—we document assumptions, dependencies, and integration complexity first, then provide a milestone plan you can hold us accountable to.",
  },
  {
    question: "How much does custom software development cost in 2026?",
    answer:
      "Indicative 2026 starting ranges: marketing websites from $6,500; web applications from $28,500; mobile MVPs from $22,000; UI/UX product design from $16,500; cloud migration from $42,000; AI integration PoC from $12,000; staff augmentation $45–$85/hr by seniority. Enterprise and regulated programs are scoped individually. We offer fixed-scope milestone billing, time-and-materials, and monthly retainers ($4,800–$12,000/mo for managed services). Visit our Pricing page for category-specific tiers in your local currency.",
  },
  {
    question: "Can FocusFolks work with our existing in-house development team?",
    answer:
      "Yes—co-delivery with your internal team is our most common model. We embed into your GitHub or GitLab, Jira or Linear, Slack or Teams, and existing sprint ceremonies. Our engineers pair on architecture decisions, document ADRs, and transfer knowledge so your team retains full code ownership. We can augment specific skills (React, Node, Python, cloud, mobile) or run a full squad while your product owner steers priorities.",
  },
  {
    question: "Do you offer staff augmentation and dedicated development squads?",
    answer:
      "Yes. Staff augmentation places senior specialists on your team—typically within 10 business days—with flexible scale up or down. Dedicated squads (3–8 engineers, designers, and QA) own a product stream end-to-end with a FocusFolks delivery lead. Many clients start with a fixed-scope MVP, then transition 68% of them to a monthly retainer for ongoing growth. Rates and squad composition are confirmed during discovery.",
  },
  {
    question: "What technology stack does FocusFolks use?",
    answer:
      "Frontend: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python, .NET. Mobile: React Native, Swift, Kotlin. Cloud & infrastructure: AWS, Azure, GCP with Terraform and Kubernetes. Data: PostgreSQL, MongoDB, Redis. AI: OpenAI, Azure OpenAI, LangChain, and vector databases for RAG. We choose stack based on your existing environment, team skills, compliance needs, and long-term maintainability—not trends alone.",
  },
  {
    question: "How does FocusFolks ensure security, quality, and on-time delivery?",
    answer:
      "Security: threat modeling, encryption at rest and in transit, secrets management, and SAST/dependency scanning in CI/CD. Quality: mandatory peer review, automated unit and integration tests, staging environments, and QA sign-off before production. Delivery: two-week sprints, weekly demos, burndown tracking, and change requests through a transparent process. Our 96% on-time milestone rate and 98% client satisfaction reflect this discipline—not luck.",
  },
  {
    question: "Does FocusFolks build AI features and LLM integrations for production?",
    answer:
      "Yes. We deliver production AI—not slide-deck demos—including RAG knowledge bases, document intelligence, customer-support copilots, and workflow automation with human-in-the-loop safeguards. Engagements typically start with a scoped PoC (from $12,000) to validate accuracy, latency, and cost, then move to production features with monitoring, prompt versioning, and VPC or private deployment for regulated industries.",
  },
  {
    question: "Do you serve clients outside India and the UAE?",
    answer:
      "Yes. Active delivery for clients in the United States, United Kingdom, Canada, Australia, Singapore, and Saudi Arabia. Our Ahmedabad + Dubai model provides 6–8 hours of overlap with US Eastern and GMT time zones. We routinely complete vendor onboarding, MSAs, NDAs, and enterprise security questionnaires for global clients.",
  },
  {
    question: "What support do you provide after launch?",
    answer:
      "Every launch includes a defined warranty window, monitoring setup, rollback documentation, and optional on-call coverage. Post-launch we offer monthly retainers for feature evolution, performance optimization, FinOps reviews, and SRE support. 68% of clients transition to ongoing engagement after go-live—because product growth, not just shipping v1, is where long-term value is created.",
  },
  {
    question: "How do I get started with FocusFolks?",
    answer:
      "Book a free 30-minute discovery call on our Contact page, email info.focusedfolks@gmail.com, or call +91-6353904865 (India) / +971-56-932-1060 (UAE). We respond within one business day. On the call we clarify goals, constraints, and timeline; if there is a fit, we propose a discovery sprint or fixed-scope proposal with team composition, milestones, and pricing within five business days.",
  },
];

/** Services page — SEO-rich FAQs */
export const servicesFaqs: FaqItem[] = [
  {
    question: "What IT services does FocusFolks offer?",
    answer:
      "Ten practice areas: custom software development, web development (Next.js/React), mobile apps (React Native & native), UI/UX design, cloud solutions (AWS/Azure/GCP), DevOps & CI/CD, AI integration (LLM/RAG), digital transformation, IT consulting, and staff augmentation. All delivered from Ahmedabad, India and Dubai, UAE.",
  },
  {
    question: "Do you serve clients outside India and the UAE?",
    answer:
      "Yes. We actively deliver for clients in the US, UK, Canada, Australia, Singapore, and Saudi Arabia. Our follow-the-sun model provides 6–8 hours of overlap with US Eastern and GMT time zones.",
  },
  {
    question: "What is your development process?",
    answer:
      "Six phases: Discover (workshops & requirements), Plan (architecture & roadmap), Design (wireframes & prototypes), Develop (2-week agile sprints), Launch (QA, deployment, go-live support), and Scale (monitoring, optimization, feature evolution). Every phase has defined deliverables and client sign-off gates.",
  },
  {
    question: "Which technology stack do you use?",
    answer:
      "Frontend: Next.js, React, TypeScript, Tailwind CSS. Backend: Node.js, Python, .NET. Mobile: React Native, Swift, Kotlin. Cloud: AWS, Azure, GCP with Terraform. Data: PostgreSQL, MongoDB, Redis. AI: OpenAI, Azure OpenAI, LangChain, vector databases.",
  },
  {
    question: "How much does custom software development cost in 2026?",
    answer:
      "Indicative ranges: marketing websites from $6,500; web applications from $28,500; mobile MVPs from $22,000; cloud migration from $42,000; AI PoC from $12,000. Enterprise and regulated projects are scoped individually. Visit our Pricing page for category-specific plans.",
  },
  {
    question: "Do you sign NDAs and pass enterprise security reviews?",
    answer:
      "Yes. We routinely complete vendor onboarding, MSAs, NDAs, and security questionnaires for enterprise clients. Our delivery includes threat modeling, encryption at rest/in transit, and audit-friendly logging.",
  },
  {
    question: "Can you modernize legacy systems without downtime?",
    answer:
      "We use strangler-fig migration patterns, feature flags, and parallel runs to migrate legacy PHP, .NET, or Java systems to modern stacks while keeping production online. Phased cutovers with rollback plans are standard.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a free 30-minute discovery call via our Contact page, email info.focusedfolks@gmail.com, or call +91-6353904865 (India) / +971-56-932-1060 (UAE). We respond within one business day with next steps.",
  },
];

/** Pricing page — SEO-rich FAQs */
export const pricingFaqs: FaqItem[] = [
  {
    question: "Are the prices on this page final?",
    answer:
      "No—they are indicative starting prices based on 2025–2026 market benchmarks (Clutch, GoodFirms, regional agency surveys). Final quotes depend on scope, integrations, compliance requirements, and team composition. We provide fixed-price proposals after discovery.",
  },
  {
    question: "Why do prices vary by region?",
    answer:
      "We display prices in your local currency using indicative exchange rates for convenience. Billing is typically in USD or your preferred currency as agreed in the contract. UAE and India clients may receive region-adjusted rates during quoting.",
  },
  {
    question: "Do you offer payment plans or milestone billing?",
    answer:
      "Yes. Fixed-scope projects are billed in 3–4 milestones (e.g., 30% kickoff, 30% mid-delivery, 30% launch, 10% warranty). Monthly retainers are billed at the start of each month. Enterprise programs follow custom payment schedules.",
  },
  {
    question: "What is included in the Starter vs Growth vs Enterprise tiers?",
    answer:
      "Each service category has its own tier definitions—see the comparison table on this page. Generally: Starter covers focused scope (audit, MVP, or foundation); Growth covers full product delivery; Enterprise covers multi-workstream programs with SLA and dedicated squads.",
  },
  {
    question: "Can I combine services (e.g., web + design + DevOps)?",
    answer:
      "Yes—we frequently bundle design, development, and DevOps into a single engagement with a unified squad and consolidated pricing. Ask for a combined quote during discovery; bundled projects typically save 10–15% vs. separate engagements.",
  },
  {
    question: "How do your rates compare to hiring in-house?",
    answer:
      "A US-based senior developer costs $120K–$180K/yr plus benefits. Our Growth-tier squad (3–4 specialists at ~$28K–$52K project scope) delivers comparable output in 10–16 weeks without recruitment overhead, equipment, or management burden.",
  },
  {
    question: "Do you offer discounts for startups or nonprofits?",
    answer:
      "We offer reduced discovery sprint rates for pre-seed startups and registered nonprofits on a case-by-case basis. Mention your status in the contact form and we will factor it into the proposal.",
  },
  {
    question: "What happens after I choose a plan?",
    answer:
      "Click the plan CTA to reach our Contact page. We schedule a scoping call within 2 business days, confirm requirements, and send a detailed proposal with timeline, team composition, and fixed or T&M pricing within 5 business days.",
  },
];

export { officeLocations } from "@/constants/contact";

export const blogCategories = [
  "All",
  "Strategy",
  "Cloud",
  "AI",
  "Security",
  "Compliance",
  "FinOps",
  "DevOps",
  "Design",
  "Data",
  "Delivery",
];
