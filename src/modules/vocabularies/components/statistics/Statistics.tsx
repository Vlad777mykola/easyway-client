import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { EXERCISE_MODE } from '@/store/exercise-progress';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import { EXERCISE_CONFIG } from '@/modules/exercise/constants';
import styles from './statistics.module.css';
import { useProgressStore, RandomTest } from '@/store/progress';
import { useIndexedDB } from '@/shared/hooks/use-indexedDB';
import type { LatestTest } from '@/store/progress/useProgressStore';

// GET PROGRESS FROM DB SET PROGRESS TO DB USE CUSTOM HOOKS FOR (TO BE ABLE TO USE EVERYWHERE)

export const Statistics = ({
	collectionsId,
	collectionName,
	uncorrectAnswers = [],
	latestTests = [],
}: {
	collectionsId: string;
	collectionName: string;
	uncorrectAnswers?: string[];
	latestTests?: LatestTest[];
}) => {
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const clearAll = useProgressStore((store) => store.clearAll);
	const navigate = useNavigate();
	const [totalRandom, setTotalRandom] = useState(0);
	const words = useVocabularyStore((store) => store.words);
	const progress = useProgressStore((store) => store);
	const progressStore = useProgressStore((store) => store.randomModeProgress);
	const examModeProgress = useProgressStore((state) => state.examModeProgress);
	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);
	const [clear, setClear] = useState(false);
	const { vocabulariesId = '' } = useParams();

	useIndexedDB(clearAll, 'clearAll', vocabulariesId, '', '', clear, setClear);

	console.log('//PROGRESS: ', progress);
	console.log('////// latestTests', latestTests);

	useEffect(() => {
		const countRandom = countRandomMode(words.length, progressStore.progress, progressStore.isDone);
		setTotalRandom(countRandom);
	}, [words, progressStore, collectionsExerciseConfig.exerciseCorrectResponse]);

	const onClick = (id: string) => {
		setCollectionsExerciseConfig(EXERCISE_CONFIG.MODE, EXERCISE_MODE.isExam);
		navigate(`/vocabularies/${collectionsId}/word/${id}`);
	};

	const calculateCompletionPercentage = (completedTasks: number, totalTasks: number) => {
		if (totalTasks === 0) return 0;
		return Math.round((completedTasks / totalTasks) * 100);
	};

	const calculateTotalProgress = (examProgress: number, randomProgress: number) => {
		const totalProgress = (examProgress + randomProgress) / 2;
		return Math.ceil(totalProgress);
	};

	const percentage = calculateCompletionPercentage(
		examModeProgress.successProgress.length,
		words.length,
	);

	const uncorrectAnswersPercentage = calculateCompletionPercentage(
		examModeProgress.errorProgress.length,
		words.length,
	);

	const totalProgress = calculateTotalProgress(percentage, totalRandom);

	const countRandomMode = (countWords: number, progressStore: RandomTest[], isDone: boolean) => {
		const countMake = collectionsExerciseConfig.exerciseCorrectResponse * countWords; // rename where is words
		let totalCount = 0;
		const HUNDRED_PROCENT = 100;

		if (isDone) {
			return HUNDRED_PROCENT;
		}

		progressStore.forEach((item) => {
			totalCount += item.correctCount;
		});

		return calculateCompletionPercentage(totalCount, countMake);
	};

	return (
		<Wrapper>
			<div className={styles.progress}>
				<div className={styles.clearProgress}>
					<Button size="small" color="danger" variant="filled" onClick={() => setClear(true)}>
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
						<CircleProgressBar progress={percentage} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Exam uncorrect</span>
						<CircleProgressBar progress={uncorrectAnswersPercentage} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Random</span>
						<CircleProgressBar progress={totalRandom} />
					</div>
					{latestTests.length > 0 && (
						<div className={styles.uncorrectAnswersContainer}>
							<span className={styles.modeTitle}>Last answered Question</span>
							<div className={styles.uncorrectAnswers}>
								{latestTests.map((test) => (
									<CircleButton key={test.id} onClick={() => onClick(test.id)}>
										{test.id}
									</CircleButton>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</Wrapper>
	);
};
