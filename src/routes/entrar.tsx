import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — Bistrô Alho" },
      {
        name: "description",
        content: "Acesse sua conta para acompanhar pedidos e repetir seus pratos favoritos.",
      },
      { property: "og:title", content: "Entrar ou criar conta — Bistrô Alho" },
      { property: "og:description", content: "Acompanhe pedidos e recompre em 1 clique." },
    ],
  }),
  component: Entrar,
});

function Entrar() {
  const [modo, setModo] = useState<"login" | "cadastro">("login");

  return (
    <div className="mx-auto max-w-md px-4 py-20 sm:px-6">
      <h1 className="font-display text-3xl">
        {modo === "login" ? "Entrar na conta" : "Criar conta"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Acompanhe seus pedidos e recompre em 1 clique.
      </p>

      <form
        className="mt-8 space-y-4 rounded-xl border border-border/70 bg-card p-6"
        onSubmit={(e) => {
          e.preventDefault();
          toast.info("Autenticação real chega quando ligarmos o backend do projeto.");
        }}
      >
        {modo === "cadastro" && (
          <div>
            <Label htmlFor="nome-conta">Nome</Label>
            <Input id="nome-conta" required maxLength={100} />
          </div>
        )}
        <div>
          <Label htmlFor="email-conta">E-mail</Label>
          <Input id="email-conta" type="email" required maxLength={255} />
        </div>
        <div>
          <Label htmlFor="senha-conta">Senha</Label>
          <Input id="senha-conta" type="password" required minLength={6} />
        </div>
        <Button type="submit" className="w-full">
          {modo === "login" ? "Entrar" : "Criar conta"}
        </Button>
        <button
          type="button"
          onClick={() => setModo(modo === "login" ? "cadastro" : "login")}
          className="w-full text-center text-xs text-muted-foreground hover:text-accent"
        >
          {modo === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
        </button>
      </form>
    </div>
  );
}
