import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ITEMS_PER_PAGE } from '../constants';
import { useAppDispatch } from '../store';
import { fetchPokemons } from '../store/actions';
import { State } from '../store/reducers';

interface UsePokemonParams {
  limit?: number;
}

export const usePokemons = ({ limit = ITEMS_PER_PAGE }: UsePokemonParams = {}) => {
  const { pokemons } = useSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pokemons.all.length && !pokemons.fetching) {
      dispatch(
        fetchPokemons({
          limit,
          offset: pokemons.all.length,
        }),
      );
    }
  }, []);

  return {
    pokemons: pokemons.all,
    totalPokemons: pokemons.totalCount,
    fetching: pokemons.fetching,
    fetchPokemons: (offset: number = 0) => dispatch(fetchPokemons({ limit, offset })),
  };
};
