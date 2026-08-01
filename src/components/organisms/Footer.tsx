import { Link } from "@tanstack/react-router";
import { LOJAS } from "@/data/menu";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl">Bistrô Alho</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Carnes na brasa, alho confitado e hospitalidade de bairro. Peça online, retire na loja
            ou receba em casa.
          </p>
        </div>
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-accent">Navegar</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/cardapio" className="hover:text-foreground">
                Cardápio completo
              </Link>
            </li>
            <li>
              <Link to="/carrinho" className="hover:text-foreground">
                Meu carrinho
              </Link>
            </li>
            <li>
              <Link to="/lojas" className="hover:text-foreground">
                Nossas lojas
              </Link>
            </li>
            <li>
              <Link to="/admin" className="hover:text-foreground">
                Painel administrativo
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-accent">Unidades</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {LOJAS.map((loja) => (
              <li key={loja.nome}>
                <span className="block text-foreground">{loja.nome}</span>
                {loja.endereco}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 px-4 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Bistrô Alho. Todos os direitos reservados.
      </div>
    </footer>
  );
}
