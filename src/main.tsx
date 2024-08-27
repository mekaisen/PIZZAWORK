import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';

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

  <RouterProvider router={router} />
);
