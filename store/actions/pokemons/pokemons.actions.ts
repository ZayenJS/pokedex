import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GenericObject } from '../../../@types';
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
  CLEAR_SEARCH = 'CLEAR_SEARCH',
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

    const where: GenericObject<any> = {};

    if (payload.generationId) {
      where.pokemon_v2_pokemonspecy = {
        generation_id: { _eq: payload.generationId },
      };
    }

    if (payload.typeId) {
      where.pokemon_v2_pokemontypes = {
        pokemon_v2_type: {
          id: {
            _eq: payload.typeId,
          },
        },
      };
    }

    const result = await getAllPokemons(payload.limit, payload.offset, where);

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
        searchResult: result.length ? result : 'Aucuns résultats',
      };
    } catch (error) {
      return {
        searchResult: [],
      };
    }
  },
);

export const clearSearch = createAction(PokemonAction.CLEAR_SEARCH);

export type PokemonActionType = ReturnType<typeof fetchPokemons>;
