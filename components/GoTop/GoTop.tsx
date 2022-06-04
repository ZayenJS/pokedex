import { FC, useEffect, useState } from 'react';

import styles from './GoTop.module.scss';

export interface GoTopProps {
  className?: string;
}

const GoTop: FC<GoTopProps> = ({ className }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return setVisible(true);
          }

          return setVisible(false);
        });
      },
      {
        rootMargin: '500px 0px',
      },
    );

    observer.observe(document.getElementById('page-top') as HTMLDivElement);

    return () => observer.disconnect();
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      title="Remonter en haut de la page"
      onClick={scrollToTop}
      className={`${styles.container} ${className ?? ''} ${visible ? styles.visible : ''}`}>
      &uarr;
    </div>
  );
};

export default GoTop;
