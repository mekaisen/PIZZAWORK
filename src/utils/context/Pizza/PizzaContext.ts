import React from 'react';

export interface PizzaContextProps {
  pizzas: PizzaCart[]
  setPizzas: (pizzas: PizzaCart[]) => void
}

export const PizzaContext = React.createContext<PizzaContextProps>(
  { pizzas: undefined!, setPizzas: () => {} }
);
