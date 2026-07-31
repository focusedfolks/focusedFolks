"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Service, ServiceDetailContent } from "@/types";
import { DynamicIcon } from "@/components/shared/icon-map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { serviceHeroFixedAspectIds } from "@/constants/services";
import { cn } from "@/lib/utils";

type ServiceDetailHeroProps = {
  service: Service;
  detail: ServiceDetailContent;
};

export function ServiceDetailHero({ service, detail }: ServiceDetailHeroProps) {
  const heroUsesFixedAspect = serviceHeroFixedAspectIds.has(service.id);

  return (
    <section className="relative pt-24 pb-10 md:pb-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All services
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-white/12 bg-slate-950/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="grid lg:grid-cols-12 lg:items-stretch">
            <div
              className={cn(
                "service-hero-image-frame relative aspect-[3/2] w-full overflow-hidden bg-white lg:col-span-5",
                heroUsesFixedAspect ? "lg:self-start" : "lg:aspect-auto lg:min-h-full"
              )}
            >
              <Image
                src={detail.heroImage}
                alt={`${service.title} services by FocusFolks`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10 lg:col-span-7">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-blue-500/30 to-cyan-500/15">
                  <DynamicIcon name={service.icon} className="h-7 w-7 text-cyan-200" />
                </div>
                <div>
                  <Badge variant="accent" className="mb-3 border-white/15 bg-white/10">
                    Service
                  </Badge>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {service.title}
                  </h1>
                  <p className="mt-3 text-base font-medium text-cyan-100/95 sm:text-lg">{detail.tagline}</p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-slate-200 sm:text-base">{service.description}</p>

              {service.features && service.features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-blue-500/20 hover:scale-[1.02]"
                >
                  <Link href="/contact">
                    Book Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
