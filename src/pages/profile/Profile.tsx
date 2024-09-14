import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import type { PatchUserProfileParams } from '../../utils';
import { patchUserProfile } from '../../utils';
import { useProfile } from '../../utils/context/Profile';

import styles from './Profile.module.css';

const Profile = () => {
  // const responseProfile = useLoaderData({ from: '/profile' });
  const { setProfile, profile } = useProfile();

  const profileForm = useForm({ defaultValues: {
    lastname: profile?.profile?.lastname || '',
    middlename: profile?.profile?.middlename || '',
    firstname: profile?.profile?.firstname || '',
    phone: profile?.phone || '',
    email: profile?.profile?.email || '',
    city: profile?.profile?.city || ''
  } });
  const onSubmit = profileForm.handleSubmit(async () => {
    const values = profileForm.getValues();
    const params: PatchUserProfileParams = {
      profile: {
        firstname: values.firstname,
        middlename: values.middlename,
        lastname: values.lastname,
        email: values.email,
        city: values.city
      },
      phone: values.phone!
    };
    setProfile(params);
    await patchUserProfile({ params });
  });
  return (
    <div className={clsx(styles.formContainer)}>
      <h1 className={clsx(styles.title)}>Профиль</h1>
      <form onSubmit={onSubmit} className={clsx(styles.form)}>
        <label htmlFor='lastname' className={clsx(styles.label)}>Фамилия</label>
        <input id='lastname'placeholder='Фамилия' className={clsx(styles.input)} type='text' {...profileForm.register('lastname', { required: true })} />
        <label htmlFor='middlename' className={clsx(styles.label)}>Отчество</label>
        <input id='middlename'placeholder='Отчество' className={clsx(styles.input)} type='text' {...profileForm.register('middlename', { required: true })} />
        <label htmlFor='firstname' className={clsx(styles.label)}>Имя</label>
        <input id='firstname' placeholder='Имя'className={clsx(styles.input)} type='text' {...profileForm.register('firstname', { required: true })} />
        <label htmlFor='phone' className={clsx(styles.label)}>Телефон</label>
        <input id='phone'placeholder='Телефон' className={clsx(styles.input)} type='text' {...profileForm.register('phone', { required: true })} />
        <label htmlFor='email' className={clsx(styles.label)}>Почта</label>
        <input id='email'placeholder='Почта' className={clsx(styles.input)} type='text' {...profileForm.register('email')} />
        <label htmlFor='city' className={clsx(styles.label)}>Город</label>
        <input id='city'placeholder='Город' className={clsx(styles.input)} type='text' {...profileForm.register('city')} />
        <button className={clsx(styles.btn)} type='submit'>Обновить данные</button>
      </form>
    </div>
  );
};
export { Profile };
