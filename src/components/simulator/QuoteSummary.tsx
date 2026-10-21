import { AlertTriangle, Check, Copy, Presentation, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { buildQuoteText } from "@/lib/buildQuoteText";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Quote } from "@/types/pricing";

interface QuoteSummaryProps {
  quote: Quote;
  onPresent: () => void;
  onReset: () => void;
}

export function QuoteSummary({ quote, onPresent, onReset }: QuoteSummaryProps) {
  const { market } = quote;
  const [copied, setCopied] = useState<"idle" | "ok" | "error">("idle");
  const money = (cents: number, minimum = false) => formatCurrency(cents, market, { minimum });

  async function copy() {
    try {
      await navigator.clipboard.writeText(buildQuoteText(quote));
      setCopied("ok");
    } catch {
      setCopied("error");
    }
    window.setTimeout(() => setCopied("idle"), 2200);
  }

  return (
    <section
      aria-label="Resumo do orçamento"
      className="rounded-2xl border border-border bg-surface p-5 shadow-xl shadow-black/20 sm:p-6"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted">Desenvolvimento · pagamento único</p>
      <p className="mt-2 text-sm text-muted">{quote.isMinimum ? "Estimativa a partir de" : "Estimativa"}</p>
      <p
        key={`${market}-${quote.developmentTotal}`}
        aria-live="polite"
        className="animate-fade-in text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
      >
        {money(quote.developmentTotal)}
      </p>

      <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
        {quote.lines.map((line) => (
          <li key={line.id} className="flex items-baseline justify-between gap-3">
            <span>
              {line.label}
              {line.detail && <span className="block text-xs text-muted tabular-nums">{line.detail}</span>}
            </span>
            <span className="shrink-0 tabular-nums">{money(line.total, line.isMinimum)}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">{quote.isMinimum ? "Subtotal mínimo" : "Subtotal"}</dt>
          <dd className="tabular-nums">{money(quote.subtotal)}</dd>
        </div>
        {quote.discountPercent > 0 && (
          <div className="animate-fade-in flex justify-between font-medium text-success">
            <dt>Desconto de {quote.discountPercent}%</dt>
            <dd className="tabular-nums">−{money(quote.discountAmount)}</dd>
          </div>
        )}
      </dl>

      <div className="mt-4 rounded-xl bg-surface-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">Hospedagem e manutenção · mensal</p>
        {quote.monthly ? (
          <p className="mt-1 flex items-baseline justify-between gap-3">
            <span className="text-sm">{quote.plan.name}</span>
            <span className="text-xl font-semibold tabular-nums">
              {money(quote.monthly.amount, quote.monthly.isMinimum)}
              <span className="text-sm font-normal text-muted">/mês</span>
            </span>
          </p>
        ) : (
          <p className="mt-1 text-sm">Sem hospedagem BitsByte</p>
        )}
      </div>

      <div className="mt-4 space-y-2 text-xs text-muted">
        {(quote.isMinimum || quote.monthly?.isMinimum) && (
          <p className="flex gap-2">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden />
            Valores com “+” são mínimos e sujeitos à avaliação de complexidade.
          </p>
        )}
        {quote.needsScopeReview && (
          <p className="flex gap-2">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden />
            E-commerce avançado exige análise de escopo.
          </p>
        )}
        {quote.planNeedsValidation && (
          <p className="flex gap-2">
            <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-warning" aria-hidden />
            O plano mensal escolhido precisa de validação.
          </p>
        )}
        <p>Estimativa sujeita a confirmação, não é um orçamento definitivo.</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button onClick={onPresent}>
          <Presentation className="size-4" aria-hidden />
          Modo apresentação
        </Button>
        <Button variant="outline" onClick={copy}>
          {copied === "ok" ? (
            <>
              <Check className="size-4 text-success" aria-hidden />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="size-4" aria-hidden />
              {copied === "error" ? "Falha ao copiar" : "Copiar orçamento"}
            </>
          )}
        </Button>
      </div>
      <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={onReset}>
        <RotateCcw className="size-3.5" aria-hidden />
        Resetar simulação
      </Button>
      <span className="sr-only" role="status">
        {copied === "ok" ? "Orçamento copiado" : ""}
      </span>
    </section>
  );
}
