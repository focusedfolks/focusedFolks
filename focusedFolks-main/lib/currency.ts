import type { PricingRegion } from "@/types";

export function convertFromUsd(usdAmount: number, region: PricingRegion): number {
  return Math.round(usdAmount * region.rateFromUsd);
}

export function formatRegionalPrice(amount: number, region: PricingRegion): string {
  return amount.toLocaleString(region.locale, {
    style: "currency",
    currency: region.currency,
    maximumFractionDigits: 0,
  });
}

export function formatUsdPrice(usdAmount: number): string {
  return usdAmount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
