import { ReactNode } from 'react';
import { Item } from './item/Item';
import styles from './list.module.css';

export const List = <T extends { exerciseAnswer: string; id: string }>({
	data,
}: {
	data: T[];
}): ReactNode => {
	return (
		<div className={styles.listContainer}>
			{data.map((i: T) => (
				<Item key={i.id} data={i} />
			))}
		</div>
	);
};
