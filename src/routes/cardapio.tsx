import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CATEGORIAS, PRATOS } from "@/data/menu";
import { brl } from "@/utils/format";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Bistrô Alho" },
      {
        name: "description",
        content:
          "Explore o cardápio do Bistrô Alho: entradas, carnes na brasa, peixes, burgers, saladas e sobremesas com filtros e busca.",
      },
      { property: "og:title", content: "Cardápio — Bistrô Alho" },
      {
        property: "og:description",
        content: "Entradas, carnes na brasa, peixes, burgers e sobremesas do Bistrô Alho.",
      },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  const [busca, setBusca] = useState("");
  const [buscaDebounced, setBuscaDebounced] = useState("");
  const [categoria, setCategoria] = useState<string>("Todas");
  const [precoMax, setPrecoMax] = useState(150);
  const [notaMin, setNotaMin] = useState(0);
  const [soDisponiveis, setSoDisponiveis] = useState(false);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBuscaDebounced(busca.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [busca]);

  const resultados = useMemo(
    () =>
      PRATOS.filter((p) => {
        if (categoria !== "Todas" && p.categoria !== categoria) return false;
        if (p.preco > precoMax) return false;
        if (p.avaliacao < notaMin) return false;
        if (soDisponiveis && p.estoque === 0) return false;
        if (
          buscaDebounced &&
          !`${p.nome} ${p.descricao} ${p.categoria}`.toLowerCase().includes(buscaDebounced)
        )
          return false;
        return true;
      }),
    [buscaDebounced, categoria, precoMax, notaMin, soDisponiveis],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl sm:text-4xl">Cardápio</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {resultados.length} {resultados.length === 1 ? "prato encontrado" : "pratos encontrados"}
      </p>

      <Button
        type="button"
        variant="outline"
        className="mt-6 w-full lg:hidden"
        aria-expanded={filtrosAbertos}
        onClick={() => setFiltrosAbertos((v) => !v)}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden />
        {filtrosAbertos ? "Ocultar filtros" : "Filtrar e buscar"}
      </Button>

      <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside
          className={`${filtrosAbertos ? "block" : "hidden"} space-y-6 rounded-xl border border-border/70 bg-card p-4 sm:p-5 lg:sticky lg:top-24 lg:block lg:self-start`}
        >
          <div>
            <Label htmlFor="busca">Buscar</Label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="busca"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Ex.: costela"
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <span className="text-sm font-medium">Categoria</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Todas", ...CATEGORIAS].map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={categoria === c}
                  onClick={() => setCategoria(c)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    categoria === c
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="preco">Preço até {brl(precoMax)}</Label>
            <Slider
              id="preco"
              className="mt-3"
              min={20}
              max={150}
              step={5}
              value={[precoMax]}
              onValueChange={(v) => setPrecoMax(v[0] ?? 150)}
            />
          </div>

          <div>
            <span className="text-sm font-medium">Avaliação mínima</span>
            <div className="mt-2 flex gap-2">
              {[0, 4.5, 4.7, 4.9].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={notaMin === n}
                  onClick={() => setNotaMin(n)}
                  className={`rounded-md border px-2.5 py-1 text-xs ${
                    notaMin === n
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n === 0 ? "Todas" : `${n}+`}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="disponiveis">Somente disponíveis</Label>
            <Switch id="disponiveis" checked={soDisponiveis} onCheckedChange={setSoDisponiveis} />
          </div>

          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              setBusca("");
              setCategoria("Todas");
              setPrecoMax(150);
              setNotaMin(0);
              setSoDisponiveis(false);
            }}
          >
            Limpar filtros
          </Button>
        </aside>

        <div>
          {resultados.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              Nenhum prato encontrado com esses filtros.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {resultados.map((p) => (
                <ProductCard key={p.id} prato={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
