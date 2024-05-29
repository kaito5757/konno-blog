'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';

export const MdxBody = ({ code }: { code: string }) => {
  const MDXComponent = useMDXComponent(code);
  return <MDXComponent />;
};