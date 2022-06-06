import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import GoTop from '../../components/GoTop/GoTop';
import Loader from '../../components/Loader/Loader';
import { useGenerations } from '../../hooks/useGenerations';

import styles from '../../styles/pages/Generation/Generation.module.scss';

const Generation: FC = () => {
  const { fetching, generations } = useGenerations();

  const allGenerations = generations.map((generation) => (
    <li key={generation.id} className={styles.list_item}>
      <Link href={`/generations/${generation.generation_id}`} key={generation.id}>
        <a>
          <span>{generation.name}</span>
        </a>
      </Link>
    </li>
  ));

  return (
    <>
      <Head>
        <title>PokeWiki - Générations</title>
      </Head>
      <Loader fetching={fetching} />
      <ul className={styles.list}>{allGenerations}</ul>
      <GoTop />
    </>
  );
};

export default Generation;
