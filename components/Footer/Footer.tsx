import { FC } from 'react';

import styles from './Footer.module.scss';

export interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <p>
          Projet développé en{' '}
          <a
            className={styles.external_link}
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferer">
            Next.js
          </a>{' '}
          et{' '}
          <a
            className={styles.external_link}
            href="https://typescriptlang.org"
            target="_blank"
            rel="noopener noreferer">
            TypeScript
          </a>{' '}
          à l'aide de la{' '}
          <a
            className={styles.external_link}
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferer">
            Pokeapi
          </a>{' '}
          en version{' '}
          <a
            className={styles.external_link}
            href="https://pokeapi.co/docs/graphql"
            target="_blank"
            rel="noopener noreferer">
            GraphQl
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
