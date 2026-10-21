import {
  ADDITIONAL_PAGE,
  EXTRAS,
  MAX_DISCOUNT_PERCENT,
  PLANS,
  SERVICES,
} from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Quote, QuoteLine, QuoteState } from "@/types/pricing";

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.trunc(value)));
}

/** Todos os cálculos são feitos em centavos inteiros. */
export function calculateQuote(state: QuoteState): Quote {
  const { market } = state;
  const service = SERVICES.find((s) => s.id === state.serviceId) ?? SERVICES[0];
  const plan = PLANS.find((p) => p.id === state.planId) ?? PLANS[0];

  const lines: QuoteLine[] = [
    {
      id: service.id,
      label: service.name,
      total: service.price.amount[market],
      isMinimum: Boolean(service.price.isMinimum),
    },
  ];

  const pages = clamp(state.additionalPages, ADDITIONAL_PAGE.quantity.min, ADDITIONAL_PAGE.quantity.max);
  if (pages > 0) {
    const unit = ADDITIONAL_PAGE.price.amount[market];
    lines.push({
      id: "additional-pages",
      label: pages === 1 ? "Página adicional" : "Páginas adicionais",
      detail: `${pages} × ${formatCurrency(unit, market)}`,
      total: unit * pages,
      isMinimum: false,
    });
  }

  for (const extra of EXTRAS) {
    const selected = state.extras[extra.id];
    if (selected === undefined) continue;
    const unit = extra.price.amount[market];
    const quantity = extra.quantity
      ? clamp(selected, extra.quantity.min, extra.quantity.max)
      : 1;
    lines.push({
      id: extra.id,
      label: extra.name,
      detail: extra.quantity ? `${quantity} × ${formatCurrency(unit, market)}` : undefined,
      total: unit * quantity,
      isMinimum: Boolean(extra.price.isMinimum),
    });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.total, 0);
  const discountPercent = clamp(state.discountPercent, 0, MAX_DISCOUNT_PERCENT);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const developmentTotal = subtotal - discountAmount;

  const monthly = plan.price
    ? { amount: plan.price.amount[market], isMinimum: Boolean(plan.price.isMinimum) }
    : null;

  const isEcommerceProject = service.kind === "ecommerce";
  const planNeedsValidation =
    plan.price !== null && (isEcommerceProject ? !plan.forEcommerce : Boolean(plan.forEcommerce));

  return {
    market,
    service,
    plan,
    lines,
    subtotal,
    discountPercent,
    discountAmount,
    developmentTotal,
    monthly,
    isMinimum: lines.some((line) => line.isMinimum),
    needsScopeReview: Boolean(service.needsScopeReview),
    planNeedsValidation,
  };
}
