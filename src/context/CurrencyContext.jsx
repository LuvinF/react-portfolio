import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import { BASE_CURRENCY } from "../utils/exchangeRates";
import { isSupportedCurrency, SUPPORTED_CURRENCIES } from "../utils/currency";
import { detectVisitorCurrency } from "../utils/locale";
import useExchangeRates from "../hooks/useExchangeRates";

const STORAGE_KEY = "portfolio-preferred-currency";

export const CurrencyContext = createContext(null);

const getInitialCurrencyState = () => {
  const detection = detectVisitorCurrency();

  if (typeof window === "undefined") {
    return {
      ...detection,
      detectedCurrency: detection.currency,
      currency: BASE_CURRENCY,
    };
  }

  try {
    const storedCurrency = window.localStorage.getItem(STORAGE_KEY);
    const currency = isSupportedCurrency(storedCurrency)
      ? storedCurrency
      : detection.currency;

    return { ...detection, detectedCurrency: detection.currency, currency };
  } catch {
    return { ...detection, detectedCurrency: detection.currency };
  }
};

export const CurrencyProvider = ({ children }) => {
  const [currencyState, setCurrencyState] = useState(getInitialCurrencyState);
  const {
    rates,
    loading: ratesLoading,
    error: ratesError,
    refresh: refreshRates,
  } = useExchangeRates();

  const setCurrency = useCallback((currency) => {
    if (!isSupportedCurrency(currency)) return;
    setCurrencyState((current) =>
      current.currency === currency ? current : { ...current, currency }
    );
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, currencyState.currency);
    } catch {
      // Private browsing or storage restrictions should not affect pricing.
    }
  }, [currencyState.currency]);

  const value = useMemo(
    () => ({
      ...currencyState,
      rates,
      ratesLoading,
      ratesError,
      refreshRates,
      setCurrency,
      supportedCurrencies: SUPPORTED_CURRENCIES,
    }),
    [currencyState, rates, ratesLoading, ratesError, refreshRates, setCurrency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};
