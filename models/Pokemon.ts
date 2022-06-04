import { PokemonType } from './Type';

interface PokemonSprites {
  front_default: string;
}

export interface Pokemon {
  id: number;
  name: string;
  generation?: string;
  types: PokemonType[];
  sprites: PokemonSprites;
  descriptions?: string[];
  isLegendary?: boolean;
  isMythical?: boolean;
  isBaby?: boolean;
}
