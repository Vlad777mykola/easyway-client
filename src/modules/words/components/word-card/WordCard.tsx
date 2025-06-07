import { Typography } from '@/ui-components/Typography';
import { classes } from '@/ui-design-atoms/classes';
import img from '@/assets/download.jpeg';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './wordCard.module.css';

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
}) => (
	<div className={styles.card}>
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
				<span className={classes(styles.type, styles[`${type.toLowerCase()}`])}>
					{'['} {type} {']'}
				</span>
			</div>
		</div>
	</div>
);
