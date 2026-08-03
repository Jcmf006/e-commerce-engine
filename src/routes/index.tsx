import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Sparkles } from "lucide-react";
import heroImg from "@/assets/banner_2.jpeg.asset.json";
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
      <section className="relative isolate overflow-hidden bg-background">
        <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
          <img
            src={heroImg}
            alt="Caneca de cerveja gelada com espuma dourada e espigas de trigo, promocional Alho Bistrô"
            width={1600}
            height={1000}
            className="mx-auto block max-h-[52vh] w-full rounded-2xl object-contain"
          />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-8 sm:px-6 sm:py-10">
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
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


      <section className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 sm:py-12">
        {[
          { icon: Clock, titulo: "Pronto em 35 min", texto: "Cozinha ágil, brasa sempre acesa." },
          { icon: MapPin, titulo: "Retirada agendada", texto: "Escolha loja e horário no checkout." },
          { icon: Sparkles, titulo: "Feito na hora", texto: "Ingredientes frescos e preparo artesanal." },
        ].map(({ icon: Icon, titulo, texto }) => (
          <div key={titulo} className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
            <Icon className="h-5 w-5 text-accent" aria-hidden />
            <h2 className="mt-3 font-display text-base sm:text-lg">{titulo}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-2xl sm:text-3xl">Favoritos da casa</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Os pratos que mais saem da nossa brasa.
            </p>
          </div>
          <Link
            to="/cardapio"
            className="shrink-0 text-sm text-accent underline-offset-4 hover:underline"
          >
            Ver tudo
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {destaques.map((p) => (
            <ProductCard key={p.id} prato={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:mt-16 sm:px-6">
        <div className="bloco-destaque flex flex-col items-start gap-6 rounded-2xl p-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-12">
          <div className="min-w-0">
            <h2 className="font-display text-2xl text-foreground sm:text-3xl">Peça agora</h2>
            <p className="mt-2 max-w-md text-sm text-foreground/85">
              Delivery rápido ou retirada na loja: seu prato favorito sai quentinho da nossa cozinha.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="botao-destaque w-full font-semibold sm:w-auto"
          >
            <Link to="/cardapio">Ver cardápio</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
