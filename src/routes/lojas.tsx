import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { LOJAS } from "@/data/menu";

export const Route = createFileRoute("/lojas")({
  head: () => ({
    meta: [
      { title: "Nossas lojas — Bistrô Alho" },
      {
        name: "description",
        content: "Endereços e horários das unidades do Bistrô Alho em SP, RJ e BH. Peça e retire.",
      },
      { property: "og:title", content: "Nossas lojas — Bistrô Alho" },
      { property: "og:description", content: "Encontre a unidade mais próxima e agende sua retirada." },
    ],
  }),
  component: Lojas,
});

function Lojas() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl">Nossas lojas</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Peça online e retire no balcão sem fila. Escolha a unidade e o horário na hora de finalizar.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {LOJAS.map((loja) => (
          <article key={loja.nome} className="rounded-xl border border-border/70 bg-card p-5">
            <h2 className="font-display text-lg">{loja.nome}</h2>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              {loja.endereco}
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              Todos os dias, {loja.horario}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
