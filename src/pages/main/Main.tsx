/* eslint-disable style/max-len */

import clsx from 'clsx';

import { Modal } from '../../components/Modal/Modal';
import { PizzaModal } from '../../components/PizzaModal/PizzaModal';
import { BASE_URL } from '../../utils';

import { useMain } from './hooks/useMain';
import { PizzaCard, PizzaCardButton, PizzaCardBuyArea, PizzaCardCost, PizzaCardDescription, PizzaCardImage, PizzaCardInfo, PizzaCardSubTitle, PizzaCardTitle } from './components';

import styles from './Main.module.css';

const Main = () => {
  const { state, onClick, currentPizza, pizzas } = useMain();
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
                    onClick.onClickPizza(pizza.id);
                  }}
                >Выбрать
                </PizzaCardButton>
              </PizzaCardBuyArea>
            </PizzaCardInfo>
          </PizzaCard>
        ))}
      </div>
      {state.isModal.isModalVisible && <Modal onClose={onClick.onClosePizza} className='gelo'><PizzaModal pizza={currentPizza} onClose={onClick.onClosePizza} /></Modal>}
    </>
  );
};
export { Main };
