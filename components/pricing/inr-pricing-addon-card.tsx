import { Plus } from "lucide-react";
import { formatInrPrice } from "@/lib/inr-currency";
import { cn } from "@/lib/utils";
import type { InrCurrency, InrExchangeRates, InrPricingAddon } from "@/types/inr-pricing";

type InrPricingAddonCardProps = {
  addon: InrPricingAddon;
  currency: InrCurrency;
  rates: InrExchangeRates;
};

export function InrPricingAddonCard({ addon, currency, rates }: InrPricingAddonCardProps) {
  const isCustomQuote = addon.price.type === "custom_quote";
  const priceLabel = formatInrPrice(addon.price, currency, rates);

  return (
    <li className="inr-pricing-addon-card group">
      <div className="inr-pricing-addon-card-glow pointer-events-none" aria-hidden />
      <div className="relative flex items-start gap-3">
        <span className="inr-pricing-addon-icon shrink-0" aria-hidden>
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="inr-pricing-addon-name">{addon.name}</p>
          <p
            className={cn(
              "inr-pricing-addon-price mt-1.5",
              isCustomQuote && "inr-pricing-addon-price-custom"
            )}
            aria-live="polite"
          >
            {priceLabel}
          </p>
        </div>
      </div>
    </li>
  );
}
