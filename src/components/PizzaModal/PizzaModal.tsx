import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { BASE_URL } from '../../utils';
import { CM_MAP, DOUGH_MAP, SIZE_MAP, TOPPING_MAP } from '../../utils/constants/map';
import { usePizzas } from '../../utils/context/Pizza';
import { isSame } from '../../utils/helpers/isSame';

import styles from './PizzaModal.module.css';

interface PizzaModalProps {
  pizza: Pizza
  onClose: () => void
}

const PizzaModal = ({ pizza, onClose }: PizzaModalProps) => {
  const [selectPizza, setSelectPizza] = useState<SelectPizza>(
    { description: pizza.description, name: pizza.name, pizzaId: pizza.id, size: { name: 'SMALL', price: pizza.sizes[0].price }, toppings: [], doughs: { name: 'THIN', price: pizza.doughs[0].price } }
  );
  const { setPizzas, pizzas } = usePizzas();
  const onClickSize = (newSize: PizzaSizeEnum, price: number) => {
    setSelectPizza({
      ...selectPizza,
      size: {
        price,
        name: newSize
      }
    });
  };
  const onClickTesto = (newDoghs: PizzaDoughEnum, price: number) => {
    setSelectPizza({
      ...selectPizza,
      doughs: {
        price,
        name: newDoghs
      }
    });
  };
  const onClickTopings = (toping: PizzaIngredientEnum, img: string, cost: number) => {
    const existingTopping = selectPizza.toppings.find((top) => top.name === toping);

    if (existingTopping) {
    // Если топпинг уже есть, удаляем его
      const filtredPizzaToppings = selectPizza.toppings.filter((top) => top.name !== toping);
      setSelectPizza({
        ...selectPizza,
        toppings: filtredPizzaToppings
      });
    } else {
    // Если топпинга нет, добавляем его

      setSelectPizza({
        ...selectPizza,
        toppings: [
          ...selectPizza.toppings,
          {
            cost,
            name: toping,
            img
          }
        ]
      });
    }
  };
  const onClickToCart = () => {
    const sameItem = pizzas.find((pizzaCart) => {
      return (isSame(pizzaCart, selectPizza));
    });

    if (sameItem) {
      sameItem.count += 1;
    }
    else {
      const pizzaewr5: PizzaCart = {
        ...selectPizza,
        uid: new Date().getTime().toString(),
        count: 1
      };
      setPizzas([...pizzas, pizzaewr5]);
    }
  };
  const onUpdatePizza = () => {
    const changedPizzas = pizzas.map((i) => {
      if (i.uid === pizza.uid) {
        return {
          ...i,
          ...selectPizza
        };
      }
      return i;
    });
    setPizzas(changedPizzas);
  };
  useEffect(() => {
    if (pizza?.uid) {
      const pizzaFind = pizzas.filter((i) => i.uid === pizza.uid)[0];
      setSelectPizza({
        ...selectPizza,
        size: pizzaFind.size,
        toppings: pizzaFind.toppings,
        doughs: pizzaFind.doughs
      });
    }
  }, []);
  const pizzaTotalCost =
   +selectPizza.doughs.price
   + selectPizza.size.price
   + selectPizza.toppings.reduce((sum, toping) => sum + toping.cost, 0);
  const subtitle = `${CM_MAP[selectPizza.size.name]} см, ${DOUGH_MAP[selectPizza.doughs.name].toLowerCase()} тесто`;

  return (
    <div className={clsx(styles.pizzaModal)}>
      <button className={clsx(styles.closebtn)} type='button' onClick={() => onClose()}>Закрыть</button>
      <div className={clsx(styles.img)}><img src={BASE_URL + pizza.img} alt={pizza.name} /></div>
      <div className={clsx(styles.content)}>
        <div className={styles.buyarea}>
          <div className={clsx(styles.pizza_titleL)}>{pizza.name}</div>
          <div className={clsx(styles.pizza_subtitle)}>{subtitle}</div>
          <div className={clsx(styles.pizza_description)}>{pizza.description}</div>
          <div className={clsx(styles.pizza_sizes)}>
            {pizza.sizes.map((size) => (
              <button
                onClick={() => onClickSize(size.name, size.price)}
                key={size.name}
                type='button'
                className={clsx(
                  styles.pizza_choose,
                  selectPizza.size.name.includes(size.name) && styles.sizective
                )}
              >{SIZE_MAP[size.name]}
              </button>
            ))}
          </div>
          <div className={clsx(styles.pizza_sizes)}>
            {pizza.doughs.map((dough) => (
              <button
                className={clsx(
                  styles.pizza_choose,
                  selectPizza.doughs.name.includes(dough.name) && styles.doughactive
                )}
                onClick={() => onClickTesto(dough.name, dough.price)}
                key={dough.name}
                type='button'
              >{DOUGH_MAP[dough.name]}
              </button>
            ))}
          </div>
          <div className={clsx(styles.pizza_toppings)}>
            <div className={clsx(styles.pizza_titleM)}>Добавить по вкусу</div>
            <div className={clsx(styles.grid)}>
              {pizza.toppings.map((topping) => {
                return (
                  <div

                    role='button'
                    tabIndex={0}
                    className={clsx(
                      styles.pizza_topping,
                      selectPizza.toppings.map((toping) => toping.name).includes(topping.name)
                      && styles.active_toping
                    )}
                    key={topping.name}
                    onClick={() => onClickTopings(topping.name, topping.img, topping.cost)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onClickTopings(topping.name, topping.img, topping.cost);
                      }
                    }}
                  >
                    <div className={clsx(styles.topping_img)}>
                      <img src={BASE_URL + topping.img} alt={topping.name} />
                    </div>
                    <div className={clsx(styles.topping_title)}>{TOPPING_MAP[topping.name]}</div>
                    <div className={clsx(styles.topping_price)}>{topping.cost} Р</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {

          !pizza.uid ? (
            <button
              onClick={() => { onClickToCart();
              }}
              type='button'
              className={styles.pizza_buybnt}
            >Добавить в корзину {pizzaTotalCost} Р
            </button>
          ) : (
            <button
              onClick={() => (onUpdatePizza())}
              type='button'
              className={styles.pizza_buybnt}
            >Сохранить
            </button>
          )}
      </div>
    </div>
  );
};
export { PizzaModal };
