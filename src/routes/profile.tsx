import { createFileRoute } from '@tanstack/react-router';

import { ROUTES } from '../utils';

export const Route = createFileRoute(ROUTES.PROFILE)({
  component: () => <div>Profile</div>
});
