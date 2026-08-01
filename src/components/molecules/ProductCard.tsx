import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { Prato } from "@/data/menu";
import { brl } from "@/utils/format";

export function ProductCard({ prato }: { prato: Prato }) {
  const { adicionar } = useCart();
  const esgotado = prato.estoque === 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card transition-colors hover:border-accent/50">
      <Link
        to="/prato/$slug"
        params={{ slug: prato.slug }}
        className="relative block aspect-square overflow-hidden"
      >
        <img
          src={prato.imagem}
          alt={prato.nome}
          loading="lazy"
          width={900}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {prato.precoDe && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Oferta
          </span>
        )}
        {esgotado && (
          <span className="absolute inset-0 grid place-items-center bg-background/70 text-sm font-semibold uppercase tracking-widest">
            Esgotado
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 font-display text-base leading-snug">
            <Link to="/prato/$slug" params={{ slug: prato.slug }} className="hover:text-accent">
              {prato.nome}
            </Link>
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-accent">
            <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
            {prato.avaliacao.toFixed(1)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{prato.descricao}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            {prato.precoDe && (
              <span className="block text-xs text-muted-foreground line-through">
                {brl(prato.precoDe)}
              </span>
            )}
            <span className="font-display text-lg">{brl(prato.preco)}</span>
          </div>
          <Button
            size="sm"
            disabled={esgotado}
            onClick={() => {
              adicionar({
                id: prato.id,
                slug: prato.slug,
                nome: prato.nome,
                imagem: prato.imagem,
                preco: prato.preco,
                quantidade: 1,
                variacoes: {},
              });
              toast.success(`${prato.nome} adicionado ao carrinho`);
            }}
          >
            Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
}
