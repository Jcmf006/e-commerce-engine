import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { LOJAS } from "@/data/menu";

export const Route = createFileRoute("/lojas")({
  head: () => ({
    meta: [
      { title: "Nossa loja — Bistrô Alho" },
      {
        name: "description",
        content:
          "Bistrô Alho em Aracaju/SE: R. Manoel Gomes da Rocha, 311 — Luzia. Peça online e retire no balcão.",
      },
      { property: "og:title", content: "Nossa loja — Bistrô Alho" },
      { property: "og:description", content: "Endereço e horário da nossa unidade em Aracaju/SE." },
    ],
  }),
  component: Lojas,
});

function Lojas() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl">Nossa loja</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Peça online e retire no balcão sem fila. Escolha o horário na hora de finalizar.
      </p>

      <div className="mt-10 grid gap-5 sm:max-w-md">
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
