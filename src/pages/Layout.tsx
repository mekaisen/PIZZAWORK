import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import clsx from "clsx";

import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={clsx(styles.container)}>
      <header className={clsx(styles.header, styles['full-width'])}>
        <nav className={clsx(styles.navbar,styles.flex )}>
          <Link to="/" className={clsx(styles.logo)}>
            <div>
              <div>ШИФТ</div>
              <div>PIZZA</div>
            </div>
            <div className={clsx(styles.logo_circlce)}></div>
          </Link>
          <div className={clsx(styles['links-container'], styles.flex)}>
            <ul className={clsx(styles.flex, styles.links)}>
              <li><Link to="/profile" className={clsx(styles.link)}>Профиль</Link></li>
              <li><Link to="/orders" className={clsx(styles.link)}>Заказы</Link></li>
            </ul>
            <ul className={clsx(styles.flex, styles.links)}>
              <li><Link to="/cart" className={clsx(styles.link)}>Корзина</Link></li>
              <li><Link to="/auth" className={clsx(styles.link)}>Войти / Выйти</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <main className={clsx(styles.main)}> <Outlet /> </main>
      <footer className={clsx(styles.footer)}>footer</footer>
      <TanStackRouterDevtools></TanStackRouterDevtools>
    </div>

  );
};
export {Layout}