import { api } from '../../../instance';

export type GetPizzasCatalog = AxiosRequestConfig;
export interface Catalog {
  success: boolean,
  catalog: Pizza[]
}
export const getPizzasCatalog = (requestConfig?: GetPizzasCatalog) => api.get<Catalog>('pizza/catalog', requestConfig?.config);
