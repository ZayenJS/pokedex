import { FC } from 'react';
import { PropsInterface } from '../../@types/PropsInterface';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

import styles from './Layout.module.scss';

export interface LayoutProps extends PropsInterface {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div id="page-top" />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
