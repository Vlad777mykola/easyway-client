import { useEffect } from 'react';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { CountUp } from '@/ui-components/CountUp';
import { AddInfo } from './components/add-info/AddInfo';
import { useProgressStore } from '@/store/progress';
import { useIndexedDB } from '@/shared/hooks/use-indexedDB';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import { saveProgress } from '@/shared/utils/progress/saveProgress';
import { deleteProgress } from '@/shared/utils/progress/deleteProgress';
import styles from './statistics.module.css';

const COUNT_UP_DURATION = 1500;

export const Statistics = ({
	countWords,
	exercisesId,
}: {
	countWords: number;
	exercisesId: string;
}) => {
	const progressStore = useProgressStore.use.randomModeProgress();
	const takenTestCount = useProgressStore.use.takenTestCount();
	const totalPercentage = useProgressStore.use.progressPercentage().total;
	const getProgressFromIndexedDB = useProgressStore.use.getProgressFromIndexedDB();
	const setProgressPercentage = useProgressStore.use.setProgressPercentage();
	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();
	const clearAll = useProgressStore.use.clearAll();

	useBeforeunload(() => saveProgress(saveProgressToIndexedDB, exercisesId));

	useEffect(() => {
		setProgressPercentage(countWords);
	}, [countWords, progressStore]);

	useIndexedDB(getProgressFromIndexedDB, exercisesId);

	return (
		<Wrapper>
			<div className={styles.progress}>
				<div className={styles.clearProgress}>
					<Button
						size="small"
						color="danger"
						variant="filled"
						onClick={() => deleteProgress(clearAll, exercisesId)}
					>
						Clear Progress
					</Button>
				</div>
				<span className={styles.collectionTitle}>Collection Progress</span>
				{takenTestCount?.count > 0 && (
					<div className={styles.uncorrectAnswersContainer}>
						<span className={styles.modeTitle}>Last answered Question</span>
						<div className={styles.uncorrectAnswers}>
							<span className={styles.countLatestTest}>
								<CountUp end={takenTestCount?.count} duration={COUNT_UP_DURATION} />
							</span>
						</div>
					</div>
				)}
				<div className={styles.totalProgress}>
					<StandardProgressBar progress={totalPercentage} size="m" fullwidth />
				</div>
				<AddInfo />
			</div>
		</Wrapper>
	);
};
