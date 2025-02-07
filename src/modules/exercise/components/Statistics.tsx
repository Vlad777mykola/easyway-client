import { Wrapper } from '@/ui-components/Wrapper';
import { Progress } from '@/ui-components/Progress';
import { Button } from '@/ui-components/Button';
import { removeLocalStorage } from '../services/removeLocalStorage';
import styles from './statistics.module.css';

const WRONG_CORRECT = {
	wrong: 30,
	correct: 40,
};
const INPROGRESS_RESOLVED = {
	resolved: 30,
	inProgress: 40,
};

type Props = {
	exerciseListProgress: { id: string; countCorrectAnswers: number }[];
	collectionsId: string;
};

export const Statistics = ({ exerciseListProgress, collectionsId }: Props) => {
	console.log('STATISTICS: ', exerciseListProgress);
	return (
		<Wrapper>
			<div className={styles.progress}>
				<div className={styles.clearProgress}>
					<Button
						size="small"
						color="danger"
						variant="filled"
						onClick={() => removeLocalStorage(collectionsId)}
					>
						Clear Progress
					</Button>
				</div>
				<h1 className={styles.collectionTitle}>Collection Progress</h1>
				<div className={styles.statistics}>
					<div className={styles.modeContainer}>
						<h2 className={styles.modeTitle}>Random Mode</h2>
						<Progress
							success={{ percent: WRONG_CORRECT.correct }}
							type="circle"
							percent={WRONG_CORRECT.correct + WRONG_CORRECT.wrong}
							strokeColor={'rgb(211, 47, 47)'}
							format={() => `${WRONG_CORRECT.correct}%`}
						/>
					</div>
					<div className={styles.modeContainer}>
						<h2 className={styles.modeTitle}>Exam Mode</h2>
						<Progress
							type="circle"
							success={{ percent: INPROGRESS_RESOLVED.resolved }}
							percent={INPROGRESS_RESOLVED.resolved + INPROGRESS_RESOLVED.inProgress}
							format={() => `${INPROGRESS_RESOLVED.resolved}%`}
						/>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
