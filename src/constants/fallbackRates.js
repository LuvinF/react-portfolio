export const BASE_CURRENCY = "USD";

// Used only when a live rate cannot be retrieved. All application prices
// remain authored in USD in constants/pricing.js.
export const FALLBACK_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.2,
  AUD: 1.53,
  CAD: 1.36,
  SGD: 1.34,
  AED: 3.67,
};

export const SUPPORTED_CURRENCIES = Object.keys(FALLBACK_RATES);
