import NJSHead from 'next/head';

import { FC } from 'react';

export interface HeadProps {
  metaTitle: string;
  metaDescription?: string;
}

const Head: FC<HeadProps> = ({ metaTitle, metaDescription }) => {
  return (
    <NJSHead>
      <title>{metaTitle}</title>
      {metaDescription ? (
        <meta name="description" content={metaDescription} />
      ) : null}
      {/* TODO what other head meta? */}
      <link rel="icon" href="/favicon.ico" />
    </NJSHead>
  );
};

export default Head;
