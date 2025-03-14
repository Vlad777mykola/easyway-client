import { ReactNode } from 'react';
import styles from './item.module.css';

export const Item = <
	T extends {
		title: string;
		id: string;
		category: string[];
		topic: string[] | string;
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
					<p className={styles.nameOfTopic}>Topic:</p>
					{typeof data.topic === 'object' ? (
						data.topic.map((item, index) => (
							<p key={item} className={styles.dataInfo}>
								{item}
								{index < data.topic.length - 1 ? ',' : '.'}
							</p>
						))
					) : (
						<p className={styles.dataInfo}>{data.topic}.</p>
					)}
				</div>
				<div className={styles.topicContainer}>
					<p className={styles.nameOfTopic}>Category: </p>
					{data.category.map((item, index) => (
						<p key={item} className={styles.dataInfo}>
							{item}
							{index < data.category.length - 1 ? ',' : '.'}
						</p>
					))}
				</div>
			</div>
		</section>
	);
};
