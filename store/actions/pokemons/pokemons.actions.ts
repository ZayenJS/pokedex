import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPokemons } from '../../../queries/pokemons';
import { FetchPokemonsPayload } from './pokemons.payload';

export enum PokemonAction {
  FETCH_POKEMONS = 'FETCH_POKEMONS',
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

export type PokemonActionType = ReturnType<typeof fetchPokemons>;
