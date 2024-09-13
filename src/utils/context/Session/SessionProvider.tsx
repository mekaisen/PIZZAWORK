import { useMemo, useState } from 'react';

import { SessionContext } from './SessionContext';

export interface SessionProviderProps {
  children: React.ReactNode
  defaultValue?: boolean
}

const SessionProvider = ({ children, defaultValue }: SessionProviderProps) => {
  const [session, setSession] = useState<boolean>(defaultValue!);

  const value = useMemo(() => ({ session, setSession }), [session]);
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
export { SessionProvider };
