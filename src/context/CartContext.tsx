import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ItemCarrinho = {
  key: string;
  id: string;
  slug: string;
  nome: string;
  imagem: string;
  preco: number;
  quantidade: number;
  variacoes: Record<string, string>;
};

type CartContextValue = {
  itens: ItemCarrinho[];
  adicionar: (item: Omit<ItemCarrinho, "key">) => void;
  remover: (key: string) => void;
  atualizar: (key: string, quantidade: number) => void;
  limpar: () => void;
  subtotal: number;
  totalItens: number;
  pontos: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "bistro-alho-carrinho";

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) setItens(JSON.parse(salvo) as ItemCarrinho[]);
    } catch {
      /* ignora carrinho corrompido */
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (hidratado) localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
  }, [itens, hidratado]);

  const adicionar = useCallback((item: Omit<ItemCarrinho, "key">) => {
    const key = `${item.id}::${JSON.stringify(item.variacoes)}`;
    setItens((atual) => {
      const existente = atual.find((i) => i.key === key);
      if (existente) {
        return atual.map((i) =>
          i.key === key ? { ...i, quantidade: i.quantidade + item.quantidade } : i,
        );
      }
      return [...atual, { ...item, key }];
    });
  }, []);

  const remover = useCallback((key: string) => {
    setItens((atual) => atual.filter((i) => i.key !== key));
  }, []);

  const atualizar = useCallback((key: string, quantidade: number) => {
    setItens((atual) =>
      quantidade <= 0
        ? atual.filter((i) => i.key !== key)
        : atual.map((i) => (i.key === key ? { ...i, quantidade } : i)),
    );
  }, []);

  const limpar = useCallback(() => setItens([]), []);

  const subtotal = useMemo(
    () => itens.reduce((s, i) => s + i.preco * i.quantidade, 0),
    [itens],
  );
  const totalItens = useMemo(
    () => itens.reduce((s, i) => s + i.quantidade, 0),
    [itens],
  );

  const value = useMemo(
    () => ({
      itens,
      adicionar,
      remover,
      atualizar,
      limpar,
      subtotal,
      totalItens,
      pontos: Math.floor(subtotal),
    }),
    [itens, adicionar, remover, atualizar, limpar, subtotal, totalItens],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de CartProvider");
  return ctx;
}
