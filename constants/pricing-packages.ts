// constants/pricing-packages.ts

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceINR: number | "Contact";
  scope: string;
  delivery: string;
  description: string;
  features: string[];
}

export interface ServiceCategoryPackage {
  id: string;
  categoryName: string;
  tagline: string;
  plans: PricingPlan[];
}

export const PRICING_PACKAGES: ServiceCategoryPackage[] = [
  // 1. WEBSITE DEVELOPMENT
  {
    id: "website-development",
    categoryName: "Website Development",
    tagline: "High-performance, conversion-focused websites tailored for your business.",
    plans: [
      {
        id: "web-landing",
        name: "Landing Page",
        badge: "Essential",
        priceINR: 10000,
        scope: "1 Responsive Page",
        delivery: "2-3 Days",
        description: "Perfect for single product launches, lead capture, and quick promos.",
        features: [
          "1 High-Converting Landing Page",
          "Mobile & Tablet Responsive",
          "Contact Form / WhatsApp Integration",
          "Basic On-Page SEO Setup",
          "Fast Loading Speed Optimization",
        ],
      },
      {
        id: "web-static-5",
        name: "Static Website (5 Pages)",
        popular: true,
        badge: "Most Popular",
        priceINR: 17500,
        scope: "Home, About, Services, Portfolio, Contact",
        delivery: "5-7 Days",
        description: "Ideal for small businesses and growing brands looking for a professional footprint.",
        features: [
          "Up to 5 Custom-Designed Pages",
          "Clean & Modern UI Design",
          "Lead Inquiry Form",
          "Google Maps & Social Media Linkage",
          "Managed Cloud Hosting Deployment",
        ],
      },
      {
        id: "web-corporate",
        name: "Corporate CMS Website",
        badge: "Enterprise",
        priceINR: 40000,
        scope: "10-20 Pages + CMS Admin",
        delivery: "10-15 Days",
        description: "Full corporate portal with custom content management and scalable architecture.",
        features: [
          "10 to 20 Dynamic Pages",
          "Easy-to-use CMS Admin Dashboard",
          "Advanced SEO & Analytics Setup",
          "Blog & News Management",
          "1 Year Technical Support",
        ],
      },
    ],
  },

  // 2. CUSTOM SOFTWARE DEVELOPMENT
  {
    id: "custom-software",
    categoryName: "Custom Software Development",
    tagline: "Bespoke internal systems, portals, and operational software.",
    plans: [
      {
        id: "sw-admin-panel",
        name: "Admin Panel / Dashboard",
        badge: "Starter",
        priceINR: 32500,
        scope: "Authentication + Interactive Dashboard",
        delivery: "10-15 Days",
        description: "Centralized control center for monitoring workflows and user permissions.",
        features: [
          "Role-Based Access Control (RBAC)",
          "Data Analytics Cards & Charts",
          "CRUD Operations Management",
          "REST API Integration",
          "Responsive Dark/Light Mode UI",
        ],
      },
      {
        id: "sw-crm-system",
        name: "CRM System",
        popular: true,
        badge: "Best Value",
        priceINR: 90000,
        scope: "Lead & Customer Management Suite",
        delivery: "25-35 Days",
        description: "Streamline sales pipelines, client communication, and team management.",
        features: [
          "Pipeline & Lead Tracking",
          "Client Portal & Interaction Log",
          "Automated Email & WhatsApp Notifications",
          "Custom Reports & Analytics",
          "Third-Party Tool Integrations",
        ],
      },
      {
        id: "sw-erp-enterprise",
        name: "Full ERP System",
        badge: "Enterprise",
        priceINR: 225000,
        scope: "Multi-Module Enterprise System",
        delivery: "45-60 Days",
        description: "End-to-end organizational software uniting inventory, HR, accounting & operations.",
        features: [
          "Multi-Department Modules",
          "Custom Workflows & Approvals",
          "Invoicing & Financial Tracking",
          "Role Security & Audit Logs",
          "Dedicated Deployment & SLA",
        ],
      },
    ],
  },

  // 3. MOBILE & E-COMMERCE APPS
  {
    id: "mobile-ecommerce",
    categoryName: "Mobile & E-Commerce",
    tagline: "High-converting online stores and scalable mobile applications.",
    plans: [
      {
        id: "ecom-shopify",
        name: "Shopify Store Setup",
        badge: "Turnkey",
        priceINR: 37500,
        scope: "Theme + Product Upload",
        delivery: "7-10 Days",
        description: "Get selling fast with an optimized Shopify store configuration.",
        features: [
          "Theme Customization & Setup",
          "Up to 30 Product Uploads",
          "Payment Gateway & Shipping Setup",
          "Mobile-Optimized Cart & Checkout",
          "Basic Staff Training",
        ],
      },
      {
        id: "ecom-woocommerce-adv",
        name: "Advanced E-Commerce Store",
        popular: true,
        badge: "Recommended",
        priceINR: 69999,
        scope: "WooCommerce (100-500 Products)",
        delivery: "15-20 Days",
        description: "Scalable custom online store with zero recurring platform fees.",
        features: [
          "Up to 500 Product Catalog Support",
          "Custom Category & Filter Options",
          "Coupon & Discount Engine",
          "Automated Inventory Management",
          "Payment Gateway Integration",
        ],
      },
      {
        id: "ecom-multivendor",
        name: "Multi-Vendor Marketplace",
        badge: "Scale",
        priceINR: 160000,
        scope: "Complete Multi-Vendor Solution",
        delivery: "30-45 Days",
        description: "Amazon/Flipkart-style marketplace allowing third-party sellers.",
        features: [
          "Separate Vendor Admin Dashboards",
          "Commission & Payout Management",
          "Vendor Storefront Customization",
          "Order & Logistics Distribution",
          "Advanced Analytics & Admin Control",
        ],
      },
    ],
  },

  // 4. UI/UX DESIGN SERVICES
  {
    id: "uiux-design",
    categoryName: "UI/UX Design Services",
    tagline: "User-centric design systems, clickable prototypes, and brand identity.",
    plans: [
      {
        id: "uiux-hourly",
        name: "Design On-Demand",
        badge: "Flexible",
        priceINR: 2000,
        scope: "Hourly UI/UX Designer Access",
        delivery: "On-Demand",
        description: "Fast design iterations, bug fixes, or new component designs.",
        features: [
          "Figma Design Source Files",
          "Component Library Usage",
          "Direct Collaboration with Designers",
          "Wireframing & Prototyping",
        ],
      },
      {
        id: "uiux-monthly",
        name: "Dedicated UI/UX Designer",
        popular: true,
        badge: "Best Value",
        priceINR: 135000,
        scope: "Full-Time Dedicated Resource",
        delivery: "Monthly Retainer",
        description: "Full-time designer committed entirely to your product design roadmap.",
        features: [
          "160 Hours / Month Dedicated",
          "Design System & Style Guide",
          "High-Fidelity Interactive Prototypes",
          "Developer-Handoff Ready Assets",
          "Daily Standups & Communication",
        ],
      },
    ],
  },

  // 5. CLOUD SOLUTIONS & INFRASTRUCTURE
  {
    id: "cloud-infrastructure",
    categoryName: "Cloud & Infrastructure",
    tagline: "Reliable web hosting, domain setups, and cloud deployments.",
    plans: [
      {
        id: "cloud-starter",
        name: "Starter Shared Hosting",
        badge: "Basic",
        priceINR: 3500,
        scope: "Blogs, Portfolios, Small Sites",
        delivery: "1 Day Setup",
        description: "Cost-effective, reliable hosting for low to moderate traffic sites.",
        features: [
          "Free SSL Certificate",
          "Unmetered Bandwidth",
          "Daily Automated Backups",
          "99.9% Uptime Guarantee",
        ],
      },
      {
        id: "cloud-managed-wp",
        name: "Managed Cloud Hosting",
        popular: true,
        badge: "Popular",
        priceINR: 6000,
        scope: "Growing Business & E-Commerce",
        delivery: "1 Day Setup",
        description: "High-speed cloud server with caching and enhanced security.",
        features: [
          "High-Performance Cloud Compute",
          "Built-in Server Caching Engine",
          "Advanced Malware & Firewall Protection",
          "Dedicated Staging Environment",
        ],
      },
      {
        id: "cloud-enterprise",
        name: "E-Commerce Cloud Cluster",
        badge: "Enterprise",
        priceINR: 12000,
        scope: "High Traffic & WooCommerce Stores",
        delivery: "2 Days Setup",
        description: "Auto-scaling infrastructure for high volume traffic spikes.",
        features: [
          "Dedicated Server Instance",
          "Load Balancer Ready",
          "24/7 Server Monitoring",
          "Priority Technical Support",
        ],
      },
    ],
  },

  // 6. DEVOPS & DEPLOYMENT
  {
    id: "devops-deployment",
    categoryName: "DevOps & Deployment",
    tagline: "CI/CD pipelines, containerization, and production deployments.",
    plans: [
      {
        id: "devops-cicd",
        name: "CI/CD Pipeline Setup",
        badge: "Automation",
        priceINR: 25000,
        scope: "Automated Deployments",
        delivery: "3-5 Days",
        description: "Automate code testing and production deployments seamlessly.",
        features: [
          "GitHub Actions / GitLab CI Setup",
          "Automated Testing Pipeline",
          "Zero-Downtime Deployments",
          "Environment Secret Management",
        ],
      },
      {
        id: "devops-docker",
        name: "Docker & Cloud Setup",
        popular: true,
        badge: "Recommended",
        priceINR: 32500,
        scope: "AWS / DigitalOcean / Vercel Setup",
        delivery: "5-7 Days",
        description: "Containerize applications for fast, identical deployments across servers.",
        features: [
          "Dockerization of App & DB",
          "Nginx Reverse Proxy Configuration",
          "SSL & Domain DNS Linking",
          "Server Health Alerts",
        ],
      },
    ],
  },

  // 7. AI INTEGRATION
  {
    id: "ai-integration",
    categoryName: "AI Development & Solutions",
    tagline: "Supercharge your business with OpenAI, Gemini, and custom AI chatbots.",
    plans: [
      {
        id: "ai-api-integration",
        name: "OpenAI / Gemini API Setup",
        badge: "Starter",
        priceINR: 22500,
        scope: "API Integration to Existing App",
        delivery: "3-5 Days",
        description: "Embed LLM capabilities into your current software or website.",
        features: [
          "OpenAI / Gemini API Connection",
          "Prompt Engineering Setup",
          "Content Generation / Summarization",
          "Token Usage Rate Limiting",
        ],
      },
      {
        id: "ai-custom-chatbot",
        name: "Custom AI Chatbot",
        popular: true,
        badge: "Best Seller",
        priceINR: 57500,
        scope: "Website & App Intelligent Chatbot",
        delivery: "10-15 Days",
        description: "Interactive chatbot trained on custom business rules and lead funnels.",
        features: [
          "Custom Conversational Flows",
          "Lead Capture & CRM Handoff",
          "Multi-Language Support",
          "Web Widget & Mobile Responsive",
        ],
      },
      {
        id: "ai-rag-knowledge",
        name: "RAG AI Knowledge Base",
        badge: "Advanced",
        priceINR: 105000,
        scope: "Trained on Private Business Data",
        delivery: "20-30 Days",
        description: "Train an AI engine on your company PDF documents, manuals, and databases.",
        features: [
          "Vector Database (Pinecone/Qdrant) Setup",
          "Private PDF / Document Embeddings",
          "Hallucination-Free Fact-Based Responses",
          "Admin Portal to Update Knowledge Base",
        ],
      },
    ],
  },

  // 8. STAFF AUGMENTATION
  {
    id: "staff-augmentation",
    categoryName: "Staff Augmentation",
    tagline: "Hire pre-vetted, full-time or hourly software engineers.",
    plans: [
      {
        id: "staff-mid-dev",
        name: "Mid-Level Developer",
        badge: "Hourly or Monthly",
        priceINR: 140000,
        scope: "160 Hours / Month",
        delivery: "Immediate Onboarding",
        description: "Experienced mid-tier developer for ongoing product feature velocity.",
        features: [
          "React / Next.js / Node.js Expertise",
          "Full 40 Hours/Week Commitment",
          "Direct Slack / Teams Integration",
          "Daily Progress Reporting",
        ],
      },
      {
        id: "staff-senior-dev",
        name: "Senior Full Stack Dev",
        popular: true,
        badge: "Most Demanded",
        priceINR: 240000,
        scope: "160 Hours / Month",
        delivery: "Immediate Onboarding",
        description: "Lead-level developer equipped to build complex architectures independently.",
        features: [
          "Full Stack Architecture Expertise",
          "Code Reviews & System Security",
          "Database Optimization & APIs",
          "Daily Standups & Direct Management",
        ],
      },
      {
        id: "staff-ai-engineer",
        name: "Dedicated AI Engineer",
        badge: "Specialized",
        priceINR: 297500,
        scope: "160 Hours / Month",
        delivery: "3-5 Days Onboarding",
        description: "Specialized AI/ML developer focused on LLMs, Fine-tuning & RAG systems.",
        features: [
          "Python, PyTorch, LangChain & LlamaIndex",
          "Vector DB & Model Deployment",
          "Private LLM Optimization",
          "Dedicated Full-Time Resource",
        ],
      },
    ],
  },

  // 9. IT CONSULTING
  {
    id: "it-consulting",
    categoryName: "IT Consulting",
    tagline: "Strategic technical guidance, architecture design, and code audits.",
    plans: [
      {
        id: "consult-hourly",
        name: "Advisory Session",
        badge: "On-Demand",
        priceINR: 2999,
        scope: "1 Hour Technical Advisory",
        delivery: "Same Day / Next Day",
        description: "1-on-1 consultation with a Senior Architect to solve technical bottlenecks.",
        features: [
          "Architecture & Tech Stack Review",
          "Scalability & Cost Optimization",
          "Database & Security Recommendations",
          "Post-Call Summary & Action Plan",
        ],
      },
      {
        id: "consult-retainer",
        name: "Fractional CTO / Tech Lead",
        popular: true,
        badge: "Strategic",
        priceINR: 150000,
        scope: "Monthly Retainer",
        delivery: "Ongoing Support",
        description: "Executive technical leadership without the cost of a full-time CTO.",
        features: [
          "Technical Roadmap Planning",
          "Vendor & Team Oversight",
          "System Security & Code Quality Audits",
          "Weekly Technical Strategy Syncs",
        ],
      },
    ],
  },

  // 10. DIGITAL TRANSFORMATION
  {
    id: "digital-transformation",
    categoryName: "Digital Transformation",
    tagline: "Complete overhaul of offline business workflows into digital platforms.",
    plans: [
      {
        id: "dt-starter",
        name: "Digitization Package",
        badge: "Growth",
        priceINR: 90000,
        scope: "Web Portal + Custom Dashboard",
        delivery: "20-25 Days",
        description: "Digitize manual pen-and-paper operations into a modern cloud app.",
        features: [
          "Custom Web Portal for Clients",
          "Internal Staff Admin Panel",
          "Digital Document & Record Storage",
          "Automated WhatsApp / Email Alerts",
        ],
      },
      {
        id: "dt-enterprise",
        name: "Complete Ecosystem Overhaul",
        popular: true,
        badge: "Transformative",
        priceINR: 350000,
        scope: "Custom ERP + Web App + AI Workflow",
        delivery: "60-90 Days",
        description: "Comprehensive end-to-end automation of enterprise operations.",
        features: [
          "Custom Multi-Platform System (Web & Mobile)",
          "Legacy Data Migration",
          "Automated AI Workflows & Reporting",
          "Staff Training & 6 Months Support SLA",
        ],
      },
    ],
  },
];
