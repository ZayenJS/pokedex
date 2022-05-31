import { createReducer } from '@reduxjs/toolkit';
import { Pokemon } from '../../models/Pokemon';
import { fetchPokemons } from '../actions';

export interface PokemonState {
  fetching: boolean;
  all: Pokemon[];
}

const INITIAL_STATE: PokemonState = {
  fetching: false,
  all: [],
};

export const pokemonReducer = createReducer(INITIAL_STATE, (builder) =>
  builder
    .addCase(fetchPokemons.pending, (state) => {
      state.fetching = true;
    })
    .addCase(fetchPokemons.fulfilled, (state, action) => {
      if (!action.payload.pokemons.length || !state.fetching) return;

      state.fetching = false;

      const oldPokemons = [...state.all];
      state.all = [...new Set([oldPokemons, action.payload.pokemons].flat())];
    }),
);
