import { Typography } from '@/ui-components/Typography';
import styles from './wordCard.module.css';

import img from '@/assets/download.jpeg';

export const WordCard = ({
	name,
	translate,
	type,
	useCase,
}: {
	name: string;
	translate: string;
	type: string;
	useCase: string;
}) => {
	return (
		<div>
			<img className={styles.img} src={img} />
			<Typography.Title>{name}</Typography.Title>
			<Typography.Text>{translate}</Typography.Text>
			<Typography.Text>{useCase}</Typography.Text>
			<div>{type}</div>
		</div>
	);
};
