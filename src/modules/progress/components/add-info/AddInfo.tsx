import { ErrorProgressPagination } from '@/shared/components/error-progress-pagination/ErrorProgressPagination';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import styles from './addInfo.module.css';
import { getAllDataFromIndexedDB } from '@/utils/indexedDB';
import { useEffect, useState } from 'react';
import { getProgressExercise } from '../../services/getProgressExercise';
import { getWordsByVocabulary } from '@/shared/services/fetch-words-vocabulary/getWordsByVocabulary';
import { ProgressStore } from '../../Progress';
import {
	ExamModeProgressType,
	RandomTest,
	ResolvedRandomTest,
	TakenTestCount,
} from '@/store/progress';

type ProgressState = {
	examModeProgress: ExamModeProgressType;
	randomModeProgress: {
		progress: RandomTest[];
		resolved: ResolvedRandomTest[];
	};
	takenTestCount: TakenTestCount;
};

type ProgressData = {
	total: number;
	exam: number;
	random: {
		resolved: number;
		progress: number;
		unTouch: number;
	};
	errorProgress: string[];
};

export const AddInfo = ({
	progressId,
	path,
	id,
	showInfo,
	handleShowAddInfo,
}: {
	progressId: string;
	path: string;
	id: string;
	showInfo: boolean;
	handleShowAddInfo: (id: string) => void;
}) => {
	const [progressData, setProgressData] = useState<ProgressData>({
		total: 0,
		exam: 0,
		random: {
			resolved: 0,
			progress: 0,
			unTouch: 0,
		},
		errorProgress: [],
	});

	useEffect(() => {
		(async () => {
			try {
				const progress: ProgressStore[] = await fetchData();
				const calculatedProgress = await calculateProgress(progress);
				setProgressData(calculatedProgress);
			} catch (err) {
				console.log('Error fetching progress data: ', err);
			}
		})();
	}, []);

	const fetchData = async (): Promise<ProgressStore[]> => {
		try {
			const progress = await getAllDataFromIndexedDB();
			return progress;
		} catch (error) {
			console.error('Failed to fetch data:', error);
			return [];
		}
	};

	const calculateProgress = (progress: ProgressStore[]) => {
		const foundItem = progress.find((item) => Object.keys(item.progressStore).includes(progressId));

		const rawState = foundItem?.progressStore[progressId];
		const progressState =
			typeof rawState === 'object' && rawState !== null && 'examModeProgress' in rawState
				? (rawState as ProgressState)
				: undefined;

		if (progressState) {
			const examModeProgress = progressState?.examModeProgress;
			const randomModeProgress = progressState?.randomModeProgress;
			const errorProgress = examModeProgress?.errorProgress || [];

			const exercise = getWordsByVocabulary(id)?.length || 0;
			const resolvedCount =
				randomModeProgress?.resolved.filter((resolvedItem) => resolvedItem.isDone).length || 0;
			const { total, exam, random } = getProgressExercise(
				examModeProgress,
				resolvedCount,
				randomModeProgress,
				exercise,
			);

			return {
				total,
				exam,
				random,
				errorProgress,
			};
		}

		return {
			total: 0,
			exam: 0,
			random: {
				resolved: 0,
				progress: 0,
				unTouch: 0,
			},
			errorProgress: [],
		};
	};

	return (
		<>
			{!showInfo && (
				<div className={styles.showAddInfoContainer}>
					<Button onClick={() => handleShowAddInfo(id)}>Show More</Button>
				</div>
			)}
			{showInfo && (
				<div className={styles.addInfo}>
					<div className={styles.commonProgress}>
						<div className={styles.randomProgress}>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="trophy" />
								</span>
								<p className={styles.progressItem}>Exam</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="check" />
								</span>
								<p className={styles.progressItem}>Completed: {progressData.exam || 0}%</p>
							</div>
							<div className={styles.progressItemContainer}>
								<ErrorProgressPagination
									uncorrectAnswers={progressData.errorProgress}
									pathname={path}
								/>
							</div>
						</div>
						<div className={styles.randomProgress}>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="question" />
								</span>
								<p className={styles.progressItem}>Random</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="check" />
								</span>
								<p className={styles.progressItem}>
									Resolved: {progressData.random.resolved || 0}%
								</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="clock" />
								</span>
								<p className={styles.progressItem}>
									Progress: {progressData.random.progress || 0}%
								</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="frown" />
								</span>
								<p className={styles.progressItem}>Untouch: {progressData.random.unTouch || 0}%</p>
							</div>
						</div>
					</div>
					<div className={styles.showAddInfoContainer}>
						<Button onClick={() => handleShowAddInfo(id)}>Show Less</Button>
					</div>
				</div>
			)}
		</>
	);
};
