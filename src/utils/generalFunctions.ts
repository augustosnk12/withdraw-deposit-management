/**
 * Mask label to brazilian currency format
 */
export function maskBrazilCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
