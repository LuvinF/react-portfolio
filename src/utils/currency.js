import { FALLBACK_RATES, SUPPORTED_CURRENCIES } from "../constants/fallbackRates";
import { BASE_CURRENCY, getExchangeRate } from "./exchangeRates";

export { SUPPORTED_CURRENCIES };

export const isSupportedCurrency = (currency) => SUPPORTED_CURRENCIES.includes(currency);

export const convertFromUSD = (priceUSD, currency = BASE_CURRENCY, rates = FALLBACK_RATES) =>
  Number(priceUSD || 0) * getExchangeRate(currency, rates);

export const formatCurrency = ({ amount, currency = BASE_CURRENCY, locale = "en-US" }) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: isSupportedCurrency(currency) ? currency : BASE_CURRENCY,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: BASE_CURRENCY,
      maximumFractionDigits: 0,
    }).format(amount);
  }
};
