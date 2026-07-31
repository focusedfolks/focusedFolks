/** INR is the source of truth for all INR-based package and add-on amounts. */

export type InrCurrency = "INR" | "USD" | "AED";

export type InrPriceSpec =
  | { type: "range"; minInr: number; maxInr: number }
  | { type: "from"; minInr: number }
  | { type: "from_plus"; minInr: number }
  | { type: "flat"; minInr: number }
  | { type: "single_plus"; minInr: number }
  | { type: "per_year"; minInr: number }
  | { type: "per_page"; minInr: number }
  | { type: "per_screen"; minInr: number }
  | { type: "per_hour"; minInr: number }
  | { type: "per_month"; minInr: number }
  | { type: "per_month_plus"; minInr: number }
  | { type: "range_per_month"; minInr: number; maxInr: number }
  | { type: "from_per_month"; minInr: number }
  | { type: "from_plus_per_month"; minInr: number }
  | { type: "custom_quote" };

export type InrPricingPlan = {
  id: string;
  name: string;
  price: InrPriceSpec;
  /** Short scope / description for B2B catalogue cards. */
  scope?: string;
  /** Delivery timeline label (e.g. "5-7 Days"). */
  delivery?: string;
  suitableFor?: string;
  features?: string[];
  popular?: boolean;
};

export type InrPricingAddon = {
  id: string;
  name: string;
  price: InrPriceSpec;
};

export type InrExchangeRates = {
  USD: number;
  AED: number;
};

export type InrPricingComparisonRow = {
  name: string;
  starter: string | boolean | InrPriceSpec;
  business: string | boolean | InrPriceSpec;
  enterprise: string | boolean | InrPriceSpec;
};

/** @deprecated Use InrCurrency */
export type WebsiteCurrency = InrCurrency;

/** @deprecated Use InrPriceSpec */
export type WebsitePriceSpec = InrPriceSpec;

/** @deprecated Use InrPricingPlan */
export type WebsitePricingPlan = InrPricingPlan;

/** @deprecated Use InrPricingAddon */
export type WebsitePricingAddon = InrPricingAddon;
