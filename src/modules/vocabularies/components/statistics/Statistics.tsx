import { useNavigate } from 'react-router-dom';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { EXERCISE_MODE, useExerciseProgressStore } from '@/store/exercise-progress';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import { EXERCISE_CONFIG } from '@/modules/exercise/constants';
import styles from './statistics.module.css';

export const Statistics = ({
	collectionsId,
	collectionName,
	totalProgress,
	examProgressResolved,
	examProgressUnresolved,
	randomProgress,
	uncorrectAnswers = [],
}: {
	collectionsId: string;
	collectionName: string;
	totalProgress: number;
	examProgressResolved: number;
	examProgressUnresolved: number;
	randomProgress: number;
	uncorrectAnswers?: string[];
}) => {
	const removeProgress = useExerciseProgressStore((store) => store.removeProgress);
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const navigate = useNavigate();

	const onClick = (id: string) => {
		setCollectionsExerciseConfig(EXERCISE_CONFIG.MODE, EXERCISE_MODE.isExam);
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
									<CircleButton key={id} onClick={() => onClick(id)}>
										{id}
									</CircleButton>
								))}
							</div>
						</div>
					)}
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Exam correct</span>
						<CircleProgressBar progress={examProgressResolved} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Exam uncorrect</span>
						<CircleProgressBar progress={examProgressUnresolved} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Random</span>
						<CircleProgressBar progress={randomProgress} />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
