import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import Loader from '../../components/Loader/Loader';
import { useTypes } from '../../hooks/useTypes';

import styles from '../../styles/pages/Types/Types.module.scss';

const Types: FC = () => {
  const { fetching, types } = useTypes();

  const allTypes = types.map((type) => {
    return (
      <li key={type.id} className={styles.list_item}>
        <Link href={`/types/${type.id}`} key={type.fr}>
          <a style={{ backgroundColor: type.color }}>{type.fr}</a>
        </Link>
      </li>
    );
  });

  return (
    <>
      <Head>
        <title>PokeWiki - Types</title>
      </Head>
      <ul className={styles.list}>{allTypes}</ul>
      <Loader fetching={fetching} />
    </>
  );
};

export default Types;
