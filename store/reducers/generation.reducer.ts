import { createReducer } from '@reduxjs/toolkit';
import { Generation } from '../../models/Generation';
import { Pokemon } from '../../models/Pokemon';
import { fetchGenerations, setActiveGeneration } from '../actions';

export interface GenerationState {
  fetching: boolean;
  all: Generation[];
  pokemons: Pokemon[];
  activeGeneration: Generation | null;
}

const INITIAL_STATE: GenerationState = {
  fetching: false,
  all: [],
  pokemons: [],
  activeGeneration: null,
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
    })
    .addCase(setActiveGeneration, (state, action) => {
      const generation = state.all.find((g) => g.generation_id === action.payload.generationId);

      state.activeGeneration = generation ?? null;
    }),
);
