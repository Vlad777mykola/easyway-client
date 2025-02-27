import { Wrapper } from '@/ui-components/Wrapper';
import { Progress } from '@/ui-components/Progress';
import { Button } from '@/ui-components/Button';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { useExerciseProgressStore } from '@/store/exercise-progress';
import styles from './statistics.module.css';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';

const WRONG_CORRECT = {
	wrong: 30,
	correct: 40,
};
const INPROGRESS_RESOLVED = {
	resolved: 30,
	inProgress: 40,
};

export const Statistics = ({
	collectionsId,
	collectionName,
	totalProgress,
}: {
	collectionsId: string;
	collectionName: string;
	totalProgress: number;
}) => {
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
				<div className={styles.totalProgress}>
					<span className={styles.total}>Total {collectionName}:</span>
					<StandardProgressBar progress={totalProgress} size="l" />
				</div>
				<div className={styles.statistics}>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Father</span>
						<CircleProgressBar progress={30} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Mother</span>
						<CircleProgressBar progress={40} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Sister</span>
						<CircleProgressBar progress={70} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Brother</span>
						<CircleProgressBar progress={80} />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
