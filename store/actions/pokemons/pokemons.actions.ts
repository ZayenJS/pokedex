import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPokemons, getTotalPokemonCount } from '../../../queries/pokemons';
import { FetchPokemonsPayload } from './pokemons.payload';

export enum PokemonAction {
  FETCH_POKEMONS = 'FETCH_POKEMONS',
  GET_TOTAL_POKEMON_COUNT = 'GET_TOTAL_POKEMON_COUNT',
}

export const fetchPokemons = createAsyncThunk(
  PokemonAction.FETCH_POKEMONS,
  async (payload: FetchPokemonsPayload) => {
    const pokemons = await getAllPokemons(payload.limit, payload.offset);

    return {
      pokemons,
    };
  },
);

export const fetchTotalPokemonCount = createAsyncThunk(
  PokemonAction.GET_TOTAL_POKEMON_COUNT,
  async () => {
    const totalPokemonCount = await getTotalPokemonCount();

    return {
      totalPokemonCount,
    };
  },
);

export type PokemonActionType = ReturnType<typeof fetchPokemons>;
