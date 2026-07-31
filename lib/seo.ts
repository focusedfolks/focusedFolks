import type { Metadata } from "next";
import { CONTACT_EMAIL, contactPhones, contactSummary } from "@/constants/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://focusfolks.com";

export const siteConfig = {
  name: "FocusFolks",
  tagline: "Business & IT Services",
  description:
    "Enterprise-grade digital transformation, software development, and IT consulting from Ahmedabad, India and Dubai, UAE. Custom software, web, mobile, cloud, DevOps, and AI integration.",
  url: siteUrl,
  logo: "/logo-v.png",
  favicon: "/favicon.ico",
  ogImage: "/logo-v.png",
  ogImageWidth: 1024,
  ogImageHeight: 1024,
  keywords: [
    "IT services",
    "software development company India",
    "web development Ahmedabad",
    "mobile app development Dubai",
    "digital transformation",
    "cloud migration AWS",
    "DevOps services",
    "AI integration",
    "enterprise consulting UAE",
    "custom software development Gujarat",
  ],
  contact: {
    email: CONTACT_EMAIL,
    phones: contactPhones,
    phone: contactPhones[0].display,
    address: contactSummary.addressLine,
  },
};

export const siteIcons: Metadata["icons"] = {
  icon: [
    { url: siteConfig.favicon },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
  ],
  apple: "/apple-touch-icon.png",
  shortcut: siteConfig.favicon,
};

type PageSeo = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
};

export function createMetadata({
  title,
  description,
  keywords = [],
  path = "",
}: PageSeo): Metadata {
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | ${siteConfig.tagline}`
      : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    manifest: "/site.webmanifest",
    icons: siteIcons,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    description: siteConfig.description,
    contactPoint: siteConfig.contact.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.display,
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: p.region,
    })),
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "236, Seventh Heaven",
        addressLocality: "Ahmedabad",
        postalCode: "380055",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "A-14, Goldensands 20, Burjuman",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    ],
    sameAs: [
      "https://linkedin.com/company/focusfolks",
      "https://twitter.com/focusfolks",
      "https://github.com/focusfolks",
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
