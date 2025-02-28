import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { useExerciseProgressStore } from '@/store/exercise-progress';
import styles from './statistics.module.css';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';
import { useNavigate } from 'react-router-dom';
import { CircleButton } from '@/ui-components/CircleButton';

export const Statistics = ({
	collectionsId,
	collectionName,
	totalProgress,
	examProgress,
	uncorrectAnswers = [],
}: {
	collectionsId: string;
	collectionName: string;
	totalProgress: number;
	examProgress: number;
	uncorrectAnswers?: string[];
}) => {
	const removeProgress = useExerciseProgressStore((store) => store.removeProgress);
	const navigate = useNavigate();

	const onClick = (id: string) => {
		navigate(`/vocabularies/${collectionsId}/word/${id}`);
	};

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
					{uncorrectAnswers.length > 0 && (
						<div className={styles.uncorrectAnswersContainer}>
							<span className={styles.modeTitle}>Exam uncorrect answers</span>
							<div className={styles.uncorrectAnswers}>
								{uncorrectAnswers.map((id) => (
									<CircleButton onClick={() => onClick(id)}>{id}</CircleButton>
								))}
							</div>
						</div>
					)}
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Exam</span>
						<CircleProgressBar progress={examProgress} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Random</span>
						<CircleProgressBar progress={40} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Infinity</span>
						<CircleProgressBar progress={70} />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
