import Image from 'next/image';
import { FC } from 'react';

import styles from '../styles/pages/404/404.module.scss';

const Page404: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src="/pikachu-sad.webp" layout="fill" objectFit="contain" />
      </div>
      <p>La page demandé est introuvable...</p>
    </div>
  );
};

export default Page404;
