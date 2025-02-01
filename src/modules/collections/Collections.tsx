import { ReactNode, useMemo, useState } from 'react';
import { ListCollections } from './components/lits-collections/ListCollections';
import { getAllCollections } from './services/getAllCollections';
import { selectData } from '@/shared/constants/data';
import { FieldsDataType, Sidebar } from '../sidebar';
import styles from './collections.module.css';
import { useCollectionFilter } from '@/store/collection-filter';
import { LEVEL, TOPIC_TENSES, LEARNING_STYLE } from './constants/store-constants';

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);
	const dataStore = useCollectionFilter((store) => store.filterCollectionData);
	const getLevel = useCollectionFilter((store) => store.getLevel);
	const getCategory = useCollectionFilter((store) => store.getCategory);
	const getLearningStyle = useCollectionFilter((store) => store.getLearningStyle);
	const getTopic = useCollectionFilter((store) => store.getTopic);
	const getTitle = useCollectionFilter((store) => store.getTitle);
	const getSubtitle = useCollectionFilter((store) => store.getSubtitle);
	const setFilter = useCollectionFilter((store) => store.setFilter);

	console.log('DATA STORE: ', dataStore);
	console.log('DATA COLLECTIONS: ', data);

	const fieldsData: FieldsDataType[] = [
		{
			id: '13',
			keyValue: 'title',
			getDefaultValue: getTitle,
			label: 'Title',
			componentType: 'input',
		},
		{
			id: '18',
			keyValue: 'subtitle',
			getDefaultValue: getSubtitle,
			label: 'Subtitle',
			componentType: 'input',
		},
		{
			id: '14',
			keyValue: 'level',
			options: [LEVEL.ADVANCED, LEVEL.BEGINNER, LEVEL.INTERMEDIATE],
			getDefaultValue: getLevel,
			label: 'Level',
			componentType: 'select',
		} as const,
		{
			id: '15',
			keyValue: 'category',
			options: [
				TOPIC_TENSES.ASPECTS,
				TOPIC_TENSES.FUTURE_CONTINUOUS,
				TOPIC_TENSES.FUTURE_PERFECT,
				TOPIC_TENSES.FUTURE_PERFECT_CONTINUOUS,
				TOPIC_TENSES.FUTURE_SIMPLE,
				TOPIC_TENSES.FUTURE_WITH_GOING_TO,
				TOPIC_TENSES.PAST_CONTINUOUS,
				TOPIC_TENSES.PAST_SIMPLE,
				TOPIC_TENSES.PAST_WITH_GOING_TO,
				TOPIC_TENSES.PRESENT_CONTINUOUS,
				TOPIC_TENSES.PRESENT_PERFECT,
				TOPIC_TENSES.PRESENT_PERFECT_CONTINUOUS,
				TOPIC_TENSES.PRESENT_SIMPLE,
				TOPIC_TENSES.TALKING_ABOUT_THE_FUTURE,
				TOPIC_TENSES.TALKING_ABOUT_THE_PAST,
				TOPIC_TENSES.TALKING_ABOUT_THE_PRESENT,
			],
			getDefaultValue: getCategory,
			label: 'Category',
			componentType: 'multiple',
		} as const,
		{
			id: '16',
			keyValue: 'learningStyle',
			options: [LEARNING_STYLE.SELECTING_MATCHING],
			getDefaultValue: getLearningStyle,
			label: 'Learning Style',
			componentType: 'select',
		},
		{
			id: '17',
			keyValue: 'topic',
			options: [
				TOPIC_TENSES.ASPECTS,
				TOPIC_TENSES.FUTURE_CONTINUOUS,
				TOPIC_TENSES.FUTURE_PERFECT,
				TOPIC_TENSES.FUTURE_PERFECT_CONTINUOUS,
				TOPIC_TENSES.FUTURE_SIMPLE,
				TOPIC_TENSES.FUTURE_WITH_GOING_TO,
				TOPIC_TENSES.PAST_CONTINUOUS,
				TOPIC_TENSES.PAST_SIMPLE,
				TOPIC_TENSES.PAST_WITH_GOING_TO,
				TOPIC_TENSES.PRESENT_CONTINUOUS,
				TOPIC_TENSES.PRESENT_PERFECT,
				TOPIC_TENSES.PRESENT_PERFECT_CONTINUOUS,
				TOPIC_TENSES.PRESENT_SIMPLE,
				TOPIC_TENSES.TALKING_ABOUT_THE_FUTURE,
				TOPIC_TENSES.TALKING_ABOUT_THE_PAST,
				TOPIC_TENSES.TALKING_ABOUT_THE_PRESENT,
			],
			getDefaultValue: getTopic,
			label: 'Topic',
			componentType: 'multiple',
		},
	];

	const onSearch = () => {
		console.log('ON SEARCH');
	};

	const filterCollectionData = (data, title: string, subtitle: string) => {
		if (title !== '' || subtitle !== '') {
			return data.filter(
				(item) =>
					(title ? item.title.toLowerCase().includes(title.toLowerCase()) : true) &&
					(subtitle ? item.subtitle.toLowerCase().includes(subtitle.toLowerCase()) : true),
			);
		}

		if (title === '' || subtitle === '') {
			return data;
		}
	};

	const onChange = (key: string, value: number[] | string | boolean | string[] | number) => {
		console.log('KEY: ', key);
		console.log('VALUE: ', value);
		setFilter(key, value);
	};

	console.log('SELECT DATA: ', selectData);

	return (
		<div className={styles.collectionsContainer}>
			<Sidebar title="Filter" fieldsData={fieldsData} onChange={onChange} onSearch={onSearch} />
			<ListCollections data={filterCollectionData(data, dataStore.title, dataStore.subtitle)} />
		</div>
	);
};
