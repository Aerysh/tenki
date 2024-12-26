import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Container = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
};
