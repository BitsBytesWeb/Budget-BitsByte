import { Check } from "lucide-react";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { EXTRAS } from "@/config/pricing";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import type { ExtraSelection, Market } from "@/types/pricing";

interface ExtrasSelectorProps {
  market: Market;
  selection: ExtraSelection;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, value: number) => void;
}

export function ExtrasSelector({ market, selection, onToggle, onQuantityChange }: ExtrasSelectorProps) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {EXTRAS.map((extra) => {
        const quantity = selection[extra.id];
        const selected = quantity !== undefined;
        return (
          <li
            key={extra.id}
            className={cn(
              "flex flex-col gap-3 rounded-xl border bg-surface p-4 transition-colors",
              selected ? "border-primary bg-primary/10" : "hover:bg-surface-2",
            )}
          >
            <label className="flex cursor-pointer items-start gap-3 focus-within:[&_span.box]:outline-2 focus-within:[&_span.box]:outline-primary">
              <input
                type="checkbox"
                className="sr-only"
                checked={selected}
                onChange={() => onToggle(extra.id)}
              />
              <span
                aria-hidden
                className={cn(
                  "box mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                  selected ? "border-primary bg-primary text-primary-foreground" : "border-muted/50",
                )}
              >
                {selected && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{extra.name}</span>
                <span className="block text-xs text-muted">{extra.description}</span>
              </span>
              <span className="text-right text-sm font-semibold tabular-nums">
                {formatCurrency(extra.price.amount[market], market, { minimum: extra.price.isMinimum })}
                {extra.unit && <span className="block text-xs font-normal text-muted">{extra.unit}</span>}
              </span>
            </label>
            {selected && extra.quantity && (
              <div className="animate-fade-in flex items-center justify-between pl-8">
                <span className="text-xs text-muted">Quantidade</span>
                <QuantityStepper
                  label={extra.name}
                  value={quantity}
                  min={extra.quantity.min}
                  max={extra.quantity.max}
                  onChange={(value) => onQuantityChange(extra.id, value)}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
