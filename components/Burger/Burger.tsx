import { FC } from 'react';

import classes from './Burger.module.scss';

export interface BurgerProps {
  open: boolean;
  onClick: () => void;
}

const Burger: FC<BurgerProps> = ({ open, onClick }) => {
  return (
    <button onClick={onClick} className={`${classes.container} ${open ? classes.open : ''}`}>
      <span className={classes.line} />
      <span className={classes.line} />
      <span className={classes.line} />
    </button>
  );
};

export default Burger;
