import { Pokemon } from '../../../models/Pokemon';

export interface FetchPokemonsPayload {
  limit: number;
  offset?: number;
  pokemons?: Pokemon[];
}
