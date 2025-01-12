import { ReactNode } from 'react';
import { Item } from './Item';
import styles from './listCollections.module.css';

export const ListCollections = <T extends { title: string; id: number; subtitle: string }>({
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
