import { useRouter } from 'next/router';
import { FC } from 'react';
import Loader from '../components/Loader/Loader';
import PokemonListItem from '../components/PokemonListtem/PokemonListItem';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import styles from '../styles/pages/SearchPage/SearchPage.module.scss';

const Search: FC = () => {
  const router = useRouter();
  const search = router.query.q as string;

  const { searchResult, fetching } = usePokemonSearch(search);

  let formattedSearchResult = <p>Aucun résultat pour "{search}"</p>;
  if (searchResult.length)
    formattedSearchResult = (
      <ul className={styles.list}>
        {searchResult?.map((pokemon) => (
          <PokemonListItem pokemon={pokemon} key={pokemon.id} />
        ))}
      </ul>
    );

  return (
    <>
      {fetching ? (
        <Loader fetching />
      ) : (
        <>
          <strong>Résultats de la recherche</strong>
          {formattedSearchResult}
        </>
      )}
    </>
  );
};

export default Search;
