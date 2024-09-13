import { useContext } from 'react';

import { ProfileContext } from './ProfileContext';

const useProfile = () => useContext(ProfileContext);
export { useProfile };
