import { ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './item.module.css';

export const Item = <T extends { explanation: string; exerciseAnswer: string; id: string }>({
	data,
}: {
	data: T;
}): ReactNode => {
	const navigate = useNavigate();
	const { collectionsId } = useParams();

	const onClick = (id: string) => {
		navigate(`/collections/${collectionsId}/task/${id}`);
	};
	return (
		<section onClick={() => onClick(data.id)} className={styles.itemContainer}>
			<p className={styles.dataItem}>{data.exerciseAnswer}</p>
			<p className={styles.dataItem}>{data.explanation}</p>
		</section>
	);
};
