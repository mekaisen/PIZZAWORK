import { useMemo, useState } from 'react';

import { ProfileContext } from './ProfileContext';

export interface ProfileProviderProps {
  children: React.ReactNode
  defaultProfile?: User
}

const ProfileProvider = ({ children, defaultProfile }: ProfileProviderProps) => {
  const [profile, setProfile] = useState<User>(defaultProfile!);
  const value = useMemo(() => ({ profile, setProfile }), [profile]);
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export { ProfileProvider };
