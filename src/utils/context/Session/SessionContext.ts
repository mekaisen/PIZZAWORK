import { createContext } from 'react';

export interface SessionContextProps {
  session: boolean
  setSession: (session: boolean) => void
}

const SessionContext = createContext<SessionContextProps>({ session: false, setSession: () => {} });
export { SessionContext };
