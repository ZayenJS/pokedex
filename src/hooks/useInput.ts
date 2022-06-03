import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { State } from '../../store/reducers';

export const useInput = (name: string, reducer: keyof State) => {
  const state = useSelector((state: State) => state[reducer]);
  const dispatch = useAppDispatch();

  return {
    _value: '',
    _onChange: (value: string) => dispatch({ type: '', payload: '' }),
  };
};
