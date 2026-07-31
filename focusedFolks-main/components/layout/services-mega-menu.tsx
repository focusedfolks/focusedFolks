"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { megaMenuServiceOrder, services } from "@/constants/services";
import { DynamicIcon } from "@/components/shared/icon-map";
import { cn } from "@/lib/utils";

const TAG_COLORS = [
  "border-sky-300/90 bg-sky-100 text-sky-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
  "border-violet-300/90 bg-violet-100 text-violet-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
  "border-amber-300/90 bg-amber-100 text-amber-950 shadow-[0_1px_2px_rgba(15,23,42,0.12)]",
] as const;

export function serviceIconBg(id: string) {
  switch (id) {
    case "custom-software":
      return "from-blue-500 to-cyan-500";
    case "web-development":
      return "from-cyan-500 to-emerald-400";
    case "mobile":
      return "from-violet-500 to-fuchsia-500";
    case "design":
      return "from-amber-400 to-orange-500";
    case "cloud":
      return "from-sky-500 to-blue-600";
    case "devops":
      return "from-emerald-500 to-teal-500";
    case "ai":
      return "from-fuchsia-500 to-pink-500";
    case "transformation":
      return "from-indigo-500 to-blue-500";
    case "consulting":
      return "from-slate-600 to-slate-800";
    case "staffing":
      return "from-rose-500 to-orange-500";
    default:
      return "from-blue-500 to-cyan-500";
  }
}

type ServicesMegaMenuProps = {
  onClose: () => void;
};

const megaMenuServices = megaMenuServiceOrder
  .map((id) => services.find((s) => s.id === id))
  .filter((s): s is (typeof services)[number] => Boolean(s));

export function ServicesMegaMenu({ onClose }: ServicesMegaMenuProps) {
  return (
    <div className="mega-menu-shell h-full w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.95)]">
      <div className="flex h-full min-h-0 items-stretch">
        {/* Left hero — spans full panel height */}
        <aside className="mega-menu-hero relative flex w-[min(32vw,340px)] min-w-[240px] shrink-0 flex-col justify-between self-stretch overflow-hidden p-6 lg:p-8">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/15 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-blue-900/20 blur-3xl"
            aria-hidden
          />

          <div className="relative z-[1]">
            <div className="mega-menu-hero-icon-wrap flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-3xl border border-white/25 bg-white/15 shadow-[inset_0_2px_20px_rgba(255,255,255,0.32),0_12px_32px_rgba(0,0,0,0.16)] backdrop-blur-sm lg:h-[7.5rem] lg:w-[7.5rem]">
              <Sparkles className="h-14 w-14 text-white drop-shadow-md lg:h-16 lg:w-16" strokeWidth={1.5} />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-white/75">
              Capabilities
            </p>
            <h3 className="mt-2 text-2xl font-extrabold leading-tight text-white lg:text-3xl">Services</h3>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-white/85">
              10 practice areas — build, design, cloud, AI &amp; scale.
            </p>
          </div>

          <div className="relative z-[1] flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close services menu"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-700 bg-red-600 text-white shadow-[0_4px_14px_rgba(220,38,38,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 hover:border-white hover:bg-white hover:text-red-600 hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <X className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <Link
              href="/services"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-sm transition-all hover:bg-white/25 hover:shadow-md"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Decorative icon mosaic */}
          <div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.13]"
            aria-hidden
          >
            <div className="grid grid-cols-4 gap-3 p-6 lg:gap-4">
              {services.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg lg:h-12 lg:w-12",
                    serviceIconBg(s.id)
                  )}
                >
                  <DynamicIcon name={s.icon} className="h-5 w-5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* 3-column masonry — card height follows content */}
        <div className="mega-menu-cards-panel relative min-h-0 min-w-0 flex-1 overflow-hidden px-3 py-6 sm:px-4 sm:py-7 lg:px-5 lg:py-8">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <Image src="/4.png" alt="" fill sizes="(min-width: 1024px) 720px, 95vw" className="object-cover object-center" priority={false} />
            <div className="mega-menu-cards-overlay absolute inset-0" />
          </div>
          <div className="mega-services-masonry relative z-[1] h-full min-h-0 overflow-y-auto overscroll-contain">
            {megaMenuServices.map((s) => (
              <Link
                key={s.id}
                href={s.href}
                onClick={onClose}
                className="mega-service-card mega-service-card-glass group flex flex-col rounded-2xl p-3.5 lg:p-4"
              >
                <div className="flex items-start gap-2.5">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm lg:h-11 lg:w-11",
                      serviceIconBg(s.id)
                    )}
                  >
                    <DynamicIcon name={s.icon} className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="mega-service-card-title text-sm font-extrabold leading-snug lg:text-[0.9375rem]">
                        {s.title}
                      </span>
                      <ArrowRight className="mega-service-card-arrow mt-0.5 h-4 w-4 shrink-0 text-cyan-200/90 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mega-service-card-summary mt-2 text-[11px] leading-relaxed lg:text-xs lg:leading-relaxed">
                      {s.megaSummary}
                    </p>
                  </div>
                </div>
                {s.features && s.features.length > 0 && (
                  <ul className="mt-2.5 flex flex-wrap gap-1">
                    {s.features.map((f, i) => (
                      <li
                        key={f}
                        className={cn(
                          "rounded-md border px-2 py-0.5 text-[10px] font-semibold leading-tight lg:text-[11px]",
                          TAG_COLORS[i % TAG_COLORS.length]
                        )}
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
