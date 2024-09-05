import { createFileRoute } from '@tanstack/react-router';

import { Cart } from '../pages/cart/Cart';
import { ROUTES } from '../utils';
import { usePizzas } from '../utils/context/Pizza';

export const Route = createFileRoute(ROUTES.CART)({
  component: Cart
});
