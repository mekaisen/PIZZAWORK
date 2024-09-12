import { useForm } from 'react-hook-form';

import { postUserSignIn } from '../../../../utils/api/requests/user/signin';

interface SignInFormProps {
  handleSetStage: (stage: string) => void
  handleSetPhone: (phone: string) => void
  phone: string
}
const SignInForm = ({ handleSetStage, handleSetPhone, phone }: SignInFormProps) => {
  const signInForm = useForm<SignInDto>({ defaultValues: {
    phone,
    code: undefined
  } });
  const onSubmit = signInForm.handleSubmit(async () => {
    const params = signInForm.getValues();
    handleSetPhone(params.phone);
    try {
      const res = await postUserSignIn({ params });
      console.log(res);
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
      <h2>Введите код для входа в личный кабинет
      </h2>
      <form action='' onSubmit={onSubmit}>
        <input type='text' {...signInForm.register('phone', { required: true })} />
        <input type='text' {...signInForm.register('code', { required: true })} />
        <button type='submit'>Войти</button>
      </form>
    </div>
  );
};
export { SignInForm };
