import { useCallback, useMemo, useState } from "react";
import { ADDITIONAL_PAGE, DEFAULT_STATE, EXTRAS, MAX_DISCOUNT_PERCENT } from "@/config/pricing";
import { calculateQuote, clamp } from "@/lib/calculateQuote";
import type { Market, QuoteState } from "@/types/pricing";

export function useQuoteSimulator() {
  const [state, setState] = useState<QuoteState>(DEFAULT_STATE);

  const quote = useMemo(() => calculateQuote(state), [state]);

  const setMarket = useCallback((market: Market) => setState((s) => ({ ...s, market })), []);
  const setService = useCallback((serviceId: string) => setState((s) => ({ ...s, serviceId })), []);
  const setPlan = useCallback((planId: string) => setState((s) => ({ ...s, planId })), []);

  const setAdditionalPages = useCallback(
    (value: number) =>
      setState((s) => ({
        ...s,
        additionalPages: clamp(value, ADDITIONAL_PAGE.quantity.min, ADDITIONAL_PAGE.quantity.max),
      })),
    [],
  );

  const toggleExtra = useCallback((id: string) => {
    setState((s) => {
      const { [id]: current, ...rest } = s.extras;
      if (current !== undefined) return { ...s, extras: rest };
      const quantity = EXTRAS.find((e) => e.id === id)?.quantity?.defaultValue ?? 1;
      return { ...s, extras: { ...rest, [id]: quantity } };
    });
  }, []);

  const setExtraQuantity = useCallback((id: string, value: number) => {
    const rule = EXTRAS.find((e) => e.id === id)?.quantity;
    if (!rule) return;
    setState((s) =>
      id in s.extras ? { ...s, extras: { ...s.extras, [id]: clamp(value, rule.min, rule.max) } } : s,
    );
  }, []);

  const setDiscount = useCallback(
    (discountPercent: number) =>
      setState((s) => ({ ...s, discountPercent: clamp(discountPercent, 0, MAX_DISCOUNT_PERCENT) })),
    [],
  );

  const reset = useCallback(() => setState(DEFAULT_STATE), []);

  return {
    state,
    quote,
    setMarket,
    setService,
    setPlan,
    setAdditionalPages,
    toggleExtra,
    setExtraQuantity,
    setDiscount,
    reset,
  };
}

export type QuoteSimulator = ReturnType<typeof useQuoteSimulator>;
