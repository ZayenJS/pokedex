import { PokemonType } from './Type';

interface PokemonSprites {
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
}
