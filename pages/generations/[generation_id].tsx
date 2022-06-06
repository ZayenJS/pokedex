import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Loader from '../../components/Loader/Loader';
import PokemonList from '../../components/PokemonList/PokemonList';
import { useActiveGeneration } from '../../hooks/useActiveGeneration';
import { useGenerations } from '../../hooks/useGenerations';

const GenerationNumber: FC = () => {
  const router = useRouter();
  const generationId = router.query.generation_id ? +router.query.generation_id : null;
  const { fetching } = useGenerations();
  const { activeGeneration } = useActiveGeneration(generationId);

  if (fetching) return <Loader fetching={true} />;

  const title = activeGeneration ? ` - Pokémons de ${activeGeneration.name}` : '';

  return (
    <>
      <Head>
        <title>PokeWiki {title}</title>
        <meta name="description" content="simple pokedex app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {activeGeneration?.id ? (
        <PokemonList page="generation" generationId={activeGeneration?.generation_id} />
      ) : (
        <Loader fetching />
      )}
    </>
  );
};

export default GenerationNumber;
