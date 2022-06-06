import { FC, useEffect, useState } from 'react';

import styles from './GoTop.module.scss';

export interface GoTopProps {
  className?: string;
}

const GoTop: FC<GoTopProps> = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState('2rem');

  useEffect(() => {
    const pageTopObserver = new IntersectionObserver(
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

    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const main = document.querySelector('main');
          const mainScrollHeight = main?.scrollHeight;
          const windowHeight = window.innerHeight;
          if (mainScrollHeight && mainScrollHeight > windowHeight) {
            return setBottomOffset('7rem');
          }
        }

        return setBottomOffset('2rem');
      });
    });

    pageTopObserver.observe(document.getElementById('page-top') as HTMLDivElement);
    footerObserver.observe(document.querySelector('footer') as HTMLElement);

    return () => {
      pageTopObserver.disconnect();
      footerObserver.disconnect();
    };
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
      style={{ bottom: bottomOffset }}
      className={`
      ${styles.container} ${className ?? ''}
      ${visible ? styles.visible : ''}
      `}>
      &uarr;
    </div>
  );
};

export default GoTop;
