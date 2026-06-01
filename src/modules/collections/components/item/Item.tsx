import { ReactNode } from 'react';
import styles from './item.module.css';

export const Item = <
	T extends {
		title: string;
		id: string;
		category: string[];
		topic: string[];
	},
>({
	data,
	onClick,
}: {
	data: T;
	onClick: (id: string) => void;
}): ReactNode => {
	return (
		<section key={data.id} onClick={() => onClick(data.id)} className={styles.itemContainer}>
			<h1 className={styles.title}>{data.title}</h1>
			<div className={styles.infoCard}>
				<div className={styles.topicContainer}>
					<p className={styles.nameOfTopic}>Topic: </p>
					{data.topic}
				</div>
				<div className={styles.topicContainer}>
					<p className={styles.nameOfTopic}>Category: </p>
					{data.category.join(', ')}
				</div>
			</div>
		</section>
	);
};
