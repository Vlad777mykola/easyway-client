import { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export const Wrapper = ({ children }: Props) => {
	return <div>{children}</div>;
};
