import { createReducer } from '@reduxjs/toolkit';
import { PokemonType } from '../../models/Type';
import { fetchTypes } from '../actions';

export interface TypeState {
  fetching: boolean;
  all: PokemonType[];
}

const INITIAL_STATE: TypeState = {
  fetching: false,
  all: [],
};

export const typeReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(fetchTypes.pending, (state) => {
      state.fetching = true;
    })
    .addCase(fetchTypes.fulfilled, (state, action) => {
      if (!action.payload.types || !state.fetching) return;

      state.fetching = false;

      state.all = action.payload.types.map(([id, details]) => ({
        id: +id,
        fr: details.fr,
        en: details.en,
        color: details.color,
      }));
    }),
);
