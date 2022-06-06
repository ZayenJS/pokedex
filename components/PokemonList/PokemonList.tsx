import { FC, useEffect, useRef, useState } from 'react';
import { ITEMS_PER_PAGE } from '../../constants';
import { usePokemons } from '../../hooks/usePokemons';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

import styles from './PokemonList.module.scss';
import PokemonListItem from './PokemonListtem/PokemonListItem';

export interface PokemonListProps {
  limit?: number;
  page?: 'generation' | 'type';
  generationId?: number;
  typeId?: number;
}

const PokemonList: FC<PokemonListProps> = ({
  limit = ITEMS_PER_PAGE,
  page,
  generationId,
  typeId,
}) => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const pageNumberRef = useRef(currentPage);

  const {
    pokemons,
    totalPokemons,
    fetching: fetchingPokemons,
    fetchPokemons,
  } = usePokemons({ typeId, generationId, limit });

  let nbPages = null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page');

      if (page && +page !== pageNumberRef.current) {
        setCurrentPage(+page);
        pageNumberRef.current = +page;
      }
    }
  });

  useEffect(() => {
    if (currentPage) {
      fetchPokemons((currentPage - 1) * limit);
    }
  }, [currentPage]);

  if (totalPokemons) nbPages = Math.ceil(totalPokemons / limit);

  let hrefPrefix: string | number = '';

  if (generationId && page === 'generation') {
    hrefPrefix = generationId;
  } else if (typeId && page === 'type') {
    hrefPrefix = typeId;
  }

  return (
    <div className={styles.container}>
      <Loader fetching={fetchingPokemons} />
      {pokemons.length && !fetchingPokemons ? (
        <>
          <ul className={styles.list}>
            {pokemons.map((pokemon) => (
              <PokemonListItem pokemon={pokemon} key={pokemon.id} />
            ))}
          </ul>
          {nbPages && (
            <Pagination hrefPrefix={hrefPrefix} currentPage={currentPage ?? 1} nbPages={nbPages} />
          )}
        </>
      ) : null}
      {!pokemons.length && !fetchingPokemons ? (
        <div className={styles.empty}>
          <p>Aucuns pokemons trouvés</p>
        </div>
      ) : null}
    </div>
  );
};

export default PokemonList;
