import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { UseExample } from '../use-example/UseExample';
import img from '@/assets/download.jpeg';
import styles from './explanation.module.css';
import { Subtranslate } from '../subtranslate/Subtranslate';

export const Explanation = ({
	id,
	name,
	translate,
}: {
	id: number;
	name: string;
	translate: string;
}) => {
	const translated = translate?.split(',') || [];

	console.log('TRANSLATED: ', translated);

	return (
		<div className={styles.explanation}>
			<div className={styles.wordHeader}>
				<div className={styles.wordContainer}>
					<span className={styles.word}>{name}</span>
					<span className={styles.past}>
						{'['} past form: did {']'}
					</span>
				</div>
				<div className={styles.typeContainer}>
					<div className={styles.flag}>
						<span className={styles.type}>Дієслово</span>
					</div>
					<svg className={styles.svg} viewBox="0 0 104 40" xmlns="http://www.w3.org/2000/svg">
						<path d="M 3.51735 3.43156 C 2.23343 2.17895 3.12026 0 4.914 0 H 103 V 40 H 4.914 C 3.12026 40 2.23343 37.821 3.51735 36.5684 L 19.0326 21.4316 C 19.8371 20.6467 19.8371 19.3533 19.0326 18.5684 L 3.51735 3.43156 Z"></path>
					</svg>
				</div>
			</div>
			<div className={styles.wordItem}>
				<div className={styles.wordItemExplanation}>
					<div className={styles.translateContainer}>
						<span className={styles.number}>{id < 10 ? `0${id}` : `${id}`}</span>
						<span className={styles.translate}>{translated[0]}</span>
					</div>
					<div className={styles.exampleMeaningContainer}>
						<span className={styles.example}>
							to perform an action that is not mentioned by name
						</span>
					</div>
					<div className={styles.buttonsContainer}>
						<Button color="default" variant="filled">
							<Icon icon="folder" variant="dark" />
						</Button>
						<Button color="default" variant="filled">
							<Icon icon="appStoreAdd" variant="dark" />
						</Button>
					</div>
					<div className={styles.transitiveContainer}>
						<span className={styles.transitive}>Transitive: </span>
						<span className={styles.wordTransitive}>to do</span>
						<span className={styles.sth}>sth</span>
					</div>
				</div>
				<div className={styles.imgContainer}>
					<img className={styles.img} src={img} />
				</div>
			</div>
			<UseExample />
			<Subtranslate id={`${id}.1`} translated={translated} />
			<Subtranslate id={`${id}.2`} translated={translated} />
			<Subtranslate id={`${id}.3`} translated={translated} />
		</div>
	);
};
