import { useState, useEffect, useRef } from "react";

interface UseLiveRateResult {
  rate: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

const DEFAULT_RATE = 15.2;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes

interface CachedRate {
  rate: number;
  timestamp: number;
}

let cachedRate: CachedRate | null = null;

export function useLiveRate(): UseLiveRateResult {
  const [rate, setRate] = useState<number>(DEFAULT_RATE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const now = Date.now();

    // Use cached result if still valid
    if (cachedRate && now - cachedRate.timestamp < CACHE_DURATION_MS) {
      setRate(cachedRate.rate);
      setLastUpdated(new Date(cachedRate.timestamp));
      setLoading(false);
      setError(null);
      return;
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    async function fetchRate() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://open.er-api.com/v6/latest/USD",
          { signal: abortController.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!data?.rates?.GHS) {
          throw new Error("GHS rate not found in response");
        }

        const ghsRate = data.rates.GHS as number;
        const fetchedAt = Date.now();

        // Update cache
        cachedRate = { rate: ghsRate, timestamp: fetchedAt };

        setRate(ghsRate);
        setLastUpdated(new Date(fetchedAt));
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        const message =
          err instanceof Error ? err.message : "Failed to fetch exchange rate";

        setError(message);
        setRate(DEFAULT_RATE);
      } finally {
        setLoading(false);
      }
    }

    fetchRate();

    return () => {
      abortController.abort();
    };
  }, []);

  return { rate, loading, error, lastUpdated };
}
