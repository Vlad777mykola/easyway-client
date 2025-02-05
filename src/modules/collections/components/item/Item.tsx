import { ReactNode } from 'react';
import styles from './item.module.css';
import { useNavigate } from 'react-router-dom';

export const Item = <
	T extends {
		title: string;
		id: string;
		category: string[];
		topic: string[];
	},
>({
	data,
}: {
	data: T;
}): ReactNode => {
	const navigate = useNavigate();

	const onClick = (id: string) => {
		navigate(`/collections/${id}`);
	};

	return (
		<section onClick={() => onClick(data.id)} className={styles.itemContainer}>
			<h1 className={styles.title}>{data.title}</h1>
			<div className={styles.infoCard}>
				<div className={styles.topicContainer}>
					<p className={styles.nameOfTopic}>Topic:</p>
					{data.topic.map((item, index) => (
						<p key={item} className={styles.dataInfo}>
							{item}
							{index < data.topic.length - 1 ? ',' : '.'}
						</p>
					))}
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
