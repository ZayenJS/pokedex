import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { fetchGenerations } from '../../store/actions';
import { State } from '../../store/reducers';

export const useGenerations = () => {
  const generations = useSelector((state: State) => state.generations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!generations.all.length && !generations.fetching) {
      dispatch(fetchGenerations());
    }
  });

  return {
    generations: generations.all,
    fetching: generations.fetching,
  };
};
