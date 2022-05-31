import { combineReducers } from '@reduxjs/toolkit';

import { generationReducer } from './generation.reducer';
import { pokemonReducer } from './pokemon.reducer';
import { typeReducer } from './types.reducer';

export const reducer = combineReducers({
  pokemons: pokemonReducer,
  generations: generationReducer,
  types: typeReducer,
});

export type State = ReturnType<typeof reducer>;
