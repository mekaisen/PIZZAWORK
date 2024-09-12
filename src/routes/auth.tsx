import { createFileRoute } from '@tanstack/react-router';

import { Auth } from '../pages/auth/Auth';
import { ROUTES } from '../utils';

export const Route = createFileRoute(ROUTES.AUTH)({
  component: Auth
});
