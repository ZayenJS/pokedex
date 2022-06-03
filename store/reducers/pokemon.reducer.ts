import { createReducer } from '@reduxjs/toolkit';
import { Pokemon } from '../../models/Pokemon';
import { fetchPokemons, fetchTotalPokemonCount } from '../actions';

export interface PokemonState {
  fetching: boolean;
  all: Pokemon[];
  totalCount: number | null;
}

const INITIAL_STATE: PokemonState = {
  fetching: false,
  all: [],
  totalCount: null,
};

export const pokemonReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(fetchPokemons.pending, (state) => {
      state.fetching = true;
    })
    .addCase(fetchPokemons.fulfilled, (state, action) => {
      if (!action.payload.pokemons.length || !state.fetching) return;

      state.fetching = false;

      state.all = action.payload.pokemons;
    })
    .addCase(fetchTotalPokemonCount.fulfilled, (state, action) => {
      state.totalCount = action.payload.totalPokemonCount;
    }),
);
