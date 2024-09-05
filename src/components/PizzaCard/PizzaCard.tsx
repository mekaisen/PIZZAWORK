import React from 'react';
import clsx from 'clsx';

import styles from './PizzaCard.module.css';

interface PizzaCardProps {
  className?: string
  children: React.ReactNode
  pizza?: Pizza
}

// const PizzaCard = ({ pizza }: PizzaCardProps) => {
//   return (
//     <div className={clsx(styles.pizza_card)}>
//       <div className={clsx(styles.pizza_img)}>
//         <img src={BASE_URL + pizza.img} alt={pizza.name} />
//       </div>
//       <div className={clsx(styles.pizza_info)}>
//         <div className={clsx(styles.pizza_description)}>
//           <div className={clsx(styles.pizza_title)}>{pizza.name}</div>
//           <div className={clsx(styles.pizza_subtitle)}>{pizza.description}</div>
//         </div>
//         <div className={clsx(styles.pizza_buyarea)}>
//           <div className={clsx(styles.pizza_cost)}>От {pizza.sizes[0].price} ₽</div>
//           <button type='button' className={clsx(styles.pizza_button)}>Выбрать</button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export { PizzaCard };

const PizzaCard = React.forwardRef<HTMLDivElement, PizzaCardProps>
(({ className, pizza, ...props }, ref) => (
  <div className={clsx(className)} ref={ref} {...props} />
));
PizzaCard.displayName = 'PizzaCard';

interface PizzaCardImageProps extends React.ComponentProps<'div'> {
  src: string
  alt: string
}

const PizzaCardImage = React.forwardRef<HTMLDivElement, PizzaCardImageProps>
(({ className, src, alt, ...props }, ref) => (
  <div ref={ref} className={clsx(styles.pizza_img, className)} {...props}>
    <img src={src} alt={alt} />
  </div>
));
PizzaCardImage.displayName = 'PizzaCardImage';

const PizzaCardInfo = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div className={clsx(styles.pizza_info, className)} ref={ref} {...props} />
  )
);

const PizzaCardTitle = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div className={clsx(styles.pizza_title, className)} ref={ref} {...props} />
  )
);

const PizzaCardSubTitle = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div className={clsx(styles.pizza_subtitle, className)} ref={ref} {...props} />
  )
);

const PizzaCardDescription = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div className={clsx(styles.pizza_description, className)} ref={ref} {...props} />
  )
);

interface PizzaCardCostProps extends React.ComponentProps<'div'> {
  children: React.ReactNode

}
const PizzaCardCost = React.forwardRef<HTMLDivElement, PizzaCardCostProps>(
  ({ className, children, ...props }, ref) => (
    <div className={clsx(styles.pizza_cost, className)} ref={ref} {...props}>
      {children} ₽
    </div>
  )
);
const PizzaCardButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
  ({ className, type, ...props }, ref) => (
    <button className={clsx(styles.pizza_button, className)} type={type} ref={ref} {...props} />
  )
);
const PizzaCardBuyArea = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div className={clsx(styles.pizza_buyarea, className)} ref={ref} {...props} />
  )
);
const PizzaCardContainer = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div className={clsx(className)} ref={ref} {...props} />
  )
);

export {
  PizzaCard,
  PizzaCardButton,
  PizzaCardBuyArea,
  PizzaCardContainer,
  PizzaCardCost,
  PizzaCardDescription,
  PizzaCardImage,
  PizzaCardInfo,
  PizzaCardSubTitle,
  PizzaCardTitle
};

// eslint-disable-next-line no-lone-blocks
{ /* <PizzaCard>
  <PizzaCardImage>
  </PizzaCardImage>
  <PizzaCardInfo>
    <PizzaCardDescription>
      <PizzaCardTitle></PizzaCardTitle>
      <PizzaCardSubTitle></PizzaCardSubTitle>
    </PizzaCardDescription>
    <PizzaCardBuyArea>
      <PizzaCardCost></PizzaCardCost>
      <PizzaCardButton></PizzaCardButton>
    </PizzaCardBuyArea>
  </PizzaCardInfo>
</PizzaCard>; */ };
