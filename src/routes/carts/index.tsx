import { createFileRoute } from '@tanstack/react-router';

import { Cart } from '../../pages/cart/Cart';

export const Route = createFileRoute('/carts/')({
  component: Cart
});
