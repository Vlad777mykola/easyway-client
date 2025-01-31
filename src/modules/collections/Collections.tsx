import { ReactNode, useMemo } from 'react';
import { ListCollections } from './components/lits-collections/ListCollections';
import { getAllCollections } from './services/getAllCollections';
import { selectData } from '@/shared/constants/data';
import { FieldsDataType, Sidebar } from '../sidebar';
import styles from './collections.module.css';
import { useCollectionFilter } from '@/store/collection-filter';
import { LEVEL, TOPIC_TENSES } from './constants/store-constants';

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);
	const { id, topic, category, level } = useCollectionFilter();
	const getLevel = useCollectionFilter((store) => store.getLevel);
	const getTopic = useCollectionFilter((store) => store.getTopic);
	//const getExerciseMode = useExerciseProgressStore((store) => store.getExerciseMode);

	console.log('ID: ', id);
	console.log('TOPIC: ', topic);
	console.log('CATEGORY: ', category);
	console.log('LEVEL: ', level);
	console.log('DATA: ', data);

	const fieldsData: FieldsDataType[] = [
		{
			id: '14',
			keyValue: 'level',
			options: [LEVEL.ADVANCED, LEVEL.BEGINNER, LEVEL.INTERMEDIATE],
			getDefaultValue: getLevel,
			label: 'Level',
			componentType: 'select',
		} as const,
		{
			id: '12',
			keyValue: 'topicTenses',
			options: [TOPIC_TENSES.ASPECTS, TOPIC_TENSES.FUTURE_CONTINUOUS, TOPIC_TENSES.PAST_CONTINUOUS],
			getDefaultValue: getTopic,
			label: 'Exercise correct response',
			componentType: 'multiple' as const,
		} as const,
	];

	const onSearch = (data) => {
		console.log('DATA: ', data);
	};

	console.log('SELECT DATA: ', selectData);

	return (
		<div className={styles.collectionsContainer}>
			<Sidebar title="Filter" fieldsData={fieldsData} onSearch={onSearch} />
			<ListCollections data={data} />
		</div>
	);
};
