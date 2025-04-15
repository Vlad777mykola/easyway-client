import { Progress } from '@/modules/progress/Progress';
import { fetchProgressData } from '@/modules/progress/services/fetchProgressData';
import { ALL_COLLECTIONS, CollectionsType } from '@/shared/constants';
import { ProgressStoreState } from '@/store/progress';
import { useEffect, useState } from 'react';

export type ProgressStore = {
	progressStore: {
		[key: string]: ProgressStoreState | number;
	};
};

type Exercise = {
	collections: CollectionsType;
	exercise: string;
};

export const ProgressPage = () => {
	const [progressData, setProgressData] = useState<ProgressStore[]>([]);
	const [exercise, setExercise] = useState<Exercise[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const fetchedProgressData = await fetchProgressData();
				setProgressData(fetchedProgressData);
				getKeysExercise(progressData);
			} catch (err) {
				console.log('Error fetching progress data: ', err);
			}
		})();
	}, [progressData.length, exercise.length]);

	const getKeysExercise = (progress: ProgressStore[]) => {
		const keys: Exercise[] = [];

		progress.forEach(({ progressStore }) => {
			Object.keys(progressStore).forEach((fullKey) => {
				if (fullKey.includes('timestamp')) return;

				const theme = fullKey.slice(2); // remove prefix
				const isAlreadyAdded = keys.some(({ exercise }) => exercise.includes(theme));
				if (isAlreadyAdded) return;

				const collectionKey = Object.keys(ALL_COLLECTIONS).find(
					(collection) => collection.includes(theme.slice(0, -1)), // crude plural-to-singular match
				);

				if (collectionKey) {
					keys.push({
						exercise: theme,
						collections: collectionKey as CollectionsType,
					});
				}
			});
		});

		setExercise(keys);
	};

	return (
		<>
			{exercise.map((item) => (
				<Progress key={item.exercise} exerciseTheme={item.exercise} collection={item.collections} />
			))}
		</>
	);
};

export default ProgressPage;
