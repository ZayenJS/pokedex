import { createReducer } from '@reduxjs/toolkit';
import { Pokemon } from '../../models/Pokemon';
import { fetchPokemonById, fetchPokemons, searchPokemons } from '../actions';

export interface PokemonState {
  fetching: boolean;
  all: Pokemon[];
  totalCount: number | null;
  single: Pokemon | null;
  searchResult: Pokemon[];
}

const INITIAL_STATE: PokemonState = {
  fetching: false,
  all: [],
  totalCount: null,
  single: null,
  searchResult: [],
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
      state.totalCount = action.payload.totalPokemons;
    })
    .addCase(fetchPokemons.rejected, (state) => {
      state.fetching = false;
    })
    .addCase(fetchPokemonById.pending, (state) => {
      state.fetching = true;
    })
    .addCase(fetchPokemonById.fulfilled, (state, action) => {
      if (!action.payload.pokemon || !state.fetching) return;

      state.fetching = false;
      state.single = action.payload.pokemon[0];
    })
    .addCase(fetchPokemonById.rejected, (state) => {
      state.fetching = false;
    })
    .addCase(searchPokemons.pending, (state) => {
      state.fetching = true;
    })
    .addCase(searchPokemons.fulfilled, (state, action) => {
      if (!action.payload.searchResult || !state.fetching) return;

      state.fetching = false;
      state.searchResult = action.payload.searchResult;
    }),
);
