import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { CountUp } from '@/ui-components/CountUp';
import { AddInfo } from './components/add-info/AddInfo';
import { deleteVocabularyCollectionProgress } from '../../utils/deleteVocabularyProgress';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import { useProgressStore } from '@/store/progress';
import { useIndexedDB } from '@/shared/hooks/use-indexedDB';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import { saveVocabularyProgress } from '../../utils/saveVocabularyProgress';
import styles from './statistics.module.css';

const COUNT_UP_DURATION = 1500;

export const Statistics = ({ countWords }: { countWords: number }) => {
	const { vocabulariesId = '' } = useParams();
	const progressStore = useProgressStore((store) => store.randomModeProgress);
	const takenTestCount = useProgressStore((state) => state.takenTestCount) || [];
	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);
	const totalPercentage = useProgressStore((store) => store.progressPercentage.total);
	const getProgressFromIndexedDB = useProgressStore((state) => state.getProgressFromIndexedDB);
	const setProgressPercentage = useProgressStore((store) => store.setProgressPercentage);
	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();
	const clearAll = useProgressStore((store) => store.clearAll);

	useBeforeunload(() => saveVocabularyProgress(saveProgressToIndexedDB, vocabulariesId));

	useEffect(() => {
		setProgressPercentage(countWords);
	}, [countWords, progressStore, collectionsExerciseConfig.exerciseCorrectResponse]);

	useIndexedDB(getProgressFromIndexedDB, vocabulariesId);

	return (
		<Wrapper>
			<div className={styles.progress}>
				<div className={styles.clearProgress}>
					<Button
						size="small"
						color="danger"
						variant="filled"
						onClick={() => deleteVocabularyCollectionProgress(clearAll, vocabulariesId)}
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
