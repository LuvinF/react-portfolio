import { useMemo } from "react";

import useCurrency from "./useCurrency";
import { convertFromUSD, formatCurrency } from "../utils/currency";
import { getExchangeRate } from "../utils/exchangeRates";

const usePricing = (priceUSD) => {
  const { currency, locale, rates } = useCurrency();

  return useMemo(() => {
    const basePrice = Number(priceUSD || 0);
    const exchangeRate = getExchangeRate(currency, rates);
    const convertedPrice = convertFromUSD(basePrice, currency, rates);

    return {
      formattedPrice: formatCurrency({ amount: convertedPrice, currency, locale }),
      currency,
      basePrice,
      exchangeRate,
    };
  }, [currency, locale, priceUSD, rates]);
};

export default usePricing;
