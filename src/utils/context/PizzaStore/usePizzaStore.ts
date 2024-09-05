import { useContext } from 'react';

import { PizzaStoreContext } from './PizzaStoreContext';

const usePizzaStore = () => useContext(PizzaStoreContext);
;
export { usePizzaStore };
