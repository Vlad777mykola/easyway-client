import { UseExample } from '../use-example/UseExample';
import styles from './subtranslate.module.css';

export const Subtranslate = ({ id, translated }: { id: string; translated: string[] }) => {
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
				<div className={styles.transitiveContainer}>
					<span className={styles.transitive}>Transitive: </span>
					<span className={styles.wordTransitive}>
						<b>to do</b>
					</span>
					<span className={styles.sth}>sth</span>
				</div>
			</div>
			<UseExample />
		</div>
	);
};
