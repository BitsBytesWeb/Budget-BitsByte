import { useState, type ReactNode } from "react";
import { DiscountControl } from "@/components/simulator/DiscountControl";
import { ExtrasSelector } from "@/components/simulator/ExtrasSelector";
import { MaintenanceSelector } from "@/components/simulator/MaintenanceSelector";
import { PresentationMode } from "@/components/simulator/PresentationMode";
import { QuoteSummary } from "@/components/simulator/QuoteSummary";
import { ServiceSelector } from "@/components/simulator/ServiceSelector";
import { useQuoteSimulator } from "@/hooks/useQuoteSimulator";
import { cn } from "@/lib/utils";
import type { Market } from "@/types/pricing";

const MARKETS: { id: Market; label: string }[] = [
  { id: "BRL", label: "Brasil (BRL)" },
  { id: "USD", label: "EUA (USD)" },
];

function Section({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-3 text-base font-semibold">
        <span className="flex size-6 items-center justify-center rounded-md bg-surface-2 text-xs text-muted">{step}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  const sim = useQuoteSimulator();
  const [presenting, setPresenting] = useState(false);
  const { state, quote } = sim;

  if (presenting) {
    return <PresentationMode quote={quote} onBack={() => setPresenting(false)} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xl font-bold tracking-tight">
            Bits<span className="text-primary">Byte</span>
          </p>
          <h1 className="text-sm text-muted">Simulador de Orçamentos</h1>
        </div>
        <div role="radiogroup" aria-label="Mercado" className="inline-flex rounded-lg border border-border bg-surface p-0.5">
          {MARKETS.map((m) => (
            <label
              key={m.id}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-within:outline-2 focus-within:outline-primary",
                state.market === m.id ? "bg-primary text-primary-foreground" : "text-muted hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name="market"
                className="sr-only"
                checked={state.market === m.id}
                onChange={() => sim.setMarket(m.id)}
              />
              {m.label}
            </label>
          ))}
        </div>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div className="space-y-10">
          <Section step={1} title="Tipo de projeto">
            <ServiceSelector
              market={state.market}
              serviceId={state.serviceId}
              additionalPages={state.additionalPages}
              onServiceChange={sim.setService}
              onAdditionalPagesChange={sim.setAdditionalPages}
            />
          </Section>
          <Section step={2} title="Funcionalidades extras">
            <ExtrasSelector
              market={state.market}
              selection={state.extras}
              onToggle={sim.toggleExtra}
              onQuantityChange={sim.setExtraQuantity}
            />
          </Section>
          <Section step={3} title="Hospedagem e manutenção">
            <MaintenanceSelector
              market={state.market}
              planId={state.planId}
              isEcommerceProject={quote.service.kind === "ecommerce"}
              needsValidation={quote.planNeedsValidation}
              onPlanChange={sim.setPlan}
            />
          </Section>
          <Section step={4} title="Desconto">
            <DiscountControl value={state.discountPercent} onChange={sim.setDiscount} />
          </Section>
        </div>

        <aside className="lg:sticky lg:top-6">
          <QuoteSummary quote={quote} onPresent={() => setPresenting(true)} onReset={sim.reset} />
        </aside>
      </div>
    </div>
  );
}
