import { ReactNode } from 'react';
import styles from './item.module.css';

export const Item = <T extends { explanation: string; exerciseAnswer: string; id: string }>({
	data,
	onClick,
}: {
	data: T;
	onClick: (id: string) => void;
}): ReactNode => {
	return (
		<section onClick={() => onClick(data.id)} className={styles.itemContainer}>
			<p className={styles.dataItem}>{data.exerciseAnswer}</p>
			<p className={styles.dataItem}>{data.explanation}</p>
			
		</section>
	);
};
