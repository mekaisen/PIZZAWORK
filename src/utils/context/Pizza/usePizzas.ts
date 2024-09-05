import { useContext } from 'react';

import { PizzaContext } from './PizzaContext';

const usePizzas = () => (
  useContext(PizzaContext)
);
export { usePizzas };
