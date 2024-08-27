import { createFileRoute } from '@tanstack/react-router';
import { Main } from '../pages/main/Main';
import {ROUTES} from '../utils'
export const Route = createFileRoute(ROUTES.INDEX)({
  component: () => <Main />
});
