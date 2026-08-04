import {
  BASE_CURRENCY,
  FALLBACK_RATES,
  SUPPORTED_CURRENCIES,
} from "../constants/fallbackRates";

const EXCHANGE_RATE_URL = "https://open.er-api.com/v6/latest/USD";
const CACHE_KEY = "portfolio-exchange-rates";
const CACHE_TTL_MS = 12 * 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8_000;

const isValidRate = (rate) => typeof rate === "number" && Number.isFinite(rate) && rate > 0;

const normalizeRates = (rates) => {
  if (!rates || typeof rates !== "object") {
    throw new Error("Exchange-rate response did not include a rates object.");
  }

  const supportedRates = SUPPORTED_CURRENCIES.reduce((result, currency) => {
    if (!isValidRate(rates[currency])) {
      throw new Error(`Exchange-rate response is missing a valid ${currency} rate.`);
    }

    result[currency] = rates[currency];
    return result;
  }, {});

  return { ...supportedRates, [BASE_CURRENCY]: 1 };
};

const readCache = () => {
  if (typeof window === "undefined") return null;

  try {
    const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY));

    if (!cached?.timestamp || !cached?.rates) return null;
    if (Date.now() - cached.timestamp >= CACHE_TTL_MS) return null;

    return normalizeRates(cached.rates);
  } catch {
    return null;
  }
};

const writeCache = (rates) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ rates, timestamp: Date.now() })
    );
  } catch {
    // Storage can be unavailable; live rates can still be used in memory.
  }
};

export const fetchExchangeRates = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(EXCHANGE_RATE_URL, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Exchange-rate request failed with status ${response.status}.`);
    }

    const payload = await response.json();
    if (payload?.result !== "success") {
      throw new Error("Exchange-rate API returned an unsuccessful response.");
    }

    return normalizeRates(payload.rates);
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Exchange-rate request timed out.");
    }

    throw new Error(error.message || "Unable to fetch live exchange rates.");
  } finally {
    clearTimeout(timeoutId);
  }
};

export const getExchangeRates = async ({ forceRefresh = false } = {}) => {
  if (!forceRefresh) {
    const cachedRates = readCache();
    if (cachedRates) return cachedRates;
  }

  const rates = await fetchExchangeRates();
  writeCache(rates);
  return rates;
};

export const getFallbackRates = () => FALLBACK_RATES;
