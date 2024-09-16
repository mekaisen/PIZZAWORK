import { createFileRoute } from '@tanstack/react-router';

import { Payment } from '../../pages/payment/Payment';

export const Route = createFileRoute('/carts/payments')({
  component: Payment
});
