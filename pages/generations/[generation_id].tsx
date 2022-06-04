import { useRouter } from 'next/router';
import { FC } from 'react';
import Loader from '../../components/Loader/Loader';
import { useActiveGeneration } from '../../hooks/useActiveGeneration';
import { useGenerations } from '../../hooks/useGenerations';
import { usePokemons } from '../../hooks/usePokemons';

const GenerationNumber: FC = () => {
  const router = useRouter();
  const generationId = router.query.generation_id ? +router.query.generation_id : null;
  const { fetching } = useGenerations();
  const { activeGeneration, setActiveGeneration } = useActiveGeneration(generationId);

  if (fetching) return <Loader fetching={true} />;

  return (
    <div>
      <h1>Pokemon {activeGeneration?.name}</h1>
    </div>
  );
};

export default GenerationNumber;
