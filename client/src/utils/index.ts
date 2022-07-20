export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("pt-br", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const toCurrency = (
  value: number,
  formatOptions = {
    style: "currency",
    currency: "BRL",
  }
) => {
  return new Intl.NumberFormat("pt-br", formatOptions).format(value);
};
