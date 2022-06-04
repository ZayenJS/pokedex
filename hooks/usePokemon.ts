import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { fetchPokemonById } from '../store/actions';
import { State } from '../store/reducers';

export const usePokemon = (id: number) => {
  const pokemons = useSelector((state: State) => state.pokemons);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemonById({ id }));

    return () => {
      dispatch(fetchPokemonById({ id: null }));
    };
  }, [id]);

  return {
    pokemon: pokemons.single,
    fetching: pokemons.fetching,
  };
};
