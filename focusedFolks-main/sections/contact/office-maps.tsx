import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { officeLocations, googleMapsEmbedUrl } from "@/constants/contact";
import { ScrollStackCard } from "@/components/shared/scroll-stack-card";

export function OfficeMaps() {
  return (
    <div className="mt-10">
      <div>
        <h3 className="text-xl font-extrabold text-white">Our offices</h3>
        <p className="mt-2 text-sm text-slate-300">
          Ahmedabad and Dubai — same delivery standards, local presence for your time zone.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {officeLocations.map((office, idx) => (
          <ScrollStackCard
            key={office.city}
            stagger={8 + idx * 6}
            className="rounded-3xl"
          >
            <div className="overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1">
              <div className="border-b border-white/10 p-5">
                <div className="text-lg font-extrabold text-white">
                  {office.city}, {office.country}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 text-sm text-slate-300">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
                    <span className="leading-relaxed">{office.address}</span>
                  </div>
                  <a
                    href={office.phoneHref}
                    className="flex items-center gap-3 text-sm font-semibold text-white transition-colors hover:text-cyan-200"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-cyan-200" />
                    {office.phone}
                  </a>
                </div>
              </div>

              <div className="relative aspect-[4/3] w-full bg-slate-900/50 sm:aspect-video">
                <iframe
                  title={`Map: ${office.city}, ${office.country}`}
                  src={googleMapsEmbedUrl(office.mapQuery)}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="p-4">
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-secondary hover:underline"
                >
                  Open in Google Maps
                </Link>
              </div>
            </div>
          </ScrollStackCard>
        ))}
      </div>
    </div>
  );
}
