import { useRouter } from 'next/router';
import { FC } from 'react';

const Search: FC = () => {
  const router = useRouter();
  const search = router.query.q as string;

  return (
    <>
      <strong>Search</strong>
      <p>{search}</p>
    </>
  );
};

export default Search;
