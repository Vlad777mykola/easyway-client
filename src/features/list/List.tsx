import { ReactNode } from 'react';
import { Item } from './item/Item';
import styles from './list.module.css';

export const List = <
	T extends {
		explanation: string;
		exerciseAnswer: string;
		id: string;
	},
>({
	data,
	onClick,
}: {
	data: T[];
	onClick: (id: string) => void;
}): ReactNode => {
	return (
		<div className={styles.listContainer}>
			{data.map((i: T) => (
				<Item key={i.id} data={i} onClick={onClick} />
			))}
		</div>
	);
};
