export type Market = "BRL" | "USD";

/** Valores em centavos inteiros, uma tabela comercial independente por mercado. */
export type MarketPrices = Record<Market, number>;

export interface Price {
  /** Centavos por mercado. */
  amount: MarketPrices;
  /** Valor "a partir de" (item com "+"): mínimo sujeito à análise de complexidade. */
  isMinimum?: boolean;
}

export type ProjectKind = "landing" | "institutional" | "ecommerce";

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  kind: ProjectKind;
  price: Price;
  /** Exige análise de escopo antes de fechar o valor. */
  needsScopeReview?: boolean;
}

export interface QuantityRule {
  min: number;
  max: number;
  defaultValue: number;
}

export interface ExtraOption {
  id: string;
  name: string;
  description: string;
  price: Price;
  /** Quando definido, o extra aceita quantidade (preço unitário × quantidade). */
  quantity?: QuantityRule;
  /** Unidade exibida ao lado do preço, ex.: "por página". */
  unit?: string;
}

export interface PlanOption {
  id: string;
  name: string;
  description: string;
  /** Preço mensal. `null` significa sem hospedagem BitsByte. */
  price: Price | null;
  /** Plano indicado para projetos de e-commerce. */
  forEcommerce?: boolean;
}

export type ExtraSelection = Record<string, number>;

export interface QuoteState {
  market: Market;
  serviceId: string;
  additionalPages: number;
  extras: ExtraSelection;
  planId: string;
  discountPercent: number;
}

export interface QuoteLine {
  id: string;
  label: string;
  /** Detalhe de quantidade, ex.: "2 × R$ 200". */
  detail?: string;
  total: number;
  isMinimum: boolean;
}

export interface Quote {
  market: Market;
  service: ServiceOption;
  plan: PlanOption;
  lines: QuoteLine[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  developmentTotal: number;
  monthly: { amount: number; isMinimum: boolean } | null;
  /** O total de desenvolvimento é uma estimativa mínima. */
  isMinimum: boolean;
  needsScopeReview: boolean;
  /** Plano mensal incompatível com o tipo de projeto, precisa de validação. */
  planNeedsValidation: boolean;
}
