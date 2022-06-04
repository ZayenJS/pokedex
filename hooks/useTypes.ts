import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { fetchTypes } from '../store/actions';
import { State } from '../store/reducers';

export const useTypes = () => {
  const types = useSelector((state: State) => state.types);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!types.all.length && !types.fetching) {
      dispatch(fetchTypes());
    }
  });

  return {
    types: types.all,
    fetching: types.fetching,
  };
};
