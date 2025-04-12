import { useEffect, useState } from 'react';
import { getAllDataFromIndexedDB } from '@/utils/indexedDB';
import { getAllCollections } from '@/shared/services/fetch-collections/getCollectionsData';
import { DefaultCollectionType } from '@/shared/constants/collections/data';
import { getWordsByVocabulary } from '@/shared/services/fetch-words-vocabulary/getWordsByVocabulary';
import { Icon } from '@/ui-components/Icon';
import { ProgressStoreState } from '@/store/progress';
import { AddInfo } from './components/add-info/AddInfo';
import { getProgressExercise } from './services/getProgressExercise';

import styles from './progress.module.css';

type ProgressStore = {
	progressStore: {
		[key: string]: ProgressStoreState | number;
	};
};

type Exercise = DefaultCollectionType & {
	showAddInfo: boolean;
};

export const Progress = () => {
	const [progressData, setProgressData] = useState<ProgressStore[]>([]);
	const [exercise, setExercise] = useState<Exercise[]>([]);

	useEffect(() => {
		fetchData();

		const vocabularies: Exercise[] = getAllCollections('vocabularies').map((item) => ({
			...item,
			showAddInfo: false,
		}));
		const filteredExercise = filterData(vocabularies);
		setExercise(filteredExercise);
	}, [progressData.length]);

	const fetchData = async () => {
		try {
			const data = await getAllDataFromIndexedDB();
			console.log('DATA: ', data);
			setProgressData(data);
		} catch (error) {
			console.error('Failed to fetch data:', error);
		}
	};

	const filterData = (exercise: Exercise[]) => {
		const filteredData = progressData.filter((item) => {
			const progressStore = item.progressStore;
			return Object.keys(progressStore).some((key) => key.includes('vocabulary'));
		});

		const filteredStore = exercise
			.filter((item) => {
				const id = `${item.id}_vocabulary`;
				return filteredData.some((p) => Object.keys(p.progressStore).includes(id));
			})
			.map((item) => ({
				...item,
			}));

		return filteredStore;
	};

	const handleShowAddInfo = (id: string) => {
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
					const exercise = getWordsByVocabulary(item.id)?.length || 0;
					const id = `${item.id}_vocabulary`;
					const { examModeProgress, randomModeProgress, takenTestCount } =
						(progressData.find((p) => Object.keys(p.progressStore).includes(id))?.progressStore[
							id
						] as ProgressStoreState) || {};

					const resolvedCount =
						randomModeProgress?.resolved.filter((resolvedItem) => resolvedItem.isDone).length || 0;

					const { total, exam, random } = getProgressExercise(
						examModeProgress,
						resolvedCount,
						randomModeProgress,
						exercise,
					);

					const path = `vocabularies/${item.id}`;
					const errorProgress = examModeProgress?.errorProgress || [];

					return (
						<div key={item.id} className={styles.progressContainer}>
							<p className={styles.themeTitle}>{item.title}</p>
							<div className={styles.commonProgress}>
								<div className={styles.randomProgress}>
									<div className={styles.progressItemContainer}>
										<span className={styles.progressItem}>
											<Icon icon="stock" />
										</span>
										<p className={styles.progressItem}>Total: </p>
										<p className={styles.progressItem}>{total || 0}%</p>
									</div>
								</div>
								<div className={styles.randomProgress}>
									<div className={styles.progressItemContainer}>
										<span className={styles.progressItem}>
											<Icon icon="time" />
										</span>
										<p className={styles.progressItem}>Taken test count: </p>
										<p className={styles.progressItem}>{takenTestCount?.count}</p>
									</div>
								</div>
							</div>
							<AddInfo
								progressId={id}
								exam={exam}
								random={random}
								errorProgress={errorProgress}
								path={path}
								id={item.id}
								showInfo={item.showAddInfo}
								handleShowAddInfo={handleShowAddInfo}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
