import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { setActiveGeneration } from '../store/actions';
import { State } from '../store/reducers';

export const useActiveGeneration = (generationId: number | null) => {
  const { generations } = useSelector((state: State) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!generations.activeGeneration && generations.all.length > 0) {
      dispatch(setActiveGeneration({ generationId }));
    }

    return () => {
      dispatch(setActiveGeneration({ generationId: null }));
    };
  }, [generations.all.length]);

  return {
    activeGeneration: generations.activeGeneration,
    setActiveGeneration: (id: number | null = generationId) =>
      dispatch(setActiveGeneration({ generationId: id })),
  };
};
