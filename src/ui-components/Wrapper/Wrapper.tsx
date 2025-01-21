import { ReactNode } from 'react';
import style from './wrapper.module.css';

export const Wrapper = ({ children }: { children: ReactNode }) => {
	return <div className={style.wrapper}>{children}</div>;
};
