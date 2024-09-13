import { Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import clsx from 'clsx';

import { AuthIcon } from '../assets/icons/AuthIcon';
import { ClockIcon } from '../assets/icons/ClockIcon';
import { OrderIcon } from '../assets/icons/OrderIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';
import { useProfile } from '../utils/context/Profile';
import { useSession } from '../utils/context/Session';

import styles from './Layout.module.css';

const Layout = () => {
  const { session, setSession } = useSession();
  const { setProfile } = useProfile();

  return (
    <div className={clsx(styles.container)}>
      <header className={clsx(styles.header, styles['full-width'])}>
        <nav className={clsx(styles.navbar, styles.flex)}>
          <Link to='/' className={clsx(styles.logo)}>
            <div className={clsx(styles.logo_text)}>
              <div>ШИФТ</div>
              <div>PIZZA</div>
            </div>
            <div className={clsx(styles.logo_circlce)}></div>
          </Link>
          <div className={clsx(styles['links-container'], styles.flex)}>
            <ul className={clsx(styles.flex, styles.links)}>
              <li>
                <Link to='/profile' className={clsx(styles.link)}>
                  <ProfileIcon />
                  <span>Профиль</span>
                </Link>
              </li>
              <li>
                <Link to='/orders' className={clsx(styles.link)}>
                  <ClockIcon />
                  <span>Заказы</span>
                </Link>
              </li>
            </ul>
            <ul className={clsx(styles.flex, styles.links)}>
              <li>
                <Link to='/cart' className={clsx(styles.link)}>
                  <OrderIcon color='#f4511e' />
                  <span>Корзина</span>
                </Link>
              </li>
              <li>
                {!session ? (
                  <Link to='/auth' className={clsx(styles.link)}>
                    <AuthIcon />
                    <span>Войти</span>
                  </Link>
                ) : (
                  <Link
                    to='/'
                    onClick={() => {
                      setSession(false);
                      setProfile(undefined!);
                      localStorage.removeItem('accessToken');
                    }}
                    className={clsx(styles.link)}
                  >
                    <AuthIcon />
                    <span>Выйти</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <main className={clsx(styles.main)}> <Outlet /> </main>

      <TanStackRouterDevtools></TanStackRouterDevtools>
    </div>

  );
};
export { Layout };
