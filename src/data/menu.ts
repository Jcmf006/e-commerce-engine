import steak from "@/assets/prato-steak.jpg";
import costela from "@/assets/prato-costela.jpg";
import cebola from "@/assets/prato-cebola.jpg";
import paoAlho from "@/assets/prato-pao-alho.jpg";
import frango from "@/assets/prato-frango.jpg";
import salmao from "@/assets/prato-salmao.jpg";
import burger from "@/assets/prato-burger.jpg";
import salada from "@/assets/prato-salada.jpg";
import brownie from "@/assets/prato-brownie.jpg";

export type Categoria = "Entradas" | "Carnes" | "Peixes" | "Burgers" | "Saladas" | "Sobremesas";

export type Variacao = {
  nome: string;
  opcoes: { label: string; extra: number }[];
};

export type Prato = {
  id: string;
  slug: string;
  nome: string;
  descricao: string;
  descricaoLonga: string;
  preco: number;
  precoDe?: number;
  categoria: Categoria;
  imagem: string;
  avaliacao: number;
  avaliacoes: number;
  estoque: number;
  destaque?: boolean;
  variacoes?: Variacao[];
};

export const CATEGORIAS: Categoria[] = [
  "Entradas",
  "Carnes",
  "Peixes",
  "Burgers",
  "Saladas",
  "Sobremesas",
];

export const PRATOS: Prato[] = [
  {
    id: "1",
    slug: "cebola-em-flor",
    nome: "Cebola em Flor",
    descricao: "Cebola gigante empanada, crocante, com molho especial da casa.",
    descricaoLonga:
      "Nossa entrada assinatura: uma cebola inteira aberta em pétalas, empanada em tempero secreto e frita até o ponto exato de crocância. Servida com o molho Alho Ranch.",
    preco: 49.9,
    precoDe: 59.9,
    categoria: "Entradas",
    imagem: cebola,
    avaliacao: 4.9,
    avaliacoes: 1284,
    estoque: 40,
    destaque: true,
    variacoes: [
      {
        nome: "Molho",
        opcoes: [
          { label: "Alho Ranch", extra: 0 },
          { label: "Barbecue defumado", extra: 3 },
          { label: "Chipotle picante", extra: 3 },
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "pao-de-alho-confit",
    nome: "Pão de Alho Confit",
    descricao: "Pão rústico com manteiga de alho confitado e ervas frescas.",
    descricaoLonga:
      "Pão de fermentação natural assado na brasa, coberto com manteiga de alho confitado por 6 horas e finalizado com salsinha fresca.",
    preco: 26.9,
    categoria: "Entradas",
    imagem: paoAlho,
    avaliacao: 4.7,
    avaliacoes: 642,
    estoque: 8,
    variacoes: [
      {
        nome: "Tamanho",
        opcoes: [
          { label: "Individual", extra: 0 },
          { label: "Para compartilhar", extra: 14 },
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "ribeye-na-brasa",
    nome: "Ribeye na Brasa",
    descricao: "400g de ribeye maturado com manteiga de alho e alecrim.",
    descricaoLonga:
      "Ribeye maturado 28 dias, selado na brasa de carvão e finalizado com manteiga de alho e alecrim. Acompanha batata rústica ou purê trufado.",
    preco: 139.9,
    categoria: "Carnes",
    imagem: steak,
    avaliacao: 5,
    avaliacoes: 903,
    estoque: 22,
    destaque: true,
    variacoes: [
      {
        nome: "Ponto",
        opcoes: [
          { label: "Mal passado", extra: 0 },
          { label: "Ao ponto", extra: 0 },
          { label: "Bem passado", extra: 0 },
        ],
      },
      {
        nome: "Acompanhamento",
        opcoes: [
          { label: "Batata rústica", extra: 0 },
          { label: "Purê trufado", extra: 12 },
          { label: "Legumes na brasa", extra: 8 },
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "costela-bbq",
    nome: "Costela BBQ 8 Horas",
    descricao: "Costela suína defumada lentamente, glaceada no barbecue artesanal.",
    descricaoLonga:
      "Costela defumada por 8 horas em madeira de macieira e glaceada com nosso barbecue artesanal de melado e café.",
    preco: 118.9,
    precoDe: 132.9,
    categoria: "Carnes",
    imagem: costela,
    avaliacao: 4.8,
    avaliacoes: 771,
    estoque: 15,
    destaque: true,
    variacoes: [
      {
        nome: "Porção",
        opcoes: [
          { label: "Meia costela", extra: 0 },
          { label: "Costela inteira", extra: 45 },
        ],
      },
    ],
  },
  {
    id: "5",
    slug: "frango-parmegiana",
    nome: "Frango à Parmegiana",
    descricao: "Filé empanado, molho pomodoro e muçarela gratinada.",
    descricaoLonga:
      "Filé de frango empanado na hora, coberto com molho pomodoro de tomates italianos e muçarela de búfala gratinada.",
    preco: 74.9,
    categoria: "Carnes",
    imagem: frango,
    avaliacao: 4.6,
    avaliacoes: 388,
    estoque: 30,
  },
  {
    id: "6",
    slug: "salmao-grelhado",
    nome: "Salmão Grelhado",
    descricao: "Salmão na grelha com aspargos e manteiga de limão siciliano.",
    descricaoLonga:
      "Filé de salmão fresco grelhado no ponto, servido com aspargos salteados e manteiga de limão siciliano.",
    preco: 96.9,
    categoria: "Peixes",
    imagem: salmao,
    avaliacao: 4.7,
    avaliacoes: 254,
    estoque: 12,
  },
  {
    id: "7",
    slug: "burger-do-bistro",
    nome: "Burger do Bistrô",
    descricao: "Blend 180g, cheddar inglês, bacon caramelizado e pão brioche.",
    descricaoLonga:
      "Blend exclusivo de fraldinha e acém, cheddar inglês derretido, bacon caramelizado no melado e pão brioche artesanal.",
    preco: 62.9,
    categoria: "Burgers",
    imagem: burger,
    avaliacao: 4.8,
    avaliacoes: 526,
    estoque: 26,
    variacoes: [
      {
        nome: "Extras",
        opcoes: [
          { label: "Sem extras", extra: 0 },
          { label: "Cheddar extra", extra: 9 },
          { label: "Burger duplo", extra: 22 },
        ],
      },
    ],
  },
  {
    id: "8",
    slug: "caesar-do-chef",
    nome: "Caesar do Chef",
    descricao: "Alface romana, frango grelhado, croutons e parmesão.",
    descricaoLonga:
      "Alface romana crocante, frango grelhado na brasa, croutons de pão de alho e lascas generosas de parmesão com molho caesar da casa.",
    preco: 54.9,
    categoria: "Saladas",
    imagem: salada,
    avaliacao: 4.5,
    avaliacoes: 197,
    estoque: 0,
  },
  {
    id: "9",
    slug: "brownie-na-brasa",
    nome: "Brownie na Brasa",
    descricao: "Brownie quente, sorvete de baunilha e calda de caramelo salgado.",
    descricaoLonga:
      "Brownie de chocolate 70% servido quente, com sorvete de baunilha bourbon e calda de caramelo salgado.",
    preco: 38.9,
    categoria: "Sobremesas",
    imagem: brownie,
    avaliacao: 4.9,
    avaliacoes: 611,
    estoque: 35,
    destaque: true,
  },
];

export const getPrato = (slug: string) => PRATOS.find((p) => p.slug === slug);

export const CUPONS: Record<string, { desconto: number; descricao: string }> = {
  ALHO10: { desconto: 0.1, descricao: "10% de desconto" },
  BRASA20: { desconto: 0.2, descricao: "20% de desconto" },
};

export type Pedido = {
  id: string;
  cliente: string;
  total: number;
  status: "Pendente" | "Pago" | "Enviado" | "Entregue";
  data: string;
  itens: number;
};

export const PEDIDOS: Pedido[] = [
  { id: "BA-10241", cliente: "Marina Duarte", total: 268.7, status: "Entregue", data: "28/07", itens: 3 },
  { id: "BA-10242", cliente: "Rafael Lima", total: 139.9, status: "Enviado", data: "29/07", itens: 1 },
  { id: "BA-10243", cliente: "Camila Souza", total: 412.5, status: "Pago", data: "30/07", itens: 6 },
  { id: "BA-10244", cliente: "Tiago Nunes", total: 88.8, status: "Pendente", data: "31/07", itens: 2 },
  { id: "BA-10245", cliente: "Aline Prado", total: 197.4, status: "Pago", data: "01/08", itens: 4 },
];

export const VENDAS_SEMANA = [
  { dia: "Seg", total: 4200 },
  { dia: "Ter", total: 3800 },
  { dia: "Qua", total: 5100 },
  { dia: "Qui", total: 6200 },
  { dia: "Sex", total: 9400 },
  { dia: "Sáb", total: 11800 },
  { dia: "Dom", total: 8600 },
];

export const LOJAS = [
  {
    nome: "Bistrô Alho",
    endereco: "R. Manoel Gomes da Rocha, 311 — Luzia, Aracaju/SE",
    horario: "18h às 23h",
  },
];
