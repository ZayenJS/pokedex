import { useRouter } from 'next/router';
import { FC } from 'react';
import GoTop from '../components/GoTop/GoTop';
import Loader from '../components/Loader/Loader';
import PokemonListItem from '../components/PokemonList/PokemonListtem/PokemonListItem';
import { usePokemonSearch } from '../hooks/usePokemonSearch';

import styles from '../styles/pages/SearchPage/SearchPage.module.scss';

const Search: FC = () => {
  const router = useRouter();
  const search = router.query.q as string;

  const { searchResult, fetching } = usePokemonSearch(search);

  let formattedSearchResult = null;

  if (typeof searchResult === 'string') {
    formattedSearchResult = <p>{searchResult}</p>;
  }

  if (typeof searchResult !== 'string') {
    formattedSearchResult = (
      <ul className={styles.list}>
        {searchResult?.map((pokemon) => (
          <PokemonListItem pokemon={pokemon} key={pokemon.id} />
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.container}>
      {fetching ? (
        <Loader fetching />
      ) : (
        <>
          <strong className={styles.title}>
            Résultats de la recherche pour "<span className={styles.search}>{search}</span>"
          </strong>
          {formattedSearchResult}
        </>
      )}
      <GoTop />
    </div>
  );
};

export default Search;
