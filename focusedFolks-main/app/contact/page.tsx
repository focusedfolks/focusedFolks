import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { SectionHeader } from "@/components/shared/section-header";
import { ContactForm } from "@/sections/contact/contact-form";
import { OfficeMaps } from "@/sections/contact/office-maps";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";
import { CONTACT_EMAIL, contactPhones, contactFaqs } from "@/constants/contact";
import { FaqSection } from "@/components/shared/faq-section";
import { ServicesCtaSection } from "@/sections/services/services-cta-section";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Contact Us",
    description:
      "Schedule a consultation with FocusFolks. Reach our Ahmedabad and Dubai offices or send a project brief—we respond within one business day.",
    keywords: [
      "contact IT services",
      "book consultation",
      "enterprise consulting",
      "software development consulting",
      "Ahmedabad",
      "Dubai",
    ],
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <div className="relative w-full max-w-full overflow-x-clip overflow-y-visible">
        <section className="pt-24 pb-10 md:pb-14">
          <div className="container relative mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Contact"
              title="Let’s plan your next enterprise delivery"
              description="Share your goals and timeline. We’ll respond with a premium, scoped plan tailored to your business outcomes."
              align="left"
            />

            <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <ScrollStackCard stagger={0} className="rounded-3xl p-1">
                  <ContactForm />
                </ScrollStackCard>
              </div>

              <div className="lg:col-span-5">
                <ScrollStackCard stagger={4} className="rounded-3xl p-6">
                  <h3 className="text-xl font-extrabold text-white">Contact methods</h3>

                  <div className="mt-6 space-y-3">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10"
                    >
                      <Mail className="h-5 w-5 shrink-0 text-cyan-200" />
                      <span className="text-sm font-bold text-white">{CONTACT_EMAIL}</span>
                    </a>

                    {contactPhones.map((phone) => (
                      <a
                        key={phone.region}
                        href={phone.href}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 shrink-0 text-cyan-200" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            {phone.region}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-white">{phone.display}</span>
                      </a>
                    ))}
                  </div>
                </ScrollStackCard>
              </div>
            </div>

            <OfficeMaps />
          </div>
        </section>

        <FaqSection
          id="faq"
          stackStagger={12}
          items={contactFaqs}
          badge="Contact FAQ"
          title="Questions about reaching us"
          description="How to contact FocusFolks, discuss ideas, and what to expect after you get in touch."
        />

        <ServicesCtaSection />
      </div>
  );
}
