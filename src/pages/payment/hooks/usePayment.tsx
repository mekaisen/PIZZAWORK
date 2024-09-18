import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';

import type { PostPizzasPaymentParams } from '../../../utils/api/requests/pizza/payment';
import { postPizzasPayment } from '../../../utils/api/requests/pizza/payment';
import { usePizzas } from '../../../utils/context/Pizza';
import { useProfile } from '../../../utils/context/Profile';
import type { IAdress } from '../components/PaymentModal';

const usePayment = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { pizzas, setPizzas } = usePizzas();
  const [toDebitStep, setToDebitStep] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [adress, setAdress] = useState<IAdress>({
    apartment: '',
    comment: '',
    house: '',
    street: '',
    city: ''
  });
  const paymentForm = useForm({ defaultValues: {
    lastname: profile?.profile?.lastname || '',
    middlename: profile?.profile?.middlename || '',
    firstname: profile?.profile?.middlename || '',
    phone: profile?.phone || '',
    email: profile?.profile?.email || '',
    city: profile?.profile?.city || ''
  } });
  const debitForm = useForm({ defaultValues: {
    pan: '',
    expireDate: '',
    cvv: ''
  } });
  const makePayment = async (params: PostPizzasPaymentParams) => {
    try {
      const paymentResponse = await postPizzasPayment({ params });
      return (paymentResponse);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };
  const toLocalStorage = () => {
    const localPizza = localStorage.getItem('pizza_orders');
    if (!localPizza) {
      localStorage.setItem('pizza_orders', JSON.stringify(pizzas));
      return;
    }
    const pizzaoe = JSON.parse(localPizza!);
    const newLocalPizza = [...pizzas, ...pizzaoe];
    localStorage.setItem('pizza_orders', JSON.stringify(newLocalPizza));
  };
  const onClose = () => {
    setIsModalVisible(false);
    toLocalStorage();
    setPizzas([]);
    navigate({ to: '/' });
  };
  const onSubmitDebit = debitForm.handleSubmit(async () => {
    try {
      const valuesDebit = debitForm.getValues();
      const valuesPayment = paymentForm.getValues();
      const pizzasForPost = pizzas.map((pizza) => {
        return ({
          description: pizza.description,
          id: pizza.pizzaId,
          doughs: pizza.doughs,
          name: pizza.name,
          size: pizza.size,
          toppings: pizza.toppings

        });
      });
      const params = {
        receiverAddress: {
          street: 'Дыбенко',
          house: '45',
          apartment: '432',
          comment: 'У двери оставте'
        },
        person: {
          ...valuesPayment
        },
        pizzas: [...pizzasForPost],
        debitCard: {
          ...valuesDebit
        }
      };
      const paymentResponse = await makePayment(params);
      setAdress({
        apartment: paymentResponse?.data.order.receiverAddress.apartament,
        comment: paymentResponse?.data.order.receiverAddress.comment,
        house: paymentResponse?.data.order.receiverAddress.house,
        street: paymentResponse?.data.order.receiverAddress.street,
        city: valuesPayment.city
      });

      setIsModalVisible(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  });

  const onSubmitProfile = paymentForm.handleSubmit(() => {
    setToDebitStep(true);
  });
  return {
    onClose: { onClose },
    onSubmit: { onSubmitDebit, onSubmitProfile },
    state: { toDebitStep, isModalVisible, adress },
    form: { debitForm, paymentForm }
  };
};
export { usePayment };
