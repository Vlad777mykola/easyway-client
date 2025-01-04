import { ReactNode } from 'react';
import style from './wrapperCard.module.css';

export const WrapperCard = ({ children }: { children: ReactNode }) => {
	return <div className={style.wrapperCard}>{children}</div>;
};
