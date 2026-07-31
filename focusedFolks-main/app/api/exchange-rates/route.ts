import { FALLBACK_INR_EXCHANGE_RATES } from "@/lib/inr-currency";

export const revalidate = 3600;

type ExchangeRatesResponse = {
  base: "INR";
  rates: { USD: number; AED: number };
  source: "live" | "fallback";
};

export async function GET(): Promise<Response> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/INR", {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = (await res.json()) as {
        result?: string;
        rates?: { USD?: number; AED?: number };
      };

      const usd = data.rates?.USD;
      const aed = data.rates?.AED;

      if (data.result === "success" && typeof usd === "number" && typeof aed === "number" && usd > 0 && aed > 0) {
        const payload: ExchangeRatesResponse = {
          base: "INR",
          rates: { USD: usd, AED: aed },
          source: "live",
        };
        return Response.json(payload);
      }
    }
  } catch {
    /* use fallback */
  }

  const payload: ExchangeRatesResponse = {
    base: "INR",
    rates: {
      USD: FALLBACK_INR_EXCHANGE_RATES.USD,
      AED: FALLBACK_INR_EXCHANGE_RATES.AED,
    },
    source: "fallback",
  };

  return Response.json(payload);
}
