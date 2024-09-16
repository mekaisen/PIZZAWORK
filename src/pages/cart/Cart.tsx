import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

import { ModalPizza } from '../../components/Modal/Pizza';
import { BASE_URL, CM_MAP, DOUGH_MAP, SIZE_MAP, TOPPING_MAP } from '../../utils';
import { usePizzas } from '../../utils/context/Pizza';
import { usePizzaStore } from '../../utils/context/PizzaStore';
import { PizzaCard, PizzaCardButton, PizzaCardContainer, PizzaCardCost, PizzaCardImage, PizzaCardSubTitle, PizzaCardTitle, PizzaModal } from '../main/components';

import styles from './Cart.module.css';

const Cart = () => {
  const { pizzas, setPizzas } = usePizzas();
  const { pizzasStore } = usePizzaStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPizza, setCurrentPizza] = useState<PizzaCart>();
  const onCloseModal = () => {
    setIsModalVisible(false);
  };
  const onIncrease = (pizza: PizzaCart) => {
    const newPizzas = pizzas.map((newPizza) => {
      if (newPizza.uid === pizza.uid) {
        return { ...newPizza, count: newPizza.count + 1 };
      }
      else {
        return newPizza;
      }
    });

    setPizzas(newPizzas);
  };
  const onDecrease = (pizza: PizzaCart) => {
    const item = pizzas.find((item) => item.uid === pizza.uid);
    if (item!.count > 1) {
      const newPizzas = pizzas.map((item) => {
        if (item.uid === pizza.uid) {
          return {
            ...item,
            count: item.count - 1
          };
        }
        return item;
      });
      setPizzas(newPizzas);
    }
    if (item!.count === 1) {
      const newPizzas = pizzas.filter((i) => i.uid !== pizza.uid);
      setPizzas(newPizzas);
    }
  };
  const pizzaTotalCost = pizzas.reduce((totalSum, pizza) => {
    return ((pizza.doughs.price
      + pizza.size.price
      + pizza.toppings.reduce((sumTop, toping) => (sumTop + toping.cost), 0))
      * pizza.count)
      + totalSum;
  }, 0);
  return (
    <>
      <div className={clsx(styles.cartcontainer)}>
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.uid} className={clsx(styles.pizzacard)}>
            <PizzaCardContainer className={clsx(styles.pizzacontent)}>
              <PizzaCardContainer className={clsx(styles.pizzaimgandtitle)}>
                <PizzaCardImage
                  src={BASE_URL + pizzasStore.find(
                    (pizaStore) => (pizaStore.id === pizza.pizzaId)
                  )?.img}
                  alt={pizza.name}
                  className={clsx(styles.img)}
                >
                </PizzaCardImage>
                <PizzaCardTitle className={clsx(styles.title)}>{pizza.name}</PizzaCardTitle>
              </PizzaCardContainer>

              <PizzaCardContainer className={clsx(styles.flex)}>
                <PizzaCardSubTitle className={clsx(styles.pizzadesc)}>{
                  `${SIZE_MAP[pizza.size.name]} ${CM_MAP[pizza.size.name]}, ${`${DOUGH_MAP[pizza.doughs.name].toLowerCase()} тесто`} ${pizza.toppings.length !== 0 ? ` + ${pizza.toppings.map((toping) => (`${TOPPING_MAP[toping.name].toLowerCase()}`)).join(', ')}` : ''}`
                }
                </PizzaCardSubTitle>
                <PizzaCardContainer className={clsx(styles.countspizza)}>
                  <PizzaCardButton onClick={() => onDecrease(pizza)}>-
                  </PizzaCardButton>
                  <PizzaCardTitle>{pizza.count}</PizzaCardTitle>
                  <PizzaCardButton onClick={() => onIncrease(pizza)}>+
                  </PizzaCardButton>
                </PizzaCardContainer>
                <PizzaCardButton
                  onClick={() => {
                    setCurrentPizza(pizza);
                    setIsModalVisible(true);
                  }}
                  className={clsx(styles.popup)}
                >подробнее
                </PizzaCardButton>
                <PizzaCardCost className={clsx(styles.cost)}>{
                  (pizza.doughs.price + pizza.size.price + pizza.toppings.reduce(
                    (sum, topping) => (sum + topping.cost),
                    0
                  )) * pizza.count
                }
                </PizzaCardCost>
              </PizzaCardContainer>
            </PizzaCardContainer>
            <PizzaCardButton>X</PizzaCardButton>
          </PizzaCard>
        ))}

        {currentPizza && isModalVisible && <ModalPizza onClose={onCloseModal} className='gelo'><PizzaModal pizza={{ ...pizzasStore.filter((i) => i.id === currentPizza.pizzaId)[0], uid: currentPizza.uid } as Pizza} onClose={onCloseModal} /></ModalPizza>}
      </div>
      <div className={clsx(styles.flexbottom)}>
        <div className={clsx(styles.totalcost)}>Стоимость заказа: {pizzaTotalCost} Р</div>
        <Link className={clsx(styles.makeoffer)} disabled={(!pizzasStore)} to='/carts/payments'>Оформить заказ</Link>

      </div>
    </>
  );
};
export { Cart };
