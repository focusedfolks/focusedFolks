import type { InrExchangeRates, InrCurrency, InrPriceSpec } from "@/types/inr-pricing";

/** Fallback: local currency units per 1 INR (used when live rates are unavailable). */
export const FALLBACK_INR_EXCHANGE_RATES: InrExchangeRates = {
  USD: 0.012,
  AED: 0.044,
};

export function isInrPricingCurrency(value: string): value is InrCurrency {
  return value === "INR" || value === "USD" || value === "AED";
}

/** @deprecated Use isInrPricingCurrency */
export const isWebsiteCurrency = isInrPricingCurrency;

export function convertInrToCurrency(amountInr: number, currency: InrCurrency, rates: InrExchangeRates): number {
  if (currency === "INR") return amountInr;
  const rate = currency === "USD" ? rates.USD : rates.AED;
  return Math.round(amountInr * rate);
}

function formatCurrencyAmount(amount: number, currency: InrCurrency): string {
  if (currency === "INR") {
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  if (currency === "USD") {
    return `$${amount.toLocaleString("en-US")}`;
  }
  return `AED ${amount.toLocaleString("en-US")}`;
}

function formatConvertedAmount(amountInr: number, currency: InrCurrency, rates: InrExchangeRates): string {
  if (currency === "INR") {
    return formatCurrencyAmount(amountInr, "INR");
  }
  return formatCurrencyAmount(convertInrToCurrency(amountInr, currency, rates), currency);
}

/**
 * Display-only formatting — never mutates stored INR values.
 */
export function formatInrPrice(
  spec: InrPriceSpec,
  currency: InrCurrency,
  rates: InrExchangeRates = FALLBACK_INR_EXCHANGE_RATES
): string {
  switch (spec.type) {
    case "range": {
      const min = formatConvertedAmount(spec.minInr, currency, rates);
      const max = formatConvertedAmount(spec.maxInr, currency, rates);
      return `${min} – ${max}`;
    }
    case "from":
      return `Starting From ${formatConvertedAmount(spec.minInr, currency, rates)}`;
    case "from_plus":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}+`;
    case "flat":
      return formatConvertedAmount(spec.minInr, currency, rates);
    case "single_plus":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}+`;
    case "per_year":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}/year`;
    case "per_page":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}/page`;
    case "per_screen":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}/screen`;
    case "per_hour":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}/hour`;
    case "per_month":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}/month`;
    case "per_month_plus":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}/month`;
    case "range_per_month": {
      const min = formatConvertedAmount(spec.minInr, currency, rates);
      const max = formatConvertedAmount(spec.maxInr, currency, rates);
      return `${min} – ${max} / Month`;
    }
    case "from_per_month":
      return `Starting From ${formatConvertedAmount(spec.minInr, currency, rates)} / Month`;
    case "from_plus_per_month":
      return `${formatConvertedAmount(spec.minInr, currency, rates)}+ / Month`;
    case "custom_quote":
      return "Contact for Quote";
    default:
      return "";
  }
}

/** @deprecated Use formatInrPrice */
export const formatWebsitePrice = formatInrPrice;

export function formatAddonLabel(
  name: string,
  spec: InrPriceSpec,
  currency: InrCurrency,
  rates: InrExchangeRates = FALLBACK_INR_EXCHANGE_RATES
): string {
  return `${name} – ${formatInrPrice(spec, currency, rates)}`;
}

export function formatComparisonCell(
  value: string | boolean | InrPriceSpec,
  currency: InrCurrency,
  rates: InrExchangeRates
): string {
  if (typeof value === "boolean") {
    return value ? "✓" : "—";
  }
  if (typeof value === "object" && value !== null && "type" in value) {
    return formatInrPrice(value, currency, rates);
  }
  return value;
}
