import { ReactNode } from 'react';
import styles from './item.module.css';
import { useNavigate } from 'react-router-dom';

export const Item = <T extends { correctAnswer: string; id: number }>({
	data,
}: {
	data: T;
}): ReactNode => {
	const navigate = useNavigate();

	const onClick = (id: number) => {
		navigate(`/collections/${id}/task/${id}`);
	};
	return (
		<section onClick={() => onClick(data.id)} className={styles.itemContainer}>
			{data.correctAnswer}
		</section>
	);
};
