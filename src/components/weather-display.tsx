import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export const WeatherDisplay = ({ children }: Props) => {
  return <div className="w-full max-w-md">{children}</div>;
};
