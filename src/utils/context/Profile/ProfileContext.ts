import { createContext } from 'react';

export interface ProfileContextProps {
  profile: User
  setProfile: (profile: User) => void
}

const ProfileContext = createContext<ProfileContextProps>(
  { profile: undefined!, setProfile: () => {} }
);
export { ProfileContext };
