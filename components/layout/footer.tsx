import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerCompanyLinks, footerLegalLinks, socialLinks } from "@/constants/navigation";
import type { ContactInfo } from "@/lib/cms/contact";
import { services } from "@/constants/services";
import { siteConfig } from "@/lib/seo";
import { BrandLogo } from "@/components/shared/brand-logo";
import { FooterBackdrop } from "@/components/layout/footer-backdrop";
import { FooterLink } from "@/components/layout/footer-link";

function SocialIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#0A66C2">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.1 1 2.48 1C3.86 1 4.98 2.12 4.98 3.5ZM0.49 23H4.46V7.98H0.49V23ZM8 7.98H11.81V10.12H11.86C12.41 9.1 13.68 7.8 15.74 7.8C19.86 7.8 20.49 10.46 20.49 13.97V23H16.5V14.84C16.5 13.9 16.48 12.65 15.16 12.65C13.82 12.65 13.57 13.72 13.57 14.73V23H9.58V7.98H8V7.98Z" />
        </svg>
      );
    case "twitter":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#38A1F3">
          <path d="M18.9 1H22l-6.8 7.8L23 23h-6.2l-4.9-6.4L5.9 23H3l7.4-8.5L1 1h6.3l4.5 5.9L18.9 1Zm-1.1 20h1.7L6.1 2.9H4.3L17.8 21Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#e2e8f0">
          <path d="M12 1.6c-5.52 0-10 4.58-10 10.23 0 4.52 2.86 8.35 6.83 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.61-3.37-1.38-3.37-1.38-.46-1.19-1.12-1.5-1.12-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.33.1-2.77 0 0 .84-.27 2.75 1.04A9.24 9.24 0 0 1 12 7.6c.85 0 1.7.11 2.5.34 1.9-1.31 2.74-1.04 2.74-1.04.55 1.44.2 2.51.1 2.77.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.06.36.32.67.94.67 1.9 0 1.37-.01 2.48-.01 2.82 0 .26.18.59.69.48 3.97-1.35 6.83-5.18 6.83-9.7C22 6.18 17.52 1.6 12 1.6Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="#FF0000">
          <path d="M23 7.2s-.2-1.6-.8-2.3c-.8-.9-1.7-.9-2.1-1C17.1 3.7 12 3.7 12 3.7h0s-5.1 0-8.1.2c-.4.1-1.3.1-2.1 1C1.2 5.6 1 7.2 1 7.2S.8 9 .8 10.8v2.4c0 1.8.2 3.6.2 3.6s.2 1.6.8 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.8.3 7.8.3s5.1 0 8.1-.2c.4-.1 1.3-.1 2.1-1 .6-.7.8-2.3.8-2.3s.2-1.8.2-3.6v-2.4c0-1.8-.2-3.6-.2-3.6ZM10.3 14.6V8.9l5.2 2.85-5.2 2.85Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Footer({ contact }: { contact: ContactInfo }) {
  return (
    <footer className="footer-site relative overflow-hidden border-t border-black bg-black">
      <FooterBackdrop />

      <div className="footer-content-readable">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="flex flex-col items-center text-center lg:col-span-3">
              <Link href="/" className="inline-flex items-center justify-center">
                <BrandLogo variant="vertical" imageClassName="h-32 w-auto object-contain sm:h-36 lg:h-44" />
              </Link>
              <p className="footer-body mx-auto mt-4 max-w-xs text-sm leading-relaxed">
                {siteConfig.description}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={social.label}
                  >
                    <SocialIcon name={social.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="footer-column-title">Company</h4>
              <ul className="mt-4 space-y-3">
                {footerCompanyLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="footer-column-title">Services</h4>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {services.map((service) => (
                  <FooterLink key={service.id} href={service.href} label={service.title} />
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="footer-column-title">Contact</h4>
              <ul className="mt-4 space-y-4 text-sm">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="footer-link flex items-start gap-2"
                  >
                    <Mail className="footer-icon mt-0.5 h-4 w-4 shrink-0" />
                    <span className="break-all">{contact.email}</span>
                  </a>
                </li>
                {contact.offices.map((office) => (
                  <li key={office.city} className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {office.city}, {office.country}
                    </p>
                    <div className="footer-body flex items-start gap-2">
                      <MapPin className="footer-icon mt-0.5 h-4 w-4 shrink-0" />
                      <span className="font-bold text-white leading-relaxed">{office.address}</span>
                    </div>
                    <a href={office.phoneHref} className="footer-link flex items-center gap-2">
                      <Phone className="footer-icon h-4 w-4 shrink-0" />
                      <span className="font-bold text-white">{office.phone}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="footer-column-title">Legal</h4>
              <ul className="mt-4 space-y-3">
                {footerLegalLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-divider mt-12 border-t pt-12 text-center">
            <p className="footer-copyright text-sm">
              © {new Date().getFullYear()} - Focused Folks Solutions LLP Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
