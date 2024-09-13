import type { PizzaProviderProps } from './Pizza';
import { PizzaProvider } from './Pizza';
import type { PizzaStoreProviderProps } from './PizzaStore';
import { PizzaStoreProvider } from './PizzaStore';
import type { ProfileProviderProps } from './Profile';
import { ProfileProvider } from './Profile';
import type { SessionProviderProps } from './Session';
import { SessionProvider } from './Session';

export interface ProvidersProps {
  children: React.ReactNode
  pizzasStore: Omit<PizzaStoreProviderProps, 'children'>
  pizza: Omit<PizzaProviderProps, 'children'>
  profile: Omit<ProfileProviderProps, 'children'>
  session: Omit<SessionProviderProps, 'children'>
}

const Providers = ({ pizzasStore, pizza, children, profile, session }: ProvidersProps) => {
  return (
    <SessionProvider {...session}>
      <ProfileProvider {...profile}>
        <PizzaStoreProvider {...pizzasStore}>
          <PizzaProvider {...pizza}>{children}</PizzaProvider>
        </PizzaStoreProvider>
      </ProfileProvider>
    </SessionProvider>
  );
};
export { Providers };
