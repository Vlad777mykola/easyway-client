import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { classes } from '@/ui-design-atoms/classes';
import { Subtranslate } from '../subtranslate/Subtranslate';
import { Transitive } from '../transitive/Transitive';
import { UseExample } from '../use-example/UseExample';
import img from '@/assets/download.jpeg';

import styles from './explanation.module.css';

const wordTypes = {
	verb: 'дієслово',
	noun: 'іменник',
	adjective: 'прикметник',
	pronoun: 'прийменник',
	interjection: 'вставне слово',
} as const;

export const Explanation = ({
	id,
	name,
	translate,
	type = 'verb',
}: {
	id: number;
	name: string;
	translate: string;
	type?: string;
}) => {
	const translated = translate?.split(',') || [];

	console.log('TRANSLATED: ', translated);

	return (
		<div className={styles.explanation}>
			{id === 1 && (
				<div className={styles.wordHeader}>
					<div className={styles.wordContainer}>
						<span className={styles.word}>{name}</span>
						<span className={styles.past}>
							{'['} past form: did {']'}
						</span>
					</div>
					<div className={styles.typeContainer}>
						<div className={classes(styles.flag, styles[`${type.toLowerCase()}`])}>
							<span className={styles.type}>{wordTypes[type].toUpperCase()}</span>
						</div>
						<svg
							className={classes(styles.svg, styles[`${type.toLowerCase()}Svg`])}
							viewBox="0 0 104 40"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M 3.51735 3.43156 C 2.23343 2.17895 3.12026 0 4.914 0 H 103 V 40 H 4.914 C 3.12026 40 2.23343 37.821 3.51735 36.5684 L 19.0326 21.4316 C 19.8371 20.6467 19.8371 19.3533 19.0326 18.5684 L 3.51735 3.43156 Z"></path>
						</svg>
					</div>
				</div>
			)}
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
					<Transitive isTransitive={true} isNotTransitive={true} name={name} />
				</div>
				<div className={styles.imgContainer}>
					<img className={styles.img} src={img} />
				</div>
			</div>
			<UseExample />
			<Subtranslate id={`${id}.1`} translate={translate} name={name} />
			<Subtranslate id={`${id}.2`} translate={translate} name={name} />
			<Subtranslate id={`${id}.3`} translate={translate} name={name} />
		</div>
	);
};
