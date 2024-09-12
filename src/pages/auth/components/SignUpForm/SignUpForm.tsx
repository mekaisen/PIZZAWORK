import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { postAuthOtp } from '../../../../utils/api/requests/auth/otp';

interface PostOtpPhoneParams {
  phone: string
}

interface SignUpFormProps {
  handleSetStage: (stage: string) => void
  handleSetPhone: (phone: string) => void
  phone: string
}
const SignUpForm = ({ handleSetStage, handleSetPhone, phone }: SignUpFormProps) => {
  const signUpForm = useForm<PostOtpPhoneParams>({ defaultValues: {
    phone
  } });
  const onSubmit = signUpForm.handleSubmit(async () => {
    const params = signUpForm.getValues();
    handleSetPhone(params.phone);
    try {
      const res = await postAuthOtp({ params });
      if (res.data.success) {
        handleSetStage('signIn');
      }
    }
    catch (er) {
      if (er instanceof Error)
        throw new Error(er.message);
    }
  });
  return (
    <div>
      <h1>Авторизация</h1>
      <h2>Введите номер телефона для входав личный кабинет
      </h2>
      <form action='' onSubmit={onSubmit}>
        <input type='text' {...signUpForm.register('phone', { required: true })} />
        <button type='submit'>Продолжить</button>
      </form>
    </div>
  );
};
export { SignUpForm };
