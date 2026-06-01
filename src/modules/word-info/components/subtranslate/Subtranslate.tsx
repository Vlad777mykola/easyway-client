import { Typography } from '@/ui-components/Typography';
import { Transitive } from '../transitive/Transitive';
import { UseExample } from '../use-example/UseExample';
import styles from './subtranslate.module.css';

export const Subtranslate = ({
	id,
	translate,
	name,
}: {
	id: string;
	translate: string;
	name: string;
}) => {
	const translated = translate?.split(',') || [];

	return (
		<div className={styles.subTranslate}>
			<div className={styles.subInfo}>
				<div className={styles.subTranslateContainer}>
					<Typography.Text className={styles.subNumber}>{id}</Typography.Text>
					<Typography.Text className={styles.translate}>{translated[0]}, </Typography.Text>
					<Typography.Text className={styles.secondTranslate}>{translated[1]}</Typography.Text>
				</div>
				<div className={styles.exampleMeaningContainer}>
					<Typography.Text className={styles.example}>
						(dummy verb) to perform an action that is specified by a noun
					</Typography.Text>
				</div>
				<Transitive
					name={name}
					isTransitive={true}
					isNotTransitive={true}
					inTransitiveSentence="won in a specific manner"
				/>
			</div>
			<UseExample />
		</div>
	);
};
