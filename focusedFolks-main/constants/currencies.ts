import type { PricingRegion } from "@/types";

/** Base plan amounts in constants/pricing.ts are USD. Rates are indicative (updated periodically). */
export const pricingRegions: PricingRegion[] = [
  {
    id: "us",
    label: "United States",
    currency: "USD",
    locale: "en-US",
    rateFromUsd: 1,
  },
  {
    id: "ae",
    label: "United Arab Emirates (Dubai)",
    currency: "AED",
    locale: "en-AE",
    rateFromUsd: 3.67,
  },
  {
    id: "gb",
    label: "United Kingdom",
    currency: "GBP",
    locale: "en-GB",
    rateFromUsd: 0.79,
  },
  {
    id: "ca",
    label: "Canada",
    currency: "CAD",
    locale: "en-CA",
    rateFromUsd: 1.36,
  },
  {
    id: "au",
    label: "Australia",
    currency: "AUD",
    locale: "en-AU",
    rateFromUsd: 1.53,
  },
  {
    id: "in",
    label: "India",
    currency: "INR",
    locale: "en-IN",
    rateFromUsd: 83.5,
  },
  {
    id: "sg",
    label: "Singapore",
    currency: "SGD",
    locale: "en-SG",
    rateFromUsd: 1.34,
  },
  {
    id: "de",
    label: "Germany / Eurozone",
    currency: "EUR",
    locale: "de-DE",
    rateFromUsd: 0.92,
  },
  {
    id: "sa",
    label: "Saudi Arabia",
    currency: "SAR",
    locale: "en-SA",
    rateFromUsd: 3.75,
  },
  {
    id: "za",
    label: "South Africa",
    currency: "ZAR",
    locale: "en-ZA",
    rateFromUsd: 18.2,
  },
];

export const defaultPricingRegionId = "us";

export function getPricingRegionById(id: string): PricingRegion {
  return pricingRegions.find((r) => r.id === id) ?? pricingRegions[0];
}
