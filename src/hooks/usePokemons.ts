import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchPokemons } from '../../store/actions';
import { State } from '../../store/reducers';

interface UsePokemonParams {
  limit?: number;
  id?: number;
}

export const usePokemons = ({ limit = 50, id }: UsePokemonParams = {}) => {
  const { pokemons } = useSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const footerObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !pokemons.fetching) {
        dispatch(
          fetchPokemons({
            limit,
            offset: pokemons.all.length,
          }),
        );
      }
    });

    footerObserver.observe(document.querySelector('footer') as HTMLElement);

    return () => footerObserver.disconnect();
  }, [pokemons.all.length]);

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
    fetching: pokemons.fetching,
  };
};
