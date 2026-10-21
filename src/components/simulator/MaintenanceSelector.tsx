import { AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HOSTING_RULES, PLANS } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import type { Market } from "@/types/pricing";

interface MaintenanceSelectorProps {
  market: Market;
  planId: string;
  isEcommerceProject: boolean;
  needsValidation: boolean;
  onPlanChange: (id: string) => void;
}

export function MaintenanceSelector({
  market,
  planId,
  isEcommerceProject,
  needsValidation,
  onPlanChange,
}: MaintenanceSelectorProps) {
  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Plano de hospedagem e manutenção" className="grid gap-2 sm:grid-cols-2">
        {PLANS.map((plan) => {
          const selected = plan.id === planId;
          const highlighted = isEcommerceProject && plan.forEcommerce;
          return (
            <label
              key={plan.id}
              className={cn(
                "relative flex cursor-pointer flex-col gap-1 rounded-xl border bg-surface p-4 transition-colors focus-within:outline-2 focus-within:outline-primary hover:bg-surface-2",
                selected && "border-primary bg-primary/10 hover:bg-primary/10",
              )}
            >
              <input
                type="radio"
                name="plan"
                className="sr-only"
                checked={selected}
                onChange={() => onPlanChange(plan.id)}
              />
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-medium">
                  {plan.name}
                  {highlighted && (
                    <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      Indicado
                    </span>
                  )}
                </span>
                <span className="text-sm font-semibold tabular-nums">
                  {plan.price
                    ? `${formatCurrency(plan.price.amount[market], market, { minimum: plan.price.isMinimum })}/mês`
                    : "—"}
                </span>
              </span>
              <span className="text-xs text-muted">{plan.description}</span>
            </label>
          );
        })}
      </div>

      {needsValidation && (
        <p role="status" className="animate-fade-in flex gap-2 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {isEcommerceProject
            ? "Este plano não é o específico para e-commerce. A adequação precisa ser validada."
            : "O plano E-commerce é indicado para lojas virtuais. Para este projeto, a escolha precisa ser validada."}
        </p>
      )}

      <Accordion type="single" collapsible>
        <AccordionItem value="rules">
          <AccordionTrigger>Regras de hospedagem e manutenção</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-4">
              {HOSTING_RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
