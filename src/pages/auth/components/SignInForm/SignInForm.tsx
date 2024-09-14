import clsx from 'clsx';

import { postAuthOtp } from '../../../../utils/api/requests/auth/otp';
import type { IPhoneAndRetry } from '../../Auth';

import { useSignInForm } from './hooks/useSignInForm';

import styles from '../../Auth.module.css';

interface SignInFormProps {
  handleSetStage: (stage: string) => void
  handleSetPhoneAndRetry: (data: IPhoneAndRetry) => void
  phoneAndRetry: IPhoneAndRetry
}
const SignInForm = ({
  handleSetStage,
  handleSetPhoneAndRetry,
  phoneAndRetry
}: SignInFormProps) => {
  // eslint-disable-next-line style/max-len
  const { state, onClick, form } = useSignInForm({ handleSetStage, handleSetPhoneAndRetry, phoneAndRetry });

  return (
    <div className={clsx(styles.form)}>
      <h1 className={clsx(styles.title)}>Авторизация</h1>
      <h2 className={clsx(styles.subtitle)}>Введите код для входа в личный кабинет</h2>
      <form action='' onSubmit={onClick.onSubmit}>
        <input placeholder='Телефон' className={clsx(styles.phone)} type='text' {...form.signInForm.register('phone', { required: true })} />
        <input placeholder='Код' className={clsx(styles.code)} type='text' {...form.signInForm.register('code', { required: true })} />
        <button className={clsx(styles.button)} type='submit'>Войти</button>
        {state.retryDelay !== 0 ?
          <button className={clsx(styles.retry, styles.retryOff)} type='button'>{`Запросить код повторно можно через ${state.retryDelay} секунд`}</button>
          : (
            <button
              onClick={async () => {
                const postAuthOtpResponse = await postAuthOtp(
                  { params: { phone: phoneAndRetry.phone } }
                );

                state.setRetryDelay(+(postAuthOtpResponse.data.retryDelay / 1000).toFixed());
              }}
              className={clsx(styles.retry, styles.retruOn)}
              type='button'
            >Запросить код повторно
            </button>

          )}
        {form.signInForm.formState.errors.code
         &&
        <p>{form.signInForm.formState.errors.code.message}</p>}
      </form>
    </div>
  );
};
export { SignInForm };
