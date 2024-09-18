/* eslint-disable style/no-tabs */
interface PizzaIngredient {
  name: PizzaIngredientEnum
  cost: number
  img: string
}
interface PizzaSize {
  name: PizzaSizeEnum
  price: number

}
type PizzaSizeEnum = 'SMALL' | 'MEDIUM' | 'LARGE';
interface PizzaDough {
  name: PizzaDoughEnum
  price: number

}
type PizzaDoughEnum = 'THIN' | 'THICK';
interface Pizza {

  id:	string
  name:	string
  ingredients: PizzaIngredient[]
  toppings:	PizzaIngredient[]
  description: string
  sizes: PizzaSize[]
  doughs:	PizzaDough[]
  calories:	number
  protein:	string
  totalFat:	string
  carbohydrates:	string
  sodium:	string
  allergens:	string[]
  isVegetarian:	boolean
  isGlutenFree:	boolean
  isNew:	boolean
  isHit:	boolean
  img:	string
  uid?: string
}
type PizzaIngredientEnum =
  | 'PINEAPPLE'
  | 'MOZZARELLA'
  | 'PEPERONI'
  | 'GREEN_PEPPER'
  | 'MUSHROOMS'
  | 'BASIL'
  | 'CHEDDAR'
  | 'PARMESAN'
  | 'FETA'
  | 'HAM'
  | 'PICKLE'
  | 'TOMATO'
  | 'BACON'
  | 'ONION'
  | 'CHILE'
  | 'SHRIMPS'
  | 'CHICKEN_FILLET'
  | 'MEATBALLS';
interface ReceiverAddress {
  street: string;
  house: string;
  apartment: string;
  comment?: string;
}

interface Person {
  firstname: string;
  lastname: string;
  middlename?: string;
  phone: string;
}

interface DebitCard {
  pan: string;
  expireDate: string;
  cvv: string;
}

// App types

interface Address extends ReceiverAddress {
  value: string;
  city: string;
}

  type AddressSuggestion = PostAddressSuggestionsResponse['suggestions'][0];

interface PersonalData extends Person {
  email: string;
}
interface BaseResponse {
  success: boolean;
  reason?: string;
}

interface CreateOtpDto {
  phone: string;
}

interface SignInDto {
  phone: string;
  code: number;
}

interface SignInResponse extends BaseResponse {
  token: string;
  user: {
    phone: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    email?: string;
    city?: string;
  };
}

interface AuthOtpResponse extends BaseResponse {
  retryDelay: number;
}

interface PizzaCatalogResponse extends BaseResponse {
  catalog: Pizza[];
}

interface CartPizza {
  id: string;
  name: string;
  description: string;
  toppings: PizzaIngredient[];
  size: PizzaSize;
  doughs: PizzaDough;
}

interface PizzaPaymentDto {
  receiverAddress: ReceiverAddress;
  person: Person;
  debitCard: DebitCard;
  pizzas: CartPizza[];
}

interface PizzaPaymentResponse extends BaseResponse {
  order: {
    receiverAddress: ReceiverAddress;
    person: Person;
    status: 0 | 1 | 2 | 3 | 4;
    cancellable: boolean;
  };
}

interface PostAddressSuggestionsResponse {
  suggestions: {
    value: string;
    unrestricted_value: string;
    data: {
      city: string | null;
      street: string | null;
      house: string | null;
      flat: string | null;
    } & Record<string, string | null>;
  }[];
}
interface CreatePizzaPaymentPizzaDto {
  name: string
  pizzaId: string;
  size: PizzaSize;
  doughs: PizzaDough;
  toppings: PizzaIngredient[];
  description: string
}
interface CreatePizzaPaymentPizzaDtoWithSrc extends CreatePizzaPaymentPizzaDto {
  src: string
}
interface SelectPizza {
  pizzaId: string;
  size: PizzaSize;
  doughs: PizzaDough;
  toppings: PizzaIngredient[];
  description: string
  name: string
}
interface SelectedPizza extends SelectPizza {
  uid: string | undefined;
}
interface PizzaCart extends SelectedPizza {
  count: number
  uid: string
}
type ApiRequestConfig = import('axios').AxiosRequestConfig;
type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: ApiRequestConfig }
  : { params: Params; config?: ApiRequestConfig };

interface OtpResponse {
  success:	boolean
  reason?:	string
  retryDelay:	number
}
interface SignInDto {
  phone: string

  code: number

}
interface User {
  profile: {
    email?: string;
    city?: string;
    lastname?: string;
    middlename?: string;
    firstname?: string;
  }
  phone: string;
}
interface UserResponse {

  email?: string;
  city?: string;
  lastname?: string;
  middlename?: string;
  firstname?: string;

  phone: string;
}
interface SessionResponse {
  success: boolean
  reason?: string
  user: UserResponse
}
