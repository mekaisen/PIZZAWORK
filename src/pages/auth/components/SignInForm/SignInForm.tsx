import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { redirect } from '@tanstack/react-router';
import clsx from 'clsx';

import type { PostOtpPhoneParams } from '../../../../utils/api/requests/auth/otp';
import { postAuthOtp } from '../../../../utils/api/requests/auth/otp';
import { postUserSignIn } from '../../../../utils/api/requests/user/signin';
import { useProfile } from '../../../../utils/context/Profile';
import { useSession } from '../../../../utils/context/Session';
import type { IPhoneAndRetry } from '../../Auth';

import styles from '../../Auth.module.css';

interface SignInFormProps {
  handleSetStage: (stage: string) => void
  handleSetPhoneAndRetry: (data: IPhoneAndRetry) => void
  phoneAndRetry: IPhoneAndRetry
}

const SignInForm = ({ handleSetStage, handleSetPhoneAndRetry, phoneAndRetry }: SignInFormProps) => {
  const [retryDelay, setRetryDelay] = useState(() => {
    if (phoneAndRetry.retry) {
      return phoneAndRetry.retry / 1000;
    }
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (retryDelay && retryDelay > 0)
        setRetryDelay(retryDelay - 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [retryDelay]);
  const { setSession } = useSession();
  const { setProfile } = useProfile();
  const signInForm = useForm<SignInDto>({ defaultValues: {
    phone: phoneAndRetry.phone,
    code: undefined
  } });
  // const formStateErrors = signInForm.formState.errors;
  const onSubmit = signInForm.handleSubmit(async () => {
    const params = signInForm.getValues();
    handleSetPhoneAndRetry({ phone: params.phone });
    try {
      const res = await postUserSignIn({ params });
      localStorage.setItem('accessToken', res.data.token);
      setSession(true);
      setProfile(res.data.user);
      handleSetStage('authSuccess');
      redirect({ to: '/', throw: true });
    } catch (error) {
      if (error instanceof Error) {
        signInForm.setError('code', { type: '400', message: error.message });
      }
    }
  });
  return (
    <div className={clsx(styles.form)}>
      <h1 className={clsx(styles.title)}>Авторизация</h1>
      <h2 className={clsx(styles.subtitle)}>Введите код для входа в личный кабинет</h2>
      <form action='' onSubmit={onSubmit}>
        <input placeholder='Телефон' className={clsx(styles.phone)} type='text' {...signInForm.register('phone', { required: true })} />
        <input placeholder='Код' className={clsx(styles.code)} type='text' {...signInForm.register('code', { required: true })} />
        <button className={clsx(styles.button)} type='submit'>Войти</button>
        {retryDelay !== 0 ?
          <button className={clsx(styles.retry, styles.retryOff)} type='submit'>{`Запросить код повторно можно через ${retryDelay} секунд`}</button>
          : (
            <button
              onClick={async () => {
                console.log('@@@click');
                const postAuthOtpResponse = await postAuthOtp(
                  { params: { phone: phoneAndRetry.phone } }
                );
                console.log('@@@click2', postAuthOtpResponse);
                // handleSetPhoneAndRetry(
                //   { phone: phoneAndRetry.phone, retry: postAuthOtpResponse.data.retryDelay }
                // );
                setRetryDelay(+(postAuthOtpResponse.data.retryDelay / 1000).toFixed());
                console.log('@@@click3', { phone: phoneAndRetry.phone, retry: postAuthOtpResponse.data.retryDelay });
              }}
              className={clsx(styles.retry, styles.retryActive)}
              type='submit'
            >Запросить код повторно
            </button>
          )}
      </form>
    </div>
  );
};
export { SignInForm };
