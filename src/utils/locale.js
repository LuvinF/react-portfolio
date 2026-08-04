import { BASE_CURRENCY } from "./exchangeRates";

export const COUNTRY_CURRENCY_MAP = {
  US: "USD",
  GB: "GBP",
  IN: "INR",
  AU: "AUD",
  CA: "CAD",
  SG: "SGD",
  AE: "AED",
  AT: "EUR",
  BE: "EUR",
  DE: "EUR",
  ES: "EUR",
  FI: "EUR",
  FR: "EUR",
  GR: "EUR",
  IE: "EUR",
  IT: "EUR",
  NL: "EUR",
  PT: "EUR",
};

export const getBrowserLocale = () => {
  if (typeof navigator === "undefined") return "en-US";
  return navigator.languages?.[0] || navigator.language || "en-US";
};

export const getLocaleDetails = (locale = getBrowserLocale()) => {
  try {
    const region = new Intl.Locale(locale).region || null;
    return {
      locale,
      country: region,
      currency: COUNTRY_CURRENCY_MAP[region] || BASE_CURRENCY,
    };
  } catch {
    return { locale: "en-US", country: "US", currency: BASE_CURRENCY };
  }
};

// This function is the single seam to replace with server or edge geolocation.
export const detectVisitorCurrency = () => getLocaleDetails();
