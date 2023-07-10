import { HTMLAttributes } from 'react';

interface LabelRoundedProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function LabelRounded({ children, ...props }: LabelRoundedProps) {
  return (
    <span
      className="inline-flex w-fit cursor-pointer capitalize border items-center rounded-full px-2 py-1 text-sm font-medium"
      {...props}
    >
      {children}
    </span>
  );
}
