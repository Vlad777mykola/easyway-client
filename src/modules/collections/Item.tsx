import { ReactNode } from 'react';
import styles from './item.module.css';
import { useNavigate } from 'react-router-dom';

export const Item = <T extends { title: string; id: string; subtitle: string }>({
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
			<div className={styles.title}>{data.title}</div>
			<div className={styles.subtitle}>{data.subtitle}</div>
		</section>
	);
};
