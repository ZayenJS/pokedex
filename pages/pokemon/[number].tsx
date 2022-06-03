import { useRouter } from 'next/router';
import { FC } from 'react';

const PokemonPage: FC = () => {
  const router = useRouter();
  const pokemonNumber = router.query.number as string;

  return (
    <>
      <h1>Pokemon {pokemonNumber}</h1>
    </>
  );
};

export default PokemonPage;
