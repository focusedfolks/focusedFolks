"use client";

import { motion } from "framer-motion";
import { teamMembers } from "@/constants/content";
import { SectionHeader } from "@/components/shared/section-header";
import { defaultTransition, fadeUp, servicesScrollViewport } from "@/lib/animations";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6C1.1 6 0 4.88 0 3.5C0 2.12 1.1 1 2.48 1C3.86 1 4.98 2.12 4.98 3.5ZM0.49 23H4.46V7.98H0.49V23ZM8 7.98H11.81V10.12H11.86C12.41 9.1 13.68 7.8 15.74 7.8C19.86 7.8 20.49 10.46 20.49 13.97V23H16.5V14.84C16.5 13.9 16.48 12.65 15.16 12.65C13.82 12.65 13.57 13.72 13.57 14.73V23H9.58V7.98H8V7.98Z" />
    </svg>
  );
}

export function AboutLeadership() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Team"
          title="Four people building FocusFolks"
          description="Founder-led and hands-on—design, development, delivery, and creative support from one compact team."
          align="left"
          servicesPage
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((m, idx) => (
            <motion.article
              key={m.id}
              initial="hidden"
              whileInView="visible"
              viewport={servicesScrollViewport}
              variants={fadeUp}
              transition={{ ...defaultTransition, duration: 0.45, delay: idx * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-white/12 bg-slate-950/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="about-team-photo relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.image}
                  alt={`${m.name} — ${m.role}`}
                  loading={idx < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3 text-base font-extrabold text-white">{m.name}</div>
              <div className="mt-0.5 text-sm font-semibold text-cyan-200">{m.role}</div>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">{m.bio}</p>
              <div className="mt-4">
                {m.linkedin ? (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-team-linkedin inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-[#0A66C2] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 hover:shadow-[0_4px_16px_rgba(10,102,194,0.2)]"
                    aria-label={`${m.name} on LinkedIn`}
                  >
                    <LinkedInIcon className="h-[18px] w-[18px]" />
                  </a>
                ) : (
                  <span
                    className="about-team-linkedin inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#0A66C2]/70"
                    aria-label={`${m.name} — LinkedIn profile coming soon`}
                    title="LinkedIn profile coming soon"
                  >
                    <LinkedInIcon className="h-[18px] w-[18px]" />
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
