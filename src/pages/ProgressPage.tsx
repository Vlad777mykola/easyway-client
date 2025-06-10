import { useEffect, useState } from 'react';
import { Progress } from '@/modules/progress/Progress';
import { fetchProgressData } from '@/modules/progress/services/fetchProgressData';
import { ALL_COLLECTIONS, CollectionsType } from '@/shared/constants';
import { ProgressStoreState } from '@/store/progress';
import { useCollectionFilter } from '@/store/collection-filter';
import { ContentContainer } from '@/ui-components/Content-Container';
import { FieldsDataType, SIDE_BAR_COMPONENT_TYPE, Sidebar } from '@/shared/components/sidebar';
import { FILTER_LABELS } from '@/shared/constants/collections/data';
import { useMultipleProgress } from '@/modules/progress/hooks/useMultipleProgress';
import { TotalResult } from '@/modules/progress/components/total-result/TotalResult';

export type ProgressStore = {
	progressStore: {
		[key: string]: ProgressStoreState | number;
	};
};

type Exercise = {
	id: string;
	category: string[];
	title: string;
	topic: [string];
};

export const ProgressPage = () => {
	const [progressData, setProgressData] = useState<ProgressStore[]>([]);
	const [exercise, setExercise] = useState<Exercise[]>([]);
	const [defaultValues, setDefaultValues] = useState<string[]>([]);
	const [takenTest, setTakenTest] = useState<number>(0);

	const [progressIds, setProgressIds] = useState<string[]>([]);

	const collectionsData = useCollectionFilter.use.collectionsData();
	const filteredCollectionsData = useCollectionFilter.use.filteredCollectionsData();
	const data = filteredCollectionsData.length > 0 ? filteredCollectionsData : collectionsData;

	const getFiltersData = useCollectionFilter.use.getFiltersData();
	const setFilter = useCollectionFilter.use.setFilter();
	const setClean = useCollectionFilter.use.setClean();
	const setFilterDataOnSearch = useCollectionFilter.use.setFilterDataOnSearch();
	const setCollections = useCollectionFilter.use.setCollections();

	const fieldsData: FieldsDataType[] = [
		{
			keyValue: FILTER_LABELS.title,
			getDefaultValue: () => getFiltersData(FILTER_LABELS.title),
			label: FILTER_LABELS.title,
			componentType: SIDE_BAR_COMPONENT_TYPE.INPUT,
			placeholder: FILTER_LABELS.title,
		},
		{
			keyValue: FILTER_LABELS.topic,
			options: defaultValues,
			getDefaultValue: () => getFiltersData(FILTER_LABELS.topic),
			label: FILTER_LABELS.topic,
			componentType: SIDE_BAR_COMPONENT_TYPE.MULTIPLE,
		},
	];

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setFilter(key, value);
	};

	useEffect(() => {
		// setCollections(exercise);

		const exerciseValues = exercise.map((item) => item.title);

		setDefaultValues(exerciseValues);

		return () => {
			setClean();
			setCollections([]);
		};
	}, [exercise]);

	const totalProgress = useMultipleProgress(progressIds);

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

	useEffect(() => {
		const totalData = countTakenTest();
		setTakenTest(totalData);
	}, [totalProgress]);

	const countTakenTest = () => {
		let count: number = 0;

		progressIds.forEach((item) => {
			const progress = progressData.find((itemData) => itemData.progressStore[item]);
			if (
				typeof progress?.progressStore[item] === 'object' &&
				progress?.progressStore[item] !== null
			) {
				count += progress.progressStore[item].takenTestCount.count;
			}
		});

		return count;
	};

	const getKeysExercise = (progress: ProgressStore[]) => {
		const keys: Exercise[] = [];

		progress.forEach(({ progressStore }) => {
			Object.keys(progressStore).forEach((fullKey) => {
				if (fullKey.includes('timestamp')) return;
				if (!progressIds.includes(fullKey)) {
					setProgressIds((prev) => [...prev, fullKey]);
				}

				const theme = fullKey.slice(2); // remove prefix
				const isAlreadyAdded = keys.some(({ title }) => title.includes(theme));
				if (isAlreadyAdded) return;

				const collectionKey = Object.keys(ALL_COLLECTIONS).find(
					(collection) => {
						return collection.includes(theme.slice(0, -1));
					}, // crude plural-to-singular match
				);

				if (collectionKey) {
					keys.push({
						id: theme,
						title: theme,
						category: [collectionKey],
						topic: [theme],
					});
				}
			});
		});

		setExercise(keys);
	};

	return (
		<ContentContainer>
			<ContentContainer.Header>
				<TotalResult count={takenTest} />
			</ContentContainer.Header>
			<ContentContainer.Sidebar>
				<Sidebar
					title="Filter"
					fieldsData={fieldsData}
					onChange={onChange}
					onClear={() => setClean()}
					onSearch={() => setFilterDataOnSearch()}
				/>
			</ContentContainer.Sidebar>
			<ContentContainer.Content>
				{data.map((item) => (
					<Progress
						key={item.id}
						exerciseTheme={item.title}
						collection={item.category[0] as CollectionsType}
						totalProgress={totalProgress}
					/>
				))}
			</ContentContainer.Content>
		</ContentContainer>
	);
};

export default ProgressPage;
