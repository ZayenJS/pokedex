import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { PokemonTypeColor } from '../constants';
import Input from '../src/components/Input/Input';
import Loader from '../src/components/Loader/Loader';
import { usePokemons } from '../src/hooks/usePokemons';
import { useTypes } from '../src/hooks/useTypes';

import styles from '../styles/pages/Home/Home.module.scss';

const PokemonCardComponent = dynamic(() => import('../src/components/PokemonCard/PokemonCard'));

const Home: FC = () => {
  const { pokemons, totalPokemons, fetching: fetchingPokemons, fetchPokemons } = usePokemons();
  const { types } = useTypes();

  let nbPages = null;

  const router = useRouter();
  const currentPage = router.query.page ? +router.query.page : 1;

  useEffect(() => {
    fetchPokemons(currentPage * 100);
  }, [currentPage]);

  if (totalPokemons) nbPages = Math.ceil(totalPokemons / 100);

  let allPages = null;
  if (nbPages) {
    const pages = Array.from({ length: nbPages }, (_, i) => i + 1);
    allPages = pages.map((page) => {
      return (
        <li key={page} className={styles.list_item}>
          <Link href={`/?page=${page}`} key={page}>
            <a>{page}</a>
          </Link>
        </li>
      );
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>PokeWiki - Liste</title>
        <meta name="description" content="simple pokedex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {pokemons.length && !fetchingPokemons ? (
        <>
          <form className={styles.filter_form}>
            {types?.map((type) => (
              <Input
                key={`type-${type.en.toLowerCase()}`}
                className={{ input: styles[type.en.toLowerCase()] }}
                data={{
                  input: {
                    'data-color': PokemonTypeColor[type.en as keyof typeof PokemonTypeColor],
                  },
                }}
                name={type.en}
                type="checkbox"
                reducer={'types'}
                id={type.id.toString()}
                label={type.fr}
              />
            ))}
          </form>

          <ul className={styles.list}>
            {pokemons.map((pokemon) => (
              <PokemonCardComponent pokemon={pokemon} key={pokemon.id} />
            ))}
          </ul>
          <ul className={styles.pagination_container}>{allPages}</ul>
        </>
      ) : null}

      <Loader fetching={fetchingPokemons} />
    </div>
  );
};

export default Home;
