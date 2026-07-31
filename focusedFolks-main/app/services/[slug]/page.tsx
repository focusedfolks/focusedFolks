import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo";
import { getAllServiceSlugs, getServicePageData } from "@/lib/services";
import { ServiceDetailView } from "@/sections/services/service-detail-view";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getServicePageData(slug);
  if (!data) {
    return createMetadata({ title: "Services", description: "Services", path: "/services" });
  }

  const { service, detail } = data;
  return createMetadata({
    title: service.title,
    description: detail.tagline,
    keywords: [service.title, ...(service.features ?? [])],
    path: `/services/${service.id}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getServicePageData(slug);
  if (!data) notFound();

  return <ServiceDetailView service={data.service} detail={data.detail} />;
}
