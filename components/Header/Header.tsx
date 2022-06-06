import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { usePokemonSearch } from '../../hooks/usePokemonSearch';
import Burger from '../Burger/Burger';

import styles from './Header.module.scss';

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [open, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [volume, setVolume] = useState(0);
  const [pikaAudio, setPikaAudio] = useState('/pikachu-1.mp3');
  const router = useRouter();
  const { search: searchPokemon } = usePokemonSearch('');

  const gameMusicRef = useRef<HTMLAudioElement>(null);
  const pikaAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!gameMusicRef.current) {
      return;
    }

    gameMusicRef.current.loop = true;
    gameMusicRef.current.volume = 0;
    setVolume(gameMusicRef.current.volume);
  }, []);

  const onBurgerClick = () => {
    setIsOpen(!open);
  };

  const onInputChangeHandler = (event: ChangeEvent) => {
    setSearch((event.target as HTMLInputElement).value);
  };

  const onSearchHandler = (event: FormEvent) => {
    event.preventDefault();
    if (!search) return;

    router.push(`/recherche?q=${search}`);
    searchPokemon(search);
    setSearch('');
    onBurgerClick();
  };

  const pikaPika = async () => {
    const audio = pikaAudioRef.current;
    if (!audio) return;

    audio.play();

    audio.addEventListener('ended', () => {
      const randomIndex = Math.floor(Math.random() * 4);
      setPikaAudio(`/pikachu-${randomIndex + 1}.mp3`);
      audio.src = pikaAudio;
    });
  };

  const toggleMusic = async () => {
    if (gameMusicRef.current) {
      if (gameMusicRef.current.paused) gameMusicRef.current.play();

      gameMusicRef.current.volume =
        !gameMusicRef.current.volume || gameMusicRef.current?.volume === 0 ? 0.5 : 0;
      setVolume(gameMusicRef.current.volume);
    }
  };

  return (
    <header className={styles.container}>
      <div>
        <h1>
          <Link href="/">
            <a>PokéWiki</a>
          </Link>
        </h1>
        <Burger open={open} onClick={onBurgerClick} />
        <div className={`${styles.search_nav} ${open ? styles.open : ''}`}>
          <form className={styles.search_form} onSubmit={onSearchHandler}>
            <input
              value={search}
              placeholder="Rechercher un pokémon..."
              onChange={onInputChangeHandler}
              type="search"
            />
            <button type="submit">
              <span className="pika-search" />
            </button>
          </form>
          <nav>
            <ul className={styles.list}>
              <li onClick={onBurgerClick}>
                <Link href="/">
                  <a onClick={pikaPika}>Liste</a>
                </Link>
              </li>
              <li onClick={onBurgerClick}>
                <Link href="/generations">
                  <a onClick={pikaPika}>Générations</a>
                </Link>
              </li>
              <li onClick={onBurgerClick}>
                <Link href="/types">
                  <a onClick={pikaPika}>Types</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <button
          title={volume > 0 ? 'Désactiver la musique' : 'Activer la musique'}
          className={`${styles.volume} ${volume > 0 ? 'pika-volume-up' : 'pika-volume-off'}`}
          onClick={toggleMusic}
        />
        <audio ref={gameMusicRef}>
          <source src="/pokemon-opening.mp3" />
        </audio>
        <audio ref={pikaAudioRef}>
          <source src={pikaAudio} />
        </audio>
      </div>
    </header>
  );
};

export default Header;
