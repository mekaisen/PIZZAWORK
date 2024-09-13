import { useState } from 'react';

import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

export interface IPhoneAndRetry {
  phone: string
  retry?: number
}

const Auth = () => {
  const [stage, setStage] = useState('signUp');
  const [phoneAndRetry, setPhoneAndRetry] = useState<IPhoneAndRetry>({ phone: '', retry: undefined });
  const handleSetStage = (stage: string) => {
    setStage(stage);
  };
  const handleSetPhoneAndRetry = (data: IPhoneAndRetry) => {
    setPhoneAndRetry(data);
  };
  return (
    stage === 'signUp' ? (
      <SignUpForm
        handleSetStage={handleSetStage}
        handleSetPhoneAndRetry={handleSetPhoneAndRetry}
        phoneAndRetry={phoneAndRetry}
      />
    ) : (
      <SignInForm
        handleSetStage={handleSetStage}
        handleSetPhoneAndRetry={handleSetPhoneAndRetry}
        phoneAndRetry={phoneAndRetry}
      />
    )
  );
};
export { Auth };
