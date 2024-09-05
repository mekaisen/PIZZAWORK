import { useMemo, useState } from 'react';

import { PizzaContext } from './PizzaContext';

export interface PizzaProviderProps {
  children: React.ReactNode
  defaultProfile?: PizzaCart[]
}

const PizzaProvider = ({ children, defaultProfile }: PizzaProviderProps) => {
  const [pizzas, setPizzas] = useState<PizzaCart[]>(defaultProfile!);

  const value = useMemo(() => ({ pizzas, setPizzas }), [pizzas]);
  return (
    <PizzaContext.Provider value={value}>{children}</PizzaContext.Provider>
  );
};
export { PizzaProvider };
