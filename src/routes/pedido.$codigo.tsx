import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pedido/$codigo")({
  head: () => ({
    meta: [
      { title: "Pedido confirmado — Bistrô Alho" },
      { name: "description", content: "Seu pedido foi confirmado e já está indo para a brasa." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Pedido confirmado — Bistrô Alho" },
      { property: "og:description", content: "Acompanhe o preparo do seu pedido." },
    ],
  }),
  component: PedidoConfirmado,
});

function PedidoConfirmado() {
  const { codigo } = Route.useParams();

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <CheckCircle2 className="mx-auto h-14 w-14 text-accent" aria-hidden />
      <h1 className="mt-6 font-display text-4xl">Pedido confirmado!</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Número do pedido:{" "}
        <strong className="font-display text-base text-foreground">{codigo}</strong>
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Já colocamos tudo na brasa. Você receberá atualizações por e-mail e pode acompanhar o status
        pelo painel da sua conta. Tempo estimado: 35 a 50 minutos.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/cardapio">Pedir mais alguma coisa</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
}
