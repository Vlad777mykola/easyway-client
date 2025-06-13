import { Typography } from '@/ui-components/Typography';
import { PartOfSpeech } from '@/ui-components/PartOfSpeech';
import img from '@/assets/download.jpeg';

import styles from './wordCard.module.css';

export const WordCard = ({
	name,
	translate,
	type,
	useCase,
	onClick,
}: {
	name: string;
	translate: string;
	type: string;
	useCase: string;
	onClick: () => void;
}) => (
	<div className={styles.card} onClick={onClick}>
		<img className={styles.img} src={img} />
		<div className={styles.content}>
			<div className={styles.explanation}>
				<Typography.Title level={4}>{name}</Typography.Title>
				<div className={styles.translateContainer}>
					<Typography.Text className={styles.translate}>{translate}</Typography.Text>
				</div>
				<div className={styles.useCaseContainer}>
					<Typography.Text className={styles.useCase}>{useCase}</Typography.Text>
				</div>
			</div>
			<div className={styles.typeContainer}>
				<PartOfSpeech type={type} />
			</div>
		</div>
	</div>
);
