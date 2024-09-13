import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { getUserSession } from './utils/api/requests/user/session';
import type { ProvidersProps } from './utils/context/providers';
import { Providers } from './utils/context/providers';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './global.css';
// Register the router instance for type safety
// Create a new router instance
const router = createRouter({ routeTree });
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

(async () => {
  const providersProps: Omit<ProvidersProps, 'children'> = {
    pizza: { defaultProfile: [] },
    pizzasStore: { defaultProfile: [] },
    profile: { defaultProfile: undefined },
    session: { defaultValue: false }
  };

  const token = localStorage.getItem('accessToken');
  if (token) {
    const getProfileQuery = await getUserSession();
    providersProps.profile.defaultProfile = getProfileQuery.data.user;
    providersProps.session.defaultValue = !!getProfileQuery.data;
  }
  createRoot(document.getElementById('root')!).render(
    <Providers {...providersProps}>
      <RouterProvider router={router} />
    </Providers>
  ); }
)();
