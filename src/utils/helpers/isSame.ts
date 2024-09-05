export const isSame = (a: PizzaCart, b: SelectPizza) => (
  a.name === b.name &&
  a.doughs.name === b.doughs.name &&
  a.size.name === b.size.name &&
  a.toppings
    .map((t) => t.name)
    .sort()
    .toString() ===
    b.toppings
      .map((t) => t.name)
      .sort()
      .toString()
);
