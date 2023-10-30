export const formatCurrency = (price: number): string => {
  return price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};
