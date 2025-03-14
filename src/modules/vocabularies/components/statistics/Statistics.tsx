import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { deleteVocabularyCollectionProgress } from '../../utils/deleteVocabularyProgress';
import { EXERCISE_MODE } from '@/store/exercise-progress';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import { useProgressStore, RandomTest } from '@/store/progress';
import type { LatestTest, ResolvedRandomTest } from '@/store/progress/useProgressStore';
import { EXERCISE_CONFIG } from '@/modules/exercise/constants';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import styles from './statistics.module.css';

type TotalRandomType = {
	resolved: number;
	progress: number;
	unTouch: number;
};

const COMPLETED_TEST = 100;

export const Statistics = ({
	collectionsId,
	uncorrectAnswers = [],
	latestTests = { count: 0, timestamp: 0 },
}: {
	collectionsId: string;
	uncorrectAnswers?: string[];
	latestTests?: LatestTest;
}) => {
	const setCollectionsExerciseConfig = useVocabularyStore.use.setCollectionsExerciseConfig();
	const clearAll = useProgressStore((store) => store.clearAll);
	const navigate = useNavigate();
	const [totalRandom, setTotalRandom] = useState<TotalRandomType>({
		resolved: 0,
		progress: 0,
		unTouch: 0,
	});
	const words = useVocabularyStore((store) => store.words);
	const progressStore = useProgressStore((store) => store.randomModeProgress);
	const examModeProgress = useProgressStore((state) => state.examModeProgress);
	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);
	const { vocabulariesId = '' } = useParams();

	const { isMobile, isLaptop, isDesktop } = useContext(ScreenSizeContext);

	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
		const countRandom = countRandomMode(words.length, progressStore);
		setTotalRandom(countRandom);
	}, [words, progressStore, collectionsExerciseConfig.exerciseCorrectResponse]);

	const onClick = (id: string) => {
		setCollectionsExerciseConfig(EXERCISE_CONFIG.MODE, EXERCISE_MODE.isExam);
		navigate(`/vocabularies/${collectionsId}/word/${id}`);
	};

	const calculateCompletionPercentage = (completedTasks: number, totalTasks: number) => {
		if (totalTasks === 0) return 0;
		return Math.round((completedTasks / totalTasks) * COMPLETED_TEST);
	};

	const calculateTotalProgress = (examProgress: number, randomProgress: TotalRandomType) => {
		const totalProgress = (examProgress + randomProgress.resolved) / 2;
		return Math.ceil(totalProgress);
	};

	const percentage = calculateCompletionPercentage(
		examModeProgress.successProgress.length,
		words.length,
	);

	const totalProgress = calculateTotalProgress(percentage, totalRandom);

	const countRandomMode = (
		countWords: number,
		progressStore: {
			progress: RandomTest[];
			resolved: ResolvedRandomTest[];
		},
	) => {
		let resolvedCount = 0;

		progressStore.resolved.forEach((resolvedItem) => {
			if (resolvedItem.isDone) {
				resolvedCount += 1;
			}
		});

		const resolved = calculateCompletionPercentage(resolvedCount, countWords);
		const progress = calculateCompletionPercentage(
			progressStore.progress.length - resolvedCount,
			countWords,
		);
		const unTouch = COMPLETED_TEST - progress - resolved;

		return { resolved, progress, unTouch };
	};

	const handleShowMoreInfo = () => {
		setShowMore(!showMore);
	};

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
				{latestTests?.count > 0 && (showMore || isDesktop || isLaptop) && (
					<div className={styles.uncorrectAnswersContainer}>
						<span className={styles.modeTitle}>Last answered Question</span>
						<div className={styles.uncorrectAnswers}>
							<span className={styles.countLatestTest}>{latestTests?.count}</span>
						</div>
					</div>
				)}
				<div className={styles.totalProgress}>
					<StandardProgressBar progress={totalProgress} size="m" fullwidth />
				</div>
				{isMobile && (
					<div className={styles.moreInfoContainer}>
						<Button onClick={handleShowMoreInfo} type="primary" size="middle" block>
							More Info
						</Button>
					</div>
				)}
				<div className={styles.statistics}>
					{uncorrectAnswers.length > 0 && (showMore || isDesktop || isLaptop) && (
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
					{(showMore || isDesktop || isLaptop) && (
						<div className={styles.modeContainer}>
							<span className={styles.modeTitle}>Exam correct</span>
							<CircleProgressBar progress={percentage} />
						</div>
					)}
					{(showMore || isDesktop || isLaptop) && (
						<div className={styles.modeContainer}>
							<span className={styles.modeTitle}>Random Resolved</span>
							<CircleProgressBar
								progress={totalRandom.progress}
								resolved={totalRandom.resolved}
								untouched={totalRandom.unTouch}
							/>
						</div>
					)}
				</div>
			</div>
		</Wrapper>
	);
};
