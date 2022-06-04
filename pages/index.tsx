import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import { usePokemons } from '../hooks/usePokemons';

import { ITEMS_PER_PAGE } from '../constants';

import styles from '../styles/pages/Home/Home.module.scss';
import Pagination from '../components/Pagination/Pagination';
import PokemonListItem from '../components/PokemonListtem/PokemonListItem';

const Home: FC = () => {
  const { pokemons, totalPokemons, fetching: fetchingPokemons, fetchPokemons } = usePokemons();

  let nbPages = null;

  const router = useRouter();
  const currentPage = router.query.page ? +router.query.page : 1;

  useEffect(() => {
    fetchPokemons((currentPage - 1) * ITEMS_PER_PAGE);
  }, [currentPage]);

  if (totalPokemons) nbPages = Math.ceil(totalPokemons / ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <Head>
        <title>PokeWiki - Liste</title>
        <meta name="description" content="simple pokedex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {pokemons.length && !fetchingPokemons ? (
        <>
          <ul className={styles.list}>
            {pokemons.map((pokemon) => (
              <PokemonListItem pokemon={pokemon} key={pokemon.id} />
            ))}
          </ul>
          {nbPages && <Pagination currentPage={currentPage} nbPages={nbPages} />}
        </>
      ) : null}

      <Loader fetching={fetchingPokemons} />
    </div>
  );
};

export default Home;
