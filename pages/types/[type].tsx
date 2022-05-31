import { useRouter } from 'next/router';
import { FC } from 'react';

const Type: FC = () => {
  const router = useRouter();
  const type = router.query.type as string;

  return <div>{type}</div>;
};

export default Type;
