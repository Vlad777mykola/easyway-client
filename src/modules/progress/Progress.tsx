import { useEffect, useState } from 'react';
import { getAllDataFromIndexedDB } from '@/utils/indexedDB';
import { getAllCollections } from '@/shared/services/fetch-collections/getCollectionsData';
import { DefaultCollectionType } from '@/shared/constants/collections/data';
import { getWordsByVocabulary } from '@/shared/services/fetch-words-vocabulary/getWordsByVocabulary';
import { calculateCompletionPercentage, calculateTotalProgress } from '@/store/progress/service';

import styles from './progress.module.css';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { ErrorProgressPagination } from '@/shared/components/error-progress-pagination/ErrorProgressPagination';

const COMPLETED_TEST = 100;

const LOCATION = 'vocabularies/:vocabulariesId/word/:wordId';

export const Progress = () => {
	const [progressData, setProgressData] = useState([]);
	const [exercise, setExercise] = useState([]);

	console.log('EXERCISE: ', exercise);
	console.log('PROGRESS DATA: ', progressData);

	useEffect(() => {
		fetchData();

		const vocabularies: DefaultCollectionType[] = getAllCollections('vocabularies').map((item) => ({
			...item,
			showAddInfo: false,
		}));
		setExercise(vocabularies);
	}, []);

	const fetchData = async () => {
		try {
			const data = await getAllDataFromIndexedDB();
			setProgressData(data);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	const getProgressTheme = (examModeProgress, resolvedCount, radomModeProgress, count) => {
		const exam = calculateCompletionPercentage(examModeProgress?.successProgress.length, count);
		const resolved = calculateCompletionPercentage(resolvedCount, count);
		const progress = calculateCompletionPercentage(
			radomModeProgress?.progress.length - resolvedCount,
			count,
		);
		const unTouch = COMPLETED_TEST - progress - resolved;
		const total = calculateTotalProgress(exam, resolved);

		return {
			total,
			exam,
			random: {
				resolved,
				progress,
				unTouch,
			},
		};
	};

	const handleShowAddInfo = (id: number) => {
		const updateExercise = exercise.map((item) => {
			if (item.id === id) {
				return { ...item, showAddInfo: !item.showAddInfo };
			}
			return { ...item, showAddInfo: false };
		});
		setExercise(updateExercise);
	};

	return (
		<div>
			<p className={styles.progressTitle}>Vocabularies</p>
			<div className={styles.progressThemes}>
				{exercise.map((item) => {
					const exercise = getWordsByVocabulary(item.id).length || [];
					const id = `${item.id}_vocabulary`;
					const { examModeProgress, randomModeProgress, takenTestCount } =
						progressData.find((p) => Object.keys(p.progressStore).includes(id))?.progressStore[
							id
						] || {};

					const resolvedCount =
						randomModeProgress?.resolved.filter((resolvedItem) => resolvedItem.isDone).length || 0;

					const { total, exam, random } = getProgressTheme(
						examModeProgress,
						resolvedCount,
						randomModeProgress,
						exercise,
					);

					const path = `vocabularies/${item.id}`;

					console.log('EXAM MODE PROGRESS: ', examModeProgress);

					return (
						<div key={item.id} className={styles.progressContainer}>
							<p className={styles.themeTitle}>{item.title}</p>
							<div className={styles.commonProgress}>
								<div className={styles.progressItemContainer}>
									<span className={styles.progressItem}>
										<Icon icon="stock" />
									</span>
									<p className={styles.progressItem}>Total: </p>
									<p className={styles.progressItem}>{total || 0}%</p>
								</div>
								<div className={styles.progressItemContainer}>
									<span className={styles.progressItem}>
										<Icon icon="time" />
									</span>
									<p className={styles.progressItem}>Taken test count: </p>
									<p className={styles.progressItem}>{takenTestCount?.count}</p>
								</div>
							</div>
							{!item.showAddInfo && (
								<div className={styles.showAddInfoContainer}>
									<Button onClick={() => handleShowAddInfo(item.id)} block>
										Show More
									</Button>
								</div>
							)}
							{item.showAddInfo && (
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
												<p className={styles.progressItem}>Completed: {exam || 0}%</p>
											</div>
											<ErrorProgressPagination
												uncorrectAnswers={examModeProgress.errorProgress}
												pathname={path}
											/>
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
												<p className={styles.progressItem}>Resolved: {random.resolved || 0}%</p>
											</div>
											<div className={styles.progressItemContainer}>
												<span className={styles.progressItem}>
													<Icon icon="clock" />
												</span>
												<p className={styles.progressItem}>Progress: {random.progress || 0}%</p>
											</div>
											<p className={styles.progressItem}>Untouch: {random.unTouch || 0}%</p>
										</div>
									</div>
									<div className={styles.showAddInfoContainer}>
										<Button onClick={() => handleShowAddInfo(item.id)} block>
											Show Less
										</Button>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
