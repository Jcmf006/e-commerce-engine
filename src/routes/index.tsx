import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-bistro.jpg";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Button } from "@/components/ui/button";
import { PRATOS } from "@/data/menu";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bistrô Alho — Carnes na brasa, peça online" },
      {
        name: "description",
        content:
          "Cardápio de carnes na brasa, entradas e sobremesas do Bistrô Alho. Peça online, retire na loja ou receba em casa.",
      },
      { property: "og:title", content: "Bistrô Alho — Carnes na brasa, peça online" },
      {
        property: "og:description",
        content: "Cardápio de carnes na brasa, entradas e sobremesas. Peça online em minutos.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const destaques = PRATOS.filter((p) => p.destaque);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Bife grelhado na brasa servido em frigideira de ferro sob luz de velas"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-background/25" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 md:py-36">
          <h1 className="max-w-2xl text-balance-title font-display text-3xl leading-[1.1] sm:text-5xl md:text-6xl md:leading-[1.05]">
            A brasa começa aqui. O resto entregamos na sua mesa.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
            Frango à Parmegiana que conquista pelo crocante e pelo cremoso: filé empanado na hora,
            frito na medida certa, coberto com molho de tomate artesanal e generosa camada de
            mussarela gratinada. Acompanha arroz soltinho. Peça pelo delivery ou retire na loja.
            Sabor que vira tradição!
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/cardapio">
                Ver cardápio <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/lojas">Peça e retire</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6">
        {[
          { icon: Clock, titulo: "Pronto em 35 min", texto: "Cozinha ágil, brasa sempre acesa." },
          { icon: MapPin, titulo: "Retirada agendada", texto: "Escolha loja e horário no checkout." },
          { icon: Sparkles, titulo: "Feito na hora", texto: "Ingredientes frescos e preparo artesanal." },
        ].map(({ icon: Icon, titulo, texto }) => (
          <div key={titulo} className="rounded-xl border border-border/70 bg-card p-5">
            <Icon className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="mt-3 font-display text-lg">{titulo}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">Favoritos da casa</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Os pratos que mais saem da nossa brasa.
            </p>
          </div>
          <Link
            to="/cardapio"
            className="text-sm text-accent underline-offset-4 hover:underline"
          >
            Ver tudo
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {destaques.map((p) => (
            <ProductCard key={p.id} prato={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <div className="bloco-destaque flex flex-wrap items-center justify-between gap-6 rounded-2xl p-8 sm:p-12">
          <div className="min-w-0">
            <h2 className="font-display text-3xl text-foreground">Peça agora</h2>
            <p className="mt-2 max-w-md text-sm text-foreground/85">
              Delivery rápido ou retirada na loja: seu prato favorito sai quentinho da nossa cozinha.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="botao-destaque font-semibold">
            <Link to="/cardapio">Ver cardápio</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
