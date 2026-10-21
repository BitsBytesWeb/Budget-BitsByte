import { MAX_DISCOUNT_PERCENT } from "@/config/pricing";

interface DiscountControlProps {
  value: number;
  onChange: (value: number) => void;
}

export function DiscountControl({ value, onChange }: DiscountControlProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <label htmlFor="discount" className="text-sm font-medium">
          Desconto comercial
        </label>
        <output htmlFor="discount" className="text-sm font-semibold tabular-nums text-primary">
          {value}%
        </output>
      </div>
      <input
        id="discount"
        type="range"
        min={0}
        max={MAX_DISCOUNT_PERCENT}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
      />
      <div className="mt-2 flex justify-between text-xs text-muted tabular-nums">
        <span>0%</span>
        <span>{MAX_DISCOUNT_PERCENT}%</span>
      </div>
      <p className="mt-2 text-xs text-muted">Aplicado ao desenvolvimento e aos adicionais avulsos, nunca às mensalidades.</p>
    </div>
  );
}
