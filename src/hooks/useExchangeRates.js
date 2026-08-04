import { useCallback, useEffect, useState } from "react";

import { FALLBACK_RATES } from "../constants/fallbackRates";
import { getExchangeRates } from "../services/exchangeRateService";

let activeRequest = null;

const requestRates = (forceRefresh) => {
  if (!forceRefresh && activeRequest) return activeRequest;

  activeRequest = getExchangeRates({ forceRefresh }).finally(() => {
    activeRequest = null;
  });

  return activeRequest;
};

const useExchangeRates = () => {
  const [rates, setRates] = useState(FALLBACK_RATES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRates = useCallback(async (forceRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const nextRates = await requestRates(forceRefresh);
      setRates(nextRates);
      return nextRates;
    } catch (requestError) {
      setRates(FALLBACK_RATES);
      setError(requestError.message || "Using fallback exchange rates.");
      return FALLBACK_RATES;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const refresh = useCallback(() => loadRates(true), [loadRates]);

  return { rates, loading, error, refresh };
};

export default useExchangeRates;
