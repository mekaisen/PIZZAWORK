import { createFileRoute } from '@tanstack/react-router';

import { ROUTES } from '../../utils';

export const Route = createFileRoute(`${ROUTES.ORDERS}/`)({
  component: () => (
    <div>
      Orders
    </div>
  )
});
