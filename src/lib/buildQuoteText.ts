import { formatCurrency } from "@/lib/formatCurrency";
import type { Quote } from "@/types/pricing";

/** Texto organizado para compartilhar via WhatsApp, e-mail ou mensagem. */
export function buildQuoteText(quote: Quote): string {
  const { market } = quote;
  const money = (cents: number, minimum = false) => formatCurrency(cents, market, { minimum });
  const out: string[] = [];

  out.push("*BitsByte — Estimativa de investimento*", "");
  out.push(`*Projeto:* ${quote.service.name} (${quote.service.description.toLowerCase()})`, "");
  out.push("*Desenvolvimento (pagamento único)*");
  for (const line of quote.lines) {
    const detail = line.detail ? ` — ${line.detail}` : "";
    out.push(`• ${line.label}${detail}: ${money(line.total, line.isMinimum)}`);
  }
  out.push("");

  if (quote.discountPercent > 0) {
    out.push(`Subtotal: ${money(quote.subtotal, quote.isMinimum)}`);
    out.push(`Desconto de ${quote.discountPercent}%: -${money(quote.discountAmount)}`);
  }
  out.push(
    quote.isMinimum
      ? `*Desenvolvimento estimado: a partir de ${money(quote.developmentTotal)}*`
      : `*Desenvolvimento estimado: ${money(quote.developmentTotal)}*`,
  );
  out.push("");

  out.push("*Hospedagem e manutenção (mensal)*");
  if (quote.monthly) {
    out.push(`${quote.plan.name}: ${money(quote.monthly.amount, quote.monthly.isMinimum)}/mês`);
  } else {
    out.push("Sem hospedagem BitsByte (infraestrutura própria do cliente)");
  }
  out.push("");

  out.push("*Observações*");
  if (quote.isMinimum || quote.monthly?.isMinimum) {
    out.push("• Valores com “+” são mínimos; o valor final depende de análise de complexidade.");
  }
  if (quote.needsScopeReview) {
    out.push("• E-commerce avançado exige análise de escopo antes do valor final.");
  }
  if (quote.planNeedsValidation) {
    out.push("• O plano mensal escolhido precisa de validação para este tipo de projeto.");
  }
  out.push("• Estimativa sujeita a confirmação, não constitui orçamento definitivo.");
  out.push("• Domínio e serviços/licenças de terceiros não estão inclusos.");
  out.push("• A mensalidade começa na publicação do site.");

  return out.join("\n");
}
