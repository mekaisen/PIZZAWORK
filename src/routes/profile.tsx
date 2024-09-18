import { createFileRoute } from '@tanstack/react-router';

import { Profile } from '../pages/profile/Profile';
import { ROUTES } from '../utils';

// const getProfile = async () => {
//   try {
//     const res = await getUserSession();
//     return res;
//   } catch (error) {
//     if (error instanceof Error) {
//       redirect({ to: '/auth', throw: true });
//     }
//   }
// };
export const Route = createFileRoute(ROUTES.PROFILE)({
  // loader: getProfile,

  component: Profile
});
