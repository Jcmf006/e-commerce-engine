import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/alho-bistro-logo.jpg.asset.json";

const links = [
  { to: "/", label: "Início" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/lojas", label: "Lojas" },
  { to: "/admin", label: "Admin" },
] as const;

export function Header() {
  const { totalItens } = useCart();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <img
              src={logo.url}
              alt="Alho Bistrô"
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <span className="truncate font-display text-lg font-semibold tracking-tight">
              Alho Bistrô
            </span>
          </Link>
          <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-accent font-medium" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Link
            to="/entrar"
            aria-label="Entrar na conta"
            className="hidden h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:grid"
          >
            <User className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            to="/carrinho"
            aria-label={`Carrinho com ${totalItens} itens`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden />
            {totalItens > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                {totalItens}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {aberto ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav aria-label="Mobile" className="border-t border-border/70 px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setAberto(false)}
              className="block rounded-md px-2 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
