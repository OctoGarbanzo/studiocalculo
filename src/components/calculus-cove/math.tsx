'use client';
import 'katex/dist/katex.min.css';

// Due to an issue with react-katex and Next.js 14, we need to dynamically import them.
import dynamic from 'next/dynamic';
import type { FC } from 'react';

const DynamicInlineMath = dynamic(() => import('react-katex').then(mod => mod.InlineMath), {
  ssr: false,
  loading: () => <span className="font-code">...</span>,
});

const DynamicBlockMath = dynamic(() => import('react-katex').then(mod => mod.BlockMath), {
  ssr: false,
  loading: () => <div className="font-code text-center p-4">...</div>,
});


export const IMath: FC<{ children: string }> = ({ children }) => {
  return <DynamicInlineMath math={children} />;
};

export const BMath: FC<{ children: string }> = ({ children }) => {
  return <DynamicBlockMath math={children} />;
};
