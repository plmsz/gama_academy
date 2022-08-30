import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

function Alert({ children }: Props) {
  return <small id='alertRepo' role='alert'>{children}</small>;
}

export default Alert;
