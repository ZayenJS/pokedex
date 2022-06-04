import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { usePokemonSearch } from '../../hooks/usePokemonSearch';

import styles from './Header.module.scss';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [search, setSearch] = useState('');
  const [volume, setVolume] = useState(0);
  const router = useRouter();
  const { search: searchPokemon } = usePokemonSearch('');

  const onInputChangeHandler = (event: ChangeEvent) => {
    setSearch((event.target as HTMLInputElement).value);
  };

  const onSearchHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!search) return;

    router.push(`/recherche?q=${search}`);
    searchPokemon(search);
    setSearch('');
  };

  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) audioRef.current.play();

      audioRef.current.volume = !audioRef.current.volume || audioRef.current?.volume === 0 ? 1 : 0;
      setVolume(audioRef.current.volume);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    setVolume(audioRef.current.volume);
  }, []);

  return (
    <header className={styles.container}>
      <div>
        <h1>
          <Link href="/">
            <a>PokéWiki</a>
          </Link>
        </h1>
        <form className={styles.search_form} onSubmit={onSearchHandler}>
          <input
            value={search}
            placeholder="Rechercher un pokémon..."
            onChange={onInputChangeHandler}
            type="search"
          />
          <button type="submit">R</button>
        </form>
        <nav>
          <ul className={styles.list}>
            <li>
              <Link href="/">Liste</Link>
            </li>
            <li>
              <Link href="/generations">Générations</Link>
            </li>
            <li>
              <Link href="/types">Types</Link>
            </li>
          </ul>
        </nav>
        <button
          title={volume > 0 ? 'Désactiver la musique' : 'Activer la musique'}
          className={`${styles.volume} ${volume > 0 ? 'pika-volume-up' : 'pika-volume-off'}`}
          onClick={toggleMusic}
        />
        <audio ref={audioRef}>
          <source src="/pokemon-opening.mp3" />
        </audio>
      </div>
    </header>
  );
};

export default Header;
