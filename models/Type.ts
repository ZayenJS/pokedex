import { PokemonTypeColor } from '../@types/PokemonTypeColor';

export interface PokemonType {
  id: number;
  fr: string;
  en: string;
  color: PokemonTypeColor;
}
