import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect, useNavigate } from '@tanstack/react-router';

import { postUserSignIn } from '../../../../../utils/api/requests/user/signin';
import { useProfile } from '../../../../../utils/context/Profile';
import { useSession } from '../../../../../utils/context/Session';
import type { IPhoneAndRetry } from '../../../Auth';

interface SignInFormProps {
  handleSetStage: (stage: string) => void
  handleSetPhoneAndRetry: (data: IPhoneAndRetry) => void
  phoneAndRetry: IPhoneAndRetry

}
interface OtpFailedResponseData {
  reason: string
  success: boolean
}
interface OtpFailedResponse {
  data: OtpFailedResponseData
}
interface OtpFailed {
  status: number
  response: OtpFailedResponse
}

// eslint-disable-next-line style/max-len
const useSignInForm = ({ handleSetStage, handleSetPhoneAndRetry, phoneAndRetry }: SignInFormProps) => {
  // eslint-disable-next-line style/max-len
  const [retryDelay, setRetryDelay] = useState(() => phoneAndRetry.retry ? phoneAndRetry.retry / 1000 : 0);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (retryDelay > 0) setRetryDelay((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [retryDelay]);

  const { setSession } = useSession();
  const { setProfile } = useProfile();
  const signInForm = useForm<SignInDto>({ defaultValues: {
    phone: phoneAndRetry.phone,
    code: undefined
  } });

  const onSubmit = signInForm.handleSubmit(async () => {
    const params = signInForm.getValues();
    handleSetPhoneAndRetry({ phone: params.phone });
    try {
      const res = await postUserSignIn({ params });

      localStorage.setItem('accessToken', res.data.token);
      setSession(true);
      const user = {
        profile: {
          email: res.data.user.email,
          city: res.data.user.city,
          lastName: res.data.user.lastname,
          middleName: res.data.user.middlename,
          firstName: res.data.user.firstname
        },
        phone: res.data.user.phone
      };
      setProfile(user);
      handleSetStage('authSuccess');
      navigate({ to: '/' });
    } catch (error) {
      if (error instanceof Error) {
        const responseError = error as unknown as OtpFailed;
        signInForm.setError('code', { type: responseError.status.toString(), message: responseError.response.data.reason });
      }
    }
  });

  return {
    state: {
      retryDelay,
      setRetryDelay
    },
    onClick: {
      onSubmit
    },
    form: {
      signInForm
    }
  };
};

export { useSignInForm };
