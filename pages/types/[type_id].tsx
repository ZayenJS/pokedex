import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Loader from '../../components/Loader/Loader';
import PokemonList from '../../components/PokemonList/PokemonList';
import { useTypes } from '../../hooks/useTypes';

const Type: FC = () => {
  const router = useRouter();
  const typeId = Number(router.query.type_id);

  const { types } = useTypes();

  const type = types.find((t) => t.id === typeId);

  const title = type ? ` - Pokémons ${type.fr}` : '';

  return (
    <>
      <Head>
        <title>PokeWiki {title}</title>
        <meta name="description" content="simple pokedex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {typeId ? <PokemonList page="type" typeId={typeId} /> : <Loader fetching />}
    </>
  );
};

export default Type;
