import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { PokemonTypeColor } from '../constants';
import Input from '../src/components/Input/Input';
import Loader from '../src/components/Loader/Loader';
import { usePokemons } from '../src/hooks/usePokemons';
import { useTypes } from '../src/hooks/useTypes';

import styles from '../styles/pages/Home/Home.module.scss';

const Home: FC = () => {
  const { pokemons, fetching: fetchingPokemons } = usePokemons();
  const { types, fetching: fetchingTypes } = useTypes();

  const allPokemons = pokemons?.map((pokemon: any) => {
    const color1 = PokemonTypeColor[pokemon.types[0].en as keyof typeof PokemonTypeColor];
    const color2 = pokemon.types[1]
      ? PokemonTypeColor[pokemon.types[1].en as keyof typeof PokemonTypeColor]
      : color1;

    const types = pokemon.types
      .map((t: { fr: string; en: string }) => (
        <span
          key={`${pokemon.id}-${t.en}`}
          className={styles.type}
          style={{ color: PokemonTypeColor[t.en as keyof typeof PokemonTypeColor] }}>
          {t.fr}
        </span>
      ))
      .reduce((acc: any, curr: any) => [...acc, acc.length ? ', ' : '', curr], []);

    return (
      <li key={pokemon.id} className={styles.list_item}>
        <div
          style={{
            background: 'none',
            border: `4px solid`,
            borderImageSlice: 1,
            borderImageSource: `linear-gradient(90deg, ${color1}, ${color2})`,
          }}>
          <span className={styles.number}>#{pokemon.id}</span>
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.name}>
            <a>
              <img src={pokemon.sprites.front_default} alt="" />
              <strong>{pokemon.name}</strong>
            </a>
          </Link>
          <p>types: {types}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>PokeWiki - Liste</title>
        <meta name="description" content="simple pokedex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {allPokemons.length ? (
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

          <ul className={styles.list}>{allPokemons}</ul>
        </>
      ) : null}

      <Loader fetching={fetchingPokemons} />
    </div>
  );
};

export default Home;
