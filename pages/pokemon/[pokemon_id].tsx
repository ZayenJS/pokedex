import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import Loader from '../../components/Loader/Loader';
import { usePokemon } from '../../hooks/usePokemon';

import styles from '../../styles/pages/PokemonPage/PokemonPage.module.scss';

const PokemonPage: FC = () => {
  const router = useRouter();
  const pokemonId = +(router.query.pokemon_id as string);

  const { fetching, pokemon } = usePokemon(pokemonId);

  const randomDescription = useCallback(() => {
    const descriptions = pokemon?.descriptions;
    if (!descriptions) return null;

    const randomIndex = Math.floor(Math.random() * descriptions.length);

    return descriptions[randomIndex];
  }, [pokemon]);

  const generation = pokemon?.generation;
  const types = pokemon?.types
    .map((type) => (
      <span key={type.id} className={styles.type} style={{ color: type.color }}>
        {type.fr.toLowerCase()}
      </span>
    ))
    .reduce((acc: any, curr: any) => [...acc, acc.length ? ' et ' : '', curr], []);

  return (
    <>
      <Loader fetching={fetching} />
      {!fetching && pokemon && (
        <div className={styles.container}>
          <div className={styles.name_container}>
            <strong className={styles.name}>{pokemon?.name}</strong>
            <em>Pokémon de type {types}</em>
            <em className={styles.generation}>{generation}</em>
          </div>
          <div className={styles.image_container}>
            <img src={pokemon?.sprites.front_default} alt={pokemon?.name} />
          </div>
          <p className={styles.description}>{randomDescription()}</p>
          <div className={styles.checkboxes}>
            <div className={styles.checkbox_container}>
              <input type="checkbox" name="baby" id="baby" checked={pokemon.isBaby} disabled />
              <label htmlFor="baby">Bébé</label>
            </div>
            <div className={styles.checkbox_container}>
              <input
                type="checkbox"
                name="legendary"
                id="legendary"
                checked={pokemon.isLegendary}
                disabled
              />
              <label htmlFor="legendary">Légendaire</label>
            </div>
            <div className={styles.checkbox_container}>
              <input
                type="checkbox"
                name="mythical"
                id="mythical"
                checked={pokemon.isMythical}
                disabled
              />
              <label htmlFor="mythical">Mythique</label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonPage;
