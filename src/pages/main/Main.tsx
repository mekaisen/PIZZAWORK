/* eslint-disable style/max-len */
import { useEffect, useState } from 'react';
import { useLoaderData } from '@tanstack/react-router';
import clsx from 'clsx';

import { ModalPizza } from '../../components/Modal/Pizza';
import { PizzaModal } from '../../components/PizzaModal/PizzaModal';
import { BASE_URL } from '../../utils';
import { usePizzaStore } from '../../utils/context/PizzaStore';

import { PizzaCard, PizzaCardButton, PizzaCardBuyArea, PizzaCardCost, PizzaCardDescription, PizzaCardImage, PizzaCardInfo, PizzaCardSubTitle, PizzaCardTitle } from './components';

import styles from './Main.module.css';

const Main = () => {
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
  return (
    <>
      <div className={clsx(styles.container)}>
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} className={styles.pizza_card}>
            <PizzaCardImage src={BASE_URL + pizza.img} alt={pizza.name} className={styles.pizza_img}>
            </PizzaCardImage>
            <PizzaCardInfo className={styles.pizza_info}>
              <PizzaCardDescription className={styles.pizza_description}>
                <PizzaCardTitle className={styles.pizza_title}>{pizza.name}</PizzaCardTitle>
                <PizzaCardSubTitle className={styles.pizza_subtitle}>{pizza.description}</PizzaCardSubTitle>
              </PizzaCardDescription>
              <PizzaCardBuyArea className={styles.pizza_buyarea}>
                <PizzaCardCost className={styles.pizza_cost}>{pizza.sizes[0].price}</PizzaCardCost>
                <PizzaCardButton
                  className={styles.pizza_button}
                  onClick={() => {
                    onClickPizza(pizza.id);
                  }}
                >Выбрать
                </PizzaCardButton>
              </PizzaCardBuyArea>
            </PizzaCardInfo>
          </PizzaCard>
        ))}
      </div>
      {isModalVisible && <ModalPizza onClose={onClosePizza} className='gelo'><PizzaModal pizza={currentPizza} onClose={onClosePizza} /></ModalPizza>}
    </>
  );
};
export { Main };
