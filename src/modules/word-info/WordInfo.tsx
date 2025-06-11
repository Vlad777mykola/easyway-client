import { BaseInfo } from './components/base-info/BaseInfo';
import { Explanation } from './components/explanation/Explanation';
import styles from './wordInfo.module.css';

export const WordInfo = ({
	name,
	transcription,
	translate,
}: {
	name: string;
	transcription: string;
	translate: string;
}) => {
	return (
		<div className={styles.wordInfo}>
			<BaseInfo name={name} transcription={transcription} />
			<div className={styles.explanation}>
				<Explanation id={1} name={name} translate={translate} />
			</div>
		</div>
	);
};
