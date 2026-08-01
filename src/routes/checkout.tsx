import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, FileText, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { brl, gerarCodigoPedido } from "@/utils/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Bistrô Alho" },
      { name: "description", content: "Finalize seu pedido: identificação, entrega e pagamento." },
      { property: "og:title", content: "Checkout — Bistrô Alho" },
      { property: "og:description", content: "Identificação, endereço e pagamento em um só lugar." },
    ],
  }),
  component: Checkout,
});

type Pagamento = "cartao" | "pix" | "boleto";

function Checkout() {
  const { itens, subtotal, limpar } = useCart();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [numero, setNumero] = useState("");
  const [pagamento, setPagamento] = useState<Pagamento>("pix");
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const frete = subtotal > 250 ? 0 : 14.9;
  const total = subtotal + frete;

  async function buscarCep(valor: string) {
    const limpo = valor.replace(/\D/g, "");
    setCep(valor);
    if (limpo.length !== 8) return;
    setBuscandoCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
      const dados = (await res.json()) as {
        erro?: boolean;
        logradouro?: string;
        bairro?: string;
        localidade?: string;
        uf?: string;
      };
      if (dados.erro) {
        toast.error("CEP não encontrado");
        return;
      }
      setRua(dados.logradouro ?? "");
      setBairro(dados.bairro ?? "");
      setCidade(dados.localidade ?? "");
      setUf(dados.uf ?? "");
      toast.success("Endereço preenchido automaticamente");
    } catch {
      toast.error("Não foi possível consultar o CEP agora");
    } finally {
      setBuscandoCep(false);
    }
  }

  function finalizar(e: React.FormEvent) {
    e.preventDefault();
    if (itens.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }
    if (!nome.trim() || !email.includes("@") || !rua.trim() || !numero.trim()) {
      toast.error("Preencha os dados obrigatórios");
      return;
    }
    setEnviando(true);
    const codigo = gerarCodigoPedido();
    setTimeout(() => {
      limpar();
      navigate({ to: "/pedido/$codigo", params: { codigo } });
    }, 900);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl sm:text-4xl">Checkout</h1>

      <form onSubmit={finalizar} className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <fieldset className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
            <legend className="px-2 font-display text-lg">1. Identificação</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="nome">Nome completo *</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required maxLength={100} />
              </div>
              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={255}
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/entrar" className="text-accent hover:underline">
                Entrar
              </Link>
            </p>
          </fieldset>

          <fieldset className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
            <legend className="px-2 font-display text-lg">2. Endereço de entrega</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cep-checkout">CEP *</Label>
                <Input
                  id="cep-checkout"
                  inputMode="numeric"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => void buscarCep(e.target.value)}
                  required
                />
                {buscandoCep && <p className="mt-1 text-xs text-muted-foreground">Buscando…</p>}
              </div>
              <div>
                <Label htmlFor="rua">Rua *</Label>
                <Input id="rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="numero">Número *</Label>
                <Input id="numero" value={numero} onChange={(e) => setNumero(e.target.value)} required />
              </div>
              <div>
                <Label htmlFor="bairro">Bairro</Label>
                <Input id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="cidade">Cidade</Label>
                <Input id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="uf">UF</Label>
                <Input id="uf" maxLength={2} value={uf} onChange={(e) => setUf(e.target.value)} />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border/70 bg-card p-4 sm:p-5">
            <legend className="px-2 font-display text-lg">3. Pagamento</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { id: "pix", label: "Pix", icon: QrCode, nota: "Aprovação imediata" },
                { id: "cartao", label: "Cartão", icon: CreditCard, nota: "Até 6x sem juros" },
                { id: "boleto", label: "Boleto", icon: FileText, nota: "Compensa em 1 dia" },
              ].map(({ id, label, icon: Icon, nota }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={pagamento === id}
                  onClick={() => setPagamento(id as Pagamento)}
                  className={`rounded-lg border p-4 text-left transition-colors ${
                    pagamento === id
                      ? "border-accent bg-secondary"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                  <span className="mt-2 block text-sm font-medium">{label}</span>
                  <span className="text-xs text-muted-foreground">{nota}</span>
                </button>
              ))}
            </div>
            {pagamento === "cartao" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="cartao-numero">Número do cartão</Label>
                  <Input id="cartao-numero" inputMode="numeric" placeholder="0000 0000 0000 0000" />
                </div>
                <div>
                  <Label htmlFor="cartao-validade">Validade / CVV</Label>
                  <Input id="cartao-validade" placeholder="MM/AA — 000" />
                </div>
              </div>
            )}
            <p className="mt-4 text-xs text-muted-foreground">
              Ambiente de testes (sandbox): nenhum valor real é cobrado.
            </p>
          </fieldset>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border border-border/70 bg-card p-5 lg:sticky lg:top-24">
          <h2 className="font-display text-xl">Resumo do pedido</h2>
          <ul className="space-y-3 text-sm">
            {itens.map((i) => (
              <li key={i.key} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-muted-foreground">
                  {i.quantidade}x {i.nome}
                </span>
                <span className="shrink-0">{brl(i.preco * i.quantidade)}</span>
              </li>
            ))}
            {itens.length === 0 && (
              <li className="text-muted-foreground">Carrinho vazio.</li>
            )}
          </ul>
          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{brl(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Frete</dt>
              <dd>{frete === 0 ? "Grátis" : brl(frete)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-display text-lg">
              <dt>Total</dt>
              <dd>{brl(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="w-full" disabled={enviando}>
            {enviando ? "Processando…" : "Confirmar pedido"}
          </Button>
        </aside>
      </form>
    </div>
  );
}
