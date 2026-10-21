import type { ExtraOption, PlanOption, QuoteState, ServiceOption } from "@/types/pricing";

/** Todos os valores em centavos. BRL e USD são tabelas comerciais independentes. */
const brl = (reais: number) => reais * 100;
const usd = (dollars: number) => dollars * 100;

export const SERVICES: readonly ServiceOption[] = [
  {
    id: "landing",
    name: "Landing page",
    description: "1 página",
    kind: "landing",
    price: { amount: { BRL: brl(790), USD: usd(299) } },
  },
  {
    id: "institutional",
    name: "Site institucional",
    description: "Até 4 páginas",
    kind: "institutional",
    price: { amount: { BRL: brl(1490), USD: usd(599) } },
  },
  {
    id: "ecommerce-basic",
    name: "E-commerce básico",
    description: "Loja virtual essencial",
    kind: "ecommerce",
    price: { amount: { BRL: brl(2490), USD: usd(999) } },
  },
  {
    id: "ecommerce-intermediate",
    name: "E-commerce intermediário",
    description: "Loja com mais recursos",
    kind: "ecommerce",
    price: { amount: { BRL: brl(3990), USD: usd(1599) } },
  },
  {
    id: "ecommerce-advanced",
    name: "E-commerce avançado",
    description: "Customizado, sob análise",
    kind: "ecommerce",
    price: { amount: { BRL: brl(6990), USD: usd(2799) }, isMinimum: true },
    needsScopeReview: true,
  },
];

export const ADDITIONAL_PAGE = {
  name: "Página adicional",
  price: { amount: { BRL: brl(200), USD: usd(80) } },
  quantity: { min: 0, max: 30, defaultValue: 0 },
} as const;

export const EXTRAS: readonly ExtraOption[] = [
  {
    id: "advanced-form",
    name: "Formulário avançado",
    description: "Campos condicionais e validações",
    price: { amount: { BRL: brl(150), USD: usd(60) } },
  },
  {
    id: "google-analytics",
    name: "Integração Google Analytics",
    description: "Medição de acessos e conversões",
    price: { amount: { BRL: brl(150), USD: usd(60) } },
  },
  {
    id: "blog",
    name: "Blog com painel administrativo",
    description: "Publicação de conteúdo pelo cliente",
    price: { amount: { BRL: brl(450), USD: usd(180) } },
  },
  {
    id: "booking",
    name: "Sistema de agendamento",
    description: "Reservas online de horários",
    price: { amount: { BRL: brl(500), USD: usd(200) }, isMinimum: true },
  },
  {
    id: "bilingual",
    name: "Site em dois idiomas",
    description: "Versão traduzida do conteúdo",
    price: { amount: { BRL: brl(500), USD: usd(200) }, isMinimum: true },
  },
  {
    id: "animations",
    name: "Animações avançadas",
    description: "Interações e movimento personalizados",
    price: { amount: { BRL: brl(300), USD: usd(120) }, isMinimum: true },
  },
  {
    id: "crm",
    name: "Integração com CRM",
    description: "Envio de contatos para o seu CRM",
    price: { amount: { BRL: brl(500), USD: usd(200) }, isMinimum: true },
  },
  {
    id: "copywriting",
    name: "Copywriting por página",
    description: "Textos escritos para cada página",
    price: { amount: { BRL: brl(150), USD: usd(60) } },
    quantity: { min: 1, max: 30, defaultValue: 1 },
    unit: "por página",
  },
  {
    id: "extra-revision",
    name: "Rodada adicional de alterações",
    description: "Além das duas rodadas inclusas",
    price: { amount: { BRL: brl(150), USD: usd(60) } },
    quantity: { min: 1, max: 10, defaultValue: 1 },
    unit: "por rodada",
  },
  {
    id: "maintenance-hour",
    name: "Hora adicional de manutenção",
    description: "Serviço avulso, não entra na mensalidade",
    price: { amount: { BRL: brl(100), USD: usd(40) } },
    quantity: { min: 1, max: 40, defaultValue: 1 },
    unit: "por hora",
  },
];

export const NO_HOSTING_PLAN_ID = "none";

export const PLANS: readonly PlanOption[] = [
  {
    id: "essential",
    name: "Essencial",
    description: "Hospedagem e suporte técnico básico",
    price: { amount: { BRL: brl(79), USD: usd(29) } },
  },
  {
    id: "plus",
    name: "Plus",
    description: "Hospedagem, suporte e até 1 hora de pequenas alterações por mês",
    price: { amount: { BRL: brl(149), USD: usd(49) } },
  },
  {
    id: "pro",
    name: "Pro",
    description: "Hospedagem, suporte e até 3 horas de pequenas alterações por mês",
    price: { amount: { BRL: brl(249), USD: usd(99) } },
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Hospedagem e manutenção básica de loja virtual",
    price: { amount: { BRL: brl(299), USD: usd(119) }, isMinimum: true },
    forEcommerce: true,
  },
  {
    id: NO_HOSTING_PLAN_ID,
    name: "Sem hospedagem BitsByte",
    description: "O cliente utiliza infraestrutura própria",
    price: null,
  },
];

export const BASE_PACKAGE_INCLUDES: readonly string[] = [
  "Design personalizado para a identidade visual do cliente.",
  "Layout responsivo para celular, tablet e computador.",
  "SEO básico: títulos, descrições, estrutura e indexação.",
  "Integração com WhatsApp e formulário de contato simples.",
  "Configuração inicial e publicação do site.",
  "Até duas rodadas de alterações durante o desenvolvimento.",
];

export const BASE_PACKAGE_NOTES: readonly string[] = [
  "No pacote institucional, as quatro páginas são páginas comuns, como Home, Sobre, Serviços e Contato.",
  "Funcionalidades complexas, integrações específicas e páginas muito extensas são orçadas separadamente.",
];

export const HOSTING_RULES: readonly string[] = [
  "Domínio pago separadamente pelo cliente e registrado na titularidade dele.",
  "Serviços e licenças de terceiros não estão inclusos.",
  "Pequenas alterações incluem substituição de imagens, atualização de textos, links e informações de contato. Novas funcionalidades e mudanças estruturais não são pequenas alterações.",
  "A mensalidade começa na publicação do site, quando a hospedagem é administrada pela BitsByte.",
  "30 dias de pequenos ajustes de conteúdo após a entrega, sem prejuízo da responsabilidade por defeitos do desenvolvimento.",
];

export const MAX_DISCOUNT_PERCENT = 15;

export const DEFAULT_STATE: QuoteState = {
  market: "BRL",
  serviceId: "landing",
  additionalPages: 0,
  extras: {},
  planId: "essential",
  discountPercent: 0,
};
