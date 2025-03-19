import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Wrapper } from '@/ui-components/Wrapper';
import { Button } from '@/ui-components/Button';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar/CircleProgressBar';
import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import { CountUp } from '@/ui-components/CountUp';
import { deleteVocabularyCollectionProgress } from '../../utils/deleteVocabularyProgress';
import { useVocabularyStore } from '@/store/vocabulary-collection';
import { useProgressStore } from '@/store/progress';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { classes } from '@/shared/utils/classes';
import { ErrorProgressPagination } from './components/error-progress-pagination/ErrorProgressPagination';
import styles from './statistics.module.css';

const COUNT_UP_DURATION = 1500;

export const Statistics = ({ countWords }: { countWords: number }) => {
	const [showMore, setShowMore] = useState(false);

	const { vocabulariesId = '' } = useParams();

	const { isMobile, isLaptop, isDesktop } = useContext(ScreenSizeContext);

	const clearAll = useProgressStore((store) => store.clearAll);
	const progressStore = useProgressStore((store) => store.randomModeProgress);
	const takenTestCount = useProgressStore((state) => state.takenTestCount) || [];
	const setProgressPercentage = useProgressStore((store) => store.setProgressPercentage);

	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);

	const randomPercentage = useProgressStore((store) => store.progressPercentage.random);
	const examPercentage = useProgressStore((store) => store.progressPercentage.exam);
	const totalPercentage = useProgressStore((store) => store.progressPercentage.total);

	const moreInfo = showMore || isDesktop || isLaptop;

	const progress = useProgressStore((store) => store);
	console.log('PROGRESS: ', progress);

	useEffect(() => {
		setProgressPercentage(countWords);
	}, [countWords, progressStore, collectionsExerciseConfig.exerciseCorrectResponse]);

	const handleShowMoreInfo = () => {
		setShowMore(!showMore);
	};

	// divide ui in two components
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
				{moreInfo && (
					<div className={styles.statistics}>
						<ErrorProgressPagination />
						<div className={styles.modeContainer}>
							<span className={styles.modeTitle}>Exam</span>
							<CircleProgressBar resolved={examPercentage} />
						</div>
						<div className={styles.modeContainer}>
							<span className={styles.modeTitle}>Random</span>
							<div className={styles.randomProgress}>
								<CircleProgressBar
									progress={randomPercentage.progress}
									resolved={randomPercentage.resolved}
									untouched={randomPercentage.unTouch}
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
