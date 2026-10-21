import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantityStepperProps {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
}

export function QuantityStepper({ value, min, max, label, onChange }: QuantityStepperProps) {
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-0.5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Diminuir ${label}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <Minus className="size-4" />
      </Button>
      <span aria-live="polite" className="min-w-8 text-center text-sm font-medium tabular-nums">
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Aumentar ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
