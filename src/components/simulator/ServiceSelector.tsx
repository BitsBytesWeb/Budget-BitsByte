import { Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import {
  ADDITIONAL_PAGE,
  BASE_PACKAGE_INCLUDES,
  BASE_PACKAGE_NOTES,
  SERVICES,
} from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import type { Market } from "@/types/pricing";

interface ServiceSelectorProps {
  market: Market;
  serviceId: string;
  additionalPages: number;
  onServiceChange: (id: string) => void;
  onAdditionalPagesChange: (value: number) => void;
}

export function ServiceSelector({
  market,
  serviceId,
  additionalPages,
  onServiceChange,
  onAdditionalPagesChange,
}: ServiceSelectorProps) {
  return (
    <div className="space-y-4">
      <div role="radiogroup" aria-label="Tipo de projeto" className="grid gap-2 sm:grid-cols-2">
        {SERVICES.map((service) => {
          const selected = service.id === serviceId;
          return (
            <label
              key={service.id}
              className={cn(
                "relative flex cursor-pointer items-center justify-between gap-3 rounded-xl border bg-surface p-4 transition-colors focus-within:outline-2 focus-within:outline-primary hover:bg-surface-2",
                selected && "border-primary bg-primary/10 hover:bg-primary/10",
              )}
            >
              <input
                type="radio"
                name="service"
                className="sr-only"
                checked={selected}
                onChange={() => onServiceChange(service.id)}
              />
              <span>
                <span className="block text-sm font-medium">{service.name}</span>
                <span className="block text-xs text-muted">{service.description}</span>
              </span>
              <span className="text-right text-sm font-semibold tabular-nums">
                {formatCurrency(service.price.amount[market], market, { minimum: service.price.isMinimum })}
              </span>
            </label>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-4">
        <div>
          <p className="text-sm font-medium">{ADDITIONAL_PAGE.name}</p>
          <p className="text-xs text-muted tabular-nums">
            {formatCurrency(ADDITIONAL_PAGE.price.amount[market], market)} por página
          </p>
        </div>
        <QuantityStepper
          label="páginas adicionais"
          value={additionalPages}
          min={ADDITIONAL_PAGE.quantity.min}
          max={ADDITIONAL_PAGE.quantity.max}
          onChange={onAdditionalPagesChange}
        />
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="included">
          <AccordionTrigger>O que está incluso no pacote-base</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2">
              {BASE_PACKAGE_INCLUDES.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1 text-xs">
              {BASE_PACKAGE_NOTES.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
