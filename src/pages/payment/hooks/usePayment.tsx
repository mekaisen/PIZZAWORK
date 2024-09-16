import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';

import type { PostPizzasPaymentParams } from '../../../utils/api/requests/pizza/payment';
import { postPizzasPayment } from '../../../utils/api/requests/pizza/payment';
import { usePizzas } from '../../../utils/context/Pizza';
import { useProfile } from '../../../utils/context/Profile';

const usePayment = () => {
  const { profile } = useProfile();
  const { pizzas } = usePizzas();
  const navigate = useNavigate();
  const [toDebitStep, setToDebitStep] = useState(false);
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
      const response = await makePayment(params);
      navigate({ to: '/' });
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
    onSubmit: { onSubmitDebit, onSubmitProfile },
    state: { toDebitStep },
    form: { debitForm, paymentForm }
  };
};
export { usePayment };
