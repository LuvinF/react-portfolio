import { BASE_CURRENCY, FALLBACK_RATES } from "../constants/fallbackRates";

export { BASE_CURRENCY };

export const getExchangeRate = (currency, rates = FALLBACK_RATES) =>
  rates?.[currency] ?? rates?.[BASE_CURRENCY] ?? 1;
