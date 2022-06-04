import Link from 'next/link';
import { FC } from 'react';

import styles from './Pagination.module.scss';

export interface PaginationProps {
  nbPages: number;
  currentPage: number;
  pageOffset?: number | null;
}

const Pagination: FC<PaginationProps> = ({ nbPages, currentPage, pageOffset }) => {
  let allPages = null;

  const pages = Array.from({ length: nbPages }, (_, i) => i + 1);
  const start = (
    <li
      key="page-start"
      className={`${styles.item}
          ${currentPage === 1 ? styles.disabled : ''}`}>
      <Link href={`?page=1`}>
        <a className="pika-step-start" />
      </Link>
    </li>
  );

  const end = (
    <li
      key="page-end"
      className={`${styles.item}
          ${currentPage === nbPages ? styles.disabled : ''}`}>
      <Link href={`?page=${nbPages}`}>
        <a className="pika-step-end" />
      </Link>
    </li>
  );

  allPages = [
    start,
    ...pages.map((page) => {
      if (pageOffset === undefined) pageOffset = 4;

      const minusOffset = currentPage - (pageOffset ?? 0);
      const positiveOffset = currentPage + (pageOffset ?? 0);
      const condition =
        typeof pageOffset === 'number' ? page >= minusOffset && page <= positiveOffset : true;

      if (condition) {
        return (
          <li
            key={page}
            className={`${styles.item}
          ${currentPage === page ? styles.active : ''}`}>
            <Link href={`?page=${page}`}>
              <a>{page}</a>
            </Link>
          </li>
        );
      }
    }),
    end,
  ];

  return <ul className={styles.container}>{allPages}</ul>;
};

export default Pagination;
