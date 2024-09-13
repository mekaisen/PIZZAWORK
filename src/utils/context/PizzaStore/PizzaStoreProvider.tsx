import { useMemo, useState } from 'react';

import { PizzaStoreContext } from './PizzaStoreContext';

export interface PizzaStoreProviderProps {
  children: React.ReactNode
  defaultProfile?: Pizza[]
}

const PizzaStoreProvider = ({ children, defaultProfile }: PizzaStoreProviderProps) => {
  const [pizzasStore, setPizzasStore] = useState<Pizza[]>(defaultProfile!);
  const value = useMemo(() => ({ pizzasStore, setPizzasStore }), [pizzasStore]);
  return (
    <PizzaStoreContext.Provider value={value}>
      {children}
    </PizzaStoreContext.Provider>
  );
};
export { PizzaStoreProvider };
