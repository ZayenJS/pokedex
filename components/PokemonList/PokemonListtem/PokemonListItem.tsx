import Link from 'next/link';
import { FC } from 'react';
import { PokemonTypeColor } from '../../../@types/PokemonTypeColor';
import { Pokemon } from '../../../models/Pokemon';

import styles from './PokemonListItem.module.scss';

export interface PokemonListItemProps {
  pokemon: Pokemon;
}

const PokemonListItem: FC<PokemonListItemProps> = ({ pokemon }) => {
  const color1 = PokemonTypeColor[pokemon.types[0].en as keyof typeof PokemonTypeColor];
  const color2 = pokemon.types[1]
    ? PokemonTypeColor[pokemon.types[1].en as keyof typeof PokemonTypeColor]
    : color1;

  const types = pokemon.types
    .map((t: { fr: string; en: string }) => (
      <span
        key={`${pokemon.id}-${t.en}`}
        className={styles.type}
        style={{ color: PokemonTypeColor[t.en as keyof typeof PokemonTypeColor] }}>
        {t.fr}
      </span>
    ))
    .reduce((acc: any, curr: any) => [...acc, acc.length ? ', ' : '', curr], []);

  return (
    <li key={pokemon.id} className={styles.list_item}>
      <div
        style={{
          background: 'none',
          border: `4px solid`,
          borderImageSlice: 1,
          borderImageSource: `linear-gradient(90deg, ${color1}, ${color2})`,
        }}>
        <span className={styles.number}>#{pokemon.id}</span>
        <Link href={`/pokemon/${pokemon.id}`} key={pokemon.name}>
          <a>
            <img src={pokemon.sprites.front_default} alt={`représentation de ${pokemon.name}`} />
            <strong>{pokemon.name}</strong>
          </a>
        </Link>
        <p>types: {types}</p>
      </div>
    </li>
  );
};

export default PokemonListItem;
