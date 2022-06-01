import Image from 'next/image';
import { FC } from 'react';

const Page404: FC = () => {
  return (
    <>
      <Image src="/pikachu-sad.webp" width={500} height={400} />
      <p>La page demandé est introuvable</p>
    </>
  );
};

export default Page404;
