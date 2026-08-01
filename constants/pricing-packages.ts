// constants/pricing-packages.ts

export type PricingAmount =
  | number
  | "Contact"
  | { min: number; max: number; unit?: "month" | "hour" };

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  priceINR: PricingAmount;
  scope: string;
  delivery: string;
  description: string;
  features: string[];
}

export interface PricingAddonItem {
  id: string;
  name: string;
  priceINR: { min: number; max: number };
}

export interface ServiceCategoryPackage {
  id: string;
  categoryName: string;
  tagline: string;
  plans: PricingPlan[];
  /** Optional lightweight add-on strip (e.g. API Integrations). */
  addons?: PricingAddonItem[];
  addonsTitle?: string;
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
        priceINR: { min: 10000, max: 12000 },
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
        priceINR: { min: 17500, max: 20000 },
        scope: "Home, About, Services, Contact",
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
        priceINR: { min: 40000, max: 45000 },
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
        name: "Admin Panel",
        badge: "Starter",
        priceINR: { min: 32500, max: 35000 },
        scope: "Authentication + Dashboard",
        delivery: "10-15 Days",
        description:
          "A secure, custom-built admin panel to manage your business operations from one dashboard.",
        features: [
          "Role-Based Authentication & Access Control",
          "Custom Dashboard with Real-Time Data",
          "CRUD Operations for All Modules",
          "Responsive Admin UI",
          "30 Days Post-Launch Support",
        ],
      },
      {
        id: "sw-crm-system",
        name: "CRM System",
        popular: true,
        badge: "Best Value",
        priceINR: { min: 90000, max: 100000 },
        scope: "Lead & Customer Management",
        delivery: "25-35 Days",
        description: "A dedicated CRM to track leads, manage customers, and close deals faster.",
        features: [
          "Lead Capture & Pipeline Tracking",
          "Customer Interaction History",
          "Automated Follow-Up Reminders",
          "Custom Reports & Analytics",
          "Team Access with Role Permissions",
        ],
      },
      {
        id: "sw-erp-enterprise",
        name: "ERP System",
        badge: "Enterprise",
        priceINR: { min: 225000, max: 250000 },
        scope: "Enterprise Modules",
        delivery: "45-60 Days",
        description:
          "A full enterprise resource planning system built around how your business actually runs.",
        features: [
          "Custom Modules (Finance, HR, Inventory & More)",
          "Centralized Data Across Departments",
          "Role-Based Access & Audit Trails",
          "Scalable Architecture for Growth",
          "Dedicated Onboarding & Training",
        ],
      },
    ],
    addonsTitle: "Add-on API Integrations",
    addons: [
      {
        id: "api-payment",
        name: "Payment Gateway (Razorpay/Stripe/etc.)",
        priceINR: { min: 12500, max: 15000 },
      },
      {
        id: "api-sms",
        name: "SMS API (OTP & Messaging)",
        priceINR: { min: 6500, max: 8000 },
      },
      {
        id: "api-whatsapp",
        name: "WhatsApp Business API",
        priceINR: { min: 16000, max: 17000 },
      },
      {
        id: "api-shipping",
        name: "Shipping API",
        priceINR: { min: 19500, max: 24000 },
      },
      {
        id: "api-crm",
        name: "CRM API",
        priceINR: { min: 25000, max: 30000 },
      },
      {
        id: "api-third-party",
        name: "Third-Party API (custom)",
        priceINR: { min: 32500, max: 35000 },
      },
    ],
  },

  // 3. MOBILE & E-COMMERCE
  {
    id: "mobile-ecommerce",
    categoryName: "Mobile & E-Commerce",
    tagline: "High-converting online stores and scalable mobile applications.",
    plans: [
      {
        id: "ecom-shopify",
        name: "Shopify Store Setup",
        badge: "Turnkey",
        priceINR: { min: 37500, max: 40000 },
        scope: "Theme + Products",
        delivery: "7-10 Days",
        description: "A ready-to-sell Shopify store, set up and configured for your products.",
        features: [
          "Premium Theme Setup & Customization",
          "Product Upload & Catalog Setup",
          "Payment Gateway Integration",
          "Mobile-Optimized Checkout",
          "Basic SEO Configuration",
        ],
      },
      {
        id: "ecom-woocommerce-adv",
        name: "WooCommerce (100-500 Products)",
        popular: true,
        badge: "Recommended",
        priceINR: { min: 69000, max: 80000 },
        scope: "Advanced Store",
        delivery: "15-20 Days",
        description:
          "A full-featured WooCommerce store built to handle a growing product catalog.",
        features: [
          "Bulk Product Upload (100-500 SKUs)",
          "Advanced Filtering & Search",
          "Multiple Payment & Shipping Options",
          "Inventory & Order Management",
          "Speed-Optimized for Scale",
        ],
      },
      {
        id: "ecom-multivendor",
        name: "Multi-Vendor Ecommerce",
        badge: "Scale",
        priceINR: { min: 160000, max: 180000 },
        scope: "Complete Solution",
        delivery: "30-45 Days",
        description:
          "A complete multi-vendor marketplace platform for multiple sellers under one roof.",
        features: [
          "Vendor Registration & Dashboards",
          "Commission & Payout Management",
          "Centralized Order & Inventory Control",
          "Multi-Vendor Product Listings",
          "Admin Panel for Full Marketplace Control",
        ],
      },
    ],
  },

  // 4. UI/UX DESIGN SERVICES â€” untouched
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

  // 5. CLOUD â€” untouched
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

  // 6. DEVOPS â€” untouched
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

  // 7. AI DEVELOPMENT & SOLUTIONS
  {
    id: "ai-integration",
    categoryName: "AI Development & Solutions",
    tagline: "Supercharge your business with OpenAI, Gemini, and custom AI chatbots.",
    plans: [
      {
        id: "ai-api-integration",
        name: "OpenAI / Gemini Integration",
        badge: "Starter",
        priceINR: { min: 22500, max: 25000 },
        scope: "API Integration",
        delivery: "3-5 Days",
        description:
          "Add AI capabilities to your existing product with a clean OpenAI or Gemini API integration.",
        features: [
          "API Setup & Authentication",
          "Custom Prompt Engineering",
          "Response Handling & Error Fallbacks",
          "Usage & Cost Monitoring Setup",
          "Documentation for Your Team",
        ],
      },
      {
        id: "ai-custom-chatbot",
        name: "AI Chatbot",
        popular: true,
        badge: "Best Seller",
        priceINR: { min: 57500, max: 70000 },
        scope: "Custom Chatbot",
        delivery: "10-15 Days",
        description:
          "A custom AI chatbot trained on your business, ready to handle customer queries 24/7.",
        features: [
          "Trained on Your Business Data",
          "Website & WhatsApp Deployment",
          "Custom Conversation Flows",
          "Lead Capture Within Chat",
          "Analytics Dashboard",
        ],
      },
      {
        id: "ai-voice-assistant",
        name: "AI Voice Assistant",
        badge: "Advanced",
        priceINR: { min: 165000, max: 180000 },
        scope: "Voice AI",
        delivery: "30-45 Days",
        description:
          "A voice-enabled AI assistant for calls, support, or in-product voice interaction.",
        features: [
          "Natural Language Voice Processing",
          "Custom Voice & Persona",
          "Call Handling / IVR Integration",
          "Real-Time Response Generation",
          "Ongoing Model Fine-Tuning",
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
        id: "staff-junior-dev",
        name: "Junior Developer (Dedicated)",
        badge: "Monthly",
        priceINR: { min: 90000, max: 100000, unit: "month" },
        scope: "Full-Time Dedicated Resource",
        delivery: "â€”",
        description:
          "A dedicated junior developer working exclusively on your project, full-time.",
        features: [
          "Full-Time Dedicated Resource",
          "Direct Communication Access",
          "Weekly Progress Reports",
          "No Recruitment Overhead",
          "Flexible Monthly Contract",
        ],
      },
      {
        id: "staff-mid-dev",
        name: "Mid-Level Developer (Dedicated)",
        popular: true,
        badge: "Most Demanded",
        priceINR: { min: 140000, max: 150000, unit: "month" },
        scope: "Full-Time Dedicated Resource",
        delivery: "â€”",
        description:
          "An experienced mid-level developer embedded in your team, full-time.",
        features: [
          "3-5 Years of Hands-On Experience",
          "Full-Time Dedicated Resource",
          "Direct Communication Access",
          "Sprint-Based Delivery",
          "Flexible Monthly Contract",
        ],
      },
      {
        id: "staff-senior-dev",
        name: "Senior Full Stack Developer (Dedicated)",
        badge: "Senior",
        priceINR: { min: 240000, max: 260000, unit: "month" },
        scope: "Full-Time Dedicated Resource",
        delivery: "â€”",
        description:
          "A senior full-stack developer to lead technical execution on your project.",
        features: [
          "5+ Years of Full-Stack Experience",
          "Architecture & Technical Decision-Making",
          "Full-Time Dedicated Resource",
          "Direct Communication Access",
          "Flexible Monthly Contract",
        ],
      },
    ],
  },

  // 9. IT CONSULTING â€” untouched
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

  // 10. DIGITAL TRANSFORMATION (Digital Marketing services)
  {
    id: "digital-transformation",
    categoryName: "Digital Transformation",
    tagline: "Complete overhaul of offline business workflows into digital platforms.",
    plans: [
      {
        id: "dt-social-media",
        name: "Social Media Management",
        badge: "Growth",
        priceINR: { min: 10000, max: 12000, unit: "month" },
        scope: "12 Posts + 12 Stories + Caption + Design",
        delivery: "Monthly",
        description:
          "Consistent, on-brand social media management so your presence never goes quiet.",
        features: [
          "12 Posts + 12 Stories Monthly",
          "Custom Graphic Design",
          "Caption Writing & Hashtag Research",
          "Content Calendar Planning",
          "Monthly Performance Summary",
        ],
      },
      {
        id: "dt-advanced-seo",
        name: "Advanced SEO",
        popular: true,
        badge: "Recommended",
        priceINR: { min: 20000, max: 25000, unit: "month" },
        scope: "20 Keywords + Technical SEO + Link Building",
        delivery: "Monthly",
        description:
          "Technical and on-page SEO to move your rankings and organic traffic upward.",
        features: [
          "Up to 20 Target Keywords",
          "Technical SEO Audit & Fixes",
          "On-Page Optimization",
          "Link Building Campaign",
          "Monthly Ranking Reports",
        ],
      },
      {
        id: "dt-ads-mgmt",
        name: "Monthly Ads Management (â‚¹50Kâ€“â‚¹2L Spend)",
        badge: "Performance",
        priceINR: { min: 20000, max: 22000, unit: "month" },
        scope: "Advanced Optimization + A/B Testing",
        delivery: "Monthly",
        description:
          "Hands-on management of your Google & Meta ad campaigns to maximize ROI.",
        features: [
          "Campaign Setup & Optimization",
          "A/B Testing on Creatives & Copy",
          "Budget & Bid Management",
          "Weekly Performance Reports",
          "Google + Meta Ads Coverage",
        ],
      },
    ],
  },
];
