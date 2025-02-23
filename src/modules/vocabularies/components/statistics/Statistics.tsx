import { Wrapper } from '@/ui-components/Wrapper';
import { Progress } from '@/ui-components/Progress';
import { Button } from '@/ui-components/Button';
import { useExerciseProgressStore } from '@/store/exercise-progress';
import styles from './statistics.module.css';

const WRONG_CORRECT = {
	wrong: 30,
	correct: 40,
};
const INPROGRESS_RESOLVED = {
	resolved: 30,
	inProgress: 40,
};

export const Statistics = ({ collectionsId }: { collectionsId: string }) => {
	const removeProgress = useExerciseProgressStore((store) => store.removeProgress);

	return (
		<Wrapper>
			<div className={styles.progress}>
				<div className={styles.clearProgress}>
					<Button
						size="small"
						color="danger"
						variant="filled"
						onClick={() => removeProgress(collectionsId)}
					>
						Clear Progress
					</Button>
				</div>
				<span className={styles.collectionTitle}>Collection Progress</span>
				<div className={styles.statistics}>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Random Mode</span>
						<Progress
							success={{ percent: WRONG_CORRECT.correct }}
							type="circle"
							percent={WRONG_CORRECT.correct + WRONG_CORRECT.wrong}
							strokeColor={'rgb(211, 47, 47)'}
							format={() => `${WRONG_CORRECT.correct}%`}
						/>
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Exam Mode</span>
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
