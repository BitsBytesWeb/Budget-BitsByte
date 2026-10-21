import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Quote } from "@/types/pricing";

interface PresentationModeProps {
  quote: Quote;
  onBack: () => void;
}

export function PresentationMode({ quote, onBack }: PresentationModeProps) {
  const { market } = quote;
  const money = (cents: number, minimum = false) => formatCurrency(cents, market, { minimum });
  const hasMinimum = quote.isMinimum || Boolean(quote.monthly?.isMinimum);

  return (
    <div className="animate-fade-in mx-auto flex min-h-dvh max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex items-center justify-between">
        <span className="text-xl font-bold tracking-tight">
          Bits<span className="text-primary">Byte</span>
        </span>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="size-4" aria-hidden />
          Voltar à edição
        </Button>
      </header>

      <main className="flex-1 py-10 sm:py-14">
        <p className="text-sm font-medium uppercase tracking-wider text-primary">{quote.service.name}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">Estimativa de investimento</h1>

        <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {quote.lines.map((line) => (
            <li key={line.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <span className="flex items-center gap-3">
                <Check className="size-4 shrink-0 text-success" aria-hidden />
                <span>
                  {line.label}
                  {line.detail && <span className="block text-xs text-muted tabular-nums">{line.detail}</span>}
                </span>
              </span>
              <span className="shrink-0 tabular-nums text-muted">{money(line.total, line.isMinimum)}</span>
            </li>
          ))}
          {quote.discountPercent > 0 && (
            <li className="flex items-center justify-between gap-4 px-5 py-4 font-medium text-success">
              <span>Desconto de {quote.discountPercent}%</span>
              <span className="tabular-nums">−{money(quote.discountAmount)}</span>
            </li>
          )}
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-primary/40 bg-primary/10 p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Desenvolvimento · pagamento único</p>
            <p className="mt-3 text-sm text-muted">{quote.isMinimum ? "A partir de" : "Valor"}</p>
            <p className="text-4xl font-bold tracking-tight tabular-nums">{money(quote.developmentTotal)}</p>
          </section>
          <section className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Hospedagem e manutenção · mensal</p>
            {quote.monthly ? (
              <>
                <p className="mt-3 text-sm text-muted">Plano {quote.plan.name}</p>
                <p className="text-4xl font-bold tracking-tight tabular-nums">
                  {money(quote.monthly.amount, quote.monthly.isMinimum)}
                  <span className="text-base font-normal text-muted">/mês</span>
                </p>
              </>
            ) : (
              <p className="mt-3 text-lg font-medium">Sem hospedagem BitsByte</p>
            )}
          </section>
        </div>
      </main>

      <footer className="space-y-1.5 border-t border-border pt-5 text-xs text-muted">
        {hasMinimum && <p>Valores com “+” são mínimos; o valor final depende de análise de complexidade.</p>}
        {quote.needsScopeReview && <p>E-commerce avançado exige análise de escopo antes do valor final.</p>}
        {quote.planNeedsValidation && <p>O plano mensal escolhido precisa de validação para este projeto.</p>}
        <p>Estimativa sujeita a confirmação, não constitui orçamento definitivo.</p>
        <p>Domínio e serviços ou licenças de terceiros não estão inclusos. A mensalidade começa na publicação do site.</p>
      </footer>
    </div>
  );
}
