import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';

import { CM_MAP, DOUGH_MAP, SIZE_MAP, TOPPING_MAP } from '../../../utils';
import { usePizzas } from '../../../utils/context/Pizza';

import styles from './PaymentModal.module.css';

export interface IAdress {
  apartment: string
  comment: string
  house: string
  street: string
  city: string
}

interface PaymentModalProps {
  onClose: () => void
  adress: IAdress
}

const PaymentModal = ({ onClose, adress }: PaymentModalProps) => {
  const navigate = useNavigate();
  const { pizzas } = usePizzas();
  const pizzaText = pizzas.map((pizza) => {
    const size = SIZE_MAP[pizza.size.name].toLowerCase();
    const diametr = CM_MAP[pizza.size.name];
    const dough = DOUGH_MAP[pizza.doughs.name].toLowerCase();
    const toppings = pizza.toppings.length ?
      ` + ${pizza.toppings.map((top) => TOPPING_MAP[top.name].toLowerCase()).join(', ')}` :
      ``;

    return `${pizza.name}, ${size} ${diametr} см, ${dough} тесто${toppings}`;
  }).join(' ');
  const adressText = `Россия, г.${adress.city}, ул.${adress.street}, д.${adress.house}`;
  const totalCost = pizzas.reduce((sum, pizza) => {
    return (
      sum +
      pizza.doughs.price +
      pizza.size.price +
      pizza.toppings.reduce(
        (sum, top) => (sum + top.cost),
        0
      ))
      * pizza.count;
  }, 0);

  return (
    <div className={clsx(styles.paymentModalContainer)}>
      <div className={clsx(styles.img)}>V</div>
      <h2 className={clsx(styles.title)}>Оплата прошла успешно!</h2>
      <div className={clsx(styles.field)}>
        <span className={clsx(styles.litleText)}>Заказ</span>
        <div className={clsx(styles.text)}>{pizzaText}</div>
      </div>
      <div className={clsx(styles.field)}>
        <span className={clsx(styles.litleText)}>Адрес доставки</span>
        <div className={clsx(styles.text)}>{adressText}</div>
      </div>
      <div className={clsx(styles.field)}>
        <span className={clsx(styles.litleText)}>Сумма заказа</span>
        <div className={clsx(styles.text)}>{totalCost} Р</div>
      </div>
      <span className={clsx(styles.tip)}>Вся информация была продублирована в SMS</span>
      <button type='button' className={clsx(styles.btn)} onClick={() => navigate({ to: '/' })}>Перейти в главное меню</button>
      <button
        type='button'
        className={clsx(styles.close)}
        onClick={() => {
          onClose();
        }}
      >Закрыть
      </button>
    </div>
  );
};
export { PaymentModal };
