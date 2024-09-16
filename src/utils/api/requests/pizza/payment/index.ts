import { api } from '../../../instance';

export interface PostPizzasPaymentParams {
  receiverAddress: {
    street: string,
    house: string,
    apartment: string,
    comment: string
  },
  person: {
    firstname: string,
    lastname: string,
    middlename: string,
    phone: string
  },
  pizzas: CartPizza[],
  debitCard: {
    pan: string,
    cvv: string,
    expireDate: string

  }
}
export type PostUserPayment = RequestConfig<PostPizzasPaymentParams>;
export const postPizzasPayment = ({ params, config }: PostUserPayment) => api.post<any>('pizza/payment', params, config);
