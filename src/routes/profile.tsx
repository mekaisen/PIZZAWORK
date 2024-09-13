import { createFileRoute, redirect } from '@tanstack/react-router';

import { Profile } from '../pages/profile/Profile';
import { ROUTES } from '../utils';
import { getUserSession } from '../utils/api/requests/user/session';

const getProfile = async () => {
  try {
    const res = await getUserSession();
    return res;
  } catch (error) {
    if (error instanceof Error) {
      redirect({ to: '/auth', throw: true });
    }
  }
};
export const Route = createFileRoute(ROUTES.PROFILE)({
  loader: getProfile,

  component: Profile
});
