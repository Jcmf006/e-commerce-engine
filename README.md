# Bistrô Alho — Loja online

Loja online (restaurante) construída com TanStack Start, React 19, Tailwind CSS v4 e shadcn/ui.

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Home com hero, destaques e Clube Alho |
| `/cardapio` | Catálogo com busca (debounce), filtros de categoria, preço, avaliação e disponibilidade |
| `/prato/$slug` | Página do prato com variações, quantidade e sugestões |
| `/carrinho` | Carrinho persistente (localStorage), frete por CEP e cupom |
| `/checkout` | Identificação, endereço com ViaCEP, pagamento (Pix/Cartão/Boleto — sandbox) |
| `/pedido/$codigo` | Confirmação com número do pedido |
| `/entrar` | Login/cadastro (UI; autenticação real ao ligar o backend) |
| `/lojas` | Unidades e horários para retirada |
| `/admin` | Painel: CRUD de pratos, pedidos, relatórios e alertas de estoque |

## Estrutura

```
src/
  assets/       imagens dos pratos e hero
  components/
    molecules/  ProductCard
    organisms/  Header, Footer
    ui/         shadcn
  context/      CartContext (carrinho global + localStorage)
  data/         menu.ts (dados mockados: pratos, pedidos, cupons, lojas)
  routes/       rotas (file-based routing)
  utils/        formatação de moeda e código de pedido
```

## Rodando

```bash
bun install
bun run dev     # http://localhost:8080
bun run build   # build de produção
```

## Estado atual e próximos passos

Front-end completo com dados mockados. Próxima etapa: ligar o backend (Lovable Cloud) para
autenticação real, catálogo e pedidos no banco, cupons validados no servidor e pagamento em sandbox.

## Cupons de teste

- `ALHO10` — 10% de desconto
- `BRASA20` — 20% de desconto
