import { ReactNode } from 'react';
import { Item } from './item/Item';
import styles from './list.module.css';

export const List = <T extends { correctAnswer: string; id: number }>({
	data,
}: {
	data: T[];
}): ReactNode => {
	return (
		<div className={styles.listContainer}>
			{data.map((i: T) => (
				<Item data={i} />
			))}
		</div>
	);
};
