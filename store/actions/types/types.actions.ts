import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTypes } from '../../../queries/types';

export enum TypesAction {
  FETCH_TYPES = 'FETCH_TYPES',
}

export const fetchTypes = createAsyncThunk(TypesAction.FETCH_TYPES, async () => {
  const types = await getAllTypes();

  return {
    types,
  };
});
