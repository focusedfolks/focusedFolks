import Link from "next/link";
import { Check, Crown, Rocket, Sparkles } from "lucide-react";
import { formatInrPrice } from "@/lib/inr-currency";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { InrCurrency, InrExchangeRates, InrPricingPlan } from "@/types/inr-pricing";

type PlanTier = "starter" | "popular" | "enterprise";

function resolvePlanTier(plan: InrPricingPlan, index: number, total: number): PlanTier {
  if (plan.popular) return "popular";
  if (index === total - 1) return "enterprise";
  return "starter";
}

const tierIcon: Record<PlanTier, typeof Rocket> = {
  starter: Rocket,
  popular: Sparkles,
  enterprise: Crown,
};

type InrPricingPlanCardProps = {
  plan: InrPricingPlan;
  index: number;
  total: number;
  currency: InrCurrency;
  rates: InrExchangeRates;
};

export function InrPricingPlanCard({
  plan,
  index,
  total,
  currency,
  rates,
}: InrPricingPlanCardProps) {
  const tier = resolvePlanTier(plan, index, total);
  const TierIcon = tierIcon[tier];

  return (
    <article
      className={cn(
        "inr-pricing-plan-card group relative flex flex-col rounded-3xl p-6 transition-[transform,box-shadow,border-color] duration-300 md:p-7",
        tier === "starter" && "inr-pricing-plan-card-starter",
        tier === "popular" && "inr-pricing-plan-card-popular",
        tier === "enterprise" && "inr-pricing-plan-card-enterprise"
      )}
    >
      <div className="inr-pricing-plan-card-glow pointer-events-none" aria-hidden />

      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 sm:left-6 sm:translate-x-0">
          <Badge variant="popular" className="inr-pricing-plan-popular-badge px-4 py-1.5 shadow-lg">
            Most Popular
          </Badge>
        </div>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div
            className={cn(
              "inr-pricing-plan-tier-icon mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl",
              tier === "starter" && "inr-pricing-plan-tier-icon-starter",
              tier === "popular" && "inr-pricing-plan-tier-icon-popular",
              tier === "enterprise" && "inr-pricing-plan-tier-icon-enterprise"
            )}
            aria-hidden
          >
            <TierIcon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-extrabold leading-tight text-white sm:text-2xl">{plan.name}</h3>
        </div>
      </div>

      <div
        className={cn(
          "inr-pricing-plan-price mt-5",
          tier === "starter" && "inr-pricing-plan-price-starter",
          tier === "popular" && "inr-pricing-plan-price-popular",
          tier === "enterprise" && "inr-pricing-plan-price-enterprise"
        )}
        aria-live="polite"
      >
        {formatInrPrice(plan.price, currency, rates)}
      </div>

      {plan.suitableFor && (
        <p className="mt-3 text-xs leading-relaxed text-slate-400">
          <span className="font-semibold text-slate-300">Suitable for: </span>
          {plan.suitableFor}
        </p>
      )}

      <div className="inr-pricing-plan-divider my-6" aria-hidden />

      <ul className="flex-1 space-y-3 text-sm text-slate-300">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                tier === "starter" && "inr-pricing-plan-check-starter",
                tier === "popular" && "inr-pricing-plan-check-popular",
                tier === "enterprise" && "inr-pricing-plan-check-enterprise"
              )}
            >
              <Check className="h-3 w-3 stroke-[3]" aria-hidden />
            </span>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Button
          asChild
          size="lg"
          variant={tier === "starter" ? "outline" : tier === "enterprise" ? "secondary" : "default"}
          className={cn(
            "w-full",
            tier === "popular" && "inr-pricing-plan-cta-popular",
            tier === "enterprise" && "inr-pricing-plan-cta-enterprise"
          )}
        >
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </article>
  );
}
