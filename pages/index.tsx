import Head from 'next/head';
import { FC } from 'react';

import styles from '../styles/pages/Home/Home.module.scss';
import PokemonList from '../components/PokemonList/PokemonList';
import GoTop from '../components/GoTop/GoTop';

const Home: FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>PokeWiki - Liste</title>
        <meta name="description" content="simple pokedex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PokemonList />
      <GoTop />
    </div>
  );
};

export default Home;
