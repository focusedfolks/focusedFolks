import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PageWrapper } from "@/components/layout/page-wrapper";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { organizationJsonLd, siteConfig, siteIcons } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "FocusFolks | Business & IT Services",
    template: "%s | FocusFolks",
  },
  description:
    "Enterprise-grade digital transformation, software development, and IT consulting. We help businesses innovate, scale, and succeed.",
  metadataBase: new URL(siteConfig.url),
  manifest: "/site.webmanifest",
  icons: siteIcons,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} site-loader-active h-full bg-black antialiased dark`}
      style={{ colorScheme: "dark", backgroundColor: "#000000" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black" style={{ backgroundColor: "#000000" }} suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider />
          <PageWrapper>{children}</PageWrapper>
          {/* Organization schema for SEO trust. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
