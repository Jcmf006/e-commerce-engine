import prato1 from "@/assets/prato_1.jpeg.asset.json";
import prato2 from "@/assets/prato_2.jpeg.asset.json";
import prato3 from "@/assets/prato_3.jpeg.asset.json";
import prato4 from "@/assets/prato_4.jpeg.asset.json";
import prato5 from "@/assets/prato_5.jpeg.asset.json";

export type Categoria = "Entradas" | "Carnes" | "Frutos do Mar" | "Massas";

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

export const CATEGORIAS: Categoria[] = ["Entradas", "Carnes", "Frutos do Mar", "Massas"];

export const PRATOS: Prato[] = [
  {
    id: "1",
    slug: "iscas-de-frango-empanadas",
    nome: "Iscas de Frango Empanadas",
    descricao: "Tiras de frango empanadas crocantes sobre mix de folhas frescas.",
    descricaoLonga:
      "Iscas de peito de frango marinadas em ervas, empanadas na hora em farinha crocante e fritas no ponto exato. Servidas sobre mix de folhas frescas com cebola roxa e molho da casa.",
    preco: 46.9,
    precoDe: 54.9,
    categoria: "Entradas",
    imagem: (prato2 as { url: string }).url,
    avaliacao: 4.8,
    avaliacoes: 512,
    estoque: 30,
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
    slug: "file-ao-molho-madeira",
    nome: "Filé ao Molho Madeira",
    descricao: "Iscas de filé ao molho madeira com arroz cremoso de parmesão.",
    descricaoLonga:
      "Iscas de filé bovino selado e finalizado em molho madeira encorpado com cebolas caramelizadas, acompanhado de arroz cremoso de parmesão.",
    preco: 89.9,
    categoria: "Carnes",
    imagem: (prato1 as { url: string }).url,
    avaliacao: 4.9,
    avaliacoes: 734,
    estoque: 20,
    destaque: true,
    variacoes: [
      {
        nome: "Acompanhamento",
        opcoes: [
          { label: "Arroz cremoso", extra: 0 },
          { label: "Purê trufado", extra: 12 },
          { label: "Legumes na manteiga", extra: 8 },
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "escondidinho-gratinado",
    nome: "Escondidinho Gratinado",
    descricao: "Purê aveludado de batata gratinado com parmesão e crosta dourada.",
    descricaoLonga:
      "Camada generosa de carne desfiada coberta por purê aveludado de batata, polvilhado com parmesão e gratinado até formar uma crosta dourada irresistível.",
    preco: 64.9,
    categoria: "Carnes",
    imagem: (prato3 as { url: string }).url,
    avaliacao: 4.7,
    avaliacoes: 389,
    estoque: 24,
    variacoes: [
      {
        nome: "Recheio",
        opcoes: [
          { label: "Carne desfiada", extra: 0 },
          { label: "Carne seca", extra: 10 },
          { label: "Frango cremoso", extra: 0 },
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "lasanha-a-bolonhesa",
    nome: "Lasanha à Bolonhesa",
    descricao: "Massa fresca, ragu bolonhesa, bechamel e queijo gratinado.",
    descricaoLonga:
      "Camadas de massa fresca intercaladas com ragu bolonhesa cozido lentamente, molho bechamel sedoso e muito queijo gratinado, finalizada com parmesão e manjericão.",
    preco: 72.9,
    precoDe: 82.9,
    categoria: "Massas",
    imagem: (prato4 as { url: string }).url,
    avaliacao: 4.9,
    avaliacoes: 826,
    estoque: 18,
    destaque: true,
    variacoes: [
      {
        nome: "Porção",
        opcoes: [
          { label: "Individual", extra: 0 },
          { label: "Para dois", extra: 38 },
        ],
      },
    ],
  },
  {
    id: "5",
    slug: "camarao-ao-molho-cremoso",
    nome: "Camarão ao Molho Cremoso",
    descricao: "Camarões salteados em molho cremoso com arroz de brócolis.",
    descricaoLonga:
      "Camarões grandes salteados na manteiga com abobrinha e tomate, envolvidos em molho cremoso levemente apimentado. Acompanha arroz de brócolis soltinho.",
    preco: 108.9,
    categoria: "Frutos do Mar",
    imagem: (prato5 as { url: string }).url,
    avaliacao: 5,
    avaliacoes: 421,
    estoque: 12,
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
    horario: "Terça a Dom | 11:15h às 15h",
  },
];
