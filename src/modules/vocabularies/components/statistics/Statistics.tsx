import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { PaginationControls } from '@/ui-components/PaginationControls/PaginationControls';
import { CountUp } from '@/ui-components/CountUp';
import { deleteVocabularyCollectionProgress } from '../../utils/deleteVocabularyProgress';
import { EXERCISE_MODE } from '@/store/exercise-progress';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import { useProgressStore, RandomTest } from '@/store/progress';
import type { TakenTestCount, ResolvedRandomTest } from '@/store/progress/useProgressStore';
import { EXERCISE_CONFIG } from '@/modules/exercise/constants';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { classes } from '@/shared/utils/classes';
import styles from './statistics.module.css';

type TotalRandomType = {
	resolved: number;
	progress: number;
	unTouch: number;
};

const COMPLETED_TEST = 100;
const COUNT_UP_DURATION = 1500;

export const Statistics = ({
	collectionsId,
	uncorrectAnswers = [],
	takenTestCount = { count: 0, timestamp: 0 },
}: {
	collectionsId: string;
	uncorrectAnswers?: string[];
	takenTestCount?: TakenTestCount;
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
	const setWordConfig = useVocabularyStore((store) => store.setWordConfig);
	const [showMore, setShowMore] = useState(false);
	const moreInfo = showMore || isDesktop || isLaptop;
	const [mistakePaginaton, setMistakePagination] = useState<string[]>([]);
	const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const countRandom = countRandomMode(words.length, progressStore);
		setTotalRandom(countRandom);
	}, [words, progressStore, collectionsExerciseConfig.exerciseCorrectResponse]);

	useEffect(() => {
		const examMistakePagination = makeIdsPagination(examModeProgress.errorProgress);
		setMistakePagination(examMistakePagination);
		setCurrentQuestions((examMistakePagination[0] && JSON.parse(examMistakePagination[0])) || []);
	}, [examModeProgress.errorProgress]);

	const onClick = (id: string) => {
		setWordConfig('resolvedExerciseIds', examModeProgress.successProgress);
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

	const makeIdsPagination = (ids: string[]) => {
		const maxPageItems = 4;
		return Array.from({ length: Math.ceil(ids.length / maxPageItems) }, (_, i) =>
			JSON.stringify(ids.slice(i * maxPageItems, (i + 1) * maxPageItems)),
		);
	};

	const onNavigate = (id: string) => {
		setCurrentQuestions(JSON.parse(id));
		mistakePaginaton.forEach((item, index) => {
			if (JSON.stringify(item) === JSON.stringify(id)) {
				setCurrentIndex(index);
			}
		});
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
					<StandardProgressBar progress={totalProgress} size="m" fullwidth />
				</div>
				{moreInfo && (
					<div className={styles.statistics}>
						{uncorrectAnswers.length > 0 && (
							<div className={styles.uncorrectAnswersContainer}>
								<span className={styles.modeTitle}>Exam Mistakes</span>
								<div className={styles.uncorrectAnswers}>
									{currentQuestions.map((id) => (
										<CircleButton key={id} onClick={() => onClick(id)}>
											{id}
										</CircleButton>
									))}
								</div>
								<PaginationControls
									exerciseMode="infinitiveMode"
									ids={mistakePaginaton}
									currentIndex={currentIndex}
									navigateTo={onNavigate}
								/>
							</div>
						)}
						<div className={styles.modeContainer}>
							<span className={styles.modeTitle}>Exam</span>
							<CircleProgressBar resolved={percentage} />
						</div>
						<div className={styles.modeContainer}>
							<span className={styles.modeTitle}>Random</span>
							<div className={styles.randomProgress}>
								<CircleProgressBar
									progress={totalRandom.progress}
									resolved={totalRandom.resolved}
									untouched={totalRandom.unTouch}
								/>
								<div className={styles.explanation}>
									<div className={styles.markersExplanation}>
										<div className={classes(styles.marker, styles.success)} />
										<span className={styles.explanation}>- success</span>
									</div>
									<div className={styles.markersExplanation}>
										<div className={classes(styles.marker, styles.error)} />
										<span className={styles.explanation}>- untouch</span>
									</div>
									<div className={styles.markersExplanation}>
										<div className={classes(styles.marker, styles.primary)} />
										<span className={styles.explanation}>- progress</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{isMobile && (
					<div className={styles.moreInfoContainer}>
						<Button onClick={handleShowMoreInfo} type="default" size="middle" block>
							{showMore ? 'Less Info' : 'More Info'}
						</Button>
					</div>
				)}
			</div>
		</Wrapper>
	);
};
