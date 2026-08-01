export const brl = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const gerarCodigoPedido = () =>
  "BA-" + Math.floor(10000 + Math.random() * 89999).toString();
