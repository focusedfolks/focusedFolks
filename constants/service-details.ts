import type { ServiceDetailContent } from "@/types";

const defaultApproach = [
  { step: "01", title: "Discover", description: "Stakeholder workshops, current-state assessment, and success metrics." },
  { step: "02", title: "Architect", description: "Solution design, risk register, and delivery roadmap aligned to outcomes." },
  { step: "03", title: "Deliver", description: "Agile execution with demos, QA gates, and transparent reporting." },
  { step: "04", title: "Validate", description: "Performance, security, and usability validation before release." },
  { step: "05", title: "Scale", description: "Monitoring, optimization, and continuous improvement post-launch." },
];

const defaultPlans = [
  {
    name: "Essential",
    description: "Structured alignment on scope, architecture, compliance, and delivery plan with fixed-price build estimate.",
    duration: "2–3 weeks",
    priceFromUsd: 1250,
    includes: [
      "Stakeholder workshops & requirements doc",
      "Solution architecture & ADRs",
      "Risk register & compliance scoping",
      "Prioritized backlog with story points",
      "Fixed-price build proposal",
    ],
  },
  {
    name: "Professional",
    description: "End-to-end delivery with dedicated cross-functional squad, weekly demos, and QA gates.",
    duration: "10–20 weeks",
    priceFromUsd: 7500,
    popular: true,
    includes: [
      "Dedicated squad (3–5 specialists)",
      "2-week agile sprints with demos",
      "Automated testing & CI/CD pipeline",
      "Staging + production environments",
      "Security scan & QA sign-off per release",
      "60-day post-launch bug-fix window",
    ],
  },
  {
    name: "Custom Quote",
    description: "Large-scale platform build or legacy modernization with phased migration and SLA delivery.",
    duration: "Scoped to your needs",
    priceFromUsd: null,
    priceLabel: "Get a quote",
    includes: [
      "Program management & PMO",
      "Multi-workstream delivery",
      "Legacy migration (strangler-fig pattern)",
      "Multi-tenant or multi-region architecture",
      "Penetration testing & security audit",
      "24/7 SLA support option",
    ],
  },
];

export const serviceDetails: Record<string, ServiceDetailContent> = {
  "custom-software": {
    tagline: "Bespoke systems engineered for reliability, security, and long-term scale.",
    overview: [
      "We design and build custom software that fits your workflows—not the other way around. From greenfield platforms to legacy modernization, our teams align architecture with measurable business outcomes.",
      "Every engagement includes enterprise-grade practices: threat modeling, automated testing, observability, and documentation your internal teams can own.",
    ],
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Domain-driven design", description: "Models that reflect real business rules and reduce rework.", icon: "Layers" },
      { title: "API-first architecture", description: "Composable services ready for integrations and future channels.", icon: "Workflow" },
      { title: "Security by design", description: "RBAC, encryption, audit trails, and compliance-ready patterns.", icon: "Shield" },
      { title: "Transferable delivery", description: "Runbooks, ADRs, and handover so your team can operate confidently.", icon: "BookOpen" },
    ],
    approach: defaultApproach,
    plans: defaultPlans,
    successMetrics: [
      { label: "On-time delivery", value: 96, suffix: "%" },
      { label: "Defect reduction post-launch", value: 72, suffix: "%" },
      { label: "Avg. performance gain", value: 3, suffix: "x" },
    ],
    deliverables: [
      "Solution architecture & technical roadmap",
      "Production-ready application codebase",
      "CI/CD pipelines and environment strategy",
      "Security & quality documentation",
      "Knowledge transfer sessions",
    ],
    technologies: ["TypeScript", "Node.js", ".NET", "PostgreSQL", "Redis", "Kubernetes", "AWS"],
    feedback: {
      quote:
        "FocusFolks rebuilt our core hospital platform with zero-downtime migration from legacy PHP. We shipped faster releases, cut page load time by 62%, and had zero critical incidents in the first year.",
      author: "Dr. Ketan Mehta",
      role: "Director of Digital Health",
      company: "ShreeLife Hospitals",
      rating: 5,
    },
    faqs: [
      {
        question: "How much does custom software development cost in 2026?",
        answer:
          "Discovery sprints start from $9,500 (2–3 weeks). Build programs for mid-market scope start from $65,000 (12–24 weeks). Enterprise platforms and legacy modernization are scoped individually—typically $120K–$500K+ depending on complexity and compliance.",
      },
      {
        question: "Can you modernize legacy systems without disrupting operations?",
        answer:
          "Yes. We use strangler-fig patterns, feature flags, and parallel runs to migrate PHP, .NET, and Java monoliths to modern stacks while keeping production online. Our ShreeLife Hospitals project migrated 180K+ users with zero downtime.",
      },
      {
        question: "Do you work with our internal architects and product teams?",
        answer:
          "We embed alongside your team in joint design reviews, shared Slack channels, and your Git repos. All architecture decisions are documented in ADRs so your team retains full ownership.",
      },
      {
        question: "What industries and compliance frameworks do you support?",
        answer:
          "Healthcare (HIPAA, ABDM), fintech (PCI-DSS, UAE Central Bank), and enterprise SaaS (SOC 2). Threat modeling, encryption, RBAC, and audit logging are included in every build program.",
      },
      {
        question: "How do you estimate and control scope?",
        answer:
          "Discovery produces a fixed-price proposal with story-point backlog and clear assumptions. During build, scope changes go through a transparent change-request process with effort and cost impact before work begins.",
      },
    ],
  },
  "web-development": {
    tagline: "Fast, accessible Next.js web platforms that rank on Google and convert visitors into customers.",
    overview: [
      "We build marketing sites, SaaS dashboards, customer portals, and headless e-commerce platforms with Next.js 15, React Server Components, and edge deployment on Vercel or AWS CloudFront. Every project targets Core Web Vitals in the green zone and WCAG 2.1 AA accessibility.",
      "Our web team has delivered 40+ production sites for clients in India, UAE, UK, and the US—including Shopify Plus headless storefronts, B2B SaaS dashboards, and government citizen portals. Typical launch timelines: marketing sites in 3–5 weeks, custom web apps in 10–16 weeks.",
    ],
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Performance-first", description: "Edge rendering, caching, and asset optimization for sub-second experiences.", icon: "Zap" },
      { title: "SEO & analytics ready", description: "Structured data, sitemaps, and event tracking baked into launch.", icon: "LineChart" },
      { title: "Design systems", description: "Reusable components that keep brand and UX consistent at scale.", icon: "Palette" },
      { title: "Secure auth flows", description: "SSO, OAuth, and session management aligned to enterprise policies.", icon: "Lock" },
    ],
    approach: defaultApproach,
    plans: [
      {
        name: "Launch Site",
        description: "High-converting marketing website with CMS, SEO foundation, and Core Web Vitals optimization.",
        duration: "3–5 weeks",
        priceFromUsd: 6500,
        includes: ["Up to 8 responsive pages", "Next.js + Tailwind CSS", "Headless CMS (Sanity/Contentful)", "On-page SEO & schema markup", "GA4/GTM analytics setup", "30-day post-launch bug fixes"],
      },
      {
        name: "Product Platform",
        description: "Custom web app with auth, dashboards, API integrations, and production CI/CD.",
        duration: "10–16 weeks",
        priceFromUsd: 28500,
        popular: true,
        includes: ["Role-based auth (SSO/OAuth)", "Admin dashboard + user portal", "REST/GraphQL API integrations", "Automated testing & CI/CD", "WCAG 2.1 AA accessibility", "Staging + production environments", "Weekly demos & sprint reports"],
      },
      {
        name: "Enterprise Web",
        description: "Multi-tenant portals, high-traffic commerce, or regulated platforms with SLA delivery.",
        duration: "16–32+ weeks",
        priceFromUsd: null,
        priceLabel: "Custom quote",
        includes: ["Solution architecture & threat modeling", "Multi-region CDN & edge deployment", "Compliance mapping (SOC 2, HIPAA, PCI)", "Load testing & observability", "Dedicated squad (4–8 specialists)", "24/7 incident response option"],
      },
    ],
    successMetrics: [
      { label: "Core Web Vitals pass rate", value: 94, suffix: "%" },
      { label: "Organic traffic lift", value: 48, suffix: "%" },
      { label: "Conversion improvement", value: 31, suffix: "%" },
    ],
    deliverables: [
      "Responsive web application or marketing site",
      "CMS integration & content workflows",
      "Performance & accessibility audit report",
      "Deployment & monitoring setup",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "Contentful", "GraphQL"],
    feedback: {
      quote:
        "Our Shopify Plus headless storefront handled 12× Diwali traffic with 99.97% uptime. FocusFolks delivered all-green Core Web Vitals and a 41% conversion lift—our best festival season ever.",
      author: "Ananya Desai",
      role: "Co-Founder",
      company: "CraftRoot India",
      rating: 5,
    },
    faqs: [
      {
        question: "How much does a Next.js website cost in 2026?",
        answer:
          "Marketing sites with CMS start from $6,500 (3–5 weeks). Custom web applications with auth and integrations start from $28,500 (10–16 weeks). Enterprise portals are scoped individually. See our Pricing page for full tier details.",
      },
      {
        question: "Do you support headless CMS and e-commerce?",
        answer:
          "Yes—we integrate Contentful, Sanity, Shopify Plus, WooCommerce, and custom commerce APIs. Our headless D2C project for CraftRoot India achieved 41% conversion lift with Shopify Plus + Next.js.",
      },
      {
        question: "How do you optimize for Google SEO and Core Web Vitals?",
        answer:
          "Server-side rendering, structured data (JSON-LD), XML sitemaps, canonical URLs, image optimization (next/image), and edge caching. We target LCP under 2.5s, INP under 200ms, and CLS under 0.1 on every launch.",
      },
      {
        question: "How do you handle multi-language and multi-region sites?",
        answer:
          "Next.js i18n routing, localized CMS content models, hreflang tags, and CDN geo-routing. We have delivered English/Arabic sites for UAE clients and English/Hindi/Gujarati for India.",
      },
      {
        question: "Can you take over an existing Next.js or React codebase?",
        answer:
          "We run a 1-week codebase audit covering architecture, test coverage, CI/CD, security, and performance. Then we stabilize and incrementally improve—no big-bang rewrites unless necessary.",
      },
    ],
  },
  mobile: {
    tagline: "Native-quality mobile experiences users trust on iOS and Android.",
    overview: [
      "We deliver consumer and enterprise mobile apps with React Native or native stacks—optimized for offline use, push engagement, and app store compliance.",
      "From MVP to millions of users, we instrument analytics, crash reporting, and release trains that keep shipping predictable.",
    ],
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Cross-platform efficiency", description: "Shared codebase without compromising platform-specific UX.", icon: "Smartphone" },
      { title: "Offline-first patterns", description: "Resilient sync and caching for field and travel use cases.", icon: "Wifi" },
      { title: "App store excellence", description: "ASO, release management, and review-ready compliance.", icon: "Star" },
      { title: "Device security", description: "Secure storage, cert pinning, and MDM-friendly builds.", icon: "ShieldCheck" },
    ],
    approach: defaultApproach,
    plans: [
      {
        name: "MVP App",
        description: "Cross-platform MVP with core flows, auth, push notifications, and app store submission.",
        duration: "8–12 weeks",
        priceFromUsd: 22000,
        includes: ["React Native (iOS + Android)", "Up to 12 core screens", "Auth, push & offline cache", "REST/GraphQL API integration", "Firebase analytics & crash reporting", "App Store & Play Store submission"],
      },
      {
        name: "Full Product App",
        description: "Feature-complete app with payments, deep linking, and Fastlane release automation.",
        duration: "14–22 weeks",
        priceFromUsd: 52000,
        popular: true,
        includes: ["Up to 35 screens + modals", "In-app payments (Stripe/Razorpay)", "Deep linking & universal links", "Fastlane CI/CD release trains", "Performance profiling", "App store ASO assets"],
      },
      {
        name: "Enterprise Mobile",
        description: "Field-service, MDM-compatible, or regulated apps with offline-first sync.",
        duration: "20–40+ weeks",
        priceFromUsd: null,
        priceLabel: "Custom quote",
        includes: ["Offline-first sync architecture", "MDM / enterprise distribution", "Certificate pinning & secure storage", "ERP/CRM backend integration", "Dedicated mobile squad + QA automation", "SLA-backed post-launch support"],
      },
    ],
    successMetrics: [
      { label: "App store rating avg.", value: 4.7, suffix: "/5" },
      { label: "Crash-free sessions", value: 99.2, suffix: "%" },
      { label: "Release cadence improvement", value: 2.5, suffix: "x" },
    ],
    deliverables: [
      "iOS & Android application builds",
      "App store listing assets & submission support",
      "Analytics & crash monitoring setup",
      "API integration layer",
    ],
    technologies: ["React Native", "Swift", "Kotlin", "Firebase", "Fastlane", "GraphQL"],
    feedback: {
      quote:
        "FocusFolks delivered our UAE-to-India remittance app in 14 weeks with UAEPASS KYC and PCI-DSS aligned payments. We processed AED 12M in Q1 post-launch with a 4.7 App Store rating.",
      author: "Fatima Al-Rashid",
      role: "Head of Product",
      company: "PayBridge MENA",
      rating: 5,
    },
    faqs: [
      {
        question: "React Native or native—which do you recommend?",
        answer:
          "We recommend based on performance needs, team skills, and timeline—often React Native for speed, native for specialized hardware features.",
      },
      {
        question: "Do you handle app store submissions?",
        answer: "Yes, including provisioning, screenshots, privacy labels, and release coordination.",
      },
      {
        question: "Can you integrate with existing backend APIs?",
        answer: "We design mobile API layers, auth, and caching strategies around your current services.",
      },
    ],
  },
  design: {
    tagline: "Research-led UI/UX that improves clarity, adoption, and conversion.",
    overview: [
      "Our design practice pairs user research with high-fidelity prototyping so stakeholders see the product before a single sprint begins.",
      "We deliver design systems, accessibility-reviewed flows, and developer-ready specs that accelerate engineering.",
    ],
    heroImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Evidence-based UX", description: "Interviews, usability tests, and analytics inform every decision.", icon: "Search" },
      { title: "Design systems", description: "Tokens, components, and documentation for consistent scale.", icon: "Component" },
      { title: "Accessible interfaces", description: "WCAG-aligned patterns tested with assistive technologies.", icon: "Eye" },
      { title: "Dev-ready handoff", description: "Figma specs, motion guidelines, and edge-case coverage.", icon: "Palette" },
    ],
    approach: [
      { step: "01", title: "Research", description: "Personas, journey maps, and opportunity areas from real users." },
      { step: "02", title: "Define", description: "Information architecture, flows, and success metrics." },
      { step: "03", title: "Design", description: "Wireframes to high-fidelity UI with iterative critique." },
      { step: "04", title: "Validate", description: "Usability testing and accessibility review." },
      { step: "05", title: "Handoff", description: "Specs, tokens, and pairing with engineering." },
    ],
    plans: [
      {
        name: "UX Audit & Refresh",
        description: "Heuristic evaluation, accessibility scan, and prioritized redesign roadmap.",
        duration: "2–3 weeks",
        priceFromUsd: 4800,
        includes: ["Heuristic & competitive analysis", "WCAG 2.1 accessibility scan", "User flow & friction mapping", "Prioritized improvement backlog", "Wireframe concepts for top 3 screens", "Executive summary presentation"],
      },
      {
        name: "Product Design Sprint",
        description: "End-to-end UX from research through high-fidelity UI, prototypes, and developer-ready handoff.",
        duration: "6–10 weeks",
        priceFromUsd: 16500,
        popular: true,
        includes: ["User interviews & journey mapping (5–8 users)", "Information architecture & wireframes", "High-fidelity UI for up to 25 screens", "Interactive Figma prototype", "Design system starter (tokens + components)", "Usability test round with findings", "Dev handoff specs & redlines"],
      },
      {
        name: "Design System & Ops",
        description: "Enterprise design system, multi-product consistency, and embedded design support.",
        duration: "6+ month retainer",
        priceFromUsd: 7200,
        priceLabel: "From $7,200/mo",
        includes: ["Full design system (Figma + Storybook)", "Embedded senior product designer", "Sprint-level design support (2-week cadence)", "Design QA on every release", "Accessibility champion reviews", "Quarterly design ops workshops"],
      },
    ],
    successMetrics: [
      { label: "Task completion uplift", value: 38, suffix: "%" },
      { label: "Support ticket reduction", value: 27, suffix: "%" },
      { label: "Design-to-dev cycle time", value: 40, suffix: "% faster" },
    ],
    deliverables: [
      "User research summary & personas",
      "Wireframes & interactive prototypes",
      "UI kit & design system documentation",
      "Developer handoff package",
    ],
    technologies: ["Figma", "FigJam", "Maze", "Storybook", "Tailwind", "Radix UI"],
    feedback: {
      quote:
        "The redesign increased activation by 34%. Research sessions uncovered friction we had missed for years.",
      author: "Hannah Brooks",
      role: "Chief Product Officer",
      company: "InnovateX",
      rating: 5,
    },
    faqs: [
      {
        question: "Do you work alongside our in-house designers?",
        answer: "Yes—we embed as an extension of your team or lead specific product workstreams.",
      },
      {
        question: "Can you audit an existing product?",
        answer: "UX audits include heuristics, analytics review, and a prioritized improvement roadmap.",
      },
      {
        question: "How do you measure design success?",
        answer: "We tie designs to adoption, task success, conversion, and qualitative satisfaction metrics.",
      },
    ],
  },
  cloud: {
    tagline: "Secure, cost-efficient cloud foundations on AWS, Azure, and GCP.",
    overview: [
      "We architect cloud landing zones, migrate workloads, and optimize spend without sacrificing reliability or compliance.",
      "Serverless, containers, and hybrid patterns are selected based on your operational maturity and team skills.",
    ],
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Landing zone design", description: "Multi-account structure, IAM, and guardrails from day one.", icon: "Cloud" },
      { title: "Migration playbooks", description: "Phased moves with rollback plans and minimal downtime.", icon: "ArrowRightLeft" },
      { title: "FinOps discipline", description: "Tagging, rightsizing, and reserved capacity recommendations.", icon: "PiggyBank" },
      { title: "Resilience engineering", description: "Multi-AZ, backups, and DR tested with game days.", icon: "Server" },
    ],
    approach: defaultApproach,
    plans: [
      {
        name: "Cloud Assessment",
        description: "Infrastructure audit, cost baseline, security gaps, and migration roadmap.",
        duration: "2–4 weeks",
        priceFromUsd: 8500,
        includes: ["Infrastructure & cost baseline audit", "Well-Architected review", "Security & compliance gap analysis", "Migration roadmap", "FinOps quick wins (15–25% savings)", "Executive readout & business case"],
      },
      {
        name: "Migration Program",
        description: "Phased cloud migration with landing zone, IaC, and cutover for 10–40 workloads.",
        duration: "8–16 weeks",
        priceFromUsd: 42000,
        popular: true,
        includes: ["Multi-account landing zone (Terraform)", "IAM, networking & guardrails", "Migrate 10–40 workloads", "Database migration with rollback plan", "Monitoring & backup automation", "Runbooks & DR game day", "Team training & knowledge transfer"],
      },
      {
        name: "Cloud Platform Ops",
        description: "Managed cloud with FinOps, SRE, and compliance for high-scale estates.",
        duration: "12+ month retainer",
        priceFromUsd: 9500,
        priceLabel: "From $9,500/mo",
        includes: ["Dedicated cloud architect + SRE", "Monthly FinOps reviews", "24/7 monitoring & incident response", "Compliance evidence (SOC 2, ISO 27001)", "Multi-region DR & chaos testing", "Quarterly architecture reviews"],
      },
    ],
    successMetrics: [
      { label: "Infra cost reduction", value: 28, suffix: "%" },
      { label: "Migration success rate", value: 98, suffix: "%" },
      { label: "Uptime after migration", value: 99.95, suffix: "%" },
    ],
    deliverables: [
      "Cloud architecture & migration plan",
      "IaC templates (Terraform/CDK)",
      "Security & compliance mapping",
      "Runbooks & monitoring dashboards",
    ],
    technologies: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "CloudWatch"],
    feedback: {
      quote:
        "They migrated 40+ services to AWS with strong guardrails. Our cloud bill dropped 32% while reliability improved.",
      author: "Omar Hassan",
      role: "Director of Infrastructure",
      company: "CloudPeak",
      rating: 5,
    },
    faqs: [
      {
        question: "Which cloud providers do you support?",
        answer: "AWS, Azure, and GCP—with multi-cloud and hybrid strategies when required.",
      },
      {
        question: "How do you handle compliance (HIPAA, SOC 2)?",
        answer: "We map controls to cloud services, logging, encryption, and evidence collection workflows.",
      },
      {
        question: "Can you optimize an existing cloud estate?",
        answer: "FinOps assessments identify waste, architectural debt, and reliability improvements.",
      },
    ],
  },
  devops: {
    tagline: "Automated pipelines and observable infrastructure your teams can trust.",
    overview: [
      "We implement CI/CD, infrastructure as code, and SRE practices so releases are frequent, reversible, and measurable.",
      "Kubernetes, GitOps, and golden-path templates reduce toil and standardize how teams ship.",
    ],
    heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Pipeline automation", description: "Build, test, scan, and deploy with policy-as-code gates.", icon: "GitBranch" },
      { title: "IaC at scale", description: "Terraform modules and environment promotion workflows.", icon: "Boxes" },
      { title: "Observability", description: "Metrics, logs, traces, and SLO-based alerting.", icon: "Activity" },
      { title: "Incident readiness", description: "Runbooks, on-call rotations, and blameless postmortems.", icon: "Siren" },
    ],
    approach: defaultApproach,
    plans: [
      {
        name: "CI/CD Foundation",
        description: "Automated build, test, and deploy pipeline with security scanning.",
        duration: "2–4 weeks",
        priceFromUsd: 7200,
        includes: ["GitHub Actions / GitLab CI pipeline", "Automated unit & integration tests", "Container build & registry", "Staging + production deploy workflows", "SAST/dependency scanning", "Secrets management", "Pipeline documentation & training"],
      },
      {
        name: "Platform Engineering",
        description: "Kubernetes cluster, GitOps, observability, and golden-path templates.",
        duration: "6–10 weeks",
        priceFromUsd: 24000,
        popular: true,
        includes: ["EKS/AKS/GKE cluster (IaC)", "Argo CD or Flux GitOps", "Prometheus + Grafana observability", "Centralized logging (Loki/ELK)", "SLO definitions & alerting", "Environment promotion workflows", "Developer self-service templates"],
      },
      {
        name: "SRE Retainer",
        description: "Ongoing site reliability, incident management, and platform evolution.",
        duration: "6+ month retainer",
        priceFromUsd: 6800,
        priceLabel: "From $6,800/mo",
        includes: ["Dedicated SRE engineer", "24/7 on-call rotation (optional)", "Incident runbooks & postmortems", "Monthly reliability reviews", "Capacity planning & load testing", "Security patch & dependency updates"],
      },
    ],
    successMetrics: [
      { label: "Deploy frequency increase", value: 4, suffix: "x" },
      { label: "Mean time to recovery", value: 58, suffix: "% faster" },
      { label: "Change failure rate drop", value: 45, suffix: "%" },
    ],
    deliverables: [
      "CI/CD pipeline implementation",
      "Infrastructure as code repository",
      "Monitoring & SLO dashboards",
      "Security scanning in pipeline",
    ],
    technologies: ["GitHub Actions", "GitLab CI", "Terraform", "Kubernetes", "Prometheus", "Grafana"],
    feedback: {
      quote:
        "Deployments went from monthly to multiple times per day. Observability finally gives us confidence to move fast.",
      author: "Chris Alvarez",
      role: "Engineering Manager",
      company: "DataForge",
      rating: 5,
    },
    faqs: [
      {
        question: "Do you support on-prem and hybrid setups?",
        answer: "Yes—we design pipelines and clusters for hybrid environments with consistent tooling.",
      },
      {
        question: "Can you implement GitOps?",
        answer: "We deploy Argo CD or Flux with promotion flows and policy checks.",
      },
      {
        question: "How do you improve MTTR?",
        answer: "SLOs, tracing, runbooks, and game-day exercises reduce detection and recovery time.",
      },
    ],
  },
  ai: {
    tagline: "Practical AI features and automation with measurable business ROI.",
    overview: [
      "We integrate LLMs, predictive models, and intelligent workflows into your products—grounded in data governance and responsible AI practices.",
      "From copilots to document intelligence, we focus on production reliability, cost control, and human-in-the-loop safeguards.",
    ],
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Use-case discovery", description: "ROI models and feasibility before building models.", icon: "Lightbulb" },
      { title: "RAG & agents", description: "Grounded answers with enterprise knowledge bases.", icon: "Bot" },
      { title: "MLOps & LLMOps", description: "Evaluation harnesses, versioning, and safe rollouts.", icon: "Cpu" },
      { title: "Responsible AI", description: "Guardrails, PII handling, and audit-friendly logging.", icon: "Shield" },
    ],
    approach: defaultApproach,
    plans: [
      {
        name: "AI Feasibility Sprint",
        description: "Use-case discovery, data readiness, ROI model, and proof-of-concept.",
        duration: "3–5 weeks",
        priceFromUsd: 12000,
        includes: ["Use-case workshop & ROI modeling", "Data inventory & quality assessment", "LLM provider evaluation", "Working PoC for 1 workflow", "Evaluation harness & guardrails", "Responsible AI checklist", "Production roadmap & cost projection"],
      },
      {
        name: "Production AI Feature",
        description: "Ship a production RAG copilot, document intelligence, or automation workflow.",
        duration: "8–14 weeks",
        priceFromUsd: 38000,
        popular: true,
        includes: ["RAG pipeline with vector database", "Enterprise knowledge base ingestion", "Chat UI or API integration", "Human-in-the-loop review workflows", "Prompt versioning & A/B testing", "Cost controls & usage monitoring", "PII redaction & audit logging"],
      },
      {
        name: "AI Platform Program",
        description: "Multi-use-case AI platform with MLOps, governance, and private deployment.",
        duration: "16–32+ weeks",
        priceFromUsd: null,
        priceLabel: "Custom quote",
        includes: ["Private LLM deployment (VPC/on-prem)", "Multi-model routing & fallback", "Enterprise agent orchestration", "Fine-tuning on proprietary data", "Model governance & bias testing", "Dedicated AI engineering squad"],
      },
    ],
    successMetrics: [
      { label: "Process automation savings", value: 35, suffix: "%" },
      { label: "Support deflection", value: 42, suffix: "%" },
      { label: "Time-to-production", value: 8, suffix: " weeks avg." },
    ],
    deliverables: [
      "AI opportunity assessment",
      "Production integration (APIs/UI)",
      "Evaluation & monitoring suite",
      "Data governance guidelines",
    ],
    technologies: ["OpenAI", "Azure OpenAI", "Python", "LangChain", "Vector DBs", "Kubernetes"],
    feedback: {
      quote:
        "Their copilot cut document review time in half while keeping compliance reviewers in control. ROI was clear within 90 days.",
      author: "James Park",
      role: "Director of Operations",
      company: "DataForge",
      rating: 5,
    },
    faqs: [
      {
        question: "How do you prevent hallucinations?",
        answer: "RAG, constrained tools, evaluation sets, and human review for high-risk outputs.",
      },
      {
        question: "Can you use our private data safely?",
        answer: "We implement VPC deployments, encryption, redaction, and access controls aligned to your policies.",
      },
      {
        question: "Do you build custom models?",
        answer: "We fine-tune or train models when off-the-shelf LLMs are insufficient for domain accuracy.",
      },
    ],
  },
  transformation: {
    tagline: "Modernize operations, platforms, and culture with a clear transformation roadmap.",
    overview: [
      "Digital transformation is more than tools—we align process, people, and technology so change sticks.",
      "We partner with leadership on roadmaps, change management, and measurable KPIs across the program.",
    ],
    heroImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Executive alignment", description: "Workshops that connect strategy to executable initiatives.", icon: "Target" },
      { title: "Process automation", description: "RPA and workflow tools that remove manual bottlenecks.", icon: "Workflow" },
      { title: "Platform modernization", description: "Phased upgrades with risk-managed cutovers.", icon: "RefreshCw" },
      { title: "Change enablement", description: "Training, comms, and adoption metrics for teams.", icon: "Users" },
    ],
    approach: defaultApproach,
    plans: [
      {
        name: "Transformation Assessment",
        description: "Current-state analysis and prioritized initiative portfolio with business case.",
        duration: "3–4 weeks",
        priceFromUsd: 14500,
        includes: ["Stakeholder interviews (15–20)", "Capability & maturity mapping", "Initiative portfolio with ROI", "Business case & executive deck", "Risk register & dependencies"],
      },
      {
        name: "Program Delivery",
        description: "Multi-workstream execution with PMO governance and benefits tracking.",
        duration: "6–18 months",
        priceFromUsd: 85000,
        popular: true,
        includes: ["PMO cadence & steering support", "Vendor coordination & governance", "Benefits tracking dashboard", "Change management plan", "Monthly executive reporting", "Quarterly roadmap refresh"],
      },
      {
        name: "Continuous Improvement",
        description: "Ongoing optimization and new initiative intake on quarterly cadence.",
        duration: "Quarterly retainer",
        priceFromUsd: 5500,
        priceLabel: "From $5,500/quarter",
        includes: ["KPI & benefits reviews", "Roadmap refresh workshops", "Innovation backlog grooming", "Process automation recommendations", "Technology radar updates"],
      },
    ],
    successMetrics: [
      { label: "Process efficiency gain", value: 41, suffix: "%" },
      { label: "Program on-track delivery", value: 93, suffix: "%" },
      { label: "Employee adoption", value: 87, suffix: "%" },
    ],
    deliverables: [
      "Transformation roadmap & business case",
      "Operating model recommendations",
      "Change management plan",
      "Benefits realization dashboard",
    ],
    technologies: ["Power Platform", "ServiceNow", "SAP", "Salesforce", "Azure", "AWS"],
    feedback: {
      quote:
        "They helped us align 12 departments on one roadmap. We retired legacy processes and hit our efficiency targets ahead of plan.",
      author: "Sarah Chen",
      role: "CTO",
      company: "Nexus Labs",
      rating: 5,
    },
    faqs: [
      {
        question: "How is transformation different from a single project?",
        answer: "Programs coordinate multiple initiatives, governance, and change management with executive sponsorship.",
      },
      {
        question: "Do you work with existing SI partners?",
        answer: "We can lead, co-deliver, or provide architecture and PMO oversight across vendors.",
      },
      {
        question: "How do you measure success?",
        answer: "Defined KPIs—cost, cycle time, revenue, adoption—tracked in a benefits realization framework.",
      },
    ],
  },
  consulting: {
    tagline: "Strategic technology advisory from architects who have shipped at scale.",
    overview: [
      "Our consultants help you make confident decisions on architecture, vendors, security, and delivery models.",
      "Engagements range from targeted audits to retained advisory for leadership and engineering teams.",
    ],
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Technology audits", description: "Objective assessments with actionable remediation plans.", icon: "ClipboardCheck" },
      { title: "Architecture reviews", description: "Scalability, security, and cost perspectives from senior architects.", icon: "Network" },
      { title: "Vendor selection", description: "RFP support, scoring frameworks, and negotiation guidance.", icon: "Scale" },
      { title: "Governance frameworks", description: "Policies, RACI, and metrics for portfolio management.", icon: "Gavel" },
    ],
    approach: [
      { step: "01", title: "Assess", description: "Interviews, documentation review, and baseline metrics." },
      { step: "02", title: "Analyze", description: "Gap analysis, risk heatmaps, and option evaluation." },
      { step: "03", title: "Recommend", description: "Prioritized roadmap with effort, impact, and dependencies." },
      { step: "04", title: "Align", description: "Executive readouts and stakeholder buy-in workshops." },
      { step: "05", title: "Advise", description: "Ongoing office hours during implementation." },
    ],
    plans: [
      {
        name: "Focused Advisory",
        description: "Targeted review on a specific domain—architecture, security, or vendor selection.",
        duration: "2–4 weeks",
        priceFromUsd: 7500,
        includes: ["Documentation & codebase review", "Gap analysis & risk heatmap", "Prioritized recommendations", "Executive summary deck", "2-hour readout workshop"],
      },
      {
        name: "Strategic Retainer",
        description: "Monthly access to principal architects for ongoing guidance.",
        duration: "Ongoing",
        priceFromUsd: 4500,
        priceLabel: "From $4,500/mo",
        popular: true,
        includes: ["8 hours/month architecture office hours", "Vendor evaluation & RFP support", "Quarterly technology roadmap", "Ad-hoc security & scalability reviews", "Board-ready executive summaries"],
      },
      {
        name: "Transformation PMO",
        description: "Program oversight and vendor governance for multi-vendor initiatives.",
        duration: "Program-based",
        priceFromUsd: null,
        priceLabel: "Custom quote",
        includes: ["Steering committee support", "Cross-vendor risk tracking", "Benefits realization reporting", "Change management oversight", "Weekly status to executives"],
      },
    ],
    successMetrics: [
      { label: "Decision cycle reduction", value: 50, suffix: "%" },
      { label: "Risk issues mitigated pre-build", value: 78, suffix: "%" },
      { label: "Client NPS", value: 72, suffix: "" },
    ],
    deliverables: [
      "Assessment & gap analysis report",
      "Architecture & roadmap recommendations",
      "Vendor evaluation scorecards",
      "Executive presentation deck",
    ],
    technologies: ["TOGAF", "AWS Well-Architected", "Azure", "Kubernetes", "Security frameworks"],
    feedback: {
      quote:
        "Their architecture review saved us from a costly rebuild. Clear recommendations and pragmatic trade-off discussions.",
      author: "Michael Torres",
      role: "VP Engineering",
      company: "CloudPeak",
      rating: 5,
    },
    faqs: [
      {
        question: "Is consulting separate from delivery?",
        answer: "Yes—we can advise only, or stay engaged through implementation without vendor lock-in.",
      },
      {
        question: "Who leads consulting engagements?",
        answer: "Principal architects and strategists with 15+ years of enterprise delivery experience.",
      },
      {
        question: "Can you support board-level reporting?",
        answer: "We produce executive summaries, risk registers, and KPI dashboards suitable for leadership reviews.",
      },
    ],
  },
  staffing: {
    tagline: "Elite engineers and designers embedded in your team—on your tools and rituals.",
    overview: [
      "Staff augmentation that feels like hiring: rigorous vetting, culture fit, and engineers who ship from week one.",
      "Flexible engagement models—from single specialists to dedicated squads with delivery leadership.",
    ],
    heroImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80",
    excellence: [
      { title: "Senior talent only", description: "Engineers with proven enterprise delivery track records.", icon: "Award" },
      { title: "Rapid onboarding", description: "Playbooks to join your repos, ceremonies, and tools in days.", icon: "Rocket" },
      { title: "Flexible scale", description: "Ramp teams up or down with predictable notice periods.", icon: "TrendingUp" },
      { title: "Delivery oversight", description: "Optional tech leads and PMs to ensure outcomes—not just hours.", icon: "UserCheck" },
    ],
    approach: [
      { step: "01", title: "Scope roles", description: "Skills matrix, seniority, and team structure definition." },
      { step: "02", title: "Match talent", description: "Shortlists with technical interviews and culture screens." },
      { step: "03", title: "Onboard", description: "Access, environments, and sprint integration." },
      { step: "04", title: "Deliver", description: "Embedded execution with your backlog and metrics." },
      { step: "05", title: "Optimize", description: "Performance reviews and team composition adjustments." },
    ],
    plans: [
      {
        name: "Specialist Embed",
        description: "Individual senior engineer or designer on your team, your tools and process.",
        duration: "3+ months",
        priceFromUsd: 7200,
        priceLabel: "From $7,200/mo per specialist",
        includes: ["Senior specialist (5+ yrs exp)", "40 hrs/week dedicated", "Your repos, tools & ceremonies", "Bi-weekly performance check-in", "30-day replacement guarantee"],
      },
      {
        name: "Squad Model",
        description: "Cross-functional pod with tech lead, developers, and QA.",
        duration: "6+ months",
        priceFromUsd: 18500,
        priceLabel: "From $18,500/mo",
        popular: true,
        includes: ["3–5 specialists (dev + QA)", "Tech lead for architecture", "Sprint delivery on your backlog", "Weekly velocity & burndown reports", "Monthly stakeholder review"],
      },
      {
        name: "Team + Leadership",
        description: "Squad plus delivery manager and architecture oversight.",
        duration: "Flexible",
        priceFromUsd: null,
        priceLabel: "Custom quote",
        includes: ["Full squad (5–8 members)", "Delivery manager + tech lead", "Executive reporting cadence", "Architecture & code quality oversight", "Ramp up/down with 2-week notice"],
      },
    ],
    successMetrics: [
      { label: "Time-to-start", value: 10, suffix: " days avg." },
      { label: "Retention after 6 months", value: 94, suffix: "%" },
      { label: "Sprint velocity uplift", value: 28, suffix: "%" },
    ],
    deliverables: [
      "Role profiles & interview scorecards",
      "Onboarding checklist & access plan",
      "Embedded team members",
      "Monthly performance & delivery reports",
    ],
    technologies: ["Your stack", "React", "Node.js", "Python", "Cloud", "Mobile"],
    feedback: {
      quote:
        "FocusFolks engineers joined our sprint cycle in under two weeks and became top contributors. Scaling the squad was seamless.",
      author: "Emily Watson",
      role: "CEO",
      company: "InnovateX",
      rating: 5,
    },
    faqs: [
      {
        question: "How is this different from traditional staffing agencies?",
        answer: "We vet for enterprise delivery, provide delivery oversight options, and align to outcomes—not resume volume.",
      },
      {
        question: "Can specialists work in our time zone?",
        answer: "Yes—we staff for overlap with your core hours and communication norms.",
      },
      {
        question: "What if a team member is not the right fit?",
        answer: "We replace talent quickly with no disruption to sprint commitments per our engagement terms.",
      },
    ],
  },
};
