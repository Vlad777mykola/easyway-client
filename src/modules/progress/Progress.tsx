import { useEffect, useState } from 'react';
import { getAllCollections } from '@/shared/services/fetch-collections/getCollectionsData';
import { DefaultCollectionType } from '@/shared/constants/collections/data';
import { ProgressStoreState } from '@/store/progress';
import { AddInfo } from './components/add-info/AddInfo';
import { CommonInfo } from './components/total-info/CommonInfo';
import { fetchProgressData } from './services/fetchProgressData';
import { CollectionsType } from '@/shared/constants';

import styles from './progress.module.css';

export type ProgressStore = {
	progressStore: {
		[key: string]: ProgressStoreState | number;
	};
};

type Exercise = DefaultCollectionType & {
	showAddInfo: boolean;
};

type TotalProgress = {
	[key: string]: {
		total: number;
		exam: number;
		errorProgress: string[];
		random: {
			resolved: number;
			progress: number;
			unTouch: number;
		};
	};
};

export const Progress = ({
	collection,
	exerciseTheme,
	totalProgress,
}: {
	collection: CollectionsType;
	exerciseTheme: string;
	totalProgress: TotalProgress;
}) => {
	const [progressData, setProgressData] = useState<ProgressStore[]>([]);
	const [exercise, setExercise] = useState<Exercise[]>([]);

	useEffect(() => {
		const filterData = (exercise: Exercise[]) => {
			const filteredData = progressData.filter((item) => {
				const progressStore = item.progressStore;
				return Object.keys(progressStore).some((key) => key.includes(exerciseTheme));
			});

			const filteredStore = exercise
				.filter((item) => {
					const id = `${item.id}_${exerciseTheme}`;
					return filteredData.some((p) => Object.keys(p.progressStore).includes(id));
				})
				.map((item) => ({
					...item,
				}));

			return filteredStore;
		};

		(async () => {
			try {
				const fetchedProgressData = await fetchProgressData();
				setProgressData(fetchedProgressData);

				const vocabularies: Exercise[] = getAllCollections(collection).map((item) => ({
					...item,
					showAddInfo: false,
				}));
				const filteredExercise = filterData(vocabularies);
				setExercise(filteredExercise);
			} catch (err) {
				console.log('Error fetching progress data: ', err);
			}
		})();
	}, [progressData.length, collection, exerciseTheme, progressData]);

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
		<>
			{exercise.length > 0 && (
				<div className={styles.exerciseContainer}>
					<p className={styles.progressTitle}>{exerciseTheme.toLocaleUpperCase()}</p>
					<div className={styles.progressThemes}>
						{exercise?.map((item) => {
							const progressId = `${item.id}_${exerciseTheme}`;
							const total = totalProgress[progressId];

							if (
								!total ||
								(total.exam === 0 &&
									total.random.resolved === 0 &&
									total.random.progress === 0 &&
									total.total === 0 &&
									total.errorProgress.length === 0)
							) {
								return null;
							}

							const progressStore = progressData.find((p) =>
								Object.keys(p.progressStore).includes(progressId),
							)?.progressStore[progressId] as ProgressStoreState | undefined;

							const takenTestCount = progressStore?.takenTestCount.count || 0;

							const progress = {
								exam: total.exam,
								resolved: total.random.resolved,
								progress: total.random.progress,
								unTouch: total.random.unTouch,
								errorProgress: total.errorProgress,
							};

							const path = `${collection}/${item.id}`;

							return (
								<div key={item.id} className={styles.progressContainer}>
									<p className={styles.themeTitle}>{item.title}</p>
									<CommonInfo takenTestCount={takenTestCount} total={total.total} />
									<AddInfo
										progress={progress}
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
			)}
		</>
	);
};
