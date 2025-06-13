import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { PartOfSpeechFlag } from '@/ui-components/PartOfSpeechFlag';
import { Typography } from '@/ui-components/Typography';
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

export type WordTypes = 'дієслово' | 'іменник' | 'прикметник' | 'вставне слово';
export type WordTypeKey = keyof typeof wordTypes;

export const Explanation = ({
	id,
	name,
	translate,
	isHeader,
	type = 'verb',
}: {
	id: number;
	name: string;
	translate: string;
	isHeader: boolean;
	type?: WordTypeKey;
}) => {
	const translated = translate?.split(',') || [];

	return (
		<div className={styles.explanation}>
			{isHeader && (
				<div className={styles.wordHeader}>
					<div className={styles.wordContainer}>
						<Typography.Text className={styles.word}>{name}</Typography.Text>
						<Typography.Text className={styles.past}>
							{'['} past form: did {']'}
						</Typography.Text>
					</div>
					<PartOfSpeechFlag type={type} ukrainianType={wordTypes[type]} />
				</div>
			)}
			<div className={styles.wordItem}>
				<div className={styles.wordItemExplanation}>
					<div className={styles.translateContainer}>
						<Typography.Text className={styles.number}>
							{id < 10 ? `0${id}` : `${id}`}
						</Typography.Text>
						<Typography.Text className={styles.translate}>{translated[0]}</Typography.Text>
					</div>
					<div className={styles.exampleMeaningContainer}>
						<Typography.Text className={styles.example}>
							to perform an action that is not mentioned by name
						</Typography.Text>
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
