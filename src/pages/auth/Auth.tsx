import { useState } from 'react';

import { SignInForm } from './components/SignInForm/SignInForm';
import { SignUpForm } from './components/SignUpForm/SignUpForm';

const Auth = () => {
  const [stage, setStage] = useState('signUp');
  const [phone, setPhone] = useState('');
  const handleSetStage = (stage: string) => {
    setStage(stage);
  };
  const handleSetPhone = (phone: string) => {
    setPhone(phone);
  };
  return (
    stage === 'signUp' ? (
      <SignUpForm
        handleSetStage={handleSetStage}
        handleSetPhone={handleSetPhone}
        phone={phone}
      />
    ) : (
      <SignInForm
        handleSetStage={handleSetStage}
        handleSetPhone={handleSetPhone}
        phone={phone}
      />
    )
  );
};
export { Auth };
