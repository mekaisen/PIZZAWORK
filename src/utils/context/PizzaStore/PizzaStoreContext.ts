import { createContext } from 'react';

export interface PizzaStoreContextProps {
  pizzasStore: Pizza[]
  setPizzasStore: (pizzas: Pizza[]) => void
}

const PizzaStoreContext = createContext<PizzaStoreContextProps>(
  { pizzasStore: undefined!, setPizzasStore: () => {} }
);

export { PizzaStoreContext };
