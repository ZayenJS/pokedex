import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchPokemons, fetchTotalPokemonCount } from '../../store/actions';
import { State } from '../../store/reducers';

interface UsePokemonParams {
  limit?: number;
  id?: number;
}

export const usePokemons = ({ limit = 100, id }: UsePokemonParams = {}) => {
  const { pokemons } = useSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!pokemons.all.length && !pokemons.fetching) {
      dispatch(fetchTotalPokemonCount());
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
