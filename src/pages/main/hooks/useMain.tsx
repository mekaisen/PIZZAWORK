import { useEffect, useState } from 'react';
import { useLoaderData } from '@tanstack/react-router';

import { usePizzaStore } from '../../../utils/context/PizzaStore';

const useMain = () => {
  const [currentPizzaId, setCurrentPizzaId] = useState('1');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const responsePizza = useLoaderData({ from: '/' });
  const { setPizzasStore } = usePizzaStore();
  useEffect(() => {
    setPizzasStore(responsePizza.data.catalog);
  }, []);
  const onClickPizza = (id: string) => {
    setIsModalVisible(true);
    setCurrentPizzaId(id);
    document.querySelector('body')?.classList.add('scrool_locked');
  };
  const onClosePizza = () => {
    setIsModalVisible(false);
    document.querySelector('body')?.classList.remove('scrool_locked');
  };

  const pizzas = responsePizza.data.catalog;
  const currentPizza = pizzas.filter((pizza) => (
    pizza.id === currentPizzaId
  ))[0];
  return {
    state: {
      pizzaId: { currentPizzaId, setCurrentPizzaId },
      isModal: { isModalVisible, setIsModalVisible }
    },
    onClick: { onClickPizza, onClosePizza },
    currentPizza,
    pizzas
  };
};
export { useMain };
