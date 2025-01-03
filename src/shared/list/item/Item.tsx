import { ReactNode } from 'react';
import styles from './item.module.css';

export const Item = <T extends { correctAnswer: string }>({ data }: { data: T }): ReactNode => {
	return <section className={styles.itemContainer}>{data.correctAnswer}</section>;
};
