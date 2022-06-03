import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllGenerations } from '../../../queries/generation';
import { getPokemonsByGeneration } from '../../../queries/pokemons';
import { FetchPokemonGenerationPayload, setActiveGenerationPayload } from './generations.payload';

export enum GenerationsAction {
  FETCH_GENERATIONS = 'FETCH_GENERATIONS',
  FETCH_POKEMON_GENERATION = 'FETCH_POKEMON_GENERATION',
  SET_ACTIVE_GENERATION = 'SET_ACTIVE_GENERATION',
}

export const fetchGenerations = createAsyncThunk(GenerationsAction.FETCH_GENERATIONS, async () => {
  const generations = await getAllGenerations();

  return {
    generations,
  };
});

export const fetchPokemonGeneration = createAsyncThunk(
  GenerationsAction.FETCH_POKEMON_GENERATION,
  async (payload: FetchPokemonGenerationPayload) => {
    const pokemons = await getPokemonsByGeneration(
      payload.generationId,
      payload.limit,
      payload.offset,
    );

    return {
      pokemons,
    };
  },
);

export const setActiveGeneration = createAction(
  GenerationsAction.SET_ACTIVE_GENERATION,
  (payload: setActiveGenerationPayload) => ({
    payload,
  }),
);
