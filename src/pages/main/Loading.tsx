import clsx from 'clsx';

import { Skeleton } from '../../components';

import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className='container'>
      <div className={clsx(styles.pizza_card)}>
        <div className={clsx(styles.pizza_img)}>
          <Skeleton className='image' />
        </div>
        <div className={clsx(styles.pizza_info)}>
          <div className={clsx(styles.pizza_description)}>
            <div className={clsx(styles.pizza_title)}><Skeleton className='title' /></div>
            <div className={clsx(styles.pizza_subtitle)}><Skeleton className='desc' /><Skeleton className='desc' /><Skeleton className='desc' /></div>
          </div>
          <div className={clsx(styles.pizza_buyarea)}>
            <div className={clsx(styles.pizza_cost)}><Skeleton className='price' /></div>
            <Skeleton className='button' />
          </div>
        </div>
      </div>
      <div className={clsx(styles.pizza_card)}>
        <div className={clsx(styles.pizza_img)}>
          <Skeleton className='image' />
        </div>
        <div className={clsx(styles.pizza_info)}>
          <div className={clsx(styles.pizza_description)}>
            <div className={clsx(styles.pizza_title)}><Skeleton className='title' /></div>
            <div className={clsx(styles.pizza_subtitle)}><Skeleton className='desc' /><Skeleton className='desc' /><Skeleton className='desc' /></div>
          </div>
          <div className={clsx(styles.pizza_buyarea)}>
            <div className={clsx(styles.pizza_cost)}><Skeleton className='price' /></div>
            <Skeleton className='button' />
          </div>
        </div>
      </div>
      <div className={clsx(styles.pizza_card)}>
        <div className={clsx(styles.pizza_img)}>
          <Skeleton className='image' />
        </div>
        <div className={clsx(styles.pizza_info)}>
          <div className={clsx(styles.pizza_description)}>
            <div className={clsx(styles.pizza_title)}><Skeleton className='title' /></div>
            <div className={clsx(styles.pizza_subtitle)}><Skeleton className='desc' /><Skeleton className='desc' /><Skeleton className='desc' /></div>
          </div>
          <div className={clsx(styles.pizza_buyarea)}>
            <div className={clsx(styles.pizza_cost)}><Skeleton className='price' /></div>
            <Skeleton className='button' />
          </div>
        </div>
      </div>
      <div className={clsx(styles.pizza_card)}>
        <div className={clsx(styles.pizza_img)}>
          <Skeleton className='image' />
        </div>
        <div className={clsx(styles.pizza_info)}>
          <div className={clsx(styles.pizza_description)}>
            <div className={clsx(styles.pizza_title)}><Skeleton className='title' /></div>
            <div className={clsx(styles.pizza_subtitle)}><Skeleton className='desc' /><Skeleton className='desc' /><Skeleton className='desc' /></div>
          </div>
          <div className={clsx(styles.pizza_buyarea)}>
            <div className={clsx(styles.pizza_cost)}><Skeleton className='price' /></div>
            <Skeleton className='button' />
          </div>
        </div>
      </div>
      <div className={clsx(styles.pizza_card)}>
        <div className={clsx(styles.pizza_img)}>
          <Skeleton className='image' />
        </div>
        <div className={clsx(styles.pizza_info)}>
          <div className={clsx(styles.pizza_description)}>
            <div className={clsx(styles.pizza_title)}><Skeleton className='title' /></div>
            <div className={clsx(styles.pizza_subtitle)}><Skeleton className='desc' /><Skeleton className='desc' /><Skeleton className='desc' /></div>
          </div>
          <div className={clsx(styles.pizza_buyarea)}>
            <div className={clsx(styles.pizza_cost)}><Skeleton className='price' /></div>
            <Skeleton className='button' />
          </div>
        </div>
      </div>
      <div className={clsx(styles.pizza_card)}>
        <div className={clsx(styles.pizza_img)}>
          <Skeleton className='image' />
        </div>
        <div className={clsx(styles.pizza_info)}>
          <div className={clsx(styles.pizza_description)}>
            <div className={clsx(styles.pizza_title)}><Skeleton className='title' /></div>
            <div className={clsx(styles.pizza_subtitle)}><Skeleton className='desc' /><Skeleton className='desc' /><Skeleton className='desc' /></div>
          </div>
          <div className={clsx(styles.pizza_buyarea)}>
            <div className={clsx(styles.pizza_cost)}><Skeleton className='price' /></div>
            <Skeleton className='button' />
          </div>
        </div>
      </div>

    </div>

  );
};

export { Loading };
