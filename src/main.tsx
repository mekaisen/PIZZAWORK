import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { PizzaProvider } from './utils/context/Pizza';
import { PizzaStoreProvider } from './utils/context/PizzaStore';
// Import the generated route tree
import { routeTree } from './routeTree.gen';

import './global.css';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(

  <PizzaStoreProvider defaultProfile={[]}>
    <PizzaProvider defaultProfile={[]}>
      <RouterProvider router={router} />
    </PizzaProvider>
  </PizzaStoreProvider>
);
