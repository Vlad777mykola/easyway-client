import { ReactNode, useMemo } from 'react';
import styles from './collectionDetails.module.css';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/components/list/List';
import { getCollectionById } from './services/getCollectionById';
import { FieldsDataType, Sidebar } from '../sidebar';
import { useExerciseProgressStore, EXERCISE_MODE } from '@/store/exercise-progress';

export const CollectionDetails = (): ReactNode => {
	const { collectionsId } = useParams();
	const setCollectionsExerciseConfig = useExerciseProgressStore(
		(store) => store.setCollectionsExerciseConfig,
	);
	const getExerciseMode = useExerciseProgressStore((store) => store.getExerciseMode);
	const getExerciseCorrectResponseCount = useExerciseProgressStore(
		(store) => store.getExerciseCorrectResponseCount,
	);

	const data = useMemo(() => getCollectionById(collectionsId || ''), [collectionsId]);

	const fieldsData: FieldsDataType[] = [
		{
			id: '14',
			keyValue: 'exerciseMode',
			options: [EXERCISE_MODE.EXAM_MODE, EXERCISE_MODE.INFINITIVE_MODE, EXERCISE_MODE.RANDOM_MODE],
			getDefaultValue: getExerciseMode,
			label: 'Exercise Mode',
			componentType: 'select',
		},
		{
			id: '12',
			keyValue: 'exerciseCorrectResponse',
			options: [5, 10],
			getDefaultValue: getExerciseCorrectResponseCount,
			label: 'Exercise correct response',
			componentType: 'select' as const,
		} as const,
	];

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		setCollectionsExerciseConfig(key, value);
	};

	return (
		<div className={styles.collectionsContainer}>
			<div>Collections {collectionsId}</div>
			<Sidebar title="Collection options" fieldsData={fieldsData} onChange={onChange} />
			{data && <List data={data} />}
		</div>
	);
};
