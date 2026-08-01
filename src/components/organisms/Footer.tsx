import { Link } from "@tanstack/react-router";
import { LOJAS } from "@/data/menu";

export function Footer() {
  return (
    <footer className="mt-16 border-t sm:mt-24 border-border/70 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl">Alho Bistro</h3>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Receitas que atravessam gerações
            <br />
            Elegância no ambiente e excelência no prato
            <br />
            Nova essência da tradição
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
          </ul>
        </div>
        <div>
          <h3 className="font-display text-sm uppercase tracking-widest text-accent">Unidade</h3>
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
