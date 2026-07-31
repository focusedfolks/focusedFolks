"use client";

import { useCallback, useEffect, useState } from "react";
import {
  defaultWebsiteCurrency,
  WEBSITE_CURRENCY_STORAGE_KEY,
} from "@/constants/website-pricing";
import { FALLBACK_INR_EXCHANGE_RATES } from "@/lib/inr-currency";
import type { InrExchangeRates, WebsiteCurrency } from "@/types/website-pricing";
import { isWebsiteCurrency } from "@/lib/inr-currency";

function readStoredCurrency(): WebsiteCurrency {
  if (typeof window === "undefined") return defaultWebsiteCurrency;
  try {
    const stored = localStorage.getItem(WEBSITE_CURRENCY_STORAGE_KEY);
    if (stored && isWebsiteCurrency(stored)) return stored;
  } catch {
    /* ignore */
  }
  return defaultWebsiteCurrency;
}

export function useWebsiteCurrency() {
  const [currency, setCurrencyState] = useState<WebsiteCurrency>(defaultWebsiteCurrency);
  const [rates, setRates] = useState<InrExchangeRates>(FALLBACK_INR_EXCHANGE_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesSource, setRatesSource] = useState<"live" | "fallback">("fallback");

  useEffect(() => {
    setCurrencyState(readStoredCurrency());
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRates() {
      try {
        const res = await fetch("/api/exchange-rates");
        if (!res.ok) throw new Error("rates unavailable");
        const data = (await res.json()) as {
          rates?: { USD?: number; AED?: number };
          source?: "live" | "fallback";
        };
        if (cancelled) return;
        if (
          data.rates &&
          typeof data.rates.USD === "number" &&
          typeof data.rates.AED === "number"
        ) {
          setRates({ USD: data.rates.USD, AED: data.rates.AED });
          setRatesSource(data.source === "live" ? "live" : "fallback");
        }
      } catch {
        if (!cancelled) {
          setRates(FALLBACK_INR_EXCHANGE_RATES);
          setRatesSource("fallback");
        }
      } finally {
        if (!cancelled) setRatesLoading(false);
      }
    }

    loadRates();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((next: WebsiteCurrency) => {
    setCurrencyState(next);
    try {
      localStorage.setItem(WEBSITE_CURRENCY_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    currency,
    setCurrency,
    rates,
    ratesLoading,
    ratesSource,
  };
}
