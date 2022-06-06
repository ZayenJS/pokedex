import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { clearSearch, searchPokemons } from '../store/actions';
import { State } from '../store/reducers';

export const usePokemonSearch = (search: string) => {
  const pokemons = useSelector((state: State) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (search && !pokemons.searchResult.length) {
      dispatch(searchPokemons({ search }));
    }

    return () => {
      dispatch(clearSearch());
    };
  }, [search]);

  return {
    searchResult: pokemons.searchResult,
    fetching: pokemons.fetching,
    search: (search: string) => dispatch(searchPokemons({ search })),
  };
};
