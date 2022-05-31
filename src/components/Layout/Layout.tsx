import { FC, useEffect } from 'react';
import { PropsInterface } from '../../../@types/PropsInterface';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import classes from './Layout.module.scss';

export interface LayoutProps extends PropsInterface {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
