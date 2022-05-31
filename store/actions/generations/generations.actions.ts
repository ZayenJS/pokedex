import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllGenerations } from '../../../queries/generation';

export enum GenerationsAction {
  FETCH_GENERATIONS = 'FETCH_GENERATIONS',
}

export const fetchGenerations = createAsyncThunk(GenerationsAction.FETCH_GENERATIONS, async () => {
  const generations = await getAllGenerations();

  return {
    generations,
  };
});
