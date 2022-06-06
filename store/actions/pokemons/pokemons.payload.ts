import { Pokemon } from '../../../models/Pokemon';

export interface FetchPokemonsPayload {
  limit: number;
  offset?: number;
  generationId?: number;
  typeId?: number;
  pokemons?: Pokemon[];
}

export interface FetchPokemonByIdPayload {
  id: number | null;
  pokemon?: Pokemon;
}

export interface SearchPokemonsPayload {
  search: string;
  searchResult?: Pokemon[];
}
