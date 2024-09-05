import clsx from 'clsx';

import styles from './Skeleton.module.css';

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  // eslint-disable-next-line style/max-len
  return <div className={clsx(styles.animatedpulse, styles.bgmuted, styles.rounded, className)} {...props} />;
};

export { Skeleton };
