import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPokemons, getPokemonById, searchPokemon } from '../../../queries/pokemons';
import {
  FetchPokemonByIdPayload,
  FetchPokemonsPayload,
  SearchPokemonsPayload,
} from './pokemons.payload';

export enum PokemonAction {
  FETCH_POKEMONS = 'FETCH_POKEMONS',
  FETCH_POKEMON_BY_ID = 'FETCH_POKEMON_BY_ID',
  SEARCH_POKEMONS = 'SEARCH_POKEMONS',
}

export const fetchPokemons = createAsyncThunk(
  PokemonAction.FETCH_POKEMONS,
  async (payload: FetchPokemonsPayload) => {
    if (payload.limit === 0 && payload.offset === 0) {
      return {
        pokemons: [],
        totalPokemons: 0,
      };
    }
    const result = await getAllPokemons(payload.limit, payload.offset);

    return {
      pokemons: result.pokemons,
      totalPokemons: result.count,
    };
  },
);

export const fetchPokemonById = createAsyncThunk(
  PokemonAction.FETCH_POKEMON_BY_ID,
  async (payload: FetchPokemonByIdPayload) => {
    const result = await getPokemonById(payload.id);

    return {
      pokemon: result,
    };
  },
);

export const searchPokemons = createAsyncThunk(
  PokemonAction.SEARCH_POKEMONS,
  async (payload: SearchPokemonsPayload) => {
    try {
      const result = await searchPokemon(payload.search);

      return {
        searchResult: result,
      };
    } catch (error) {
      console.log('TODO: handle error 500');

      return {
        searchResult: [],
      };
    }
  },
);

export type PokemonActionType = ReturnType<typeof fetchPokemons>;
