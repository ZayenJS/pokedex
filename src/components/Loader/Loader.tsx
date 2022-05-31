import Image from 'next/image';
import { FC } from 'react';

import styles from './Loader.module.scss';

export interface LoaderProps {
  fetching: boolean;
}

const Loader: FC<LoaderProps> = ({ fetching }) => {
  return fetching ? (
    <div className={styles.loading_image_container}>
      <Image
        priority={true}
        className={fetching ? styles.loading : ''}
        src="/pikachu-running.gif"
        alt="pikachu en train de courrir"
        layout="fill"
        objectFit="contain"
      />
    </div>
  ) : null;
};

export default Loader;
