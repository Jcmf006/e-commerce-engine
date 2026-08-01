import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CATEGORIAS, PEDIDOS, PRATOS, VENDAS_SEMANA, type Prato } from "@/data/menu";
import { brl } from "@/utils/format";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel administrativo — Bistrô Alho" },
      { name: "description", content: "Gestão de pratos, pedidos, estoque e relatórios do Bistrô Alho." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel administrativo — Bistrô Alho" },
      { property: "og:description", content: "Gestão de cardápio, pedidos e relatórios." },
    ],
  }),
  component: Admin,
});

const statusCor: Record<string, string> = {
  Pendente: "bg-muted text-muted-foreground",
  Pago: "bg-accent/20 text-accent",
  Enviado: "bg-primary/20 text-primary",
  Entregue: "bg-secondary text-foreground",
};

function Admin() {
  const [pratos, setPratos] = useState<Prato[]>(PRATOS);
  const [editando, setEditando] = useState<Prato | null>(null);
  const [form, setForm] = useState({ nome: "", preco: "", categoria: CATEGORIAS[0], estoque: "" });

  const faturamento = VENDAS_SEMANA.reduce((s, d) => s + d.total, 0);
  const maxVenda = Math.max(...VENDAS_SEMANA.map((d) => d.total));
  const baixoEstoque = pratos.filter((p) => p.estoque <= 10);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    const preco = Number(form.preco);
    const estoque = Number(form.estoque);
    if (!form.nome.trim() || Number.isNaN(preco) || preco <= 0 || Number.isNaN(estoque)) {
      toast.error("Preencha nome, preço e estoque válidos");
      return;
    }
    if (editando) {
      setPratos((atual) =>
        atual.map((p) =>
          p.id === editando.id
            ? { ...p, nome: form.nome, preco, categoria: form.categoria, estoque }
            : p,
        ),
      );
      toast.success("Prato atualizado");
    } else {
      const novo: Prato = {
        id: crypto.randomUUID(),
        slug: form.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        nome: form.nome,
        descricao: "Novo item do cardápio.",
        descricaoLonga: "Novo item do cardápio cadastrado pelo painel administrativo.",
        preco,
        categoria: form.categoria,
        imagem: PRATOS[0]!.imagem,
        avaliacao: 0,
        avaliacoes: 0,
        estoque,
      };
      setPratos((atual) => [novo, ...atual]);
      toast.success("Prato criado");
    }
    setEditando(null);
    setForm({ nome: "", preco: "", categoria: CATEGORIAS[0], estoque: "" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate font-display text-4xl">Painel administrativo</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Cardápio, pedidos, estoque e relatórios da semana.
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Faturamento (7 dias)", valor: brl(faturamento) },
          { label: "Pedidos ativos", valor: String(PEDIDOS.filter((p) => p.status !== "Entregue").length) },
          { label: "Itens no cardápio", valor: String(pratos.length) },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-border/70 bg-card p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
            <p className="mt-2 font-display text-2xl">{kpi.valor}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="produtos" className="mt-10">
        <TabsList>
          <TabsTrigger value="produtos">Produtos</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="produtos" className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
            <table className="w-full text-sm">
              <caption className="sr-only">Lista de pratos cadastrados</caption>
              <thead className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="p-4">Prato</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Preço</th>
                  <th className="p-4">Estoque</th>
                  <th className="p-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pratos.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0">
                    <td className="p-4">{p.nome}</td>
                    <td className="p-4 text-muted-foreground">{p.categoria}</td>
                    <td className="p-4">{brl(p.preco)}</td>
                    <td className="p-4">
                      <span className={p.estoque <= 10 ? "text-primary" : ""}>{p.estoque}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`Editar ${p.nome}`}
                          onClick={() => {
                            setEditando(p);
                            setForm({
                              nome: p.nome,
                              preco: String(p.preco),
                              categoria: p.categoria,
                              estoque: String(p.estoque),
                            });
                          }}
                          className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary"
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          aria-label={`Excluir ${p.nome}`}
                          onClick={() => {
                            setPratos((atual) => atual.filter((x) => x.id !== p.id));
                            toast.success("Prato removido");
                          }}
                          className="grid h-8 w-8 place-items-center rounded-md hover:bg-secondary hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form onSubmit={salvar} className="h-fit space-y-4 rounded-xl border border-border/70 bg-card p-5">
            <h2 className="font-display text-lg">{editando ? "Editar prato" : "Novo prato"}</h2>
            <div>
              <Label htmlFor="admin-nome">Nome</Label>
              <Input
                id="admin-nome"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                maxLength={80}
              />
            </div>
            <div>
              <Label htmlFor="admin-preco">Preço (R$)</Label>
              <Input
                id="admin-preco"
                inputMode="decimal"
                value={form.preco}
                onChange={(e) => setForm({ ...form, preco: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="admin-categoria">Categoria</Label>
              <select
                id="admin-categoria"
                value={form.categoria}
                onChange={(e) => setForm({ ...form, categoria: e.target.value as Prato["categoria"] })}
                className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="admin-estoque">Estoque</Label>
              <Input
                id="admin-estoque"
                inputMode="numeric"
                value={form.estoque}
                onChange={(e) => setForm({ ...form, estoque: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Plus className="mr-1 h-4 w-4" aria-hidden />
                {editando ? "Salvar" : "Criar"}
              </Button>
              {editando && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setEditando(null);
                    setForm({ nome: "", preco: "", categoria: CATEGORIAS[0], estoque: "" });
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="pedidos" className="mt-6">
          <div className="overflow-x-auto rounded-xl border border-border/70 bg-card">
            <table className="w-full text-sm">
              <caption className="sr-only">Pedidos recentes</caption>
              <thead className="border-b border-border text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="p-4">Pedido</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Itens</th>
                  <th className="p-4">Data</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {PEDIDOS.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0">
                    <td className="p-4 font-medium">{p.id}</td>
                    <td className="p-4 text-muted-foreground">{p.cliente}</td>
                    <td className="p-4">{p.itens}</td>
                    <td className="p-4 text-muted-foreground">{p.data}</td>
                    <td className="p-4">{brl(p.total)}</td>
                    <td className="p-4">
                      <span className={`rounded-full px-3 py-1 text-xs ${statusCor[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="relatorios" className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h2 className="font-display text-lg">Vendas por dia</h2>
            <ul className="mt-5 space-y-3">
              {VENDAS_SEMANA.map((d) => (
                <li key={d.dia} className="grid grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="text-xs text-muted-foreground">{d.dia}</span>
                  <span className="h-2 rounded-full bg-secondary">
                    <span
                      className="block h-2 rounded-full gradiente-brasa"
                      style={{ width: `${(d.total / maxVenda) * 100}%` }}
                    />
                  </span>
                  <span className="text-xs">{brl(d.total)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border/70 bg-card p-5">
            <h2 className="flex items-center gap-2 font-display text-lg">
              <AlertTriangle className="h-4 w-4 text-primary" aria-hidden />
              Alertas de estoque
            </h2>
            {baixoEstoque.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Estoque saudável em todos os itens.</p>
            ) : (
              <ul className="mt-4 space-y-2 text-sm">
                {baixoEstoque.map((p) => (
                  <li key={p.id} className="flex justify-between gap-3 border-b border-border/50 pb-2">
                    <span className="min-w-0 truncate">{p.nome}</span>
                    <span className={p.estoque === 0 ? "text-destructive" : "text-primary"}>
                      {p.estoque === 0 ? "Esgotado" : `${p.estoque} un.`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
