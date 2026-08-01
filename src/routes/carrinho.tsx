import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { CUPONS } from "@/data/menu";
import { brl } from "@/utils/format";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Bistrô Alho" },
      { name: "description", content: "Revise seus pratos, aplique cupom e calcule o frete." },
      { property: "og:title", content: "Carrinho — Bistrô Alho" },
      { property: "og:description", content: "Revise seus pratos antes de finalizar o pedido." },
    ],
  }),
  component: Carrinho,
});

function Carrinho() {
  const { itens, atualizar, remover, subtotal } = useCart();
  const [cupom, setCupom] = useState("");
  const [aplicado, setAplicado] = useState<{ codigo: string; desconto: number } | null>(null);
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState<number | null>(null);

  const desconto = aplicado ? subtotal * aplicado.desconto : 0;
  const total = Math.max(0, subtotal - desconto) + (frete ?? 0);

  if (itens.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl sm:text-3xl">Seu carrinho está vazio</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Que tal começar pela nossa Cebola em Flor?
        </p>
        <Button asChild className="mt-6">
          <Link to="/cardapio">Ver cardápio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl sm:text-4xl">Seu carrinho</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <ul className="space-y-4">
          {itens.map((item) => (
            <li
              key={item.key}
              className="grid grid-cols-[80px_minmax(0,1fr)] items-center gap-4 rounded-xl border border-border/70 bg-card p-4 sm:grid-cols-[96px_minmax(0,1fr)_auto]"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                loading="lazy"
                width={900}
                height={900}
                className="h-20 w-20 rounded-lg object-cover sm:h-24 sm:w-24"
              />
              <div className="min-w-0">
                <h2 className="truncate font-display text-base">{item.nome}</h2>
                {Object.entries(item.variacoes).length > 0 && (
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {Object.entries(item.variacoes)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(" • ")}
                  </p>
                )}
                <p className="mt-1 text-sm text-muted-foreground">{brl(item.preco)} cada</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label={`Diminuir ${item.nome}`}
                      onClick={() => atualizar(item.key, item.quantidade - 1)}
                      className="grid h-9 w-9 place-items-center rounded-l-full hover:bg-secondary"
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantidade}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar ${item.nome}`}
                      onClick={() => atualizar(item.key, item.quantidade + 1)}
                      className="grid h-9 w-9 place-items-center rounded-r-full hover:bg-secondary"
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => remover(item.key)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden /> Remover
                  </button>
                </div>
              </div>
              <span className="col-span-2 text-right font-display text-lg sm:col-span-1">
                {brl(item.preco * item.quantidade)}
              </span>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-5 rounded-xl border border-border/70 bg-card p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Resumo</h2>

          <div>
            <Label htmlFor="cep">Frete por CEP</Label>
            <div className="mt-2 flex gap-2">
              <Input
                id="cep"
                inputMode="numeric"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  const limpo = cep.replace(/\D/g, "");
                  if (limpo.length !== 8) {
                    toast.error("Informe um CEP válido com 8 dígitos");
                    return;
                  }
                  const valor = Number(limpo.slice(0, 1)) <= 1 ? 9.9 : 18.9;
                  setFrete(valor);
                  toast.success(`Frete calculado: ${brl(valor)}`);
                }}
              >
                Calcular
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="cupom">Cupom de desconto</Label>
            <div className="mt-2 flex gap-2">
              <Input
                id="cupom"
                placeholder="ALHO10"
                value={cupom}
                onChange={(e) => setCupom(e.target.value.toUpperCase())}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  const encontrado = CUPONS[cupom];
                  if (!encontrado) {
                    toast.error("Cupom inválido");
                    return;
                  }
                  setAplicado({ codigo: cupom, desconto: encontrado.desconto });
                  toast.success(`Cupom aplicado: ${encontrado.descricao}`);
                }}
              >
                Aplicar
              </Button>
            </div>
          </div>

          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{brl(subtotal)}</dd>
            </div>
            {aplicado && (
              <div className="flex justify-between text-accent">
                <dt>Desconto ({aplicado.codigo})</dt>
                <dd>-{brl(desconto)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd>{frete === null ? "a calcular" : brl(frete)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg">
              <dt>Total</dt>
              <dd>{brl(total)}</dd>
            </div>
          </dl>


          <Button asChild size="lg" className="w-full">
            <Link to="/checkout">Ir para o checkout</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
