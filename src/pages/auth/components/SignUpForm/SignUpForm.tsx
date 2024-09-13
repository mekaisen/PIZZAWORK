import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { postAuthOtp } from '../../../../utils/api/requests/auth/otp';
import type { IPhoneAndRetry } from '../../Auth';

import styles from '../../Auth.module.css';

interface PostOtpPhoneParams {
  phone: string
}

interface SignUpFormProps {
  handleSetStage: (stage: string) => void
  handleSetPhoneAndRetry: (data: IPhoneAndRetry) => void
  phoneAndRetry: IPhoneAndRetry
}
const SignUpForm = ({ handleSetStage, handleSetPhoneAndRetry, phoneAndRetry }: SignUpFormProps) => {
  const signUpForm = useForm<PostOtpPhoneParams>({ defaultValues: {
    phone: phoneAndRetry.phone
  } });
  const onSubmit = signUpForm.handleSubmit(async () => {
    const params = signUpForm.getValues();
    const postAuthOtpResponse = await postAuthOtp({ params });
    handleSetPhoneAndRetry({ phone: params.phone, retry: postAuthOtpResponse.data.retryDelay });
    handleSetStage('signIn');
  });
  return (
    <div className={clsx(styles.form)}>
      <h1 className={clsx(styles.title)}>Авторизация</h1>
      <h2 className={clsx(styles.subtitle)}>Введите номер телефона для входав личный кабинет</h2>
      <form action='' onSubmit={onSubmit}>
        <input placeholder='Телефон' className={clsx(styles.phone)} type='text' {...signUpForm.register('phone', { required: true })} />
        <button className={clsx(styles.button)} type='submit'>Продолжить</button>
      </form>
    </div>
  );
};
export { SignUpForm };
