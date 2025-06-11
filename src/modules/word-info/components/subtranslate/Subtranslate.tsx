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
					<span className={styles.subNumber}>{id}</span>
					<span className={styles.translate}>{translated[0]}, </span>
					<span className={styles.secondTranslate}>{translated[1]}</span>
				</div>
				<div className={styles.exampleMeaningContainer}>
					<span className={styles.example}>
						(dummy verb) to perform an action that is specified by a noun
					</span>
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
