import type { Market } from "@/types/pricing";

const LOCALES: Record<Market, string> = { BRL: "pt-BR", USD: "en-US" };

const formatters = new Map<string, Intl.NumberFormat>();

function getFormatter(market: Market, fractionDigits: 0 | 2): Intl.NumberFormat {
  const key = `${market}-${fractionDigits}`;
  let formatter = formatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(LOCALES[market], {
      style: "currency",
      currency: market,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
    formatters.set(key, formatter);
  }
  return formatter;
}

/** Formata centavos inteiros na moeda do mercado; "minimum" acrescenta o sufixo "+". */
export function formatCurrency(cents: number, market: Market, options?: { minimum?: boolean }): string {
  const digits = cents % 100 === 0 ? 0 : 2;
  const text = getFormatter(market, digits).format(cents / 100);
  return options?.minimum ? `${text}+` : text;
}
