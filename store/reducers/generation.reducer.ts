import { createReducer } from '@reduxjs/toolkit';
import { Generation } from '../../models/Generation';
import { fetchGenerations } from '../actions';

export interface GenerationState {
  fetching: boolean;
  all: Generation[];
}

const INITIAL_STATE: GenerationState = {
  fetching: false,
  all: [],
};

export const generationReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(fetchGenerations.pending, (state) => {
      state.fetching = true;
    })
    .addCase(fetchGenerations.fulfilled, (state, action) => {
      if (!action.payload.generations || !state.fetching) return;

      state.fetching = false;
      state.all = action.payload.generations;
    }),
);
