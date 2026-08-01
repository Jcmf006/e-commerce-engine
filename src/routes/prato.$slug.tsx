import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { PRATOS, getPrato, type Prato } from "@/data/menu";
import { brl } from "@/utils/format";

export const Route = createFileRoute("/prato/$slug")({
  loader: ({ params }): { prato: Prato } => {
    const prato = getPrato(params.slug);
    if (!prato) throw notFound();
    return { prato };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Prato indisponível — Bistrô Alho" }, { name: "robots", content: "noindex" }],
      };
    }
    const { prato } = loaderData;
    return {
      meta: [
        { title: `${prato.nome} — Bistrô Alho` },
        { name: "description", content: prato.descricao },
        { property: "og:title", content: `${prato.nome} — Bistrô Alho` },
        { property: "og:description", content: prato.descricao },
      ],
    };
  },
  component: PratoPage,
});

function PratoPage() {
  const { prato } = Route.useLoaderData() as { prato: Prato };
  const { adicionar } = useCart();
  const [quantidade, setQuantidade] = useState(1);
  const [escolhas, setEscolhas] = useState<Record<string, string>>(() =>
    Object.fromEntries((prato.variacoes ?? []).map((v) => [v.nome, v.opcoes[0]!.label])),
  );

  const extra = (prato.variacoes ?? []).reduce((soma, v) => {
    const op = v.opcoes.find((o) => o.label === escolhas[v.nome]);
    return soma + (op?.extra ?? 0);
  }, 0);
  const precoFinal = prato.preco + extra;
  const relacionados = PRATOS.filter((p) => p.id !== prato.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav aria-label="Trilha" className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Início
        </Link>{" "}
        /{" "}
        <Link to="/cardapio" className="hover:text-foreground">
          Cardápio
        </Link>{" "}
        / <span className="text-foreground">{prato.nome}</span>
      </nav>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div className="overflow-hidden rounded-2xl border border-border/70">
          <img
            src={prato.imagem}
            alt={prato.nome}
            width={900}
            height={900}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-accent">{prato.categoria}</span>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl">{prato.nome}</h1>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-accent">
              <Star className="h-4 w-4 fill-current" aria-hidden />
              {prato.avaliacao.toFixed(1)}
            </span>
            <span>({prato.avaliacoes} avaliações)</span>
          </div>
          <p className="mt-5 leading-relaxed text-muted-foreground">{prato.descricaoLonga}</p>

          <div className="mt-6 flex items-baseline gap-3">
            {prato.precoDe && (
              <span className="text-sm text-muted-foreground line-through">{brl(prato.precoDe)}</span>
            )}
            <span className="font-display text-2xl sm:text-3xl">{brl(precoFinal)}</span>
          </div>

          {(prato.variacoes ?? []).map((v) => (
            <fieldset key={v.nome} className="mt-6">
              <legend className="text-sm font-medium">{v.nome}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {v.opcoes.map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={escolhas[v.nome] === o.label}
                    onClick={() => setEscolhas((e) => ({ ...e, [v.nome]: o.label }))}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      escolhas[v.nome] === o.label
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                    }`}
                  >
                    {o.label}
                    {o.extra > 0 && ` +${brl(o.extra)}`}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex w-fit items-center rounded-full border border-border">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center rounded-l-full hover:bg-secondary"
              >
                <Minus className="h-4 w-4" aria-hidden />
              </button>
              <span className="w-10 text-center text-sm" aria-live="polite">
                {quantidade}
              </span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantidade((q) => q + 1)}
                className="grid h-11 w-11 place-items-center rounded-r-full hover:bg-secondary"
              >
                <Plus className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={prato.estoque === 0}
              onClick={() => {
                adicionar({
                  id: prato.id,
                  slug: prato.slug,
                  nome: prato.nome,
                  imagem: prato.imagem,
                  preco: precoFinal,
                  quantidade,
                  variacoes: escolhas,
                });
                toast.success(`${quantidade}x ${prato.nome} no carrinho`);
              }}
            >
              {prato.estoque === 0 ? "Esgotado" : `Adicionar • ${brl(precoFinal * quantidade)}`}
            </Button>
          </div>

          {prato.estoque > 0 && prato.estoque <= 10 && (
            <p className="mt-3 text-xs text-primary">
              Últimas {prato.estoque} porções disponíveis hoje.
            </p>
          )}
        </div>
      </div>

      <section className="mt-14 sm:mt-20">
        <h2 className="font-display text-xl sm:text-2xl">Quem pediu, pediu junto</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {relacionados.map((p) => (
            <ProductCard key={p.id} prato={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
