import { PokemonTypeColor } from '../constants';

export interface PokemonType {
  id: number;
  fr: string;
  en: string;
  color: PokemonTypeColor;
}
