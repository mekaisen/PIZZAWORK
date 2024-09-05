import { createFileRoute } from '@tanstack/react-router';

import { Loading } from '../pages/main/Loading';
import { Main } from '../pages/main/Main';
import { ROUTES } from '../utils';
import { getPizzasCatalog } from '../utils/api/requests';

const getPizzas = async () => {
  const respones = await getPizzasCatalog();
  return respones;
};

export const Route = createFileRoute(ROUTES.INDEX)({
  loader: getPizzas,
  pendingComponent: Loading,
  component: Main

});
