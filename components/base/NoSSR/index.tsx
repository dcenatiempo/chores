import dynamic from 'next/dynamic';

export interface NoSSRProps {
  children?: React.ReactNode;
}

function NoSSR({ children }: NoSSRProps) {
  return <>{children}</>;
}

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false });
