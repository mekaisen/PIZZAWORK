import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';

import { usePayment } from './hooks/usePayment';

import styles from './Payment.module.css';

const Payment = () => {
  const navigate = useNavigate();
  const { state, onSubmit, form } = usePayment();
  if (state.toDebitStep) {
    return (
      <div className={clsx(styles.formContainer)}>
        <h1 className={clsx(styles.title)}>Введите данные карты для оплаты</h1>
        <form onSubmit={onSubmit.onSubmitDebit} className={clsx(styles.form)}>
          <label htmlFor='cvv' className={clsx(styles.label)}>cvv</label>
          <input id='cvv'placeholder='cvv' className={clsx(styles.input)} type='text' {...form.debitForm.register('cvv', { required: true })} />
          <label htmlFor='pan' className={clsx(styles.label)}>pan</label>
          <input id='pan'placeholder='pan' className={clsx(styles.input)} type='text' {...form.debitForm.register('pan', { required: true })} />
          <label htmlFor='expireDate' className={clsx(styles.label)}>expireDate</label>
          <input id='expireDate' placeholder='expireDate'className={clsx(styles.input)} type='text' {...form.debitForm.register('expireDate', { required: true })} />
          <button className={clsx(styles.btn)} type='submit'>Продолжить</button>
        </form>
      </div>
    );
  }
  return (
    <div className={clsx(styles.formContainer)}>
      <h1 className={clsx(styles.title)}>Введите ваши данные</h1>
      <form onSubmit={onSubmit.onSubmitProfile} className={clsx(styles.form)}>
        <label htmlFor='lastname' className={clsx(styles.label)}>Фамилия</label>
        <input id='lastname'placeholder='Фамилия' className={clsx(styles.input)} type='text' {...form.paymentForm.register('lastname', { required: true })} />
        <label htmlFor='middlename' className={clsx(styles.label)}>Отчество</label>
        <input id='middlename'placeholder='Отчество' className={clsx(styles.input)} type='text' {...form.paymentForm.register('middlename', { required: true })} />
        <label htmlFor='firstname' className={clsx(styles.label)}>Имя</label>
        <input id='firstname' placeholder='Имя'className={clsx(styles.input)} type='text' {...form.paymentForm.register('firstname', { required: true })} />
        <label htmlFor='phone' className={clsx(styles.label)}>Телефон</label>
        <input id='phone'placeholder='Телефон' className={clsx(styles.input)} type='text' {...form.paymentForm.register('phone', { required: true })} />
        <label htmlFor='email' className={clsx(styles.label)}>Почта</label>
        <input id='email'placeholder='Почта' className={clsx(styles.input)} type='text' {...form.paymentForm.register('email')} />
        <label htmlFor='city' className={clsx(styles.label)}>Город</label>
        <input id='city'placeholder='Город' className={clsx(styles.input)} type='text' {...form.paymentForm.register('city')} />
        <button className={clsx(styles.btnBack)} onClick={() => navigate({ to: '..' })} type='button'>Назад</button>
        <button className={clsx(styles.btn)} type='submit'>Продолжить</button>
      </form>
    </div>
  );
};
export { Payment };
